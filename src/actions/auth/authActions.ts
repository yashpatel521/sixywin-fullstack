'use server';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { findUserByEmailOrUsername, createNewUser } from '@/db/queries/auth/userQueries';

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

export async function registerUserAction(input: RegisterInput) {
  try {
    const existing = await findUserByEmailOrUsername(input.email);
    if (existing) {
      return { success: false, error: 'User with this email or username already exists.' };
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const initialBalance = input.referralCode ? '15000.00' : '10000.00';

    const user = await createNewUser({
      username: input.username,
      email: input.email,
      passwordHash,
      sixyCoinsBalance: initialBalance,
      vipLevel: 'BRONZE',
      referralCode: input.referralCode,
    });

    const cookieStore = await cookies();
    cookieStore.set('sixywin_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return {
      success: true,
      message: 'Account created successfully! Claimed 10,000 SC Welcome Bonus.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        sixyCoinsBalance: user.sixyCoinsBalance,
        vipLevel: user.vipLevel,
      },
    };
  } catch (error: any) {
    console.error('Error in registerUserAction:', error);
    return { success: false, error: 'Registration failed due to a server error.' };
  }
}

export async function loginUserAction(input: LoginInput) {
  try {
    const user = await findUserByEmailOrUsername(input.email);

    if (!user || !user.passwordHash) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const isMatch = await bcrypt.compare(input.password, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const cookieStore = await cookies();
    const maxAge = input.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    cookieStore.set('sixywin_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      path: '/',
    });

    return {
      success: true,
      message: `Welcome back, @${user.username}!`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        sixyCoinsBalance: user.sixyCoinsBalance,
        vipLevel: user.vipLevel,
      },
    };
  } catch (error: any) {
    console.error('Error in loginUserAction:', error);
    return { success: false, error: 'Login failed due to a server error.' };
  }
}

export async function quickLoginAction(
  email: string,
  username: string,
  scBalance: string,
  vipLevel: string
) {
  try {
    let user = await findUserByEmailOrUsername(email);

    if (!user) {
      const dummyPassword = await bcrypt.hash('quicklogin123', 10);
      user = await createNewUser({
        username,
        email,
        passwordHash: dummyPassword,
        sixyCoinsBalance: scBalance || '10000.00',
        vipLevel: vipLevel || 'BRONZE',
      });
    }

    const cookieStore = await cookies();
    cookieStore.set('sixywin_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return {
      success: true,
      message: `Quick sign in successful! Active as @${user.username}`,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        sixyCoinsBalance: user.sixyCoinsBalance,
        vipLevel: user.vipLevel,
      },
    };
  } catch (error: any) {
    console.error('Error in quickLoginAction:', error);
    return { success: false, error: 'Quick login failed.' };
  }
}
