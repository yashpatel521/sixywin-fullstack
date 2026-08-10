'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import crypto from 'crypto';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  referralCode?: string;
}

// Helper to hash password securely
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'sixywin_salt_2026').digest('hex');
}

export async function registerUserAction(input: RegisterInput) {
  try {
    const { username, email, password, referralCode } = input;

    // 1. Basic validation
    if (!username || !email || !password) {
      return { success: false, error: 'Username, email, and password are required.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (!db) {
      return { success: false, error: 'Database connection is not initialized. Please check DATABASE_URL.' };
    }

    // 2. Check if user already exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(or(eq(users.username, username.trim()), eq(users.email, email.trim().toLowerCase())));

    if (existingUsers.length > 0) {
      const existing = existingUsers[0];
      if (existing.email.toLowerCase() === email.trim().toLowerCase()) {
        return { success: false, error: 'An account with this email address already exists.' };
      }
      if (existing.username.toLowerCase() === username.trim().toLowerCase()) {
        return { success: false, error: 'This username is already taken. Please choose another.' };
      }
    }

    // 3. Hash password & generate referral code
    const passwordHash = hashPassword(password);
    const userReferralCode = `SIX_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // 4. Insert user into Supabase database
    const insertedUsers = await db
      .insert(users)
      .values({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        referralCode: userReferralCode,
        referredBy: referralCode ? referralCode.trim() : null,
        sixyCoinsBalance: '10000.00', // 10,000 SC Welcome Bonus
        vipLevel: 'BRONZE',
        isVerified: true,
      })
      .returning();

    const newUser = insertedUsers[0];

    return {
      success: true,
      message: `Account created successfully! 10,000 Sixy Coins (SC) welcome bonus credited.`,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        sixyCoinsBalance: newUser.sixyCoinsBalance,
        vipLevel: newUser.vipLevel,
        referralCode: newUser.referralCode,
      },
    };
  } catch (err: any) {
    console.error('Error in registerUserAction:', err);
    return { success: false, error: err.message || 'An unexpected error occurred during registration.' };
  }
}
