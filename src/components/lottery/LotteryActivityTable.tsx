'use client';

import React from 'react';
import { Activity, ShieldCheck, Ticket, Users } from 'lucide-react';

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
}

export const LotteryActivityTable: React.FC<LotteryActivityTableProps> = ({ recentActivity }) => {
  const defaultActivities: LiveLotteryActivity[] = [
    {
      id: '1',
      player: '@gold_viper',
      ticketCode: 'TICK-649-9012',
      numbers: [4, 11, 22, 33, 41, 48],
      cost: '200.00 SC',
      status: 'PENDING DRAW',
      timeAgo: '1m ago',
    },
    {
      id: '2',
      player: '@highroller_7',
      ticketCode: 'TICK-649-8991',
      numbers: [7, 14, 21, 28, 35, 42],
      cost: '600.00 SC',
      status: 'PENDING DRAW',
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
      numbers: [1, 13, 25, 31, 39, 45],
      cost: '200.00 SC',
      status: 'PENDING DRAW',
      timeAgo: '9m ago',
    },
  ];

  const activities = recentActivity && recentActivity.length > 0 ? recentActivity : defaultActivities;

  return (
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3">
      {/* Table Header */}
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-2.5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#e6ca65] animate-pulse" />
          <h3 className="text-sm font-black text-[#faf6f0]">
            Live 6/49 Network Ticket Activity
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#b5a391]">
          <Users className="w-3.5 h-3.5 text-[#e6ca65]" />
          <span>REAL-TIME PURCHASES</span>
        </div>
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#9c663b]/30 text-[10px] uppercase font-extrabold text-[#b5a391]">
              <th className="py-2 px-2">Player</th>
              <th className="py-2 px-2">Ticket Code</th>
              <th className="py-2 px-2">Selected Numbers</th>
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
                    {act.numbers.map((n) => (
                      <span
                        key={n}
                        className="w-5 h-5 rounded-full bg-[#0c0a09] border border-[#e6ca65]/40 text-[#e6ca65] text-[10px] font-mono font-extrabold flex items-center justify-center"
                      >
                        {n.toString().padStart(2, '0')}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2 px-2 font-mono font-bold text-[#faf6f0]">
                  {act.cost}
                </td>
                <td className="py-2 px-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#e6ca65]/20 text-[#e6ca65] text-[9px] font-mono font-bold">
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
