'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Gem, Dices, Rocket, Radio, Volume2, VolumeX, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'casino' | 'sports' | 'crash' | 'live'>('casino');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#121624]/90 backdrop-blur-2xl px-4 sm:px-8 py-3.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo & Search */}
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

        {/* Center: Category Pills */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-[#181d2e]/90 p-1.5 rounded-2xl border border-slate-800/90 text-xs font-bold text-slate-300">
          <button
            onClick={() => setActiveCategory('casino')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'casino'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Gem className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CASINO</span>
          </button>

          <button
            onClick={() => setActiveCategory('sports')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'sports'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Dices className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SPORTS</span>
          </button>

          <button
            onClick={() => setActiveCategory('crash')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'crash'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">CRASH</span>
          </button>

          <button
            onClick={() => setActiveCategory('live')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'live'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="hidden md:inline">LIVE</span>
          </button>
        </nav>

        {/* Right: Pre-Login Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound FX Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label="Toggle Sound"
            className="p-2.5 rounded-2xl bg-[#181d2e] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-400" />
            )}
          </button>

          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="px-4 py-2 text-xs font-extrabold text-slate-200 hover:text-white bg-[#181d2e] border border-slate-800 hover:border-slate-700 rounded-2xl transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5 text-indigo-400" />
            <span>LOGIN</span>
          </button>

          {/* Register CTA Button */}
          <button
            onClick={onRegisterClick}
            className="px-5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 active:scale-95 flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>REGISTER</span>
          </button>
        </div>
      </div>
    </header>
  );
};
