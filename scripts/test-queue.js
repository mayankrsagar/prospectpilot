// scripts/test-queue.js
import 'dotenv/config';

import { Queue } from 'bullmq';

const connection = { url: process.env.REDIS_URL };
const leadQueue = new Queue('lead-generation', { connection });

async function run() {
  const job = await leadQueue.add('lead-generation', {
    inputId: 12345,
    name: 'TestCo',
    keywords: 'plumbing,repair',
    location: 'Mumbai',
  });
  console.log('Enqueued job id', job.id);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });