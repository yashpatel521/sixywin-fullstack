'use server';

import { cookies } from 'next/headers';
import { processLotteryTicketInDb, getUserLotteryTicketsFromDb } from '@/db/queries/lottery/lotteryQueries';

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
        status: t.status as 'PENDING' | 'WON' | 'DRAWING',
        potentialWin: '1,250,000 SC',
      })),
    };
  } catch (error: any) {
    console.error('Error in getUserTicketsAction:', error);
    return { success: false, tickets: [] };
  }
}
