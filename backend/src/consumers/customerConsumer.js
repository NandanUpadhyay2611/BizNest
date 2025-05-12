import { redis } from '../services/redisService.js';
import Customer from '../models/Customer.js';
import connectDB from '../dbConnect.js';

await connectDB();

// Helper fn: Detect if object has only numeric keys (Redis Streams array format)
function isNumericKeyedObject(obj) {
  return (
    obj &&
    typeof obj === 'object' &&
    Object.keys(obj).every(k => !isNaN(Number(k)))
  );
}

// Convert numeric-keyed object to normal { field: value } object
function arrayObjectToObject(obj) {
  const out = {};
  const keys = Object.keys(obj).sort((a, b) => Number(a) - Number(b));
  for (let i = 0; i < keys.length; i += 2) {
    const key = obj[keys[i]];
    const value = obj[keys[i + 1]];
    out[key] = value;
  }
  return out;
}

export async function processCustomers() {
   let lastId = await redis.get("consumer:lastid") || "0-0";

  
    try {
      const response = await redis.xRead(
        [{ key: 'customerStream', id: lastId }],
        { BLOCK: 5000, COUNT: 10 }
      );

      if (Array.isArray(response) && response.length > 0) {
        for (const streamData of response) {
          if (Array.isArray(streamData.messages)) {
            for (const msg of streamData.messages) {
              let customerData = msg.message;
              if (isNumericKeyedObject(customerData)) {
                customerData = arrayObjectToObject(customerData);
              }
          
              try {
                await Customer.create(customerData);
                console.log(`Customer saved: ${JSON.stringify(customerData)}`);
              } catch (err) {
                console.error('Error saving customer to DB:', err);
              }
              lastId = msg.id;
            }
          }
        }
           await redis.set("consumer:lastid", lastId);
      }
    } catch (err) {
      console.error('Error reading from Redis Stream:', err);
      await new Promise(res => setTimeout(res, 1000));
    }
}



// processCustomers();

