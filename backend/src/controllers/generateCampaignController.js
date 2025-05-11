import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are an expert CRM campaign designer. 
Given a business goal or campaign idea in plain English, output a structured JSON object for a CRM campaign with:
- segment: { rules: logical rule tree using fields like spend, visits, (etc. if asked in prompt by user) }
- steps: [{ type: "message"|"delay", text/days }]
- suggestions: { tag, sendTime, ctas }

"name
"Mohit Sharma"
email
"mohit.sharma@example.com"
spend
12000
visits
4
lastActive
2025-05-01T12:00:00.000+00:00
createdAt
2025-05-07T13:51:24.873+00:00
updatedAt
2025-05-07T13:51:24.873+00:00
"
This is how a customer schema look like carefully observe the fields and add only this rules in field no other also notice the format.

Add only fields which are asked by user in prompt
All outputs must be valid JSON, no code block formatting.
`;

export const generateCampaignController = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required." });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const userPrompt = `
${SYSTEM_PROMPT}
User goal: ${prompt}
Output example:
{
  "segment": {
    "rules": {
      "type": "group",
      "operator": "AND",
      "children": [
        { "field": "spend", "operator": ">", "value": 10000 },
       
{"field": "visits", "operator":">", "value": 1}
      ]
    }
  },
  "steps": [
    { "type": "message", "text": "Hi! Enjoy 10% off your next order." },
    { "type": "delay", "days": 3 },
    { "type": "message", "text": "Still thinking? Here's a reminder and some testimonials!" }
  ],
  "suggestions": {
    "tag": "Win-back",
    "sendTime": "7 PM",
    "ctas": ["Claim Your Discount", "Still Thinking About It?"]
  }
}
Remember this is just example dont give same response or generic everytime though the structure/format should be same.
Now generate the campaign JSON for this user goal.
`;

    const result = await model.generateContent(userPrompt);
    const text =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse JSON from Gemini response
    let campaign;
    try {
      campaign = JSON.parse(text);
    } catch (e) {
      // extract JSON - if Gemini wrapped it in code blocks
      const match = text.match(/\{[\s\S]*\}/);
      if (match) campaign = JSON.parse(match[0]);
      else throw new Error("Failed to parse Gemini output as JSON");
    }

    res.json(campaign);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate campaign." });
  }
};
