'use client';

import React from 'react';
import Image from 'next/image';
import { Crown, Gem, Clock, Ticket, Coins } from 'lucide-react';

interface GamesHeroSectionProps {
  onPlayLottery: () => void;
}

export const GamesHeroSection: React.FC<GamesHeroSectionProps> = ({ onPlayLottery }) => {
  return (
    <div className="relative w-full py-4 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left 50% Column: Headline & Live Draw Counter */}
        <div className="lg:col-span-7 space-y-6">
          {/* Unboxed Clean Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2 text-[#e6ca65]">
              <Crown className="w-5 h-5 text-[#e6ca65] animate-pulse" />
              <span className="text-[#faf6f0]">FLAGSHIP GAME • LIVE DAILY DRAWS</span>
            </div>
            <span className="text-[#9c663b]">•</span>
            <div className="flex items-center gap-1.5 text-[#e6ca65]">
              <Gem className="w-4 h-4 text-[#e6ca65]" />
              <span>100% FREE PLAY</span>
            </div>
          </div>

          {/* High-Impact Headline */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#e6ca65] block">
              DAILY VIRTUAL JACKPOT REALM
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
              Official 6/49 Jackpot <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                Lottery Draw
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-[#e3d8c8] text-sm sm:text-base max-w-xl leading-relaxed">
            Pick 6 lucky numbers between 1 and 49 for your chance to win the daily jackpot payout of up to <strong className="text-[#e6ca65] font-mono font-black">1,250,000 Sixy Coins (SC)</strong>.
          </p>

          {/* Live Jackpot & Draw Counter Banner */}
          <div className="inline-flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-[#18120e] border border-[#9c663b]/50">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#b5a391]">
              <Clock className="w-4 h-4 text-[#e6ca65] animate-pulse" />
              <span>NEXT DRAW: <strong className="text-[#faf6f0] font-mono font-bold">04h 22m 15s</strong></span>
            </div>
            <span className="text-[#9c663b] hidden sm:inline">•</span>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#e6ca65] font-bold">
              <span>JACKPOT:</span>
              <span className="text-sm sm:text-base text-[#faf6f0] font-black">1,250,000 SC</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={onPlayLottery}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-base font-extrabold flex items-center gap-3 shadow-xl shadow-[#d4af37]/25 cursor-pointer active:scale-95 border border-[#faf6f0]/40"
            >
              <Ticket className="w-5 h-5" />
              <span>PLAY 6/49 LOTTERY (200 SC)</span>
            </button>
          </div>
        </div>

        {/* Right 50% Column: 3D Golden 6/49 Lottery Ticket Image */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full max-w-md sm:max-w-lg aspect-square hover:scale-105 transition-transform duration-500">
            <Image
              src="/landing/lottery_ticket_3d.png"
              alt="3D Gold 6/49 Lottery Ticket Render"
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
