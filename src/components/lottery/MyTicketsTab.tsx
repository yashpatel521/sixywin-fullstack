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
    <div className="w-full space-y-5 pt-4 border-t border-[#9c663b]/30">
      <div className="flex justify-between items-center pb-2">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-[#faf6f0] flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#e6ca65]" />
            <span>My Active 6/49 Lottery Tickets ({purchasedTickets.length})</span>
          </h2>
          <p className="text-xs text-[#b5a391]">
            Active tickets entered into Draw #1492 (Settlement in 04h 22m)
          </p>
        </div>
      </div>

      {purchasedTickets.length === 0 ? (
        <div className="py-12 text-center space-y-2 border-2 border-dashed border-[#9c663b]/30 rounded-2xl p-6">
          <Trophy className="w-10 h-10 text-[#b5a391]/30 mx-auto" />
          <p className="text-sm text-[#b5a391] font-bold">No active tickets for today's draw.</p>
          <p className="text-xs text-[#b5a391]/60">Select 6 numbers above to buy your first ticket!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {purchasedTickets.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-2xl bg-[#18120e] border border-[#e6ca65]/50 space-y-3 shadow-xl group hover:border-[#e6ca65] transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-extrabold text-[#e6ca65]">
                  {t.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-[10px] font-bold font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 animate-pulse" /> PENDING DRAW
                </span>
              </div>

              {/* Numbers Badges */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {t.numbers.map((num) => (
                  <span
                    key={num}
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-mono font-black flex items-center justify-center shadow-md"
                  >
                    {num.toString().padStart(2, '0')}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-[#9c663b]/30 flex justify-between items-center text-xs text-[#b5a391]">
                <span>Purchased: {t.purchasedAt}</span>
                <span className="text-[#e6ca65] font-black">Jackpot: {t.potentialWin}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
