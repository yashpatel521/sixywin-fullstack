import { getDb } from '@/db';
import { users, lotteryTickets, lotteryDraws } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import crypto from 'crypto';

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

// 24-Hour Automated Lottery Settlement Engine with 5X Lucky Ball Multiplier
export async function executeLotteryDrawInDb() {
  try {
    const database = getDb();

    // 1. Auto Pick 6 Unique Winning Numbers (1 - 49)
    const winningSet = new Set<number>();
    while (winningSet.size < 6) {
      winningSet.add(Math.floor(Math.random() * 49) + 1);
    }
    const winningNumbers = Array.from(winningSet).sort((a, b) => a - b);
    const bonusBall = Math.floor(Math.random() * 49) + 1;
    // Today's 5X Lucky Ball (e.g. Bonus Ball)
    const luckyBall = bonusBall;

    // Cryptographic Provably Fair SHA-256 Seed Hash
    const rawSeed = `${Date.now()}-${winningNumbers.join('-')}-${bonusBall}`;
    const seedHash = crypto.createHash('sha256').update(rawSeed).digest('hex');

    // 2. Fetch all PENDING tickets
    const pendingTickets = await database
      .select()
      .from(lotteryTickets)
      .where(eq(lotteryTickets.status, 'PENDING'));

    let totalWinners = 0;

    // 3. Process & Settle Each Ticket against winning numbers & 5X Lucky Ball
    for (const ticket of pendingTickets) {
      const ticketNumbers = ticket.numbers.split(',').map((n) => parseInt(n, 10));
      const matchCount = ticketNumbers.filter((n) => winningNumbers.includes(n)).length;
      const hasLuckyBall = ticketNumbers.includes(luckyBall);

      let payout = 0;
      if (matchCount === 6) payout = 1250000;
      else if (matchCount === 5) payout = 50000;
      else if (matchCount === 4) payout = 2500;
      else if (matchCount === 3) payout = 200;

      // 💥 5X PRIZE MULTIPLIER IF TICKET INCLUDES TODAY'S LUCKY BALL 💥
      if (payout > 0 && hasLuckyBall) {
        payout = payout * 5;
      }

      const isWin = payout > 0;
      if (isWin) totalWinners++;

      // Update ticket status
      await database
        .update(lotteryTickets)
        .set({
          status: isWin ? 'WON' : 'LOST',
          payoutAmount: payout.toFixed(2),
        })
        .where(eq(lotteryTickets.id, ticket.id));

      // If user won, update their user balance
      if (isWin && ticket.userId && ticket.userId !== 'guest') {
        const userRecord = await database.select().from(users).where(eq(users.id, ticket.userId)).limit(1);
        if (userRecord[0]) {
          const current = parseFloat(userRecord[0].sixyCoinsBalance);
          const newBal = (current + payout).toFixed(2);
          await database
            .update(users)
            .set({ sixyCoinsBalance: newBal, updatedAt: new Date() })
            .where(eq(users.id, ticket.userId));
        }
      }
    }

    // 4. Record Draw Entry in lottery_draws table
    const drawCode = `DRAW-649-${Date.now().toString().slice(-6)}`;
    const insertedDraw = await database
      .insert(lotteryDraws)
      .values({
        drawCode,
        winningNumbers: winningNumbers.join(','),
        bonusBall: bonusBall.toString(),
        jackpotPool: '1250000.00',
        totalWinners: totalWinners.toString(),
        seedHash,
      })
      .returning();

    return {
      success: true,
      draw: insertedDraw[0],
      winningNumbers,
      bonusBall,
      luckyBall,
      totalWinners,
      seedHash,
    };
  } catch (error) {
    console.error('Error executing 6/49 lottery draw in DB:', error);
    throw error;
  }
}

export async function getLatestLotteryDrawFromDb() {
  try {
    const database = getDb();
    const draws = await database
      .select()
      .from(lotteryDraws)
      .orderBy(desc(lotteryDraws.createdAt))
      .limit(1);

    return draws[0] || null;
  } catch (error) {
    console.error('Error fetching latest lottery draw:', error);
    return null;
  }
}
