import express from "express";
import Campaign from "../models/Campaign.js";
import { verifyGoogleToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/",async (req, res) => {
    // Get all campaigns, most recent first
    const campaigns = await Campaign.find({})
      .sort({ createdAt: -1 })
      .populate("segmentId");
    res.json(campaigns);
  });

  export default router;