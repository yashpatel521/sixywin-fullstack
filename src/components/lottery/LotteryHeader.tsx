'use client';

import React from 'react';
import { Crown, Clock, Trophy, Coins, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const LotteryHeader: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 shadow-[0_0_40px_rgba(212,175,55,0.15)] backdrop-blur-2xl">
      {/* Draw Countdown & Jackpot Status */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-black text-[#e6ca65] tracking-widest uppercase">
          <Crown className="w-4.5 h-4.5 text-[#e6ca65] animate-pulse" />
          <span>6/49 LIVE DRAW #1492</span>
        </div>

        <div className="h-4 w-[1px] bg-[#9c663b]/40 hidden sm:block" />

        <div className="flex items-center gap-2 text-xs text-[#b5a391]">
          <Clock className="w-4 h-4 text-[#e6ca65] animate-pulse" />
          <span>CLOSES IN: <strong className="text-[#faf6f0] font-mono font-bold">04h 22m 15s</strong></span>
        </div>

        <div className="h-4 w-[1px] bg-[#9c663b]/40 hidden sm:block" />

        <div className="flex items-center gap-1.5 text-xs text-[#e6ca65] font-extrabold font-mono">
          <Trophy className="w-4 h-4 text-[#e6ca65]" />
          <span>JACKPOT: <strong className="text-[#faf6f0] text-sm font-black">1,250,000 SC</strong></span>
        </div>
      </div>

      {/* User Wallet SC Balance Readout */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c0a09] border border-[#e6ca65]/50 shadow-md">
        <Coins className="w-4.5 h-4.5 text-[#e6ca65]" />
        <div className="flex flex-col">
          <span className="text-[9px] text-[#b5a391] uppercase tracking-wider font-extrabold leading-none">
            ACTIVE SC WALLET
          </span>
          <span className="text-xs sm:text-sm font-black font-mono text-[#e6ca65]">
            {user?.sixyCoinsBalance || '10,000.00'} SC
          </span>
        </div>
      </div>
    </div>
  );
};
