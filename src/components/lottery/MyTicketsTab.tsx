'use client';

import React from 'react';
import { Ticket, Clock, Trophy } from 'lucide-react';

export interface PurchasedTicket {
  id: string;
  numbers: number[];
  purchasedAt: string;
  status: 'PENDING' | 'WON' | 'LOST' | 'DRAWING';
  payoutAmount?: string;
  potentialWin: string;
}

interface MyTicketsTabProps {
  purchasedTickets: PurchasedTicket[];
}

export const MyTicketsTab: React.FC<MyTicketsTabProps> = ({ purchasedTickets }) => {
  return (
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3">
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-2">
        <h2 className="text-sm font-black text-[#faf6f0] flex items-center gap-1.5">
          <Ticket className="w-4 h-4 text-[#e6ca65]" />
          <span>My Purchased Tickets ({purchasedTickets.length})</span>
        </h2>
        <span className="text-[10px] text-[#b5a391]">Draw #1492</span>
      </div>

      {purchasedTickets.length === 0 ? (
        <div className="py-6 text-center space-y-1 border border-dashed border-[#9c663b]/30 rounded-xl bg-[#0c0a09]/60 p-3">
          <Trophy className="w-6 h-6 text-[#b5a391]/30 mx-auto" />
          <p className="text-xs text-[#b5a391] font-bold">No active tickets.</p>
          <p className="text-[10px] text-[#b5a391]/60">Select 6 numbers to buy your first ticket!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
          {purchasedTickets.map((t) => (
            <div
              key={t.id}
              className="p-2.5 rounded-xl bg-[#0c0a09]/90 border border-[#e6ca65]/40 space-y-1.5 shadow-xs"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-extrabold text-[#e6ca65]">
                  {t.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                    t.status === 'WON'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : t.status === 'LOST'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                      : 'bg-[#e6ca65]/20 text-[#e6ca65] border border-[#e6ca65]/40'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              {/* Numbers Badges */}
              <div className="flex items-center gap-1 flex-wrap">
                {t.numbers.map((num) => (
                  <span
                    key={num}
                    className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] text-[10px] font-mono font-black flex items-center justify-center"
                  >
                    {num.toString().padStart(2, '0')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
