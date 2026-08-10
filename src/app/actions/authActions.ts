'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import crypto from 'crypto';
import { cookies } from 'next/headers';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  referralCode?: string;
}

interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Helper to hash password securely
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'sixywin_salt_2026').digest('hex');
}

// 1. REGISTER USER ACTION
export async function registerUserAction(input: RegisterInput) {
  try {
    const { username, email, password, referralCode } = input;

    if (!username || !email || !password) {
      return { success: false, error: 'Username, email, and password are required.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (!db) {
      return { success: false, error: 'Database connection is not initialized. Please check DATABASE_URL.' };
    }

    // Check existing user
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

    const passwordHash = hashPassword(password);
    const userReferralCode = `SIX_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const insertedUsers = await db
      .insert(users)
      .values({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        referralCode: userReferralCode,
        referredBy: referralCode ? referralCode.trim() : null,
        sixyCoinsBalance: '10000.00',
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

// 2. LOGIN USER ACTION
export async function loginUserAction(input: LoginInput) {
  try {
    const { email, password, rememberMe } = input;

    if (!email || !password) {
      return { success: false, error: 'Please provide both email/username and password.' };
    }

    if (!db) {
      return { success: false, error: 'Database connection is not initialized.' };
    }

    const inputLower = email.trim().toLowerCase();

    // Query user by email or username
    const foundUsers = await db
      .select()
      .from(users)
      .where(or(eq(users.email, inputLower), eq(users.username, email.trim())));

    if (foundUsers.length === 0) {
      return { success: false, error: 'Invalid credentials. User not found.' };
    }

    const user = foundUsers[0];
    const passwordHash = hashPassword(password);

    if (user.passwordHash !== passwordHash) {
      return { success: false, error: 'Invalid credentials. Password incorrect.' };
    }

    // Handle Session Cookies & Keep Me Signed In (Remember Me)
    const cookieStore = await cookies();
    const sessionToken = Buffer.from(JSON.stringify({ id: user.id, email: user.email, time: Date.now() })).toString('base64');
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

    cookieStore.set('sixywin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    });

    return {
      success: true,
      message: `Welcome back, ${user.username}!`,
      rememberMe: !!rememberMe,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        sixyCoinsBalance: user.sixyCoinsBalance,
        vipLevel: user.vipLevel,
      },
    };
  } catch (err: any) {
    console.error('Error in loginUserAction:', err);
    return { success: false, error: err.message || 'An unexpected error occurred during login.' };
  }
}

// 3. QUICK 1-CLICK PROFILE LOGIN ACTION
export async function quickLoginAction(profileEmail: string, username: string, scBalance: string, vipLevel: string) {
  try {
    if (!db) {
      return { success: false, error: 'Database connection is not initialized.' };
    }

    const emailLower = profileEmail.toLowerCase();
    let user;

    const existing = await db.select().from(users).where(eq(users.email, emailLower));

    if (existing.length === 0) {
      // Auto seed profile if not exists
      const inserted = await db
        .insert(users)
        .values({
          username,
          email: emailLower,
          passwordHash: hashPassword('password123'),
          sixyCoinsBalance: scBalance,
          vipLevel,
          referralCode: `SIX_${username.toUpperCase()}`,
          isVerified: true,
        })
        .returning();
      user = inserted[0];
    } else {
      user = existing[0];
    }

    // Set 30-day session cookie
    const cookieStore = await cookies();
    const sessionToken = Buffer.from(JSON.stringify({ id: user.id, email: user.email, time: Date.now() })).toString('base64');
    
    cookieStore.set('sixywin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    return {
      success: true,
      message: `Quick Sign-In Successful! Logged in as ${user.username}`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        sixyCoinsBalance: user.sixyCoinsBalance,
        vipLevel: user.vipLevel,
      },
    };
  } catch (err: any) {
    console.error('Error in quickLoginAction:', err);
    return { success: false, error: err.message || 'Quick login failed.' };
  }
}
