'use client';

import React from 'react';
import { Package, Coins, ChevronUp } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const LastGamesTable: React.FC = () => {
  const { recentWins } = useGameStore();

  return (
    <div className="rounded-3xl bg-[#181d2e] border border-slate-800/80 p-6 space-y-6 shadow-xl">
      <h3 className="text-xl font-black text-white tracking-tight">Last Games</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-500 uppercase tracking-wider font-extrabold border-b border-slate-800/80 pb-3">
              <th className="pb-3 font-extrabold">GAME</th>
              <th className="pb-3 font-extrabold">USER</th>
              <th className="pb-3 font-extrabold">BET AMOUNT</th>
              <th className="pb-3 font-extrabold">MULTIPLIER</th>
              <th className="pb-3 font-extrabold text-right">PAYOUT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {recentWins.map((win, idx) => (
              <tr key={win.id || idx} className="hover:bg-slate-900/50 transition-colors">
                <td className="py-4 font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                    <Package className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span>{win.gameTitle}</span>
                </td>

                <td className="py-4 text-slate-300 font-medium">{win.username.toLowerCase()}</td>

                <td className="py-4 font-mono font-bold text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold flex items-center justify-center">
                      R
                    </span>
                    <span>{(win.amount / 100).toFixed(6)}</span>
                  </div>
                </td>

                <td className="py-4 font-mono font-bold text-slate-400">{win.multiplier}</td>

                <td className="py-4 font-mono font-bold text-emerald-400 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center">
                      R
                    </span>
                    <span>{(win.amount * (parseFloat(win.multiplier) || 1.2) / 100).toFixed(5)}</span>
                    <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
