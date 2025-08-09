import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const business_inputs = pgTable('business_inputs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  keywords: text('keywords').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// export const leads = pgTable('leads', {
//   id: serial('id').primaryKey(),
//   business_input_id: serial('business_input_id').references(() => business_inputs.id),
//   prospect_name: varchar('prospect_name', { length: 255 }),
//   email: varchar('email', { length: 255 }),
//   phone: varchar('phone', { length: 50 }),
//   created_at: timestamp('created_at').defaultNow(),
// });

// export const lead_analysis = pgTable('lead_analysis', {
//   id: serial('id').primaryKey(),
//   lead_id: serial('lead_id').references(() => leads.id),
//   summary: text('summary'),
//   score: varchar('score', { length: 50 }),
//   analyzed_at: timestamp('analyzed_at').defaultNow(),
// });

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  business_input_id: integer('business_input_id').references(() => business_inputs.id),
  prospect_name: varchar('prospect_name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const lead_analysis = pgTable('lead_analysis', {
  id: serial('id').primaryKey(),
  lead_id: integer('lead_id').references(() => leads.id),
  summary: text('summary'),
  score: varchar('score', { length: 50 }),
  analyzed_at: timestamp('analyzed_at').defaultNow(),
});



