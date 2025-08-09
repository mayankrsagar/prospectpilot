// scripts/test-upstash.js
import dotenv from 'dotenv';

import { Redis } from '@upstash/redis';

dotenv.config({ path: '.env.local' });

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error('UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN missing in .env.local');
  process.exit(1);
}

const redis = new Redis({ url, token });

async function run() {
  try {
    await redis.set('test_key', 'hello');
    const v = await redis.get('test_key');
    console.log('Upstash OK, got:', v);
    process.exit(0);
  } catch (err) {
    console.error('Upstash test error:', err);
    process.exit(1);
  }
}

run();
