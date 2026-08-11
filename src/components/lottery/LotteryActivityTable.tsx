'use client';

import React from 'react';
import { Activity, ShieldCheck, Ticket, Users, Sparkles } from 'lucide-react';

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
  recentActivity,
  winningNumbers = [6, 12, 19, 28, 37, 44],
}) => {
  const defaultActivities: LiveLotteryActivity[] = [
    {
      id: '1',
      player: '@gold_viper',
      ticketCode: 'TICK-649-9012',
      numbers: [6, 11, 19, 33, 37, 48],
      cost: '200.00 SC',
      status: 'MATCH 3/6',
      timeAgo: '1m ago',
    },
    {
      id: '2',
      player: '@highroller_7',
      ticketCode: 'TICK-649-8991',
      numbers: [7, 12, 21, 28, 37, 44],
      cost: '600.00 SC',
      status: 'MATCH 4/6',
      timeAgo: '3m ago',
    },
    {
      id: '3',
      player: '@crypto_whale',
      ticketCode: 'TICK-649-8974',
      numbers: [2, 9, 17, 24, 38, 49],
      cost: '400.00 SC',
      status: 'PENDING DRAW',
      timeAgo: '6m ago',
    },
    {
      id: '4',
      player: '@lucky_charm',
      ticketCode: 'TICK-649-8950',
      numbers: [6, 12, 19, 28, 37, 44],
      cost: '200.00 SC',
      status: '🎉 JACKPOT 6/6',
      timeAgo: '9m ago',
    },
  ];

  const activities = recentActivity && recentActivity.length > 0 ? recentActivity : defaultActivities;

  return (
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#9c663b]/30 pb-2.5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#e6ca65] animate-pulse" />
          <h3 className="text-sm font-black text-[#faf6f0]">
            Live 6/49 Network Ticket Activity
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
            {activities.map((act) => (
              <tr
                key={act.id}
                className={`hover:bg-[#281d14]/50 transition-colors ${
                  act.isCurrentUser ? 'bg-[#e6ca65]/10' : ''
                }`}
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
                      ? 'bg-[#e6ca65]/20 text-[#e6ca65] border border-[#e6ca65]/40 font-black'
                      : 'bg-[#0c0a09] text-[#b5a391] border border-[#9c663b]/30'
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
    </div>
  );
};
