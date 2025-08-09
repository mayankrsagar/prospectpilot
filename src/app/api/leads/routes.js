import { NextResponse } from 'next/server';

import { db } from '@/db';
import { leads } from '@/db/schema';

export async function GET() {
  const allLeads = await db.select().from(leads);
  return NextResponse.json(allLeads);
}

export async function POST(request) {
  const data = await request.json();
  const newLead = await db.insert(leads).values(data).returning('*');
  return NextResponse.json(newLead);
}