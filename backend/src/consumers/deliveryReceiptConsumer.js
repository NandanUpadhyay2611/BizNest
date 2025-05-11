import { redis } from "../services/redisService.js";
import CommunicationLog from "../models/CommunicationLog.js";
import Campaign from "../models/Campaign.js"
import connectDB from "../dbConnect.js";
import { generateCampaignSummary } from "../utils/aiSummary.js";


await connectDB();

async function processReceiptsBatch() {
  let lastId = "0-0";
  const BATCH_SIZE = 20;

  while (true) {
    const response = await redis.xRead(
      [{ key: "deliveryReceiptStream", id: lastId }],
      { BLOCK: 5000, COUNT: BATCH_SIZE }
    );

    if (Array.isArray(response) && response.length > 0) {
      const updates = [];
      const campaignStats = {}; // { campaignId: { sent: X, failed: Y } }

      for (const streamData of response) {
        for (const msg of streamData.messages) {
          let data = msg.message;
          // (Convert Redis array/object to JS object)
          if (
            data &&
            typeof data === "object" &&
            Object.keys(data).every((k) => !isNaN(Number(k)))
          ) {
            const obj = {};
            const keys = Object.keys(data).sort(
              (a, b) => Number(a) - Number(b)
            );
            for (let i = 0; i < keys.length; i += 2) {
              obj[data[keys[i]]] = data[keys[i + 1]];
            }
            data = obj;
          }

          //  Prepare CommunicationLog update
          updates.push({
            updateOne: {
              filter: { _id: data.logId },
              update: { status: data.status },
            },
          });

          //  Track stats per campaignId
          // (Find campaignId for this log)
          const log = await CommunicationLog.findById(data.logId).select(
            "campaignId"
          );
          const campaignId = log.campaignId.toString();
          if (!campaignStats[campaignId])
            campaignStats[campaignId] = { sent: 0, failed: 0 };
          if (data.status === "SENT" && campaignStats[campaignId].sent<=0) campaignStats[campaignId].sent += 1;
          if (data.status === "FAILED") campaignStats[campaignId].failed += 1;

          lastId = msg.id;
        }
      }

      //  Batch update CommunicationLog
      if (updates.length) {
        await CommunicationLog.bulkWrite(updates);
      }

      //  Batch update Campaign stats
      for (const [campaignId, stats] of Object.entries(campaignStats)) {
        await Campaign.updateOne(
          { _id: campaignId },
          {
            $inc: {
              "stats.sent": stats.sent,
              "stats.failed": stats.failed,
            },
          }
        );

          const summary = await generateCampaignSummary(campaignId);
  await Campaign.updateOne(
    { _id: campaignId },
    { $set: { "suggestions.summary": summary } }
  );
      }

    
    }
  }
}


  await processReceiptsBatch();

