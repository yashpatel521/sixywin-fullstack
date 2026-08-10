'use client';

import React, { useState } from 'react';
import { Ticket, Sparkles, Shuffle, Trophy, Clock, ShieldCheck, Coins } from 'lucide-react';

export const LotterySection: React.FC = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([7, 14, 21, 33, 42, 49]);

  // Quick Pick Generator
  const handleQuickPick = () => {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const randomNum = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    numbers.sort((a, b) => a - b);
    setSelectedNumbers(numbers);
  };

  // Toggle Number Selection
  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < 6) {
      const updated = [...selectedNumbers, num].sort((a, b) => a - b);
      setSelectedNumbers(updated);
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#18120e] via-[#281c14] to-[#faf6f0] px-6 sm:px-16 py-24 text-[#faf6f0] m-0 overflow-hidden">
      {/* Ambient Gold Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#d4af37]/8 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto space-y-16">
        {/* Header with Virtual Jackpot Counter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#9c663b]/30 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#faf6f0]/10 border border-[#e6ca65]/40 text-[#e6ca65] text-xs sm:text-sm font-bold backdrop-blur-md">
              <Trophy className="w-4 h-4 text-[#e6ca65] animate-bounce" />
              <span className="tracking-wider uppercase">SIXYWIN 6/49 LOTTERY</span>
              <span className="text-[#9c663b]">•</span>
              <span className="text-[#faf6f0]">VIRTUAL PLAY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl 2xl:text-7xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
              Pick 6 Numbers (1 to 49) & Win Up To <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f]">
                1,000,000 SIXY COINS (SC)
              </span>
            </h2>
          </div>

          {/* Live Jackpot Banner */}
          <div className="rounded-3xl bg-[#18120e] border border-[#e6ca65]/50 p-8 space-y-2 shadow-2xl shrink-0">
            <div className="flex items-center justify-between gap-6 text-xs sm:text-sm text-[#b5a391]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#e6ca65]" />
                NEXT DRAW IN: <strong className="text-[#faf6f0] font-mono">04h 22m 15s</strong>
              </span>
              <span className="text-[#e6ca65] font-bold">DRAW #1492</span>
            </div>
            <div className="flex items-center gap-3 text-4xl sm:text-5xl font-black text-[#e6ca65] font-mono tracking-tight">
              <Coins className="w-10 h-10 text-[#e6ca65]" />
              <span>1,250,000 SC</span>
            </div>
          </div>
        </div>

        {/* 50-50 Interactive Lottery Ticket & Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 1-49 Interactive Ball Selection Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#faf6f0] flex items-center gap-2">
                <Ticket className="w-6 h-6 text-[#e6ca65]" />
                <span>Select 6 Lucky Numbers</span>
              </h3>

              <button
                onClick={handleQuickPick}
                className="px-5 py-2.5 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#9c663b]/60 text-[#e6ca65] text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>QUICK PICK</span>
              </button>
            </div>

            {/* 1 to 49 Number Balls Grid */}
            <div className="grid grid-cols-7 gap-3 sm:gap-4 p-8 rounded-3xl bg-[#18120e]/90 border border-[#9c663b]/40 shadow-2xl backdrop-blur-md">
              {Array.from({ length: 49 }, (_, i) => i + 1).map((num) => {
                const isSelected = selectedNumbers.includes(num);
                return (
                  <button
                    key={num}
                    onClick={() => toggleNumber(num)}
                    className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl font-bold font-mono text-base sm:text-lg flex items-center justify-center transition-all cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] font-black scale-105 shadow-lg shadow-[#d4af37]/30 ring-2 ring-[#faf6f0]'
                        : 'bg-[#0c0a09] text-[#b5a391] hover:text-[#faf6f0] border border-[#9c663b]/40 hover:border-[#e6ca65]'
                    }`}
                  >
                    {num < 10 ? `0${num}` : num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Ticket Preview & Payout Table (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Ticket Preview Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#9c663b]/40 pb-4">
                <span className="text-xs sm:text-sm font-bold text-[#b5a391]">YOUR TICKET SELECTION</span>
                <span className="text-xs sm:text-sm font-mono text-[#e6ca65] font-extrabold">6 / 6 PICKED</span>
              </div>

              {/* Selected 6 Balls Row */}
              <div className="flex items-center justify-between gap-2 py-2">
                {selectedNumbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] font-black font-mono text-lg sm:text-xl flex items-center justify-center shadow-lg shadow-[#d4af37]/25"
                  >
                    {num < 10 ? `0${num}` : num}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-base sm:text-lg font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40">
                <Ticket className="w-6 h-6" />
                <span>BUY TICKET (200 SIXY COINS)</span>
              </button>

              {/* Provably Fair Guarantee Footer */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-[#b5a391] pt-2">
                <span className="flex items-center gap-1.5 text-[#e6ca65]">
                  <ShieldCheck className="w-4.5 h-4.5" /> Provably Fair Engine
                </span>
                <span className="font-mono text-xs">Free Virtual Currency</span>
              </div>
            </div>

            {/* Payout Tier Table */}
            <div className="rounded-3xl bg-[#18120e] border border-[#9c663b]/40 p-6 space-y-4 shadow-xl">
              <h4 className="text-xs sm:text-sm font-bold text-[#b5a391] uppercase tracking-wider">
                6/49 Prize Tier Multipliers (SIXY COINS)
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm font-mono">
                <div className="flex justify-between items-center py-2 border-b border-[#9c663b]/20">
                  <span className="text-[#faf6f0]">Match 6 / 6 Balls</span>
                  <span className="text-[#e6ca65] font-bold">100% JACKPOT (1,250,000 SC)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#9c663b]/20">
                  <span className="text-[#faf6f0]">Match 5 / 6 Balls</span>
                  <span className="text-[#faf6f0] font-bold">50,000 SC</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#9c663b]/20">
                  <span className="text-[#faf6f0]">Match 4 / 6 Balls</span>
                  <span className="text-[#faf6f0] font-bold">1,000 SC</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#faf6f0]">Match 3 / 6 Balls</span>
                  <span className="text-[#faf6f0] font-bold">50 SC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
