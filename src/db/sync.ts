import postgres from 'postgres';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local explicitly
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
    console.log('🛠️ Creating/Updating users table in Supabase...');

    await sql`
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
    `;

    console.log('✅ Users table successfully created/updated in Supabase!');
  } catch (err) {
    console.error('❌ Error updating database table:', err);
  } finally {
    await sql.end();
    process.exit(0);
  }
}

syncDatabase();
