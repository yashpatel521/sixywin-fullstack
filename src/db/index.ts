import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';
import path from 'path';

// Ensure .env.local is loaded
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const connectionString = process.env.DATABASE_URL;

export const client = connectionString
  ? postgres(connectionString, { prepare: false })
  : null;

export const db = client ? drizzle(client, { schema }) : null;

export function getDb() {
  if (!db) {
    throw new Error('Database connection is not initialized. Please check DATABASE_URL in .env.local.');
  }
  return db;
}

// Auto-Sync Database Tables on Server Start
if (client) {
  client`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT,
      email TEXT,
      password_hash TEXT,
      created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
    );
  `.then(() => {
    return client`
      CREATE TABLE IF NOT EXISTS lottery_tickets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        ticket_code TEXT NOT NULL,
        numbers TEXT NOT NULL,
        cost NUMERIC(18, 2) DEFAULT 200.00,
        status TEXT DEFAULT 'PENDING',
        payout_amount NUMERIC(18, 2) DEFAULT 0.00,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      );
    `;
  }).then(() => {
    return client`
      CREATE TABLE IF NOT EXISTS lottery_draws (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        draw_code TEXT NOT NULL UNIQUE,
        winning_numbers TEXT NOT NULL,
        bonus_ball TEXT NOT NULL,
        jackpot_pool NUMERIC(18, 2) DEFAULT 1250000.00,
        total_winners TEXT DEFAULT '0',
        seed_hash TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      );
    `;
  }).then(() => {
    return client`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      );
    `;
  }).then(() => {
    return client`
      ALTER TABLE lottery_tickets 
        ADD COLUMN IF NOT EXISTS payout_amount NUMERIC(18, 2) DEFAULT 0.00;
    `;
  }).then(() => {
    return client`
      ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS username TEXT,
        ADD COLUMN IF NOT EXISTS email TEXT,
        ADD COLUMN IF NOT EXISTS password_hash TEXT,
        ADD COLUMN IF NOT EXISTS avatar_url TEXT,
        ADD COLUMN IF NOT EXISTS sixy_coins_balance NUMERIC(18, 2) DEFAULT 10000.00,
        ADD COLUMN IF NOT EXISTS vip_level TEXT DEFAULT 'BRONZE',
        ADD COLUMN IF NOT EXISTS referral_code TEXT,
        ADD COLUMN IF NOT EXISTS referred_by TEXT,
        ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();
    `;
  }).then(() => {
    console.log('✅ Supabase PostgreSQL: Database tables & columns synced successfully.');
  }).catch((err) => {
    console.error('⚠️ DB Auto-Sync Notice:', err.message);
  });
}
