// src/lib/queue/index.js
import { Queue } from 'bullmq';

export const leadQueue = new Queue('lead-generation', { connection: { url: process.env.REDIS_URL } });
