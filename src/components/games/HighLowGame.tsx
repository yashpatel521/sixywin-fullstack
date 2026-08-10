'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { ArrowUp, ArrowDown, Sparkles, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

const CARDS = [
  { rank: '2', val: 2, suit: '♠' },
  { rank: '4', val: 4, suit: '♥' },
  { rank: '7', val: 7, suit: '♦' },
  { rank: '9', val: 9, suit: '♣' },
  { rank: 'J', val: 11, suit: '♠' },
  { rank: 'Q', val: 12, suit: '♥' },
  { rank: 'K', val: 13, suit: '♦' },
  { rank: 'A', val: 14, suit: '♠' },
];

export default function HighLowGame() {
  const { balance, deductBalance, addBalance, activeBet, setActiveBet, addWinNotification } = useGameStore();
  const [currentCard, setCurrentCard] = useState(CARDS[2]); // Start with card '7'
  const [nextCard, setNextCard] = useState<typeof CARDS[0] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  const handleGuess = (guess: 'HIGH' | 'LOW') => {
    if (playing || balance < activeBet) return;
    if (!deductBalance(activeBet)) {
      setResultMsg('Insufficient chips balance!');
      return;
    }

    setPlaying(true);
    setResultMsg(null);

    setTimeout(() => {
      const drawn = CARDS[Math.floor(Math.random() * CARDS.length)];
      setNextCard(drawn);

      let isWin = false;
      if (guess === 'HIGH' && drawn.val >= currentCard.val) isWin = true;
      if (guess === 'LOW' && drawn.val <= currentCard.val) isWin = true;

      const payout = isWin ? activeBet * 2 : 0;
      if (isWin) {
        addBalance(payout);
        confetti({ particleCount: 50, spread: 50 });
        addWinNotification({
          id: `win-${Date.now()}`,
          username: 'You',
          gameTitle: 'High-Low Cards',
          amount: payout,
          multiplier: '2x',
          timeAgo: 'Just now',
          avatar: '🃏',
        });
      }

      setResultMsg(
        isWin
          ? `Correct! Drawn ${drawn.rank}${drawn.suit}. You won ${payout} chips!`
          : `Wrong! Drawn ${drawn.rank}${drawn.suit}. Lost ${activeBet} chips.`
      );

      setCurrentCard(drawn);
      setPlaying(false);
    }, 600);
  };

  return (
    <GlassCard glowColor="purple" className="flex flex-col items-center text-center p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2 text-purple-400">
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest">HIGH-LOW CARDS</span>
      </div>
      <h2 className="text-3xl font-black text-white mb-6">Predict Next Card</h2>

      {/* Card Arena */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-28 h-40 bg-gradient-to-tr from-slate-900 via-purple-950 to-slate-900 border-2 border-purple-500/50 rounded-2xl flex flex-col items-center justify-between p-4 shadow-xl text-white">
          <span className="self-start text-lg font-black">{currentCard.rank}</span>
          <span className="text-4xl">{currentCard.suit}</span>
          <span className="self-end text-lg font-black">{currentCard.rank}</span>
        </div>
      </div>

      {/* Controls */}
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
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {amt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleGuess('HIGH')}
            isLoading={playing}
            className="bg-emerald-600 hover:bg-emerald-500 border-emerald-400/40 text-white"
          >
            <ArrowUp className="w-5 h-5" />
            HIGHER (2x)
          </Button>

          <Button
            variant="danger"
            size="lg"
            onClick={() => handleGuess('LOW')}
            isLoading={playing}
          >
            <ArrowDown className="w-5 h-5" />
            LOWER (2x)
          </Button>
        </div>

        {resultMsg && (
          <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 text-sm font-bold animate-fade-in">
            {resultMsg}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
