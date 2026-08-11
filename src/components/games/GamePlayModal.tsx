'use client';

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { Game } from './GamesGrid';

interface GamePlayModalProps {
  game: Game | null;
  onClose: () => void;
  onPlayMiniGame: (betAmount: number) => void;
}

export const GamePlayModal: React.FC<GamePlayModalProps> = ({
  game,
  onClose,
  onPlayMiniGame,
}) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0a09]/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border-2 border-[#e6ca65]/70 shadow-[0_0_80px_rgba(212,175,55,0.3)] space-y-6 animate-in fade-in zoom-in duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#b5a391] hover:text-[#faf6f0] p-1.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Game Title & Category */}
        <div className="flex items-center gap-4 border-b border-[#9c663b]/30 pb-4">
          <span className="text-5xl">{game.icon}</span>
          <div>
            <span className="text-xs font-mono text-[#e6ca65] font-extrabold uppercase">
              {game.category}
            </span>
            <h3 className="text-2xl font-black text-[#faf6f0]">{game.title}</h3>
            <span className="text-xs text-[#b5a391]">
              RTP {game.rtp} • {game.badge}
            </span>
          </div>
        </div>

        {/* Interactive Play Simulator */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40 text-center space-y-2">
            <span className="text-xs font-bold text-[#b5a391] uppercase">SELECT WAGER AMOUNT</span>
            <div className="flex justify-center gap-3 pt-1">
              <button
                onClick={() => onPlayMiniGame(50)}
                className="px-5 py-2.5 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-extrabold font-mono cursor-pointer"
              >
                50 SC
              </button>
              <button
                onClick={() => onPlayMiniGame(100)}
                className="px-5 py-2.5 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-extrabold font-mono cursor-pointer"
              >
                100 SC
              </button>
              <button
                onClick={() => onPlayMiniGame(200)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-black font-mono cursor-pointer"
              >
                200 SC
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#b5a391] pt-2">
            <span className="flex items-center gap-1.5 text-[#e6ca65]">
              <ShieldCheck className="w-4 h-4" /> Cryptographic Provably Fair RNG
            </span>
            <span>100% Free Virtual Currency</span>
          </div>
        </div>
      </div>
    </div>
  );
};
