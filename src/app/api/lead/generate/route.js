import { NextResponse } from 'next/server';

// src/app/api/lead/generate/route.js
import { db } from '@/lib/db';
import { business_inputs } from '@/lib/db/schema';
import { leadQueue } from '@/lib/queue';

// import { db } from '@/db/index.js';
// import { business_inputs } from '@/db/schema.js';
// import { leadQueue } from '@/lib/queue/index.js';

export async function POST(request) {
  try {
    const { name, keywords, location } = await request.json();

    const [{ insertId: inputId }] = await db
      .insert(business_inputs)
      .values({ name, keywords, location })
      .returning('id');

    await leadQueue.add('lead-generation', { inputId, name, keywords, location });

    return NextResponse.json({ success: true, inputId });
  } catch (err) {
    console.error('[generate] ERROR:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
