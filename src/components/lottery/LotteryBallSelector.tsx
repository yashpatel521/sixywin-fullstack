'use client';

import React from 'react';
import { Shuffle, Trash2, Plus, Sparkles, Ticket } from 'lucide-react';

interface LotteryBallSelectorProps {
  selectedNumbers: number[];
  onToggleNumber: (num: number) => void;
  onQuickPick: () => void;
  onClear: () => void;
  onAddTicketToSlip: () => void;
}

export const LotteryBallSelector: React.FC<LotteryBallSelectorProps> = ({
  selectedNumbers,
  onToggleNumber,
  onQuickPick,
  onClear,
  onAddTicketToSlip,
}) => {
  const numbers = Array.from({ length: 49 }, (_, i) => i + 1);

  return (
    <div className="w-full space-y-6">
      {/* 🎟️ Physical 3D Golden Ticket Receipt Card with Glassmorphism */}
      <div className="relative w-full rounded-3xl bg-[#18120e]/85 border border-[#e6ca65]/50 p-6 sm:p-7 shadow-[0_20px_50px_rgba(212,175,55,0.15)] backdrop-blur-2xl space-y-5">
        {/* Ticket Perforated Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#e6ca65]/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] flex items-center justify-center text-[#0c0a09] font-black shadow-md">
              <Ticket className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#e6ca65] block">
                OFFICIAL 6/49 ENTRY SLIP
              </span>
              <h2 className="text-base sm:text-xl font-black text-[#faf6f0] tracking-tight">
                6/49 Ticket Generator
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onQuickPick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#faf6f0]/40"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>AUTO QUICK PICK</span>
            </button>

            {selectedNumbers.length > 0 && (
              <button
                onClick={onClear}
                className="px-3 py-2 rounded-xl bg-[#0c0a09]/80 hover:bg-red-500/20 text-[#b5a391] hover:text-red-400 border border-[#9c663b]/40 text-xs font-bold transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 6 Printed Golden 3D Spherical Ball Slots */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-[#b5a391]">PRINTED BALL SLOTS ({selectedNumbers.length}/6)</span>
            <span className="text-[#e6ca65] font-mono font-extrabold">200 SC / TICKET</span>
          </div>

          <div className="grid grid-cols-6 gap-2 sm:gap-3 py-1">
            {Array.from({ length: 6 }).map((_, i) => {
              const num = selectedNumbers[i];
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-full flex items-center justify-center font-black font-mono text-sm sm:text-base transition-all duration-300 ${
                    num !== undefined
                      ? 'bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_20px_rgba(212,175,55,0.7)] scale-105 animate-in zoom-in-50'
                      : 'bg-[#0c0a09] border-2 border-dashed border-[#9c663b]/40 text-[#b5a391]/30'
                  }`}
                >
                  {num !== undefined ? num.toString().padStart(2, '0') : '?'}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🎱 3D Metallic Spherical Ball Selector Matrix */}
      <div className="space-y-3 pt-1">
        <div className="flex justify-between items-center text-xs text-[#b5a391] font-extrabold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>3D GOLDEN BALL MATRIX (1 - 49)</span>
          </span>
          <span className="text-[10px] text-[#e6ca65]">SELECT 6 BALLS</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 sm:gap-2.5 justify-items-center py-1">
          {numbers.map((num) => {
            const isSelected = selectedNumbers.includes(num);
            return (
              <button
                key={num}
                type="button"
                onClick={() => onToggleNumber(num)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-black font-mono text-xs sm:text-sm flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90 shadow-md ${
                  isSelected
                    ? 'bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_18px_rgba(212,175,55,0.8)] scale-110'
                    : 'bg-gradient-to-br from-[#18120e] to-[#0c0a09] hover:from-[#281d14] hover:to-[#18120e] text-[#faf6f0] border border-[#9c663b]/50 hover:border-[#e6ca65] hover:scale-105'
                }`}
              >
                {num.toString().padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Ticket to Slip Action Button */}
      <button
        onClick={onAddTicketToSlip}
        disabled={selectedNumbers.length !== 6}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] hover:from-[#fff0ad] hover:to-[#d4af37] text-[#0c0a09] text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border border-[#faf6f0]/50 active:scale-95"
      >
        <Plus className="w-5 h-5 stroke-[3]" />
        <span>ADD TICKET TO SLIP (200 SC)</span>
      </button>
    </div>
  );
};
