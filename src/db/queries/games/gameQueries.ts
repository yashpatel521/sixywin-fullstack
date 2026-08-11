import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface BetResult {
  gameId: string;
  wagerAmount: number;
  multiplier: number;
  payout: number;
  isWin: boolean;
}

export async function processGameBetInDb(userId: string, bet: BetResult) {
  try {
    const userRecord = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!userRecord[0]) {
      throw new Error('User not found');
    }

    const currentBalance = parseFloat(userRecord[0].sixyCoinsBalance);
    const netChange = bet.isWin ? bet.payout - bet.wagerAmount : -bet.wagerAmount;
    const updatedBalance = Math.max(0, currentBalance + netChange).toFixed(2);

    const updatedUser = await db
      .update(users)
      .set({
        sixyCoinsBalance: updatedBalance,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return {
      success: true,
      newBalance: updatedBalance,
      user: updatedUser[0],
    };
  } catch (error) {
    console.error('Error processing game bet in DB:', error);
    throw error;
  }
}
