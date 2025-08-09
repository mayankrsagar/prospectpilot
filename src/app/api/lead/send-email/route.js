import { NextResponse } from 'next/server';

import { sendEmail } from '@/utils/mailer';

export async function POST(request) {
  const { to, subject, body } = await request.json();
  try {
    await sendEmail({ to, subject, text: body });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email send error', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}