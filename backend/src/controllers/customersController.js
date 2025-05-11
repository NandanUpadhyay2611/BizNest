import { publishToStream } from '../services/redisService.js';
import { tasks } from '@trigger.dev/sdk/v3';

export const customerController= async (req, res) => {
  const { name, email, spend, visits, lastActive } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ message: 'name and email are required.' });
  }

  // Publish to Redis Stream for async DB save
  try {
    await publishToStream('customerStream', { name, email, spend, visits, lastActive });
     await tasks.trigger("customerStream", {});
    res.status(202).json({ message: 'Customer data received and queued for processing.' });

  } catch (err) {
    console.error('Error publishing to Redis Stream:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}