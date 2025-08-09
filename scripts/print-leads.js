// scripts/print-leads.js
import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config({ path: '.env.local' }); // <- make sure .env.local is loaded

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not found in .env.local or environment.');
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: 'require' }); // Neon requires SSL

async function run() {
  try {
    const rows = await sql`select * from leads order by created_at desc limit 10`;
    console.log('Latest leads:', rows);
  } catch (err) {
    console.error('Query error:', err);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

run();
