import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

export async function findUserByEmailOrUsername(emailOrUsername: string) {
  try {
    const records = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, emailOrUsername.toLowerCase().trim()),
          eq(users.username, emailOrUsername.trim())
        )
      )
      .limit(1);

    return records[0] || null;
  } catch (error) {
    console.error('Error finding user by email or username:', error);
    throw error;
  }
}

export async function createNewUser(userData: {
  username: string;
  email: string;
  passwordHash: string;
  sixyCoinsBalance?: string;
  vipLevel?: string;
  referralCode?: string;
}) {
  try {
    const inserted = await db
      .insert(users)
      .values({
        username: userData.username.trim(),
        email: userData.email.toLowerCase().trim(),
        passwordHash: userData.passwordHash,
        sixyCoinsBalance: userData.sixyCoinsBalance || '10000.00',
        vipLevel: userData.vipLevel || 'BRONZE',
        referralCode: userData.referralCode || null,
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error('Error creating new user record:', error);
    throw error;
  }
}

export async function updateUserBalanceInDb(userId: string, newBalance: string) {
  try {
    const updated = await db
      .update(users)
      .set({
        sixyCoinsBalance: newBalance,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return updated[0] || null;
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
}
