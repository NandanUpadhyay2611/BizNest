import { redis } from '../services/redisService.js';
import Order from '../models/Order.js'
import connectDB from '../dbConnect.js';

await connectDB();
// console.log("COnnecting db consumer");

function isNumericKeyedObject(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    Object.keys(obj).every(k => !isNaN(Number(k)))
  );
}

function arrayObjectToObject(obj) {
  const out = {};
  const keys = Object.keys(obj).sort((a, b) => Number(a) - Number(b));
  for (let i = 0; i < keys.length; i += 2) {   //  even-numbered keys as field names and odd-numbered keys as values.
    const key = obj[keys[i]];
    const value = obj[keys[i + 1]];
    out[key] = value;
  }
  return out;
}

async function processOrders() {
  let lastId = '0-0';  // read from the beginning of the stream

  while (true) {
    try {
      const response = await redis.xRead(
        [{ key: 'orderStream', id: lastId }],
        { BLOCK: 5000, COUNT: 10 }
      );

      if (Array.isArray(response) && response.length > 0) {
        for (const streamData of response) {
          if (Array.isArray(streamData.messages)) {
            for (const msg of streamData.messages) {
              let orderData = msg.message;
              if (isNumericKeyedObject(orderData)) {
                orderData = arrayObjectToObject(orderData);
                console.log("Converted numeric-keyed object to normal object.");
              }
              console.log('Order data to save:', orderData);
              try {
                await Order.create(orderData);
                console.log(`Order saved: ${JSON.stringify(orderData)}`);
              } catch (err) {
                console.error('Error saving order to DB:', err);
              }
              lastId = msg.id;
            }
          }
        }
      }
    } catch (err) {
      console.error('Error reading from Redis Stream:', err);
      await new Promise(res => setTimeout(res, 1000));
    }
  }
}

processOrders();
