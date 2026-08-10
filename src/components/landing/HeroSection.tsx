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
    <section className="relative w-full h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] bg-gradient-to-b from-[#0c0a09] via-[#140e0b] to-[#18120e] px-6 sm:px-16 flex flex-col justify-between py-6 overflow-hidden m-0">
      {/* 24K Champagne Gold Ambient Glows */}
      <div className="absolute -top-32 right-0 w-[650px] h-[650px] bg-[#d4af37]/12 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-[#9c663b]/18 rounded-full blur-[160px] pointer-events-none" />

      {/* 50-50 2-Column Grid Layout (Fits Screen Height Strictly) */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-2">
        {/* Left 50% Column: Headline & Controls */}
        <div className="space-y-6">
          {/* VIP Suite & Security Info (Unboxed Clean Badges) */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-widest uppercase">
              <Crown className="w-5 h-5 text-[#e6ca65] animate-pulse" />
              <span className="text-[#faf6f0]">SIXYWIN 24K VIP SUITE</span>
            </div>

            <span className="text-[#9c663b]">•</span>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#e6ca65]">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#e6ca65]" />
              <span>Free Virtual Currency</span>
            </div>
          </div>

          {/* High-Contrast Headline */}
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-[#e6ca65] block">
              NEXT-GEN SPATIAL GAMING ENGINE
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-[#faf6f0] leading-[1.04]">
              The Realm Of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                6/49 Lottery & Casino
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-[#e3d8c8] text-base sm:text-xl 2xl:text-2xl max-w-3xl font-normal leading-relaxed">
            Enter an elite virtual gaming environment. Play 6/49 Lottery, 3D Fortune Wheel, and High-Low tables with free virtual Sixy Coins (SC).
          </p>

          {/* Quick Launch Game Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onPlayClick?.('lottery-649')}
              className="px-4 py-2 rounded-xl bg-[#18120e] border border-[#9c663b]/60 hover:border-[#e6ca65] text-[#faf6f0] text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <span>🎟️ 6/49 Lottery</span>
              <span className="text-xs font-mono text-[#e6ca65] bg-[#0c0a09] px-2 py-0.5 rounded-md">1.25M SC</span>
            </button>

            <button
              onClick={() => onPlayClick?.('fortune-wheel')}
              className="px-4 py-2 rounded-xl bg-[#18120e] border border-[#9c663b]/60 hover:border-[#e6ca65] text-[#faf6f0] text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <span>🎡 Cyber Wheel</span>
              <span className="text-xs font-mono text-[#e6ca65] bg-[#0c0a09] px-2 py-0.5 rounded-md">50x</span>
            </button>

            <button
              onClick={() => onPlayClick?.('high-low')}
              className="px-4 py-2 rounded-xl bg-[#18120e] border border-[#9c663b]/60 hover:border-[#e6ca65] text-[#faf6f0] text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5"
            >
              <span>🃏 High-Low</span>
              <span className="text-xs font-mono text-[#e6ca65] bg-[#0c0a09] px-2 py-0.5 rounded-md">2x</span>
            </button>
          </div>

          {/* 24K Gold Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => onPlayClick?.('lottery-649')}
              className="px-9 py-4 text-base sm:text-lg font-extrabold text-[#0c0a09] bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] rounded-2xl transition-all shadow-xl shadow-[#d4af37]/25 active:scale-95 flex items-center gap-3 cursor-pointer border border-[#faf6f0]/40"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              <span>PLAY 6/49 LOTTERY</span>
            </button>

            <button
              onClick={onExploreClick}
              className="px-8 py-4 text-base sm:text-lg font-bold text-[#faf6f0] hover:text-white bg-[#18120e] hover:bg-[#281d14] border border-[#9c663b]/60 rounded-2xl transition-all flex items-center gap-3 cursor-pointer shadow-md"
            >
              <span>EXPLORE TABLES</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#e6ca65]" />
            </button>
          </div>
        </div>

        {/* Right 50% Column: CSS-Processed 3D Picture */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-lg 2xl:max-w-xl aspect-square hover:scale-105 transition-transform duration-500">
            <Image
              src="/landing/blendable_hero_3d.png"
              alt="3D Luxury Casino Crown & Dice"
              fill
              className="object-contain remove-img-bg"
              priority
            />
            {/* Ambient Gold Glow Ring */}
            <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>
        </div>
      </div>

      {/* 24K Gold Stats Ribbon Fixed at Bottom of Viewport */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-[#9c663b]/40 text-xs sm:text-sm">
        <div>
          <span className="text-[#b5a391] font-semibold block mb-0.5">TOTAL COINS WON</span>
          <span className="text-lg sm:text-2xl font-bold text-[#faf6f0] font-mono">24,850,000 SC</span>
        </div>
        <div>
          <span className="text-[#b5a391] font-semibold block mb-0.5">AVERAGE RTP</span>
          <span className="text-lg sm:text-2xl font-bold text-[#e6ca65] font-mono">99.1%</span>
        </div>
        <div>
          <span className="text-[#b5a391] font-semibold block mb-0.5">WEEKLY BONUS</span>
          <span className="text-lg sm:text-2xl font-bold text-[#f0d885] font-mono">15% SC BACK</span>
        </div>
        <div>
          <span className="text-[#b5a391] font-semibold block mb-0.5">SETTLEMENT</span>
          <span className="text-lg sm:text-2xl font-bold text-[#faf6f0] font-mono">&lt; 1 SEC</span>
        </div>
      </div>
    </section>
  );
};
