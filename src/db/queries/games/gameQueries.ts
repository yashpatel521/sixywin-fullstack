import { getDb } from '@/db';
import { users, lotteryTickets } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export interface BetResult {
  gameId: string;
  wagerAmount: number;
  multiplier: number;
  payout: number;
  isWin: boolean;
}

export async function processGameBetInDb(userId: string, bet: BetResult) {
  try {
    const database = getDb();
    const userRecord = await database.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!userRecord[0]) {
      throw new Error('User not found');
    }

    const currentBalance = parseFloat(userRecord[0].sixyCoinsBalance);
    const netChange = bet.isWin ? bet.payout - bet.wagerAmount : -bet.wagerAmount;
    const updatedBalance = Math.max(0, currentBalance + netChange).toFixed(2);

    const updatedUser = await database
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

export async function getLeaderboardFromDb() {
  try {
    const database = getDb();
    
    // Top users by Sixy Coins Balance
    const topUsers = await database
      .select({
        username: users.username,
        balance: users.sixyCoinsBalance,
        vipLevel: users.vipLevel,
      })
      .from(users)
      .orderBy(desc(sql`CAST(${users.sixyCoinsBalance} AS NUMERIC)`))
      .limit(5);

    // Top winning lottery tickets
    const topTickets = await database
      .select({
        ticketCode: lotteryTickets.ticketCode,
        payoutAmount: lotteryTickets.payoutAmount,
        userId: lotteryTickets.userId,
      })
      .from(lotteryTickets)
      .orderBy(desc(sql`CAST(${lotteryTickets.payoutAmount} AS NUMERIC)`))
      .limit(5);

    return {
      topUsers,
      topTickets,
    };
  } catch (error) {
    console.error('Error fetching leaderboard from DB:', error);
    return { topUsers: [], topTickets: [] };
  }
}
