import { getDb } from '@/db';
import { users, lotteryTickets } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export interface LotteryTicketPurchase {
  userId: string;
  selectedNumbers: number[];
  ticketCost: number;
}

export async function processLotteryTicketInDb(purchase: LotteryTicketPurchase) {
  try {
    const database = getDb();

    // Deduct SC balance if valid user record exists
    let updatedBalance = '10000.00';
    if (purchase.userId && purchase.userId !== 'guest-session') {
      const userRecord = await database.select().from(users).where(eq(users.id, purchase.userId)).limit(1);
      if (userRecord[0]) {
        const currentBalance = parseFloat(userRecord[0].sixyCoinsBalance);
        if (currentBalance < purchase.ticketCost) {
          throw new Error('Insufficient Sixy Coins balance');
        }
        updatedBalance = (currentBalance - purchase.ticketCost).toFixed(2);
        await database
          .update(users)
          .set({
            sixyCoinsBalance: updatedBalance,
            updatedAt: new Date(),
          })
          .where(eq(users.id, purchase.userId));
      }
    }

    // Generate real ticket code & insert record into lottery_tickets DB table
    const ticketCode = `TICK-649-${Date.now().toString().slice(-6)}`;
    const numbersString = purchase.selectedNumbers.join(',');

    const inserted = await database
      .insert(lotteryTickets)
      .values({
        userId: purchase.userId || 'guest',
        ticketCode,
        numbers: numbersString,
        cost: purchase.ticketCost.toFixed(2),
        status: 'PENDING',
      })
      .returning();

    return {
      success: true,
      ticket: inserted[0],
      ticketCode,
      newBalance: updatedBalance,
    };
  } catch (error) {
    console.error('Error processing 6/49 lottery ticket in DB:', error);
    throw error;
  }
}

export async function getUserLotteryTicketsFromDb(userId: string) {
  try {
    const database = getDb();
    const records = await database
      .select()
      .from(lotteryTickets)
      .where(eq(lotteryTickets.userId, userId))
      .orderBy(desc(lotteryTickets.createdAt))
      .limit(20);

    return records;
  } catch (error) {
    console.error('Error fetching user lottery tickets from DB:', error);
    return [];
  }
}
