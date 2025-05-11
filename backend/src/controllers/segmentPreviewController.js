import buildMongoQueryFromRules from "../utils/mongoQueryBuilder.js";
import Customer from "../models/Customer.js";

// audience preview 

export const segmentPreviewController=async (req, res) => {
    const { rules } = req.body;
    const mongoQuery = buildMongoQueryFromRules(rules);  
    const count = await Customer.countDocuments(mongoQuery);
    res.json({ audienceSize: count });
  }