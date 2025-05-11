import express from "express";
import { saveCampaignController } from "../controllers/saveCampaignController.js";

const router = express.Router();


router.post("/generate-campaign",saveCampaignController );

export default router;
