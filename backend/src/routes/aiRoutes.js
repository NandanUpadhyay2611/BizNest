import express from "express";
import { generateCampaignController } from "../controllers/generateCampaignController.js";

const router = express.Router();

// /api/ai
router.post("/generate-campaign",generateCampaignController );

export default router;
