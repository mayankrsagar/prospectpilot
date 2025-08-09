import { Worker } from 'bullmq';
// src/lib/queue/workers.js
import dotenv from 'dotenv';

import { db } from '../db/index.js';
import {
  lead_analysis,
  leads,
} from '../db/schema.js';

dotenv.config({ path: '.env.local', override: true }); // explicitly load .env.local

const REDIS_URL = process.env.REDIS_URL || null;
const connection = { url: REDIS_URL };

console.log('Workers starting — Redis URL loaded?', !!REDIS_URL);

new Worker('lead-generation', async (job) => {
  console.log('[worker] processing lead-generation', job.id, job.data);
  const { inputId, name, keywords, location } = job.data;

  const mockProspects = [
    { prospect_name: 'Alice', email: 'alice@example.com', phone: '1234567890' },
  ];

  for (const p of mockProspects) {
    const res = await db
      .insert(leads)
      .values({ business_input_id: inputId, ...p })
      .returning('id');

    const leadId = res?.[0]?.insertId ?? (res?.[0]?.id ?? null);
    console.log('[worker] inserted lead id:', leadId);

    if (leadId) {
      await job.queue.add('lead-analysis', { leadId });
    }
  }
}, { connection });

new Worker('lead-analysis', async (job) => {
  console.log('[worker] processing lead-analysis', job.id, job.data);
  const { leadId } = job.data;
  const summary = `Mock summary for lead ${leadId}`;
  await db.insert(lead_analysis).values({ lead_id: leadId, summary, score: 'A+' });
}, { connection });

console.log('Workers started — listening for jobs: lead-generation, lead-analysis');
