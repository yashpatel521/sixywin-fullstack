'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Crown, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onPlayClick?: (gameId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onPlayClick }) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#faf6f0] px-6 sm:px-16 flex flex-col justify-between pt-12 sm:pt-20 pb-20 overflow-hidden m-0">
      {/* 24K Champagne Gold Ambient Glows */}
      <div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-[#d4af37]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#9c663b]/18 rounded-full blur-[140px] pointer-events-none" />

      {/* 50-50 2-Column Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-6">
        {/* Left 50% Column: Headline & Controls */}
        <div className="space-y-8">
          {/* VIP Suite Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#faf6f0]/10 border border-[#d4af37]/40 text-[#faf6f0] text-xs font-bold backdrop-blur-xl shadow-lg">
              <Crown className="w-4 h-4 text-[#e6ca65] animate-pulse" />
              <span className="text-[#faf6f0] tracking-wider uppercase">SIXYWIN 24K VIP SUITE</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18120e]/80 border border-[#9c663b]/50 text-[#e6ca65] text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#e6ca65]" />
              <span>Provably Fair</span>
            </div>
          </div>

          {/* High-Contrast Headline */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#e6ca65] block">
              NEXT-GEN SPATIAL GAMING ENGINE
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#faf6f0] leading-[1.06]">
              The Realm Of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                High-Stakes Gaming
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-[#e3d8c8] text-base sm:text-xl font-normal leading-relaxed">
            Enter an elite luxury casino environment. Play 3D Fortune Wheel, Slot Machines, and High-Low tables powered by Next.js 15 Server Actions & Supabase database.
          </p>

          {/* Quick Launch Game Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onPlayClick?.('fortune-wheel')}
              className="px-4 py-2 rounded-xl bg-[#18120e] border border-[#9c663b]/60 hover:border-[#e6ca65] text-[#faf6f0] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <span>🎡 Cyber Wheel</span>
              <span className="text-[10px] font-mono text-[#e6ca65] bg-[#0c0a09] px-2 py-0.5 rounded-md">50x MAX</span>
            </button>

            <button
              onClick={() => onPlayClick?.('slot-machine')}
              className="px-4 py-2 rounded-xl bg-[#18120e] border border-[#9c663b]/60 hover:border-[#e6ca65] text-[#faf6f0] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <span>🎰 Neon Slots</span>
              <span className="text-[10px] font-mono text-[#e6ca65] bg-[#0c0a09] px-2 py-0.5 rounded-md">100x</span>
            </button>

            <button
              onClick={() => onPlayClick?.('high-low')}
              className="px-4 py-2 rounded-xl bg-[#18120e] border border-[#9c663b]/60 hover:border-[#e6ca65] text-[#faf6f0] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <span>🃏 High-Low</span>
              <span className="text-[10px] font-mono text-[#e6ca65] bg-[#0c0a09] px-2 py-0.5 rounded-md">2x</span>
            </button>
          </div>

          {/* 24K Gold Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onPlayClick?.()}
              className="px-9 py-4 text-base font-extrabold text-[#0c0a09] bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] rounded-2xl transition-all shadow-xl shadow-[#d4af37]/25 active:scale-95 flex items-center gap-2.5 cursor-pointer border border-[#faf6f0]/40"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>PLAY NOW</span>
            </button>

            <button
              onClick={onExploreClick}
              className="px-8 py-4 text-base font-bold text-[#faf6f0] hover:text-white bg-[#18120e] hover:bg-[#281d14] border border-[#9c663b]/60 rounded-2xl transition-all flex items-center gap-2.5 cursor-pointer shadow-md"
            >
              <span>EXPLORE TABLES</span>
              <ArrowRight className="w-5 h-5 text-[#e6ca65]" />
            </button>
          </div>
        </div>

        {/* Right 50% Column: Seamlessly Blended Pure-Black 3D Artwork */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square hover:scale-105 transition-transform duration-500">
            <Image
              src="/landing/blendable_hero_3d.png"
              alt="3D Luxury Casino Crown & Dice"
              fill
              className="object-contain mix-blend-screen"
              priority
            />
            {/* Soft Ambient Gold Glow Ring */}
            <div className="absolute inset-0 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>
        </div>
      </div>

      {/* 24K Gold Stats Ribbon */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-[#9c663b]/40 text-xs sm:text-sm">
        <div>
          <span className="text-[#b5a391] font-semibold block mb-1">TOTAL PAYOUTS</span>
          <span className="text-xl sm:text-2xl font-bold text-[#faf6f0] font-mono">$24,850,000+</span>
        </div>
        <div>
          <span className="text-[#b5a391] font-semibold block mb-1">AVERAGE RTP</span>
          <span className="text-xl sm:text-2xl font-bold text-[#e6ca65] font-mono">99.1%</span>
        </div>
        <div>
          <span className="text-[#b5a391] font-semibold block mb-1">VIP CASHBACK</span>
          <span className="text-xl sm:text-2xl font-bold text-[#f0d885] font-mono">15% WEEKLY</span>
        </div>
        <div>
          <span className="text-[#b5a391] font-semibold block mb-1">SETTLEMENT</span>
          <span className="text-xl sm:text-2xl font-bold text-[#faf6f0] font-mono">&lt; 1 SEC</span>
        </div>
      </div>
    </section>
  );
};
