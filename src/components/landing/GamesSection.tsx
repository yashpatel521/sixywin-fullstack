'use client';

import React from 'react';
import { Play, Gem } from 'lucide-react';

interface GamesSectionProps {
  onPlayGame?: (gameId: string) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onPlayGame }) => {
  const games = [
    {
      id: 'lottery-649',
      title: '6/49 Lottery Jackpot',
      category: 'LIVE LOTTERY',
      icon: '🎟️',
      badge: '1,250,000 SC',
      multiplier: 'JACKPOT',
      description: 'Pick 6 numbers out of 1 to 49 for daily virtual Sixy Coins draws.',
      rtp: '99.2%',
    },
    {
      id: 'highlow-double-trouble',
      title: 'HighLow (Double Trouble)',
      category: 'CARD PREDICTOR',
      icon: '🃏',
      badge: '2x INSTANT',
      multiplier: 'DOUBLE TROUBLE',
      description: 'Predict higher or lower cards with Double Trouble multiplier streaks.',
      rtp: '99.0%',
    },
    {
      id: 'mines-sweeper',
      title: 'Minesweeper Matrix',
      category: 'RISK MULTIPLIER',
      icon: '💣',
      badge: '1,000x MAX',
      multiplier: 'GEM HUNTER',
      description: 'Uncover hidden 24K gold gems across the grid while dodging explosive mines.',
      rtp: '98.8%',
    },
    {
      id: 'fortune-wheel',
      title: 'Cyber Fortune Wheel',
      category: 'SPINNER TABLE',
      icon: '🎡',
      badge: '50x MULTIPLIER',
      multiplier: 'SPATIAL WHEEL',
      description: 'Spin 12-segment wheel with server-side RNG settlement.',
      rtp: '98.5%',
    },
    {
      id: 'neon-slots',
      title: 'Neon Slot 777',
      category: 'SLOT REELS',
      icon: '🎰',
      badge: '100x JACKPOT',
      multiplier: 'TRIPLE 777',
      description: 'Classic 3x3 reel spin with triple 777 jackpot payouts.',
      rtp: '97.8%',
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-[#18120e] via-[#100b08] to-[#0c0a09] px-6 sm:px-16 py-24 text-[#faf6f0] m-0 overflow-hidden">
      <div className="relative z-10 w-full max-w-[1800px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#9c663b]/30 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf6f0]/10 text-[#e6ca65] text-xs sm:text-sm font-bold border border-[#e6ca65]/30">
              <Gem className="w-4 h-4 text-[#e6ca65]" />
              <span>SIXYWIN ARENA</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#faf6f0]">
              Available Games & Tables
            </h2>
          </div>
          <p className="text-base sm:text-lg font-medium text-[#b5a391] max-w-md">
            Select any table to launch instant sub-second 3D mini-games with free Sixy Coins (SC).
          </p>
        </div>

        {/* Featured Games Grid (Responsive 3 cols, 2xl 4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => onPlayGame?.(game.id)}
              className="rounded-3xl bg-[#18120e] border border-[#9c663b]/50 p-8 space-y-6 hover:border-[#e6ca65] transition-all group shadow-2xl cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{game.icon}</span>
                  <span className="px-3.5 py-1 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-xs sm:text-sm font-bold font-mono">
                    {game.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-extrabold tracking-wider uppercase text-[#e6ca65] block mb-1">
                    {game.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#faf6f0] group-hover:text-[#e6ca65] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b5a391] mt-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#9c663b]/30 flex justify-between items-center">
                <span className="text-xs sm:text-sm text-[#b5a391] font-semibold font-mono">RTP {game.rtp}</span>
                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md hover:from-[#f0d885]">
                  <Play className="w-4 h-4 fill-current" /> PLAY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
