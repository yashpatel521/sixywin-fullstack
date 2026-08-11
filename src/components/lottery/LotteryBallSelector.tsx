'use client';

import React from 'react';
import { Shuffle, Trash2, PlusCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

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
    <div className="space-y-6 rounded-3xl bg-[#18120e] border border-[#9c663b]/50 p-6 sm:p-8 shadow-2xl">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#9c663b]/30 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#faf6f0]">
            Pick Your 6 Lucky Numbers
          </h2>
          <p className="text-xs text-[#b5a391]">
            Select exactly 6 numbers out of 49 or click Quick Pick ({selectedNumbers.length}/6 selected)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onQuickPick}
            className="px-4 py-2 rounded-xl bg-[#281d14] hover:bg-[#38271a] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Shuffle className="w-4 h-4" />
            <span>QUICK PICK</span>
          </button>

          {selectedNumbers.length > 0 && (
            <button
              onClick={onClear}
              className="px-3 py-2 rounded-xl bg-[#0c0a09] hover:bg-red-500/20 text-[#b5a391] hover:text-red-400 border border-[#9c663b]/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR</span>
            </button>
          )}
        </div>
      </div>

      {/* Selected Numbers Badges Preview */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40 min-h-[64px] overflow-x-auto">
        <span className="text-xs font-extrabold text-[#b5a391] uppercase tracking-wider shrink-0">
          YOUR SELECTION:
        </span>
        <div className="flex items-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => {
            const num = selectedNumbers[i];
            return (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-black font-mono text-sm transition-all ${
                  num !== undefined
                    ? 'bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] shadow-lg shadow-[#d4af37]/30 scale-105'
                    : 'bg-[#18120e] border border-dashed border-[#9c663b]/40 text-[#b5a391]/40'
                }`}
              >
                {num !== undefined ? num.toString().padStart(2, '0') : '?'}
              </div>
            );
          })}
        </div>
      </div>

      {/* 1-49 Ball Grid */}
      <div className="grid grid-cols-7 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-10 gap-2.5 sm:gap-3">
        {numbers.map((num) => {
          const isSelected = selectedNumbers.includes(num);
          return (
            <button
              key={num}
              onClick={() => onToggleNumber(num)}
              className={`w-full aspect-square rounded-2xl font-black font-mono text-sm sm:text-base flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md ${
                isSelected
                  ? 'bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105'
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
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-base font-black flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border border-[#faf6f0]/40"
      >
        <PlusCircle className="w-5 h-5 fill-current" />
        <span>ADD TICKET TO SLIP (200 SC)</span>
      </button>
    </div>
  );
};
