'use server';

import { SpinResult } from '@/types/game';
import { db } from '@/db';
import { gameTransactions, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Server Action for spinning the Fortune Wheel.
 * Evaluates outcome server-side, validates bet, logs to DB via Drizzle ORM if connected.
 */
export async function spinFortuneWheelAction(
  betAmount: number,
  currentBalance: number
): Promise<SpinResult> {
  // Artificial latency simulation for realistic server roundtrip
  await new Promise((res) => setTimeout(res, 800));

  if (betAmount <= 0) {
    return {
      success: false,
      gameId: 'fortune-wheel',
      betAmount,
      multiplier: 0,
      payout: 0,
      newBalance: currentBalance,
      message: 'Invalid bet amount',
    };
  }

  if (currentBalance < betAmount) {
    return {
      success: false,
      gameId: 'fortune-wheel',
      betAmount,
      multiplier: 0,
      payout: 0,
      newBalance: currentBalance,
      message: 'Insufficient balance',
    };
  }

  // Wheel Segments and Multipliers
  const multipliers = [0, 1.5, 2, 0.5, 5, 0, 10, 1.2, 25, 0.5, 2, 50];
  const randomIndex = Math.floor(Math.random() * multipliers.length);
  const multiplier = multipliers[randomIndex];
  const payout = Math.round(betAmount * multiplier);
  const newBalance = currentBalance - betAmount + payout;

  // Log to Supabase via Drizzle ORM if DB is configured
  if (db) {
    try {
      await db.insert(gameTransactions).values({
        gameId: 'fortune-wheel',
        betAmount,
        payoutAmount: payout,
        multiplier: multiplier.toString(),
      });
    } catch (err) {
      console.warn('Drizzle DB insert skipped:', err);
    }
  }

  const message =
    multiplier > 1
      ? `🎉 Big Win! You hit ${multiplier}x and won ${payout} chips!`
      : multiplier === 1
      ? 'Returned your bet!'
      : multiplier > 0
      ? `Got ${multiplier}x (${payout} chips)!`
      : 'Better luck next spin!';

  return {
    success: true,
    gameId: 'fortune-wheel',
    betAmount,
    multiplier,
    payout,
    newBalance,
    details: { segmentIndex: randomIndex },
    message,
  };
}

/**
 * Server Action for Cyber Slot Machine.
 */
export async function playSlotMachineAction(
  betAmount: number,
  currentBalance: number
): Promise<SpinResult & { reels: [number, number, number] }> {
  await new Promise((res) => setTimeout(res, 900));

  if (currentBalance < betAmount) {
    return {
      success: false,
      gameId: 'slot-machine',
      betAmount,
      multiplier: 0,
      payout: 0,
      newBalance: currentBalance,
      reels: [0, 1, 2],
      message: 'Insufficient balance',
    };
  }

  const symbols = [0, 1, 2, 3, 4, 5]; // 777, Diamond, Cherry, Bell, Star, Lemon
  const r1 = symbols[Math.floor(Math.random() * symbols.length)];
  const r2 = symbols[Math.floor(Math.random() * symbols.length)];
  const r3 = symbols[Math.floor(Math.random() * symbols.length)];

  let multiplier = 0;
  if (r1 === r2 && r2 === r3) {
    if (r1 === 0) multiplier = 100; // Triple 777 Jackpot!
    else if (r1 === 1) multiplier = 50; // Diamonds
    else multiplier = 20;
  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    multiplier = 2.5; // Pair match
  }

  const payout = Math.round(betAmount * multiplier);
  const newBalance = currentBalance - betAmount + payout;

  if (db) {
    try {
      await db.insert(gameTransactions).values({
        gameId: 'slot-machine',
        betAmount,
        payoutAmount: payout,
        multiplier: multiplier.toString(),
      });
    } catch (err) {
      console.warn('Drizzle DB insert skipped:', err);
    }
  }

  return {
    success: true,
    gameId: 'slot-machine',
    betAmount,
    multiplier,
    payout,
    newBalance,
    reels: [r1, r2, r3],
    message:
      multiplier >= 50
        ? `🎰 JACKPOT! 3x Match! Won ${payout} chips!`
        : multiplier > 0
        ? `Nice hit! Won ${payout} chips!`
        : 'No match. Try again!',
  };
}

/**
 * Server Action for claiming daily bonus.
 */
export async function claimDailyBonusAction(currentBalance: number): Promise<SpinResult> {
  const bonusAmount = 500;
  const newBalance = currentBalance + bonusAmount;

  return {
    success: true,
    gameId: 'fortune-wheel',
    betAmount: 0,
    multiplier: 1,
    payout: bonusAmount,
    newBalance,
    message: `🎁 Claimed your daily bonus of ${bonusAmount} chips!`,
  };
}
