'use client';

import React from 'react';
import { Ticket, Clock, Trophy } from 'lucide-react';

export interface PurchasedTicket {
  id: string;
  numbers: number[];
  purchasedAt: string;
  status: 'PENDING' | 'WON' | 'DRAWING';
  potentialWin: string;
}

interface MyTicketsTabProps {
  purchasedTickets: PurchasedTicket[];
}

export const MyTicketsTab: React.FC<MyTicketsTabProps> = ({ purchasedTickets }) => {
  return (
    <div className="space-y-4 rounded-2xl bg-[#18120e] border border-[#9c663b]/50 p-4 sm:p-5 shadow-xl">
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#faf6f0] flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#e6ca65]" />
            <span>My Active 6/49 Lottery Tickets ({purchasedTickets.length})</span>
          </h2>
          <p className="text-[11px] text-[#b5a391]">
            Active tickets entered into Draw #1492 (Settlement in 04h 22m)
          </p>
        </div>
      </div>

      {purchasedTickets.length === 0 ? (
        <div className="py-8 text-center space-y-1.5 border border-dashed border-[#9c663b]/40 rounded-xl bg-[#0c0a09]/50">
          <Trophy className="w-6 h-6 text-[#b5a391]/40 mx-auto" />
          <p className="text-xs text-[#b5a391] font-semibold">No active tickets for today's draw.</p>
          <p className="text-[10px] text-[#b5a391]/60">Select 6 numbers above to buy your first ticket!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {purchasedTickets.map((t) => (
            <div
              key={t.id}
              className="p-3.5 rounded-xl bg-[#0c0a09] border border-[#e6ca65]/50 space-y-2.5 shadow-md"
            >
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono font-extrabold text-[#e6ca65]">
                  {t.id}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-[9px] font-bold font-mono flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 animate-pulse" /> PENDING DRAW
                </span>
              </div>

              {/* Numbers Badges */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {t.numbers.map((num) => (
                  <span
                    key={num}
                    className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-[11px] font-mono font-black flex items-center justify-center shadow-xs"
                  >
                    {num.toString().padStart(2, '0')}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-[#9c663b]/30 flex justify-between items-center text-[10px] text-[#b5a391]">
                <span>Purchased: {t.purchasedAt}</span>
                <span className="text-[#e6ca65] font-extrabold">Jackpot: {t.potentialWin}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
