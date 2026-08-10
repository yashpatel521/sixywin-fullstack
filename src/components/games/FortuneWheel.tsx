'use client';

import React, { useState } from 'react';
import { spinFortuneWheelAction } from '@/actions/gameActions';
import { useGameStore } from '@/store/useGameStore';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Sparkles, Dices, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const SEGMENTS = [
  { label: '0x', color: '#1e293b', multiplier: 0 },
  { label: '1.5x', color: '#0284c7', multiplier: 1.5 },
  { label: '2x', color: '#0d9488', multiplier: 2 },
  { label: '0.5x', color: '#334155', multiplier: 0.5 },
  { label: '5x', color: '#8b5cf6', multiplier: 5 },
  { label: '0x', color: '#1e293b', multiplier: 0 },
  { label: '10x', color: '#ec4899', multiplier: 10 },
  { label: '1.2x', color: '#0284c7', multiplier: 1.2 },
  { label: '25x', color: '#f59e0b', multiplier: 25 },
  { label: '0.5x', color: '#334155', multiplier: 0.5 },
  { label: '2x', color: '#0d9488', multiplier: 2 },
  { label: '50x 🚀', color: '#ef4444', multiplier: 50 },
];

export default function FortuneWheel() {
  const { balance, setBalance, activeBet, setActiveBet, addWinNotification } = useGameStore();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  const handleSpin = async () => {
    if (spinning || balance < activeBet) return;
    setSpinning(true);
    setResultMsg(null);

    const res = await spinFortuneWheelAction(activeBet, balance);

    if (!res.success) {
      setResultMsg(res.message);
      setSpinning(false);
      return;
    }

    const segIndex = (res.details?.segmentIndex as number) ?? 0;
    const numSegments = SEGMENTS.length;
    const segmentAngle = 360 / numSegments;
    const targetAngle = 360 - segIndex * segmentAngle - segmentAngle / 2;
    const totalRotation = rotation + 360 * 5 + targetAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setBalance(res.newBalance);
      setResultMsg(res.message);

      if (res.multiplier >= 5) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      if (res.payout > 0) {
        addWinNotification({
          id: `win-${Date.now()}`,
          username: 'You',
          gameTitle: 'Fortune Wheel',
          amount: res.payout,
          multiplier: `${res.multiplier}x`,
          timeAgo: 'Just now',
          avatar: '🎡',
        });
      }
    }, 4000);
  };

  return (
    <GlassCard glowColor="cyan" className="flex flex-col items-center text-center p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2 text-cyan-400">
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest">CYBER WHEEL</span>
      </div>
      <h2 className="text-3xl font-black text-white mb-6">Spin & Win Multipliers</h2>

      {/* Wheel Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-8 flex items-center justify-center">
        {/* Pointer Arrow */}
        <div className="absolute -top-4 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-[0_4px_10px_rgba(245,158,11,0.8)]" />

        {/* Wheel Disk */}
        <div
          className="w-full h-full rounded-full border-4 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-transform duration-[4000ms] ease-out overflow-hidden relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {SEGMENTS.map((seg, idx) => {
            const angle = (360 / SEGMENTS.length) * idx;
            return (
              <div
                key={idx}
                className="absolute w-full h-full top-0 left-0 flex justify-center pt-3 text-xs font-black text-white"
                style={{
                  backgroundColor: seg.color,
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '50% 50%',
                  clipPath: 'polygon(50% 50%, 37% 0%, 63% 0%)',
                }}
              >
                <span className="mt-2 tracking-wider drop-shadow-md">{seg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Center Cap */}
        <div className="absolute w-16 h-16 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center z-10 shadow-xl">
          <Dices className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {/* Bet Controls & Action */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
          <span className="text-xs font-bold text-slate-400 uppercase">Bet Chips:</span>
          <div className="flex items-center gap-2">
            {[10, 50, 100, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => setActiveBet(amt)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  activeBet === amt
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {amt}
              </button>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleSpin}
          isLoading={spinning}
          disabled={spinning || balance < activeBet}
          className="w-full text-lg py-4"
        >
          <RotateCw className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
          {spinning ? 'Spinning...' : `SPIN FOR ${activeBet} CHIPS`}
        </Button>

        {resultMsg && (
          <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-sm font-bold animate-fade-in">
            {resultMsg}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
