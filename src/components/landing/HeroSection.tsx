'use client';

import React from 'react';
import { Play, Crown, ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onPlayClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onPlayClick }) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#faf6f0] px-6 sm:px-16 flex flex-col justify-between pt-12 sm:pt-20 pb-20 overflow-hidden m-0">
      {/* 24K Champagne Gold Ambient Glows */}
      <div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-[#d4af37]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#9c663b]/18 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Centered Vertically */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto space-y-8 py-6">
        {/* Ultra-Premium VIP Badge */}
        <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-[#faf6f0]/10 border border-[#d4af37]/40 text-[#faf6f0] text-xs font-bold backdrop-blur-xl shadow-lg">
          <Crown className="w-4 h-4 text-[#e6ca65]" />
          <span className="text-[#faf6f0] tracking-wider uppercase">SIXYWIN 24K VIP SUITE</span>
          <span className="text-[#9c663b]">•</span>
          <span className="text-[#e6ca65]">PROVABLY FAIR</span>
        </div>

        {/* Champagne Gold & Silk Cream Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#faf6f0] leading-[1.05]">
          The Luxury Realm of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
            High-Stakes Gaming
          </span>
        </h1>

        <p className="text-[#e3d8c8] text-lg sm:text-2xl max-w-3xl font-normal leading-relaxed">
          Step into an elite casino experience. Play 3D Fortune Wheel, Slot Machines, and High-Low tables wrapped in deep velvet onyx & champagne silk luxury.
        </p>

        {/* 24K Gold Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onPlayClick}
            className="px-10 py-5 text-base font-extrabold text-[#0c0a09] bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] rounded-2xl transition-all shadow-xl shadow-[#d4af37]/25 active:scale-95 flex items-center gap-2.5 cursor-pointer border border-[#faf6f0]/40"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>PLAY NOW</span>
          </button>

          <button
            onClick={onExploreClick}
            className="px-9 py-5 text-base font-bold text-[#faf6f0] hover:text-white bg-[#1c140e] hover:bg-[#281d14] border border-[#9c663b]/60 rounded-2xl transition-all flex items-center gap-2.5 cursor-pointer shadow-md"
          >
            <span>EXPLORE TABLES</span>
            <ArrowRight className="w-5 h-5 text-[#e6ca65]" />
          </button>
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
