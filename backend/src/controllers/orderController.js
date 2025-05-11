 
import { publishToStream } from '../services/redisService.js';
 
 export const orderController=async (req, res) => {
  const { customerId, amount, date } = req.body;

  // Basic validation
  if (!customerId || !amount || !date) {
    return res.status(400).json({ message: 'customerId, amount, and date are required.' });
  }

  
  try {
    await publishToStream('orderStream', { customerId, amount, date }); // Publish to Redis Stream
        await tasks.trigger("orderStream", {});
    res.status(202).json({ message: 'Order received and queued for processing.' });  // Responds immediately; actual DB save happens asynchronously.
  } catch (err) {
    console.error('Error publishing to Redis Stream:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
}