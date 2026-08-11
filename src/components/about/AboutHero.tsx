'use client';

import React from 'react';
import Image from 'next/image';
import { Crown, Gem, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export const AboutHero: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#9c663b]/30 pb-12">
      <div className="lg:col-span-7 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e6ca65]/10 border border-[#e6ca65]/30 text-[#e6ca65] text-xs font-mono font-bold">
          <Crown className="w-4 h-4 text-[#e6ca65] animate-pulse" />
          <span>ABOUT SIXYWIN GAMING ARENA</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
          The Next Generation of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f]">
            Spatial 3D Virtual Gaming
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#e3d8c8] leading-relaxed max-w-xl">
          SixyWin is engineered for players who crave high-stakes gaming excitement without real-money financial risk. Powered by sub-second settlement engines, cryptographic SHA-256 seed hashing, and free virtual Sixy Coins (SC).
        </p>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-2xl bg-[#18120e] border border-[#e6ca65]/40 text-center">
            <Trophy className="w-5 h-5 text-[#e6ca65] mx-auto mb-1" />
            <span className="text-lg font-black font-mono text-[#faf6f0] block">1.25M SC</span>
            <span className="text-[10px] text-[#b5a391] uppercase font-bold">DAILY JACKPOT</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#18120e] border border-[#e6ca65]/40 text-center">
            <ShieldCheck className="w-5 h-5 text-[#e6ca65] mx-auto mb-1" />
            <span className="text-lg font-black font-mono text-[#faf6f0] block">100%</span>
            <span className="text-[10px] text-[#b5a391] uppercase font-bold">PROVABLY FAIR</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#18120e] border border-[#e6ca65]/40 text-center">
            <Gem className="w-5 h-5 text-[#e6ca65] mx-auto mb-1" />
            <span className="text-lg font-black font-mono text-[#faf6f0] block">$0 COST</span>
            <span className="text-[10px] text-[#b5a391] uppercase font-bold">FREE PLAY</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex items-center justify-center">
        <div className="relative w-full max-w-sm aspect-square">
          <Image
            src="/landing/lottery_ticket_3d.png"
            alt="SixyWin 3D Gold Ticket"
            fill
            className="object-contain remove-img-bg"
            priority
          />
          <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none -z-10" />
        </div>
      </div>
    </div>
  );
};
