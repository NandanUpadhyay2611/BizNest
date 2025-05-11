import Segment from "../models/Segment.js";
import Campaign from "../models/Campaign.js";
import Customer from "../models/Customer.js";
import CommunicationLog from "../models/CommunicationLog.js";
import buildMongoQueryFromRules from "../utils/mongoQueryBuilder.js";
import axios from 'axios';
import mongoose from "mongoose";

export const saveCampaignController=async (req, res) => {
  const { segment, steps, suggestions } = req.body;

  if (!segment || !segment.rules || !steps || !steps.length) {
    return res.status(400).json({ message: "Segment and steps are required." });
  }

  // 1. Save segment
  const segmentDoc = await Segment.create({ name: suggestions?.tag || "Untitled", rules: segment.rules });

  // 2. Find audience
  const mongoQuery = buildMongoQueryFromRules(segment.rules);
  const audience = await Customer.find(mongoQuery);

  // 3. Save campaign
  const campaign = await Campaign.create({
    segmentId: segmentDoc._id,
    steps,
    suggestions,
    stats: { audienceSize: audience.length }
  });

  // Simulate delivery for each customer
  for (const customer of audience) {
    // 1. Create log entry
    const log = await CommunicationLog.create({
      campaignId: campaign._id,
      customerId: customer._id,
      status: 'PENDING'
    });

    // 2. Send to vendor API (simulate delivery)

    axios.post("http://localhost:3000/api/vendor/send", {
      logId: log._id,
      customer,
      campaign
    }).catch(err => console.error('Vendor API error:', err.message));
  }

  res.json({ segment: segmentDoc, campaign });


}