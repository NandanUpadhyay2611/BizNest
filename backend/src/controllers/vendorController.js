import { publishToStream } from '../services/redisService.js';
import axios from 'axios';

export const vendorController= async (req, res) => {
  const { logId, customer, campaign } = req.body;

  // Simulate delivery: 90% SENT, 10% FAILED
  const isSent = Math.random() < 0.9;
  const status = isSent ? 'SENT' : 'FAILED';

  // Simulate network delay (1-3 seconds)
  setTimeout(async () => {
    try {
      // Call your Delivery Receipt API (which queues the update in Redis)
      await axios.post('http://localhost:3000/api/vendor/receipt', {
        logId,
        status
      });
    } catch (err) {
      console.error('Error calling Delivery Receipt API:', err.message);
    }
  }, 1000 + Math.random() * 2000);

  // Respond immediately to the campaign delivery system
  res.json({ status: 'PROCESSING', logId });
}

export const recieptHelper=async (req, res) => {
  const { logId, status } = req.body;
  // Instead of updating DB directly, publish to Redis Stream for batch processing
  await publishToStream('deliveryReceiptStream', { logId, status });
  res.json({ queued: true });
}