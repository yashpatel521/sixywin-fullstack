'use client';

import React from 'react';
import { Play, Crown, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick?: () => void;
  onPlayClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onPlayClick }) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-6rem)] flex flex-col justify-between py-8 sm:py-12 overflow-hidden">
      {/* Warm Cream & Gold Ambient Glows */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#8c5a2b]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Centered Vertically */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto space-y-8 py-6">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#fbf8f3]/10 border border-[#d4af37]/30 text-[#fbf8f3] text-xs font-bold backdrop-blur-md">
          <Crown className="w-4 h-4 text-[#d4af37]" />
          <span className="text-[#fbf8f3]">SIXYWIN VIP LUXURY SUITE</span>
          <span className="text-[#8c5a2b]">•</span>
          <span className="text-[#d4af37]">PROVABLY FAIR</span>
        </div>

        {/* High-Contrast Cream & Gold Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#fbf8f3] leading-[1.05]">
          The Luxury Realm of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f4efe6] to-[#b8860b]">
            High-Stakes Gaming
          </span>
        </h1>

        <p className="text-[#e8dfd1] text-lg sm:text-2xl max-w-3xl font-normal leading-relaxed">
          Step into an elite casino experience. Play 3D Fortune Wheel, Slot Machines, and High-Low tables wrapped in espresso brown & warm cream luxury.
        </p>

        {/* Luxury Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onPlayClick}
            className="px-10 py-5 text-base font-extrabold text-[#1a100a] bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] rounded-2xl transition-all shadow-xl shadow-[#d4af37]/20 active:scale-95 flex items-center gap-2.5 cursor-pointer border border-[#fffdfa]/30"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>PLAY NOW</span>
          </button>

          <button
            onClick={onExploreClick}
            className="px-9 py-5 text-base font-bold text-[#fbf8f3] hover:text-white bg-[#2c1d11]/80 hover:bg-[#3a2717] border border-[#8c5a2b]/50 rounded-2xl transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span>EXPLORE TABLES</span>
            <ArrowRight className="w-5 h-5 text-[#d4af37]" />
          </button>
        </div>
      </div>

      {/* Cream & Bronze Stats Ribbon Fixed at Bottom of Viewport */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-[#8c5a2b]/30 text-xs sm:text-sm">
        <div>
          <span className="text-[#a89582] font-semibold block mb-1">TOTAL PAYOUTS</span>
          <span className="text-xl sm:text-2xl font-bold text-[#fbf8f3] font-mono">$24,850,000+</span>
        </div>
        <div>
          <span className="text-[#a89582] font-semibold block mb-1">AVERAGE RTP</span>
          <span className="text-xl sm:text-2xl font-bold text-[#d4af37] font-mono">99.1%</span>
        </div>
        <div>
          <span className="text-[#a89582] font-semibold block mb-1">VIP CASHBACK</span>
          <span className="text-xl sm:text-2xl font-bold text-[#e5c158] font-mono">15% WEEKLY</span>
        </div>
        <div>
          <span className="text-[#a89582] font-semibold block mb-1">SETTLEMENT</span>
          <span className="text-xl sm:text-2xl font-bold text-[#fbf8f3] font-mono">&lt; 1 SEC</span>
        </div>
      </div>
    </section>
  );
};
