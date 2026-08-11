'use server';

import { processGameBetInDb } from '@/db/queries/games/gameQueries';

export async function placeBetAction(userId: string, gameId: string, wagerAmount: number) {
  try {
    const winMultiplier = Math.random() > 0.4 ? parseFloat((1.5 + Math.random() * 3).toFixed(2)) : 0;
    const isWin = winMultiplier > 0;
    const payout = isWin ? wagerAmount * winMultiplier : 0;

    const result = await processGameBetInDb(userId, {
      gameId,
      wagerAmount,
      multiplier: winMultiplier,
      payout,
      isWin,
    });

    return {
      success: true,
      isWin,
      multiplier: winMultiplier,
      payout,
      newBalance: result.newBalance,
    };
  } catch (error: any) {
    console.error('Error in placeBetAction:', error);
    return { success: false, error: error.message || 'Bet placement failed.' };
  }
}
