import dotenv from 'dotenv';

dotenv.config();

import { createClient } from 'redis';
const redis = createClient({
  url : process.env.REDIS_URL
});

redis.connect();

// Publishes a data object to a Redis Stream 
  const publishToStream = async (stream, data) => { // takes a stream name and a data object

     // Convert all values to strings to satisfy Redis requirement
    const entries = Object.entries(data).flatMap(([k, v]) => [k, v == null ? '' : String(v)]);

    await redis.xAdd(stream, '*', entries);
  };

  export { redis, publishToStream };

  
