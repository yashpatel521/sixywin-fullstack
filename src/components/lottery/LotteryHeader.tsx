'use client';

import React from 'react';
import { Crown, Clock, Trophy, Coins } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const LotteryHeader: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#18120e]/80 border border-[#e6ca65]/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
      {/* 3D Gold Live Ticker Ribbon */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-black text-[#e6ca65] tracking-widest uppercase">
          <Crown className="w-4.5 h-4.5 text-[#e6ca65] animate-pulse" />
          <span>6/49 LIVE DRAW #1492</span>
        </div>

        <span className="text-[#9c663b] hidden sm:inline">•</span>

        <div className="flex items-center gap-2 text-xs text-[#b5a391]">
          <Clock className="w-4 h-4 text-[#e6ca65] animate-pulse" />
          <span>CLOSES IN: <strong className="text-[#faf6f0] font-mono font-bold">04h 22m 15s</strong></span>
        </div>

        <span className="text-[#9c663b] hidden sm:inline">•</span>

        <div className="flex items-center gap-1.5 text-xs text-[#e6ca65] font-extrabold font-mono">
          <Trophy className="w-4 h-4 text-[#e6ca65]" />
          <span>JACKPOT: <strong className="text-[#faf6f0] text-sm font-black">1,250,000 SC</strong></span>
        </div>
      </div>

      {/* User SC Wallet Pill */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c0a09]/90 border border-[#e6ca65]/50 shadow-md">
        <Coins className="w-4 h-4 text-[#e6ca65]" />
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#b5a391] uppercase tracking-wider font-extrabold">
            SC BALANCE:
          </span>
          <span className="text-xs sm:text-sm font-black font-mono text-[#e6ca65]">
            {user?.sixyCoinsBalance || '10,000.00'} SC
          </span>
        </div>
      </div>
    </div>
  );
};
