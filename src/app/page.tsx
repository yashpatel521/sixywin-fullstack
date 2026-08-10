'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AntigravityHero } from '@/components/landing/AntigravityHero';
import { AntigravityCard } from '@/components/ui/AntigravityCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { JackpotCounter } from '@/components/feeds/JackpotCounter';
import { LiveWinnersFeed } from '@/components/feeds/LiveWinnersFeed';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Sparkles, Dices, Flame, Layers, Play, Zap, ShieldCheck, Trophy } from 'lucide-react';
import { GameMeta } from '@/types/game';
import gsap from 'gsap';

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
    description: 'Spin the 12-segment spatial wheel for multipliers up to 50x with GSAP motion.',
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
    description: 'Classic 3x3 slot reels featuring triple 777 progressive jackpot settlement.',
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
    description: 'Predict whether the next card is higher or lower for instant 2x payouts.',
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
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredGames =
    filterCategory === 'All'
      ? GAMES_CATALOG
      : GAMES_CATALOG.filter((g) => g.category === filterCategory);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [filterCategory]);

  const handleLaunchGame = (gameId: string) => {
    setActiveGame(gameId);
    window.scrollTo({ top: 480, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section styled with Antigravity Design Skill */}
      <AntigravityHero onLaunchGame={handleLaunchGame} />

      {/* Live Jackpot Bar */}
      <JackpotCounter />

      {/* Interactive Active Game Player Arena */}
      {activeGame && (
        <section className="space-y-4 scroll-mt-24" id="game-arena">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" /> Active Spatial Arena
              </h2>
            </div>
            <button
              onClick={() => setActiveGame(null)}
              className="px-3 py-1 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-950 border border-slate-800"
            >
              Close Arena ✕
            </button>
          </div>

          <div className="transition-all duration-500">
            {activeGame === 'fortune-wheel' && <FortuneWheel />}
            {activeGame === 'slot-machine' && <SlotMachine />}
            {activeGame === 'high-low' && <HighLowGame />}
          </div>
        </section>
      )}

      {/* Spatial Games Catalog Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
              <Sparkles className="w-4 h-4" /> SPATIAL CATALOG
            </div>
            <h2 className="text-3xl font-black text-white">Featured Mini-Games</h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
            {['All', 'Wheel', 'Slots', 'Cards'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Antigravity 3D Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <AntigravityCard
              key={game.id}
              glowColor={game.id === 'fortune-wheel' ? 'cyan' : game.id === 'slot-machine' ? 'pink' : 'purple'}
              className={`bg-gradient-to-br ${game.bgGradient} flex flex-col justify-between h-[360px]`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl drop-shadow-md">{game.iconName}</span>
                  <div className="flex items-center gap-2">
                    {game.hot && <Badge variant="hot">HOT</Badge>}
                    {game.popular && <Badge variant="popular">POPULAR</Badge>}
                    <Badge variant="neutral">RTP {game.rtp}</Badge>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-2">{game.title}</h3>
                <p className="text-slate-300 text-xs mb-4 leading-relaxed font-normal">{game.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Max Multiplier</span>
                  <span className="text-base font-black text-cyan-300">{game.maxMultiplier}</span>
                </div>
                <Button
                  size="sm"
                  variant={activeGame === game.id ? 'accent' : 'primary'}
                  onClick={() => handleLaunchGame(game.id)}
                  className="px-5 py-2.5"
                >
                  {activeGame === game.id ? 'Playing Now' : 'Launch Game'}
                </Button>
              </div>
            </AntigravityCard>
          ))}
        </div>
      </section>

      {/* Antigravity Platform Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AntigravityCard glowColor="cyan" className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Provably Fair Engine</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Every spin and reel draw is evaluated via server actions with cryptographic transparency.
          </p>
        </AntigravityCard>

        <AntigravityCard glowColor="purple" className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Supabase PostgreSQL</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Persisted game sessions and transactions via Drizzle ORM and Supabase connection pooler.
          </p>
        </AntigravityCard>

        <AntigravityCard glowColor="amber" className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Instant Settlement</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Immediate wallet balance synchronization and live leaderboard updates under 100ms.
          </p>
        </AntigravityCard>
      </section>

      {/* Live Winners Feed Section */}
      <LiveWinnersFeed />
    </div>
  );
}
