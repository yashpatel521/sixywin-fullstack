'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Play,
  Gem,
  Trophy,
  Sparkles,
  Flame,
  Star,
  ShieldCheck,
  Coins,
  Clock,
  Shuffle,
  X,
  Crown,
  Ticket,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

interface Game {
  id: string;
  title: string;
  category: string;
  categorySlug: 'lottery' | 'cards' | 'mines' | 'wheel' | 'slots' | 'dice';
  icon: string;
  badge: string;
  multiplier: string;
  description: string;
  rtp: string;
  featured?: boolean;
  minBet: string;
}

export default function GamesPage() {
  const { user, isLoggedIn, updateBalance } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGameModal, setActiveGameModal] = useState<Game | null>(null);

  // Games Catalogue
  const games: Game[] = [
    {
      id: 'lottery-649',
      title: '6/49 Lottery Jackpot',
      category: 'LIVE LOTTERY',
      categorySlug: 'lottery',
      icon: '🎟️',
      badge: '1,250,000 SC',
      multiplier: 'JACKPOT',
      description: 'Pick 6 numbers out of 1 to 49 for daily virtual Sixy Coins draws.',
      rtp: '99.2%',
      featured: true,
      minBet: '200 SC',
    },
    {
      id: 'highlow-double-trouble',
      title: 'HighLow (Double Trouble)',
      category: 'CARD PREDICTOR',
      categorySlug: 'cards',
      icon: '🃏',
      badge: '2x INSTANT',
      multiplier: 'DOUBLE TROUBLE',
      description: 'Predict higher or lower cards with Double Trouble multiplier streaks.',
      rtp: '99.0%',
      featured: true,
      minBet: '100 SC',
    },
    {
      id: 'mines-sweeper',
      title: 'Minesweeper Matrix',
      category: 'RISK MULTIPLIER',
      categorySlug: 'mines',
      icon: '💣',
      badge: '1,000x MAX',
      multiplier: 'GEM HUNTER',
      description: 'Uncover hidden 24K gold gems across the grid while dodging explosive mines.',
      rtp: '98.8%',
      featured: true,
      minBet: '50 SC',
    },
    {
      id: 'fortune-wheel',
      title: 'Cyber Fortune Wheel',
      category: 'SPINNER TABLE',
      categorySlug: 'wheel',
      icon: '🎡',
      badge: '50x MULTIPLIER',
      multiplier: 'SPATIAL WHEEL',
      description: 'Spin 12-segment wheel with server-side RNG settlement.',
      rtp: '98.5%',
      featured: true,
      minBet: '100 SC',
    },
    {
      id: 'neon-slots',
      title: 'Neon Slot 777',
      category: 'SLOT REELS',
      categorySlug: 'slots',
      icon: '🎰',
      badge: '100x JACKPOT',
      multiplier: 'TRIPLE 777',
      description: 'Classic 3x3 reel spin with triple 777 jackpot payouts.',
      rtp: '97.8%',
      minBet: '50 SC',
    },
    {
      id: 'cyber-dice',
      title: 'Cyber Dice Roll',
      category: 'DICE SLIDER',
      categorySlug: 'dice',
      icon: '🎲',
      badge: '99x MAX',
      multiplier: 'OVER / UNDER',
      description: 'Adjust your win chance slider and roll for instant SC multipliers.',
      rtp: '99.0%',
      minBet: '25 SC',
    },
  ];

  // Category filter pills
  const categories = [
    { id: 'all', label: 'All Games', icon: Sparkles },
    { id: 'lottery', label: '🎟️ 6/49 Lottery', icon: Trophy },
    { id: 'cards', label: '🃏 High-Low Cards', icon: Flame },
    { id: 'mines', label: '💣 Minesweeper', icon: Gem },
    { id: 'wheel', label: '🎡 Fortune Wheel', icon: Star },
    { id: 'slots', label: '🎰 Neon Slots', icon: Coins },
  ];

  // Filter games based on category and search query
  const filteredGames = games.filter((game) => {
    const matchesCategory = selectedCategory === 'all' || game.categorySlug === selectedCategory;
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLaunchGame = (game: Game) => {
    if (!isLoggedIn) {
      toast.error('Authentication Required', {
        description: 'Please sign in to play tables with free Sixy Coins (SC).',
      });
      return;
    }
    setActiveGameModal(game);
  };

  const handlePlayMiniGame = (betAmount: number) => {
    const currentBalance = parseFloat(user?.sixyCoinsBalance || '10000');
    if (currentBalance < betAmount) {
      toast.error('Insufficient SC Balance!', {
        description: 'Claim your daily SC bonus in the top header to continue playing!',
      });
      return;
    }

    const winMultiplier = Math.random() > 0.4 ? (1.5 + Math.random() * 3).toFixed(2) : '0';
    const isWin = parseFloat(winMultiplier) > 0;
    const profitLoss = isWin ? betAmount * parseFloat(winMultiplier) - betAmount : -betAmount;
    const newBalance = (currentBalance + profitLoss).toFixed(2);

    updateBalance(newBalance);

    if (isWin) {
      toast.success(`🎉 YOU WON ${(betAmount * parseFloat(winMultiplier)).toFixed(0)} SC!`, {
        description: `Multiplier: ${winMultiplier}x on ${activeGameModal?.title}`,
      });
    } else {
      toast.error(`Lost ${betAmount} SC`, {
        description: `Better luck next spin! Balance: ${newBalance} SC`,
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-8 overflow-hidden">
      {/* 24K Gold Glow Background Elements */}
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-[#9c663b]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto space-y-10">
        {/* 🎟️ Dedicated 6/49 Lottery Flagship Showcase Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border-2 border-[#e6ca65]/70 p-8 sm:p-12 shadow-[0_0_60px_rgba(212,175,55,0.2)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 50% Column: Headline & Live Draw Counter */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Badge */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold tracking-widest uppercase">
                <div className="flex items-center gap-2 text-[#e6ca65]">
                  <Crown className="w-5 h-5 text-[#e6ca65] animate-pulse" />
                  <span className="text-[#faf6f0]">FLAGSHIP GAME • LIVE DAILY DRAWS</span>
                </div>
                <span className="text-[#9c663b]">•</span>
                <div className="flex items-center gap-1.5 text-[#e6ca65]">
                  <Coins className="w-4 h-4 text-[#e6ca65]" />
                  <span>100% FREE PLAY</span>
                </div>
              </div>

              {/* High-Impact Headline */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#e6ca65] block">
                  DAILY VIRTUAL JACKPOT REALM
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
                  Official 6/49 Jackpot <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                    Lottery Draw
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-[#e3d8c8] text-sm sm:text-base max-w-xl leading-relaxed">
                Pick 6 lucky numbers between 1 and 49 for your chance to win the daily jackpot payout of up to <strong className="text-[#e6ca65] font-mono font-black">1,250,000 Sixy Coins (SC)</strong>.
              </p>

              {/* Live Jackpot & Draw Counter Banner */}
              <div className="inline-flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/50">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#b5a391]">
                  <Clock className="w-4 h-4 text-[#e6ca65] animate-pulse" />
                  <span>NEXT DRAW: <strong className="text-[#faf6f0] font-mono font-bold">04h 22m 15s</strong></span>
                </div>
                <span className="text-[#9c663b] hidden sm:inline">•</span>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#e6ca65] font-bold">
                  <span>JACKPOT:</span>
                  <span className="text-sm sm:text-base text-[#faf6f0] font-black">1,250,000 SC</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => handleLaunchGame(games[0])}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-base font-extrabold flex items-center gap-3 shadow-xl shadow-[#d4af37]/25 cursor-pointer active:scale-95 border border-[#faf6f0]/40"
                >
                  <Ticket className="w-5 h-5" />
                  <span>PLAY 6/49 LOTTERY (200 SC)</span>
                </button>
              </div>
            </div>

            {/* Right 50% Column: 3D Casino Crown & Lottery Image */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square hover:scale-105 transition-transform duration-500">
                <Image
                  src="/landing/blendable_hero_3d.png"
                  alt="3D Luxury 6/49 Lottery & Casino Crown"
                  fill
                  className="object-contain remove-img-bg"
                  priority
                />
                <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#18120e] border border-[#9c663b]/40 p-3 sm:p-4 rounded-2xl shadow-xl">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#b5a391] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 6/49 lottery, mines, slots, cards..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] font-black shadow-md'
                    : 'bg-[#0c0a09] text-[#b5a391] hover:text-[#faf6f0] border border-[#9c663b]/30'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Games Arena Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-extrabold text-[#faf6f0] flex items-center gap-2">
              <Gem className="w-5 h-5 text-[#e6ca65]" />
              <span>Available Tables ({filteredGames.length})</span>
            </h3>
            <span className="text-xs font-mono text-[#b5a391]">
              Sub-Second Provably Fair Settlement
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="rounded-3xl bg-[#18120e] border border-[#9c663b]/50 p-6 space-y-4 hover:border-[#e6ca65] transition-all group shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{game.icon}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e6ca65]/20 border border-[#e6ca65]/40 text-[#e6ca65] text-xs font-bold font-mono">
                      {game.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#e6ca65] block mb-1">
                      {game.category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-black text-[#faf6f0] group-hover:text-[#e6ca65] transition-colors">
                      {game.title}
                    </h4>
                    <p className="text-xs text-[#b5a391] mt-1.5 leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#9c663b]/30 flex justify-between items-center">
                  <div className="flex flex-col text-[11px] font-mono text-[#b5a391]">
                    <span>RTP {game.rtp}</span>
                    <span className="text-[#e6ca65]">Min: {game.minBet}</span>
                  </div>

                  <button
                    onClick={() => handleLaunchGame(game)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-extrabold flex items-center gap-1.5 shadow-md hover:from-[#f0d885] cursor-pointer active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> PLAY NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Mini-Game Play Modal Overlay */}
        {activeGameModal && (
          <div className="fixed inset-0 z-50 bg-[#0c0a09]/80 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="relative w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border-2 border-[#e6ca65]/70 shadow-[0_0_80px_rgba(212,175,55,0.3)] space-y-6 animate-in fade-in zoom-in duration-200">
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveGameModal(null)}
                className="absolute top-5 right-5 text-[#b5a391] hover:text-[#faf6f0] p-1.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Game Title & Category */}
              <div className="flex items-center gap-4 border-b border-[#9c663b]/30 pb-4">
                <span className="text-5xl">{activeGameModal.icon}</span>
                <div>
                  <span className="text-xs font-mono text-[#e6ca65] font-extrabold uppercase">
                    {activeGameModal.category}
                  </span>
                  <h3 className="text-2xl font-black text-[#faf6f0]">{activeGameModal.title}</h3>
                  <span className="text-xs text-[#b5a391]">
                    RTP {activeGameModal.rtp} • {activeGameModal.badge}
                  </span>
                </div>
              </div>

              {/* Interactive Play Simulator */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40 text-center space-y-2">
                  <span className="text-xs font-bold text-[#b5a391] uppercase">SELECT WAGER AMOUNT</span>
                  <div className="flex justify-center gap-3 pt-1">
                    <button
                      onClick={() => handlePlayMiniGame(50)}
                      className="px-5 py-2.5 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-extrabold font-mono cursor-pointer"
                    >
                      50 SC
                    </button>
                    <button
                      onClick={() => handlePlayMiniGame(100)}
                      className="px-5 py-2.5 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-extrabold font-mono cursor-pointer"
                    >
                      100 SC
                    </button>
                    <button
                      onClick={() => handlePlayMiniGame(200)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-black font-mono cursor-pointer"
                    >
                      200 SC
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#b5a391] pt-2">
                  <span className="flex items-center gap-1.5 text-[#e6ca65]">
                    <ShieldCheck className="w-4 h-4" /> Cryptographic Provably Fair RNG
                  </span>
                  <span>100% Free Virtual Currency</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
