'use client';

import React from 'react';
import { Shuffle, Trash2, PlusCircle, Ticket } from 'lucide-react';

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
      {/* Unboxed Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#e6ca65]">
            <Ticket className="w-4 h-4 text-[#e6ca65]" />
            <span>6/49 TICKET GENERATOR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#faf6f0]">
            Select 6 Lucky Balls
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onQuickPick}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:from-[#f0d885] active:scale-95"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>AUTO QUICK PICK</span>
          </button>

          {selectedNumbers.length > 0 && (
            <button
              onClick={onClear}
              className="px-3 py-2 rounded-xl bg-[#18120e] hover:bg-red-500/20 text-[#b5a391] hover:text-red-400 border border-[#9c663b]/40 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR</span>
            </button>
          )}
        </div>
      </div>

      {/* Unboxed Floating Selected Ticket Ball Slots */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#b5a391] font-bold">
          <span>SELECTED NUMBERS ({selectedNumbers.length}/6)</span>
          <span className="text-[#e6ca65] font-mono font-extrabold">200 SC / TICKET</span>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-3.5 py-1">
          {Array.from({ length: 6 }).map((_, i) => {
            const num = selectedNumbers[i];
            return (
              <div
                key={i}
                className={`aspect-square rounded-full flex items-center justify-center font-black font-mono text-sm sm:text-base transition-all duration-300 ${
                  num !== undefined
                    ? 'bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_20px_rgba(212,175,55,0.6)] scale-105 animate-in zoom-in'
                    : 'bg-[#18120e] border-2 border-dashed border-[#9c663b]/40 text-[#b5a391]/30'
                }`}
              >
                {num !== undefined ? num.toString().padStart(2, '0') : '?'}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unboxed 1-49 Small Circular Ball Matrix */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center text-xs text-[#b5a391] font-extrabold">
          <span>BALL MATRIX (1 - 49)</span>
          <span className="text-[10px] text-[#e6ca65]">TAP BALL TO TOGGLE</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-10 gap-2 justify-items-center py-2">
          {numbers.map((num) => {
            const isSelected = selectedNumbers.includes(num);
            return (
              <button
                key={num}
                type="button"
                onClick={() => onToggleNumber(num)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-black font-mono text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-md ${
                  isSelected
                    ? 'bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] border-2 border-[#faf6f0] shadow-[0_0_15px_rgba(212,175,55,0.7)] scale-110'
                    : 'bg-[#18120e] hover:bg-[#281d14] text-[#faf6f0] border border-[#9c663b]/50 hover:border-[#e6ca65]'
                }`}
              >
                {num.toString().padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Ticket Button */}
      <button
        onClick={onAddTicketToSlip}
        disabled={selectedNumbers.length !== 6}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border border-[#faf6f0]/40 active:scale-95"
      >
        <PlusCircle className="w-5 h-5 fill-current" />
        <span>ADD TICKET TO SLIP (200 SC)</span>
      </button>
    </div>
  );
};
