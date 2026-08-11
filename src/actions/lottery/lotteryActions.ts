'use server';

import { cookies } from 'next/headers';
import { processLotteryTicketInDb } from '@/db/queries/lottery/lotteryQueries';

export interface TicketSlip {
  numbers: number[];
  cost: number;
}

export async function buyLotteryTicketsAction(tickets: TicketSlip[]) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('sixywin_session');
    const userId = sessionCookie?.value || 'guest-session';

    const totalCost = tickets.reduce((sum, t) => sum + t.cost, 0);

    // Call DB query layer to process ticket purchase
    const result = await processLotteryTicketInDb({
      userId,
      selectedNumbers: tickets.flatMap((t) => t.numbers),
      ticketCost: totalCost,
    });

    return {
      success: true,
      message: `Successfully purchased ${tickets.length} 6/49 Lottery Ticket(s)!`,
      newBalance: result.newBalance,
      ticketIds: tickets.map((_, i) => `TICK-649-${Date.now()}-${i + 1}`),
    };
  } catch (error: any) {
    console.error('Error in buyLotteryTicketsAction:', error);
    return {
      success: false,
      error: error.message || 'Failed to purchase lottery tickets.',
    };
  }
}
