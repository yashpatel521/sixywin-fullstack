'use client';

import React from 'react';
import { Shuffle, Trash2, PlusCircle } from 'lucide-react';

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
    <div className="space-y-3.5 rounded-2xl bg-[#18120e] border border-[#9c663b]/50 p-4 shadow-xl">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 border-b border-[#9c663b]/30 pb-2.5">
        <div>
          <h2 className="text-sm sm:text-base font-black text-[#faf6f0]">
            Pick 6 Lucky Numbers
          </h2>
          <p className="text-[10px] text-[#b5a391]">
            Select 6 numbers out of 49 or click Quick Pick ({selectedNumbers.length}/6)
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onQuickPick}
            className="px-3 py-1 rounded-lg bg-[#281d14] hover:bg-[#38271a] border border-[#e6ca65]/50 text-[#e6ca65] text-[10px] font-extrabold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          >
            <Shuffle className="w-3 h-3" />
            <span>QUICK PICK</span>
          </button>

          {selectedNumbers.length > 0 && (
            <button
              onClick={onClear}
              className="px-2 py-1 rounded-lg bg-[#0c0a09] hover:bg-red-500/20 text-[#b5a391] hover:text-red-400 border border-[#9c663b]/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>CLEAR</span>
            </button>
          )}
        </div>
      </div>

      {/* Selected Numbers Badges Preview */}
      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 min-h-[44px] overflow-x-auto">
        <span className="text-[9px] font-extrabold text-[#b5a391] uppercase tracking-wider shrink-0">
          SELECTION:
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => {
            const num = selectedNumbers[i];
            return (
              <div
                key={i}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-black font-mono text-[11px] transition-all ${
                  num !== undefined
                    ? 'bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] shadow-md shadow-[#d4af37]/30 scale-105'
                    : 'bg-[#18120e] border border-dashed border-[#9c663b]/40 text-[#b5a391]/40'
                }`}
              >
                {num !== undefined ? num.toString().padStart(2, '0') : '?'}
              </div>
            );
          })}
        </div>
      </div>

      {/* 1-49 Small Circular Ball Grid */}
      <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5 justify-items-center py-1">
        {numbers.map((num) => {
          const isSelected = selectedNumbers.includes(num);
          return (
            <button
              key={num}
              onClick={() => onToggleNumber(num)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black font-mono text-xs flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xs ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_10px_rgba(212,175,55,0.6)] scale-110'
                  : 'bg-[#0c0a09] hover:bg-[#281d14] text-[#faf6f0] border border-[#9c663b]/40 hover:border-[#e6ca65]'
              }`}
            >
              {num.toString().padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Add Ticket to Cart Button */}
      <button
        onClick={onAddTicketToSlip}
        disabled={selectedNumbers.length !== 6}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border border-[#faf6f0]/40"
      >
        <PlusCircle className="w-3.5 h-3.5 fill-current" />
        <span>ADD TICKET TO SLIP (200 SC)</span>
      </button>
    </div>
  );
};
