'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Trophy, ShieldCheck, History } from 'lucide-react';

export const DrawHistorySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

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
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3">
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-2">
        <h2 className="text-sm font-black text-[#faf6f0] flex items-center gap-1.5">
          <History className="w-4 h-4 text-[#e6ca65]" />
          <span>Draw Schedule & Previous Results</span>
        </h2>
        <span className="text-[10px] font-mono text-[#e6ca65] flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#e6ca65]" /> Provably Fair
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Next Draw Timer */}
        <div className="p-3 rounded-xl bg-[#0c0a09]/90 border border-[#e6ca65]/40 space-y-1">
          <span className="text-[10px] font-bold text-[#b5a391] uppercase tracking-wider block">
            NEXT DRAW #1492 TIMER
          </span>
          <div className="flex items-center gap-2 font-mono font-black text-base text-[#e6ca65]">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>
              {timeLeft.hours.toString().padStart(2, '0')}h : {timeLeft.minutes.toString().padStart(2, '0')}m : {timeLeft.seconds.toString().padStart(2, '0')}s
            </span>
          </div>
          <span className="text-[10px] text-[#b5a391] block">Jackpot: <strong className="text-[#faf6f0]">1,250,000 SC</strong></span>
        </div>

        {/* Previous Draw Winning Balls */}
        <div className="p-3 rounded-xl bg-[#0c0a09]/90 border border-[#e6ca65]/40 space-y-1.5">
          <span className="text-[10px] font-bold text-[#b5a391] uppercase tracking-wider block">
            DRAW #1491 WINNING BALLS
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {previousDrawNumbers.map((num) => (
              <span
                key={num}
                className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] text-[10px] font-mono font-black flex items-center justify-center border border-[#faf6f0]"
              >
                {num.toString().padStart(2, '0')}
              </span>
            ))}
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-red-600 text-[#faf6f0] text-[10px] font-mono font-black flex items-center justify-center border border-[#faf6f0]">
              {bonusBall.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
