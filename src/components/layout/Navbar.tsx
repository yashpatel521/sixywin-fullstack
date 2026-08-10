'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Dices, Trophy, Volume2, VolumeX, Gift, ShieldCheck, Crown } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { WalletBadge } from './WalletBadge';
import { Button } from '../ui/Button';
import { claimDailyBonusAction } from '@/actions/gameActions';

export const Navbar: React.FC = () => {
  const { soundEnabled, toggleSound, balance, addBalance } = useGameStore();
  const [claiming, setClaiming] = React.useState(false);

  const handleClaimBonus = async () => {
    setClaiming(true);
    try {
      const res = await claimDailyBonusAction(balance);
      if (res.success) {
        addBalance(res.payout);
      }
    } finally {
      setClaiming(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">
                SIXY<span className="text-emerald-400">WIN</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase -mt-0.5">
              MODERN CASINO
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          <Link
            href="/"
            className="px-4 py-2 text-xs font-bold text-white bg-slate-800/90 rounded-xl border border-slate-700/80 flex items-center gap-2"
          >
            <Dices className="w-4 h-4 text-emerald-400" />
            Games
          </Link>
          <Link
            href="/leaderboard"
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800/40 rounded-xl transition-all flex items-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            Leaderboard
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={handleClaimBonus}
            isLoading={claiming}
            className="hidden sm:flex bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400/40 font-extrabold"
          >
            <Gift className="w-4 h-4" />
            Daily +500
          </Button>

          <WalletBadge />

          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
