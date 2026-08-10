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

// Auto-Sync Database Tables on Server Start
if (client) {
  client`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      avatar_url TEXT,
      sixy_coins_balance NUMERIC(18, 2) NOT NULL DEFAULT 10000.00,
      vip_level TEXT NOT NULL DEFAULT 'BRONZE',
      referral_code TEXT UNIQUE,
      referred_by TEXT,
      is_verified BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    );
  `.then(() => {
    console.log('✅ Supabase PostgreSQL: Users table synced successfully.');
  }).catch((err) => {
    console.error('⚠️ DB Auto-Sync Notice:', err.message);
  });
}
