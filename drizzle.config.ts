import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres.rmbtipddvxamduhljkux:sixywin5211@aws-0-us-east-2.pooler.supabase.com:6543/postgres',
  },
});
