'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Trophy, ShieldCheck, History, RefreshCw } from 'lucide-react';
import { triggerDailyDrawAction, getLatestDrawAction } from '@/actions/lottery/lotteryActions';
import { toast } from 'sonner';

interface DrawHistorySectionProps {
  onDrawSettled?: () => void;
}

export const DrawHistorySection: React.FC<DrawHistorySectionProps> = ({ onDrawSettled }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });
  const [drawing, setDrawing] = useState(false);
  const [latestDraw, setLatestDraw] = useState<{
    drawCode: string;
    winningNumbers: number[];
    bonusBall: number;
    totalWinners: string;
    seedHash: string;
  }>({
    drawCode: 'DRAW-649-1491',
    winningNumbers: [6, 12, 19, 28, 37, 44],
    bonusBall: 9,
    totalWinners: '3',
    seedHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  });

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

  // Fetch real latest draw on mount
  useEffect(() => {
    async function loadDraw() {
      const res = await getLatestDrawAction();
      if (res.success && res.draw) {
        setLatestDraw(res.draw);
      }
    }
    loadDraw();
  }, []);

  // Execute 24-Hour Lottery Draw (Trigger Draw)
  const handleExecuteDraw = async () => {
    setDrawing(true);
    try {
      const res = await triggerDailyDrawAction();
      if (res.success && res.winningNumbers) {
        setLatestDraw({
          drawCode: res.draw?.drawCode || `DRAW-649-${Date.now().toString().slice(-4)}`,
          winningNumbers: res.winningNumbers,
          bonusBall: res.bonusBall,
          totalWinners: res.totalWinners?.toString() || '0',
          seedHash: res.seedHash || '',
        });

        toast.success('🎉 6/49 DAILY DRAW EXECUTED SUCCESSFULLY!', {
          description: `Winning Numbers: ${res.winningNumbers.join(', ')} • Bonus: ${res.bonusBall}`,
        });

        if (onDrawSettled) onDrawSettled();
      } else {
        toast.error(res.error || 'Failed to execute draw.');
      }
    } catch (err: any) {
      toast.error('Server error executing draw.');
    } finally {
      setDrawing(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3">
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-2">
        <h2 className="text-sm font-black text-[#faf6f0] flex items-center gap-1.5">
          <History className="w-4 h-4 text-[#e6ca65]" />
          <span>Draw Schedule & Auto Settlement</span>
        </h2>

        <button
          onClick={handleExecuteDraw}
          disabled={drawing}
          className="px-2.5 py-1 rounded-lg bg-[#e6ca65]/20 hover:bg-[#e6ca65]/30 border border-[#e6ca65]/50 text-[#e6ca65] text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
          title="Simulate / Trigger 24-Hour Automated Settlement Draw Now"
        >
          <RefreshCw className={`w-3 h-3 ${drawing ? 'animate-spin' : ''}`} />
          <span>{drawing ? 'DRAWING...' : 'TRIGGER DRAW NOW'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Next Draw Timer */}
        <div className="p-3 rounded-xl bg-[#0c0a09]/90 border border-[#e6ca65]/40 space-y-1">
          <span className="text-[10px] font-bold text-[#b5a391] uppercase tracking-wider block">
            NEXT 24-HR DRAW TIMER
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
            {latestDraw.drawCode} WINNING BALLS
          </span>
          <div className="flex items-center gap-1 flex-wrap">
            {latestDraw.winningNumbers.map((num) => (
              <span
                key={num}
                className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] text-[10px] font-mono font-black flex items-center justify-center border border-[#faf6f0]"
              >
                {num.toString().padStart(2, '0')}
              </span>
            ))}
            <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-red-600 text-[#faf6f0] text-[10px] font-mono font-black flex items-center justify-center border border-[#faf6f0]">
              {latestDraw.bonusBall.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
