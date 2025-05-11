import express from 'express';
import { publishToStream } from '../services/redisService.js';
import axios from 'axios';
import { recieptHelper, vendorController } from '../controllers/vendorController.js';

const router = express.Router();

// POST /api/vendor/receipt
router.post('/receipt',recieptHelper);

// POST /api/vendor/send
router.post('/send',vendorController);

export default router;
