import { getDb } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface LotteryTicketPurchase {
  userId: string;
  selectedNumbers: number[];
  ticketCost: number;
}

export async function processLotteryTicketInDb(purchase: LotteryTicketPurchase) {
  try {
    const database = getDb();
    const userRecord = await database.select().from(users).where(eq(users.id, purchase.userId)).limit(1);
    if (!userRecord[0]) {
      throw new Error('User not found');
    }

    const currentBalance = parseFloat(userRecord[0].sixyCoinsBalance);
    if (currentBalance < purchase.ticketCost) {
      throw new Error('Insufficient Sixy Coins balance');
    }

    const updatedBalance = (currentBalance - purchase.ticketCost).toFixed(2);

    const updatedUser = await database
      .update(users)
      .set({
        sixyCoinsBalance: updatedBalance,
        updatedAt: new Date(),
      })
      .where(eq(users.id, purchase.userId))
      .returning();

    return {
      success: true,
      ticketId: `TICK-649-${Date.now()}`,
      newBalance: updatedBalance,
      user: updatedUser[0],
    };
  } catch (error) {
    console.error('Error processing 6/49 lottery ticket in DB:', error);
    throw error;
  }
}
