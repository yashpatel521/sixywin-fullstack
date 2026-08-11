'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Gem } from 'lucide-react';

export interface Game {
  id: string;
  title: string;
  category: string;
  icon: string;
  badge: string;
  multiplier: string;
  description: string;
  rtp: string;
  featured?: boolean;
  minBet: string;
}

interface GamesGridProps {
  games: Game[];
  onLaunchGame: (game: Game) => void;
}

export const GamesGrid: React.FC<GamesGridProps> = ({ games, onLaunchGame }) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-4">
        <h2 className="text-xl font-extrabold text-[#faf6f0] flex items-center gap-2">
          <Gem className="w-5 h-5 text-[#e6ca65]" />
          <span>Available Tables ({games.length})</span>
        </h2>
        <span className="text-xs font-mono text-[#b5a391]">
          Sub-Second Provably Fair Settlement
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            id={game.id}
            className="rounded-3xl bg-[#18120e] border border-[#9c663b]/50 p-6 space-y-4 hover:border-[#e6ca65] transition-all group shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-4xl group-hover:scale-110 transition-transform">{game.icon}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-xs font-bold font-mono">
                  {game.badge}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#e6ca65] block mb-1">
                  {game.category}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#faf6f0] group-hover:text-[#e6ca65] transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-[#b5a391] mt-1.5 leading-relaxed">
                  {game.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#9c663b]/30 flex justify-between items-center">
              <div className="flex flex-col text-[11px] font-mono text-[#b5a391]">
                <span>RTP {game.rtp}</span>
                <span className="text-[#e6ca65]">Min: {game.minBet}</span>
              </div>

              {game.id === 'lottery-649' ? (
                <Link
                  href="/games/lottery"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:from-[#f0d885] cursor-pointer active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> BUY TICKETS
                </Link>
              ) : (
                <button
                  onClick={() => onLaunchGame(game)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:from-[#f0d885] cursor-pointer active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> PLAY NOW
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
