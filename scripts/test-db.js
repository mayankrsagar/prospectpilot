// scripts/test-db.js
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config({ path: '.env.local' });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not found in .env.local');
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: 'require' });
const db = drizzle(sql);

async function run() {
  try {
    const res = await sql`select now() as now`;
    console.log('Postgres OK:', res);
    await sql.end();
    process.exit(0);
  } catch (err) {
    console.error('DB test error:', err);
    process.exit(1);
  }
}

run();
