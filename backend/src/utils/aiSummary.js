
import { GoogleGenerativeAI } from "@google/generative-ai";
import Campaign from "../models/Campaign.js";
import Segment from "../models/Segment.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateCampaignSummary(campaignId) {
  // Fetch campaign and segment for context
  const campaign = await Campaign.findById(campaignId).populate("segmentId");
  if (!campaign) throw new Error("Campaign not found");

  const prompt = `
Given the following campaign stats and segment rules, write a concise, human-readable summary for a CRM dashboard.
Stats: sent=${campaign.stats.sent}, failed=${campaign.stats.failed}, audienceSize=${campaign.stats.audienceSize}
Segment rules: ${JSON.stringify(campaign.segmentId?.rules || {})}
Respond with only the summary sentence.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  
  return result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
}
