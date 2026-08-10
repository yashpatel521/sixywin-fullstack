'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { JackpotCounter } from '@/components/feeds/JackpotCounter';
import { LiveWinnersFeed } from '@/components/feeds/LiveWinnersFeed';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Sparkles, Dices, Flame, Layers, Play, Zap } from 'lucide-react';
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
    description: 'Spin the 12-segment cyber wheel for multipliers up to 50x!',
    rtp: '98.5%',
    minBet: 10,
    maxMultiplier: '50x',
    bgGradient: 'from-cyan-900/40 via-slate-900 to-slate-950',
    iconName: '🎡',
    hot: true,
  },
  {
    id: 'slot-machine',
    title: 'Neon Slot 777',
    category: 'Slots',
    description: 'Classic 3x3 slot reels featuring triple 777 progressive jackpot.',
    rtp: '97.8%',
    minBet: 10,
    maxMultiplier: '100x',
    bgGradient: 'from-pink-900/40 via-slate-900 to-slate-950',
    iconName: '🎰',
    popular: true,
  },
  {
    id: 'high-low',
    title: 'High-Low Cards',
    category: 'Cards',
    description: 'Predict whether the next drawn card is higher or lower for instant 2x payouts.',
    rtp: '99.0%',
    minBet: 10,
    maxMultiplier: '2x',
    bgGradient: 'from-purple-900/40 via-slate-900 to-slate-950',
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

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next-Gen iGaming Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            Play Next-Gen Mini-Games with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-400">Instant Payouts</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg">
            Experience smooth 3D games powered by Next.js 15 Server Actions, Zustand state, and Drizzle ORM.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="lg" onClick={() => setActiveGame('fortune-wheel')}>
              <Play className="w-5 h-5 fill-current" /> Play Cyber Wheel
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setActiveGame('slot-machine')}>
              <Flame className="w-5 h-5 text-amber-400" /> Play Neon Slots
            </Button>
          </div>
        </div>
      </div>

      {/* Live Jackpot Bar */}
      <JackpotCounter />

      {/* Interactive Active Game Player Arena */}
      {activeGame && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-400" /> Active Game Arena
            </h2>
            <button
              onClick={() => setActiveGame(null)}
              className="text-xs font-bold text-slate-400 hover:text-white"
            >
              Close Arena ✕
            </button>
          </div>

          <div className="transition-all">
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
            <h2 className="text-2xl font-black text-white">Featured Games</h2>
            <p className="text-slate-400 text-sm">Select a mini-game to launch</p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {['All', 'Wheel', 'Slots', 'Cards'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GlassCard
              key={game.id}
              glowColor={game.id === 'fortune-wheel' ? 'cyan' : game.id === 'slot-machine' ? 'pink' : 'purple'}
              className={`bg-gradient-to-br ${game.bgGradient} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{game.iconName}</span>
                  <div className="flex items-center gap-2">
                    {game.hot && <Badge variant="hot">HOT</Badge>}
                    {game.popular && <Badge variant="popular">POPULAR</Badge>}
                    <Badge variant="neutral">RTP {game.rtp}</Badge>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-slate-300 text-xs mb-4 leading-relaxed">{game.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Max Multiplier</span>
                  <span className="text-sm font-black text-cyan-300">{game.maxMultiplier}</span>
                </div>
                <Button
                  size="sm"
                  variant={activeGame === game.id ? 'accent' : 'primary'}
                  onClick={() => setActiveGame(game.id)}
                >
                  {activeGame === game.id ? 'Playing Now' : 'Launch Game'}
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Live Winners Section */}
      <LiveWinnersFeed />
    </div>
  );
}
