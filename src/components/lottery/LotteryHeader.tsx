'use client';

import React, { useState, useEffect } from 'react';
import { Crown, Clock, Trophy, Coins, HelpCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { LotteryRulesModal } from './LotteryRulesModal';

export const LotteryHeader: React.FC = () => {
  const { user } = useAuthStore();
  const [showRulesModal, setShowRulesModal] = useState(false);

  // Live real-time countdown timer state
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

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#18120e]/90 border border-[#e6ca65]/40 shadow-md backdrop-blur-xl">
        {/* Live Ticking 3D Gold Ticker */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-black text-[#e6ca65] uppercase tracking-wider">
            <Crown className="w-4 h-4 text-[#e6ca65] animate-pulse" />
            <span>6/49 DRAW #1492</span>
          </div>

          <span className="text-[#9c663b] hidden sm:inline">•</span>

          <div className="flex items-center gap-1.5 text-[#b5a391]">
            <Clock className="w-3.5 h-3.5 text-[#e6ca65] animate-pulse" />
            <span>
              CLOSES IN:{' '}
              <strong className="text-[#faf6f0] font-mono font-bold">
                {timeLeft.hours.toString().padStart(2, '0')}h : {timeLeft.minutes.toString().padStart(2, '0')}m : {timeLeft.seconds.toString().padStart(2, '0')}s
              </strong>
            </span>
          </div>

          <span className="text-[#9c663b] hidden sm:inline">•</span>

          <div className="flex items-center gap-1 text-[#e6ca65] font-extrabold font-mono">
            <Trophy className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>JACKPOT: <strong className="text-[#faf6f0] font-black">1,250,000 SC</strong></span>
          </div>
        </div>

        {/* Right Action Group: How to Play Button + SC Balance Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRulesModal(true)}
            className="px-3 py-1 rounded-lg bg-[#281d14] hover:bg-[#38271a] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>HOW TO PLAY & RULES</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0c0a09] border border-[#e6ca65]/50 text-xs">
            <Coins className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span className="text-[10px] text-[#b5a391] uppercase tracking-wider font-extrabold">BALANCE:</span>
            <span className="font-mono font-black text-[#e6ca65]">
              {user?.sixyCoinsBalance || '10,000.00'} SC
            </span>
          </div>
        </div>
      </div>

      {/* Rules Modal Overlay */}
      <LotteryRulesModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
      />
    </>
  );
};
