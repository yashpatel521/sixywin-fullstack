'use client';

import React from 'react';
import { Shuffle, Trash2, Plus, Ticket } from 'lucide-react';

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
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3.5">
      {/* Header & Quick Action Buttons */}
      <div className="flex items-center justify-between border-b border-[#9c663b]/30 pb-2.5">
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-[#e6ca65]" />
          <h2 className="text-sm sm:text-base font-black text-[#faf6f0]">
            6/49 Ticket Selector
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onQuickPick}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-[11px] font-black flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#faf6f0]/40"
          >
            <Shuffle className="w-3 h-3" />
            <span>QUICK PICK</span>
          </button>

          {selectedNumbers.length > 0 && (
            <button
              onClick={onClear}
              className="px-2 py-1 rounded-lg bg-[#0c0a09] hover:bg-red-500/20 text-[#b5a391] hover:text-red-400 border border-[#9c663b]/40 text-[11px] font-bold transition-all cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* 6 Compact Golden Printed Ball Slots */}
      <div className="p-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 space-y-1.5">
        <div className="flex justify-between items-center text-[10px] text-[#b5a391] font-bold">
          <span>SELECTED BALLS ({selectedNumbers.length}/6)</span>
          <span className="text-[#e6ca65] font-mono">200 SC / TICKET</span>
        </div>

        <div className="grid grid-cols-6 gap-2 py-0.5 justify-items-center">
          {Array.from({ length: 6 }).map((_, i) => {
            const num = selectedNumbers[i];
            return (
              <div
                key={i}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black font-mono text-xs transition-all duration-200 ${
                  num !== undefined
                    ? 'bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_12px_rgba(212,175,55,0.6)] scale-105'
                    : 'bg-[#18120e] border border-dashed border-[#9c663b]/40 text-[#b5a391]/30'
                }`}
              >
                {num !== undefined ? num.toString().padStart(2, '0') : '?'}
              </div>
            );
          })}
        </div>
      </div>

      {/* 1-49 Small Circular Ball Matrix */}
      <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5 justify-items-center py-1">
        {numbers.map((num) => {
          const isSelected = selectedNumbers.includes(num);
          return (
            <button
              key={num}
              type="button"
              onClick={() => onToggleNumber(num)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black font-mono text-[11px] sm:text-xs flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-xs ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_10px_rgba(212,175,55,0.7)] scale-110'
                  : 'bg-[#0c0a09] hover:bg-[#281d14] text-[#faf6f0] border border-[#9c663b]/40 hover:border-[#e6ca65]'
              }`}
            >
              {num.toString().padStart(2, '0')}
            </button>
          );
        })}
      </div>

      {/* Add Ticket to Slip Button */}
      <button
        onClick={onAddTicketToSlip}
        disabled={selectedNumbers.length !== 6}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] hover:from-[#fff0ad] hover:to-[#d4af37] text-[#0c0a09] text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border border-[#faf6f0]/40 active:scale-95"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span>ADD TICKET TO SLIP (200 SC)</span>
      </button>
    </div>
  );
};
