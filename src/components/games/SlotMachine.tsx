'use client';

import React, { useState } from 'react';
import { playSlotMachineAction } from '@/actions/gameActions';
import { useGameStore } from '@/store/useGameStore';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const SLOT_SYMBOLS = ['7️⃣', '💎', '🍒', '🔔', '⭐', '🍋'];

export default function SlotMachine() {
  const { balance, setBalance, activeBet, setActiveBet, addWinNotification } = useGameStore();
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<[number, number, number]>([0, 1, 2]);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  const handlePullLever = async () => {
    if (spinning || balance < activeBet) return;
    setSpinning(true);
    setResultMsg(null);

    const res = await playSlotMachineAction(activeBet, balance);

    if (!res.success) {
      setResultMsg(res.message);
      setSpinning(false);
      return;
    }

    // Reel spin illusion sequence
    let count = 0;
    const interval = setInterval(() => {
      setReels([
        Math.floor(Math.random() * SLOT_SYMBOLS.length),
        Math.floor(Math.random() * SLOT_SYMBOLS.length),
        Math.floor(Math.random() * SLOT_SYMBOLS.length),
      ]);
      count++;
      if (count >= 15) {
        clearInterval(interval);
        setReels(res.reels);
        setSpinning(false);
        setBalance(res.newBalance);
        setResultMsg(res.message);

        if (res.multiplier >= 2.5) {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        }

        if (res.payout > 0) {
          addWinNotification({
            id: `win-${Date.now()}`,
            username: 'You',
            gameTitle: 'Neon Slot 777',
            amount: res.payout,
            multiplier: `${res.multiplier}x`,
            timeAgo: 'Just now',
            avatar: '🎰',
          });
        }
      }
    }, 80);
  };

  return (
    <GlassCard glowColor="pink" className="flex flex-col items-center text-center p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2 text-pink-400">
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest">NEON SLOT 777</span>
      </div>
      <h2 className="text-3xl font-black text-white mb-6">Triple 7 Jackpot Slots</h2>

      {/* Reel Display Frame */}
      <div className="flex items-center gap-4 bg-slate-950 p-6 rounded-3xl border-2 border-pink-500/40 shadow-[0_0_40px_rgba(236,72,153,0.3)] mb-8">
        {reels.map((symbolIdx, i) => (
          <div
            key={i}
            className="w-20 h-24 sm:w-24 sm:h-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shadow-inner select-none transition-all"
          >
            <span className={spinning ? 'animate-bounce' : ''}>
              {SLOT_SYMBOLS[symbolIdx]}
            </span>
          </div>
        ))}
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
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {amt}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handlePullLever}
          isLoading={spinning}
          disabled={spinning || balance < activeBet}
          className="w-full text-lg py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-pink-500/30 border-pink-400/40"
        >
          <Flame className="w-5 h-5 text-amber-300" />
          {spinning ? 'Spinning Reels...' : `SPIN SLOTS (${activeBet} CHIPS)`}
        </Button>

        {resultMsg && (
          <div className="p-3 rounded-xl bg-slate-900 border border-pink-500/30 text-pink-300 text-sm font-bold animate-fade-in">
            {resultMsg}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
