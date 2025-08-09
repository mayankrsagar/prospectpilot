// scripts/create-tables.js
import 'dotenv/config';

import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL missing in .env.local');
  process.exit(1);
}

const sql = postgres(DATABASE_URL, { ssl: 'require' });

const createSQL = `
CREATE TABLE IF NOT EXISTS business_inputs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  keywords TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  business_input_id INTEGER REFERENCES business_inputs(id),
  prospect_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_analysis (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id),
  summary TEXT,
  score VARCHAR(50),
  analyzed_at TIMESTAMP DEFAULT now()
);
`;

async function run() {
  try {
    console.log('Creating tables...');
    await sql.begin(async (tx) => {
      await tx.unsafe(createSQL);
    });
    console.log('Tables created (or already existed).');

    // optional: show counts
    const counts = await sql`
      SELECT
        (SELECT count(*) FROM business_inputs) AS business_inputs,
        (SELECT count(*) FROM leads) AS leads,
        (SELECT count(*) FROM lead_analysis) AS lead_analysis;
    `;
    console.log('Row counts:', counts);
  } catch (err) {
    console.error('Create tables error:', err);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

run();
