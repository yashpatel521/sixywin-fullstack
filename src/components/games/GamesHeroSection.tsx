'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown, Gem, Clock, Ticket } from 'lucide-react';
import { LeaderboardWidget } from './LeaderboardWidget';

interface GamesHeroSectionProps {
  onPlayLottery?: () => void;
}

export const GamesHeroSection: React.FC<GamesHeroSectionProps> = () => {
  return (
    <div className="relative w-full py-2 overflow-hidden space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column (6/12 Width): Headline & Live Draw Counter */}
        <div className="lg:col-span-6 space-y-4">
          {/* Unboxed Clean Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold tracking-widest uppercase">
            <div className="flex items-center gap-1.5 text-[#e6ca65]">
              <Crown className="w-4 h-4 text-[#e6ca65] animate-pulse" />
              <span className="text-[#faf6f0]">FLAGSHIP GAME • LIVE DAILY DRAWS</span>
            </div>
            <span className="text-[#9c663b]">•</span>
            <div className="flex items-center gap-1.5 text-[#e6ca65]">
              <Gem className="w-3.5 h-3.5 text-[#e6ca65]" />
              <span>100% FREE PLAY</span>
            </div>
          </div>

          {/* High-Impact Headline */}
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e6ca65] block">
              DAILY VIRTUAL JACKPOT REALM
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
              Official 6/49 Jackpot <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                Lottery Draw
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-[#e3d8c8] text-xs sm:text-sm max-w-xl leading-relaxed">
            Pick 6 lucky numbers between 1 and 49 for your chance to win the daily jackpot payout of up to <strong className="text-[#e6ca65] font-mono font-black">1,250,000 Sixy Coins (SC)</strong>.
          </p>

          {/* Live Jackpot & Draw Counter Banner */}
          <div className="inline-flex flex-wrap items-center gap-3 p-3 rounded-xl bg-[#18120e] border border-[#9c663b]/50">
            <div className="flex items-center gap-1.5 text-xs text-[#b5a391]">
              <Clock className="w-3.5 h-3.5 text-[#e6ca65] animate-pulse" />
              <span>NEXT DRAW: <strong className="text-[#faf6f0] font-mono font-bold">04h 22m 15s</strong></span>
            </div>
            <span className="text-[#9c663b] hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#e6ca65] font-bold">
              <span>JACKPOT:</span>
              <span className="text-xs sm:text-sm text-[#faf6f0] font-black">1,250,000 SC</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/games/lottery"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 cursor-pointer active:scale-95 border border-[#faf6f0]/40"
            >
              <Ticket className="w-4 h-4" />
              <span>PLAY 6/49 LOTTERY (BUY TICKETS)</span>
            </Link>
          </div>
        </div>

        {/* Right Column (6/12 Width): Integrated High-Roller Leaderboard */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <LeaderboardWidget />
        </div>
      </div>
    </div>
  );
};
