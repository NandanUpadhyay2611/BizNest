import express from 'express';
import Customer from '../models/Customer.js';
import { segmentPreviewController } from '../controllers/segmentPreviewController.js';
import { saveCampaignController } from '../controllers/saveCampaignController.js';
import { verifyGoogleToken } from '../middlewares/auth.js';

const router = express.Router();

// /api/segments/

router.post('/',saveCampaignController);
router.post('/preview',segmentPreviewController);

export default router;
