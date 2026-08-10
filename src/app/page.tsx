'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MinimalHero } from '@/components/landing/MinimalHero';
import { MinimalGameCard } from '@/components/landing/MinimalGameCard';
import { JackpotCounter } from '@/components/feeds/JackpotCounter';
import { LiveWinnersFeed } from '@/components/feeds/LiveWinnersFeed';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { ShieldCheck, Zap, Layers, Lock, Cpu, Sparkles } from 'lucide-react';
import { GameMeta } from '@/types/game';

// Lazy load heavy interactive game modules with dynamic imports & fallback skeletons
const FortuneWheel = dynamic(() => import('@/components/games/FortuneWheel'), {
  loading: () => <SkeletonCard />,
});
const SlotMachine = dynamic(() => import('@/components/games/SlotMachine'), {
  loading: () => <SkeletonCard />,
});
const HighLowGame = dynamic(() => import('@/components/games/HighLowGame'), {
  loading: () => <SkeletonCard />,
});

const GAMES_CATALOG: GameMeta[] = [
  {
    id: 'fortune-wheel',
    title: 'Cyber Fortune Wheel',
    category: 'Wheel',
    description: 'Spin the 12-segment wheel for multipliers up to 50x evaluated server-side.',
    rtp: '98.5%',
    minBet: 10,
    maxMultiplier: '50x',
    bgGradient: '',
    iconName: '🎡',
    hot: true,
  },
  {
    id: 'slot-machine',
    title: 'Neon Slot 777',
    category: 'Slots',
    description: 'Classic 3x3 slot reels featuring triple 777 progressive jackpot settlement.',
    rtp: '97.8%',
    minBet: 10,
    maxMultiplier: '100x',
    bgGradient: '',
    iconName: '🎰',
    popular: true,
  },
  {
    id: 'high-low',
    title: 'High-Low Cards',
    category: 'Cards',
    description: 'Predict whether the next card is higher or lower for instant 2x payouts.',
    rtp: '99.0%',
    minBet: 10,
    maxMultiplier: '2x',
    bgGradient: '',
    iconName: '🃏',
  },
];

export default function HomePage() {
  const [activeGame, setActiveGame] = useState<string | null>('fortune-wheel');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredGames =
    filterCategory === 'All'
      ? GAMES_CATALOG
      : GAMES_CATALOG.filter((g) => g.category === filterCategory);

  const handleLaunchGame = (gameId: string) => {
    setActiveGame(gameId);
    const arenaEl = document.getElementById('game-arena');
    if (arenaEl) {
      arenaEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section: Modern Minimal Casino Theme */}
      <MinimalHero onLaunchGame={handleLaunchGame} />

      {/* Live Progressive Jackpot Bar */}
      <JackpotCounter />

      {/* Active Game Player Arena */}
      {activeGame && (
        <section className="space-y-4 scroll-mt-24" id="game-arena">
          <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> Active Arena
              </h2>
            </div>
            <button
              onClick={() => setActiveGame(null)}
              className="px-3 py-1 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-950 border border-slate-800"
            >
              Close Arena ✕
            </button>
          </div>

          <div className="transition-all duration-300">
            {activeGame === 'fortune-wheel' && <FortuneWheel />}
            {activeGame === 'slot-machine' && <SlotMachine />}
            {activeGame === 'high-low' && <HighLowGame />}
          </div>
        </section>
      )}

      {/* Games Catalog Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Games Catalog</h2>
            <p className="text-slate-400 text-xs mt-1">Provably fair instant mini-games</p>
          </div>

          {/* Minimal Category Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {['All', 'Wheel', 'Slots', 'Cards'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <MinimalGameCard
              key={game.id}
              {...game}
              isActive={activeGame === game.id}
              onLaunch={handleLaunchGame}
            />
          ))}
        </div>
      </section>

      {/* Minimal Platform Trust Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">100% Provably Fair</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Every outcome is calculated using server-side cryptographic hash chains for 100% verifiability.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Next.js Server Actions</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Zero client-side tampering. Game physics and random seeds run inside secure server runtime functions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Supabase PostgreSQL</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Drizzle ORM schema persistence for real-time user wallets, game transaction logs, and global leaderboards.
          </p>
        </div>
      </section>

      {/* Live Winners Feed */}
      <LiveWinnersFeed />
    </div>
  );
}
