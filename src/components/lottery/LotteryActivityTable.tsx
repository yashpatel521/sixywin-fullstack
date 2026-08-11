'use client';

import React from 'react';
import { Activity, Ticket, History, Trophy } from 'lucide-react';

export interface LiveLotteryActivity {
  id: string;
  player: string;
  ticketCode: string;
  numbers: number[];
  cost: string;
  status: string;
  timeAgo: string;
  isCurrentUser?: boolean;
}

interface LotteryActivityTableProps {
  recentActivity?: LiveLotteryActivity[];
  winningNumbers?: number[];
}

export const LotteryActivityTable: React.FC<LotteryActivityTableProps> = ({
  recentActivity = [],
  winningNumbers = [6, 12, 19, 28, 37, 44],
}) => {
  return (
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#9c663b]/30 pb-2.5">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#e6ca65]" />
          <h3 className="text-sm font-black text-[#faf6f0]">
            My Ticket Purchase & Settlement History
          </h3>
        </div>

        {/* Legend for Matched Numbers */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-[#b5a391]">
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] border border-[#faf6f0] shadow-[0_0_6px_rgba(212,175,55,0.8)] inline-block" />
            <span className="text-[#e6ca65] font-bold">MATCHED NUMBER</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0c0a09] border border-[#9c663b]/40 inline-block" />
            <span>UNMATCHED</span>
          </div>
        </div>
      </div>

      {/* Activity Table */}
      {recentActivity.length === 0 ? (
        <div className="py-8 text-center space-y-1.5 border border-dashed border-[#9c663b]/30 rounded-xl bg-[#0c0a09]/60 p-4">
          <Ticket className="w-8 h-8 text-[#b5a391]/30 mx-auto" />
          <p className="text-xs text-[#faf6f0] font-black">No Ticket Purchase History Found</p>
          <p className="text-[11px] text-[#b5a391]">
            Select 6 numbers on the matrix above and click <strong>"BUY TICKETS"</strong> to enter today's draw!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#9c663b]/30 text-[10px] uppercase font-extrabold text-[#b5a391]">
                <th className="py-2 px-2">Player</th>
                <th className="py-2 px-2">Ticket Code</th>
                <th className="py-2 px-2">Selected Numbers & Matched Highlights</th>
                <th className="py-2 px-2">Cost</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#9c663b]/20">
              {recentActivity.map((act) => (
                <tr
                  key={act.id}
                  className="hover:bg-[#281d14]/50 transition-colors bg-[#e6ca65]/10"
                >
                  <td className="py-2 px-2 font-bold text-[#faf6f0] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {act.player}
                  </td>
                  <td className="py-2 px-2 font-mono font-extrabold text-[#e6ca65]">
                    {act.ticketCode}
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1">
                      {act.numbers.map((n) => {
                        const isMatch = winningNumbers.includes(n);
                        return (
                          <span
                            key={n}
                            className={`w-6 h-6 rounded-full font-mono text-[10px] font-black flex items-center justify-center transition-all ${
                              isMatch
                                ? 'bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] border border-[#faf6f0] shadow-[0_0_8px_rgba(212,175,55,0.8)] scale-110'
                                : 'bg-[#0c0a09] border border-[#9c663b]/30 text-[#b5a391]/60'
                            }`}
                            title={isMatch ? `Matched Number: ${n}` : `Unmatched: ${n}`}
                          >
                            {n.toString().padStart(2, '0')}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-2 px-2 font-mono font-bold text-[#faf6f0]">
                    {act.cost}
                  </td>
                  <td className="py-2 px-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                      act.status.includes('WON') || act.status.includes('JACKPOT') || act.status.includes('MATCH')
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-black'
                        : act.status.includes('LOST')
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 font-black'
                        : 'bg-[#e6ca65]/20 text-[#e6ca65] border border-[#e6ca65]/40 font-black'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right font-mono text-[#b5a391] text-[11px]">
                    {act.timeAgo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
