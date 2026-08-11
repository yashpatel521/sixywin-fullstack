'use client';

import React from 'react';
import Image from 'next/image';
import { Crown, Clock, Trophy, ShieldCheck, Ticket } from 'lucide-react';

export const LotteryHeader: React.FC = () => {
  return (
    <div className="relative w-full py-4 overflow-hidden border-b border-[#9c663b]/30 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2 text-[#e6ca65]">
              <Crown className="w-5 h-5 text-[#e6ca65] animate-pulse" />
              <span className="text-[#faf6f0]">OFFICIAL 6/49 LOTTERY JACKPOT</span>
            </div>
            <span className="text-[#9c663b]">•</span>
            <div className="flex items-center gap-1.5 text-[#e6ca65]">
              <Trophy className="w-4 h-4 text-[#e6ca65]" />
              <span>1,250,000 SC PRIZE POOL</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#e6ca65] block">
              DAILY DRAW COUNTDOWN
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
              Buy 6/49 Lottery <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                Jackpot Tickets
              </span>
            </h1>
          </div>

          <p className="text-[#e3d8c8] text-sm sm:text-base max-w-xl leading-relaxed">
            Select 6 numbers from 1 to 49 or use Quick Pick. Match all 6 numbers in the daily draw to win the <strong className="text-[#e6ca65] font-mono font-black">1,250,000 SC Jackpot</strong>!
          </p>

          {/* Live Countdown Ribbon */}
          <div className="inline-flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-[#18120e] border border-[#e6ca65]/50 shadow-md">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#b5a391]">
              <Clock className="w-4 h-4 text-[#e6ca65] animate-pulse" />
              <span>DRAW CLOSES IN: <strong className="text-[#faf6f0] font-mono font-bold">04h 22m 15s</strong></span>
            </div>
            <span className="text-[#9c663b] hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#e6ca65] font-bold">
              <Ticket className="w-4 h-4 text-[#e6ca65]" />
              <span>COST: 200 SC / TICKET</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Lottery Ticket Image */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-square hover:scale-105 transition-transform duration-500">
            <Image
              src="/landing/lottery_ticket_3d.png"
              alt="3D 6/49 Gold Lottery Ticket"
              fill
              className="object-contain remove-img-bg"
              priority
            />
            <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
