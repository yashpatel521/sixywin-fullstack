'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Trophy, ShieldCheck, History, Sparkles, RefreshCw } from 'lucide-react';

export const DrawHistorySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

  // Live ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const previousDrawNumbers = [6, 12, 19, 28, 37, 44];
  const bonusBall = 9;

  return (
    <div className="w-full space-y-6 pt-4 border-t border-[#9c663b]/30">
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-lg sm:text-xl font-black text-[#faf6f0] flex items-center gap-2">
          <History className="w-5 h-5 text-[#e6ca65]" />
          <span>Live 6/49 Draw Schedule & Previous Results</span>
        </h2>
        <span className="text-xs font-mono text-[#b5a391] flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#e6ca65]" />
          <span>Provably Fair RNG Engine</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Next Draw Ticker Card */}
        <div className="lg:col-span-6 rounded-3xl bg-[#18120e]/85 border border-[#e6ca65]/50 p-6 shadow-[0_20px_50px_rgba(212,175,55,0.15)] backdrop-blur-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#e6ca65] animate-pulse" />
              <span className="text-sm font-black text-[#faf6f0] uppercase tracking-wider">
                NEXT DRAW #1492 COUNTDOWN
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-xs font-mono font-bold">
              LIVE TIMER
            </span>
          </div>

          {/* Countdown Clock Displays */}
          <div className="grid grid-cols-3 gap-3 text-center py-2">
            <div className="p-3 rounded-2xl bg-[#0c0a09]/90 border border-[#e6ca65]/40">
              <span className="text-2xl sm:text-4xl font-black font-mono text-[#e6ca65] block">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold text-[#b5a391] uppercase tracking-wider">
                HOURS
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0c0a09]/90 border border-[#e6ca65]/40">
              <span className="text-2xl sm:text-4xl font-black font-mono text-[#e6ca65] block">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold text-[#b5a391] uppercase tracking-wider">
                MINUTES
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-[#0c0a09]/90 border border-[#e6ca65]/40">
              <span className="text-2xl sm:text-4xl font-black font-mono text-[#e6ca65] block">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] font-bold text-[#b5a391] uppercase tracking-wider">
                SECONDS
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#b5a391] pt-1">
            <span>Draw Frequency: <strong className="text-[#faf6f0]">Every 24 Hours (00:00 UTC)</strong></span>
            <span>Jackpot Pool: <strong className="text-[#e6ca65] font-mono">1,250,000 SC</strong></span>
          </div>
        </div>

        {/* Right Column: Previous Draw Results Showcase */}
        <div className="lg:col-span-6 rounded-3xl bg-[#18120e]/85 border border-[#e6ca65]/50 p-6 shadow-[0_20px_50px_rgba(212,175,55,0.15)] backdrop-blur-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#e6ca65]" />
              <span className="text-sm font-black text-[#faf6f0] uppercase tracking-wider">
                PREVIOUS DRAW #1491 WINNING NUMBERS
              </span>
            </div>
            <span className="text-xs font-mono text-[#b5a391]">Yesterday, 00:00 UTC</span>
          </div>

          {/* Winning Numbers Spheres Row */}
          <div className="space-y-2 py-1">
            <div className="flex items-center gap-2 flex-wrap justify-between">
              <div className="flex items-center gap-2">
                {previousDrawNumbers.map((num) => (
                  <span
                    key={num}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] text-sm sm:text-base font-mono font-black flex items-center justify-center shadow-lg border-2 border-[#faf6f0]"
                  >
                    {num.toString().padStart(2, '0')}
                  </span>
                ))}
              </div>

              {/* Bonus Ball */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-[#9c663b]/40">
                <span className="text-[10px] text-[#b5a391] font-bold uppercase">BONUS:</span>
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 text-[#faf6f0] text-sm sm:text-base font-mono font-black flex items-center justify-center shadow-lg border-2 border-[#faf6f0]">
                  {bonusBall.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#b5a391] pt-1">
            <span>Jackpot Payout: <strong className="text-[#e6ca65]">1,250,000 SC (3 Winners)</strong></span>
            <span className="font-mono text-[11px] text-[#e6ca65]">Seed Hash Verified ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
