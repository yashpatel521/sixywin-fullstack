'use server';

import { cookies } from 'next/headers';
import {
  processLotteryTicketInDb,
  getUserLotteryTicketsFromDb,
  executeLotteryDrawInDb,
  getLatestLotteryDrawFromDb,
} from '@/db/queries/lottery/lotteryQueries';

export interface TicketSlip {
  numbers: number[];
  cost: number;
}

function extractUserIdFromCookie(cookieValue: string | undefined): string {
  if (!cookieValue) return 'guest-session';
  try {
    const decoded = JSON.parse(Buffer.from(cookieValue, 'base64').toString('utf-8'));
    if (decoded && decoded.id) {
      return decoded.id;
    }
  } catch {
    // Fallback to raw string if not base64 JSON
  }
  return cookieValue;
}

export async function buyLotteryTicketsAction(tickets: TicketSlip[]) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('sixywin_session');
    const userId = extractUserIdFromCookie(sessionCookie?.value);

    const purchasedRecords = [];
    let lastBalance = '10000.00';

    for (const ticket of tickets) {
      const result = await processLotteryTicketInDb({
        userId,
        selectedNumbers: ticket.numbers,
        ticketCost: ticket.cost,
      });
      purchasedRecords.push(result.ticket);
      lastBalance = result.newBalance;
    }

    return {
      success: true,
      message: `Successfully purchased ${tickets.length} 6/49 Lottery Ticket(s)!`,
      newBalance: lastBalance,
      purchasedTickets: purchasedRecords,
    };
  } catch (error: any) {
    console.error('Error in buyLotteryTicketsAction:', error);
    return {
      success: false,
      error: error.message || 'Failed to purchase lottery tickets.',
    };
  }
}

export async function getUserTicketsAction() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('sixywin_session');
    if (!sessionCookie?.value) {
      return { success: true, tickets: [] };
    }

    const userId = extractUserIdFromCookie(sessionCookie.value);
    const dbTickets = await getUserLotteryTicketsFromDb(userId);

    return {
      success: true,
      tickets: dbTickets.map((t) => ({
        id: t.ticketCode,
        numbers: t.numbers.split(',').map((n) => parseInt(n, 10)),
        purchasedAt: new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: t.status as 'PENDING' | 'WON' | 'LOST',
        payoutAmount: t.payoutAmount,
        potentialWin: '1,250,000 SC',
      })),
    };
  } catch (error: any) {
    console.error('Error in getUserTicketsAction:', error);
    return { success: false, tickets: [] };
  }
}

// 24-Hour Automated Lottery Settlement Server Action
export async function triggerDailyDrawAction() {
  try {
    const result = await executeLotteryDrawInDb();
    const nextDrawTimestamp = Date.now() + 24 * 60 * 60 * 1000;
    return {
      success: true,
      nextDrawTimestamp,
      draw: result.draw,
      winningNumbers: result.winningNumbers,
      bonusBall: result.bonusBall,
      totalWinners: result.totalWinners,
      seedHash: result.seedHash,
    };
  } catch (error: any) {
    console.error('Error in triggerDailyDrawAction:', error);
    return {
      success: false,
      error: error.message || 'Failed to execute daily lottery draw.',
    };
  }
}

export async function getLatestDrawAction() {
  try {
    const draw = await getLatestLotteryDrawFromDb();
    // Default 24-hour cycle from last draw creation time or current time
    const lastDrawTime = draw ? new Date(draw.createdAt).getTime() : Date.now();
    const nextDrawTimestamp = lastDrawTime + 24 * 60 * 60 * 1000;

    return {
      success: true,
      nextDrawTimestamp,
      draw: draw
        ? {
            drawCode: draw.drawCode,
            winningNumbers: draw.winningNumbers.split(',').map((n) => parseInt(n, 10)),
            bonusBall: parseInt(draw.bonusBall, 10),
            totalWinners: draw.totalWinners,
            seedHash: draw.seedHash,
            createdAt: new Date(draw.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }
        : null,
    };
  } catch (error: any) {
    console.error('Error in getLatestDrawAction:', error);
    return { success: false };
  }
}
