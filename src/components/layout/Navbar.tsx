'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Sparkles, Dices, Volume2, VolumeX, Gift, RefreshCw, Rocket, Radio, Settings, Gem } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { WalletBadge } from './WalletBadge';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { soundEnabled, toggleSound, balance } = useGameStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#121624]/90 backdrop-blur-2xl px-4 sm:px-8 py-3.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Cat Avatar */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform overflow-hidden">
              <div className="w-full h-full bg-[#181d2e] rounded-[14px] flex items-center justify-center text-xl">
                🐱
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white hidden sm:inline">
              SIXY<span className="text-indigo-400">WIN</span>
            </span>
          </Link>

          {/* Search Box */}
          <div className="hidden lg:flex items-center gap-2 bg-[#181d2e] border border-slate-800 rounded-2xl px-4 py-2 text-xs w-64 text-slate-400 focus-within:border-indigo-500 transition-all">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search games..."
              className="bg-transparent text-white outline-none w-full placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Center: Category Icons */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-[#181d2e]/90 p-1.5 rounded-2xl border border-slate-800/90 text-xs font-bold text-slate-300">
          <button className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/30">
            <Gem className="w-3.5 h-3.5 text-indigo-200" />
            <span className="hidden sm:inline">CASINO</span>
          </button>
          <button className="px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1.5">
            <Dices className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SPORTS</span>
          </button>
          <button className="px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">CRASH</span>
          </button>
          <button className="px-3 py-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="hidden md:inline">LIVE</span>
          </button>
        </nav>

        {/* Right Controls & Wallet */}
        <div className="flex items-center gap-3">
          <WalletBadge />

          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="p-2.5 rounded-2xl bg-[#181d2e] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-400" />
            )}
          </button>

          <Button
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold px-5 py-2.5 rounded-2xl border border-indigo-400/30 shadow-lg shadow-indigo-600/30"
          >
            REGISTER
          </Button>
        </div>
      </div>
    </header>
  );
};
