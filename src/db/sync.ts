import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function syncDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ DATABASE_URL is missing in .env.local!');
    process.exit(1);
  }

  console.log('🔄 Connecting to Supabase PostgreSQL...');
  const sql = postgres(connectionString, { prepare: false });

  try {
    console.log('🛠️ Synchronizing users table schema on Supabase...');

    // 1. Create table if not existing
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT,
        email TEXT,
        password_hash TEXT,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
      );
    `;

    // 2. Add any missing columns to guarantee matching Drizzle schema
    await sql`
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

    console.log('✅ Users table schema successfully updated in Supabase PostgreSQL!');
  } catch (err) {
    console.error('❌ Error updating database table:', err);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

syncDatabase();
