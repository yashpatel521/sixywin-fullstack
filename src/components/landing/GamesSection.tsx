'use client';

import React from 'react';
import { Play, Gem } from 'lucide-react';

export const GamesSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#0c0a09] px-6 sm:px-16 py-24 text-[#faf6f0] m-0 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#9c663b]/30 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#faf6f0]/10 text-[#e6ca65] text-xs font-bold border border-[#e6ca65]/30">
              <Gem className="w-3.5 h-3.5" />
              <span>SPATIAL TABLES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#faf6f0]">
              Featured Luxury Games
            </h2>
          </div>
          <p className="text-base font-medium text-[#b5a391] max-w-md">
            Select a table to launch sub-second 3D mini-games.
          </p>
        </div>

        {/* 3 Games Cards in Onyx & Gold Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Game 1 */}
          <div className="rounded-3xl bg-[#18120e] border border-[#9c663b]/50 p-8 space-y-6 hover:border-[#e6ca65] transition-all group shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-4xl">🎡</span>
              <span className="px-3 py-1 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-xs font-bold font-mono">
                50x MAX
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#faf6f0] group-hover:text-[#e6ca65] transition-colors">
                Cyber Fortune Wheel
              </h3>
              <p className="text-xs text-[#b5a391] mt-2 leading-relaxed">
                Spin 12-segment wheel with server-side RNG settlement.
              </p>
            </div>
            <div className="pt-4 border-t border-[#9c663b]/30 flex justify-between items-center">
              <span className="text-xs text-[#b5a391] font-semibold">RTP 98.5%</span>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:from-[#f0d885]">
                <Play className="w-3.5 h-3.5 fill-current" /> PLAY TABLE
              </button>
            </div>
          </div>

          {/* Game 2 */}
          <div className="rounded-3xl bg-[#18120e] border border-[#9c663b]/50 p-8 space-y-6 hover:border-[#e6ca65] transition-all group shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-4xl">🎰</span>
              <span className="px-3 py-1 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-xs font-bold font-mono">
                100x JACKPOT
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#faf6f0] group-hover:text-[#e6ca65] transition-colors">
                Neon Slot 777
              </h3>
              <p className="text-xs text-[#b5a391] mt-2 leading-relaxed">
                Classic 3x3 reel spin with triple 777 jackpot payouts.
              </p>
            </div>
            <div className="pt-4 border-t border-[#9c663b]/30 flex justify-between items-center">
              <span className="text-xs text-[#b5a391] font-semibold">RTP 97.8%</span>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:from-[#f0d885]">
                <Play className="w-3.5 h-3.5 fill-current" /> PLAY TABLE
              </button>
            </div>
          </div>

          {/* Game 3 */}
          <div className="rounded-3xl bg-[#18120e] border border-[#9c663b]/50 p-8 space-y-6 hover:border-[#e6ca65] transition-all group shadow-2xl">
            <div className="flex justify-between items-center">
              <span className="text-4xl">🃏</span>
              <span className="px-3 py-1 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-xs font-bold font-mono">
                2x INSTANT
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#faf6f0] group-hover:text-[#e6ca65] transition-colors">
                High-Low Cards
              </h3>
              <p className="text-xs text-[#b5a391] mt-2 leading-relaxed">
                Predict higher or lower cards for instant double payouts.
              </p>
            </div>
            <div className="pt-4 border-t border-[#9c663b]/30 flex justify-between items-center">
              <span className="text-xs text-[#b5a391] font-semibold">RTP 99.0%</span>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:from-[#f0d885]">
                <Play className="w-3.5 h-3.5 fill-current" /> PLAY TABLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
