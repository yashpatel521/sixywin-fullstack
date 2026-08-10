'use client';

import React from 'react';
import { Flame, Zap } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const LiveTicker: React.FC = () => {
  const { recentWins } = useGameStore();

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 py-2.5 overflow-hidden backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 shrink-0">
          <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
          <span>LIVE WINS</span>
        </div>

        <div className="flex items-center gap-8 overflow-x-auto scrollbar-none py-0.5 text-slate-300">
          {recentWins.map((win) => (
            <div key={win.id} className="flex items-center gap-2 shrink-0 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800">
              <span className="text-sm">{win.avatar}</span>
              <span className="font-bold text-slate-100">{win.username}</span>
              <span className="text-slate-400">won</span>
              <span className="text-amber-400 font-extrabold">{win.amount.toLocaleString()} chips</span>
              <span className="text-xs text-cyan-400 font-mono">({win.multiplier})</span>
              <Zap className="w-3 h-3 text-cyan-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
