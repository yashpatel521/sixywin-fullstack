'use client';

import React from 'react';
import { Coins, Plus } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export const WalletBadge: React.FC = () => {
  const { balance, addBalance } = useGameStore();

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/80 rounded-2xl p-1.5 pl-3 shadow-lg shadow-black/40">
      <Coins className="w-5 h-5 text-amber-400 animate-pulse" />
      <div className="flex flex-col pr-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">
          CHIPS
        </span>
        <span className="text-sm font-black text-amber-300 tracking-tight leading-none mt-0.5">
          {balance.toLocaleString()}
        </span>
      </div>
      <button
        onClick={() => addBalance(1000)}
        title="Quick Top-up +1,000 Chips"
        className="w-7 h-7 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 flex items-center justify-center text-amber-300 hover:text-amber-200 transition-all active:scale-90"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
