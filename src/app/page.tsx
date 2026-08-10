'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ProvidersBlock } from '@/components/dashboard/ProvidersBlock';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RightSidebar } from '@/components/dashboard/RightSidebar';
import { LastGamesTable } from '@/components/dashboard/LastGamesTable';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Button } from '@/components/ui/Button';
import { Zap, Sparkles, Play } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

// Dynamic interactive game modules
const FortuneWheel = dynamic(() => import('@/components/games/FortuneWheel'), {
  loading: () => <SkeletonCard />,
});
const SlotMachine = dynamic(() => import('@/components/games/SlotMachine'), {
  loading: () => <SkeletonCard />,
});
const HighLowGame = dynamic(() => import('@/components/games/HighLowGame'), {
  loading: () => <SkeletonCard />,
});

export default function HomePage() {
  const [activeGame, setActiveGame] = useState<string | null>('fortune-wheel');
  const { balance } = useGameStore();

  const handleLaunchGame = (gameId: string) => {
    setActiveGame(gameId);
    const arena = document.getElementById('game-arena');
    if (arena) arena.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* 3-Column Layout Matching Reference Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Providers & Stats */}
        <div className="lg:col-span-3 space-y-6">
          <ProvidersBlock />
          <StatsCard />
        </div>

        {/* Center Main Area: Welcome Banner & Games Showcase */}
        <div className="lg:col-span-6 space-y-8">
          {/* Welcome Bonus Hero Banner */}
          <div className="rounded-[2.5rem] bg-[#181d2e] border border-slate-800/80 p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-4 max-w-xs relative z-10">
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                Welcome <br /> Bonus!
              </h1>
              <p className="text-sm font-bold text-indigo-300">200+ free pixels</p>

              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button
                  size="md"
                  onClick={() => handleLaunchGame('fortune-wheel')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-600/30 border border-indigo-400/30"
                >
                  REGISTER
                </Button>
                <div className="flex items-center gap-2 text-xl text-slate-400">
                  <span>🎮</span>
                  <span>🦊</span>
                </div>
              </div>
            </div>

            {/* Right Character Image */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 relative rounded-3xl overflow-hidden shadow-2xl shrink-0 border border-slate-700/50">
              <Image
                src="/landing/hero_character.png"
                alt="Welcome Character"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Interactive Game Arena */}
          {activeGame && (
            <section className="space-y-4 scroll-mt-24" id="game-arena">
              <div className="flex items-center justify-between bg-[#181d2e] p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400" /> Active Arena
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

          {/* Featured Games Grid Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Game 1: Space Donkey */}
            <div
              onClick={() => handleLaunchGame('fortune-wheel')}
              className="group rounded-3xl bg-[#181d2e] border border-slate-800/80 hover:border-indigo-500/60 p-3 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-xl"
            >
              <div className="w-full h-40 relative rounded-2xl overflow-hidden">
                <Image src="/landing/space_donkey.png" alt="Space Donkey" fill className="object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-xs text-white font-bold shadow-md">
                  A
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white px-1">Space Donkey</h3>
            </div>

            {/* Game 2: Divine Lotus */}
            <div
              onClick={() => handleLaunchGame('slot-machine')}
              className="group rounded-3xl bg-[#181d2e] border border-slate-800/80 hover:border-indigo-500/60 p-3 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-xl"
            >
              <div className="w-full h-40 relative rounded-2xl overflow-hidden">
                <Image src="/landing/divine_lotus.png" alt="Divine Lotus" fill className="object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-xs text-white font-bold shadow-md">
                  S
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white px-1">Divine Lotus</h3>
            </div>

            {/* Game 3: Rainbow Reels */}
            <div
              onClick={() => handleLaunchGame('high-low')}
              className="group rounded-3xl bg-[#181d2e] border border-slate-800/80 hover:border-indigo-500/60 p-3 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-xl"
            >
              <div className="w-full h-40 relative rounded-2xl overflow-hidden">
                <Image src="/landing/rainbow_reels.png" alt="Rainbow Reels" fill className="object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute bottom-2 right-2 w-6 h-6 rounded-lg bg-pink-600 flex items-center justify-center text-xs text-white font-bold shadow-md">
                  Σ
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white px-1">Rainbow Reels</h3>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="lg:col-span-3">
          <RightSidebar onLaunchGame={handleLaunchGame} />
        </div>
      </div>

      {/* Bottom Live Bets Table */}
      <LastGamesTable />
    </div>
  );
}
