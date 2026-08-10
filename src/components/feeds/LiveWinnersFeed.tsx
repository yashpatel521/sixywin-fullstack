'use client';

import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Trophy, Zap, ShieldCheck } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const LiveWinnersFeed: React.FC = () => {
  const { recentWins } = useGameStore();

  return (
    <GlassCard glowColor="purple">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Live Big Winners</h3>
            <p className="text-xs text-slate-400">Real-time payouts across games</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" />
          <span>Provably Verified</span>
        </div>
      </div>

      <div className="space-y-3">
        {recentWins.map((win) => (
          <div
            key={win.id}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{win.avatar}</span>
              <div>
                <p className="text-sm font-bold text-slate-100">{win.username}</p>
                <p className="text-xs text-slate-400">{win.gameTitle}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-black text-amber-400">+{win.amount.toLocaleString()} CHIPS</p>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 justify-end">
                <Zap className="w-3 h-3" /> {win.multiplier}
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
