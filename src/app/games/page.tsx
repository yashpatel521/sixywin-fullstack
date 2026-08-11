'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { GamesHeroSection } from '@/components/games/GamesHeroSection';
import { GamesGrid, Game } from '@/components/games/GamesGrid';
import { GamePlayModal } from '@/components/games/GamePlayModal';

export default function GamesPage() {
  const { user, isLoggedIn, updateBalance } = useAuthStore();
  const [activeGameModal, setActiveGameModal] = useState<Game | null>(null);

  // Games Catalogue Data
  const games: Game[] = [
    {
      id: 'lottery-649',
      title: '6/49 Lottery Jackpot',
      category: 'LIVE LOTTERY',
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
      icon: '🎲',
      badge: '99x MAX',
      multiplier: 'OVER / UNDER',
      description: 'Adjust your win chance slider and roll for instant SC multipliers.',
      rtp: '99.0%',
      minBet: '25 SC',
    },
  ];

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

  // Schema.org JSON-LD Structured Data for Google Rich Search Results
  const gamesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SixyWin Available Gaming Tables & 6/49 Lottery',
    description: 'List of free-to-play social casino games and 6/49 lottery jackpot tables.',
    itemListElement: games.map((game, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: game.title,
      description: game.description,
      url: `https://sixywin.com/games#${game.id}`,
    })),
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-8 overflow-hidden">
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gamesJsonLd) }}
      />

      {/* 24K Gold Glow Background Elements */}
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-[#9c663b]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto space-y-10">
        {/* 1. Page-wise 6/49 Lottery Flagship Hero Section */}
        <GamesHeroSection onPlayLottery={() => handleLaunchGame(games[0])} />

        {/* 2. Page-wise Available Games Grid */}
        <GamesGrid games={games} onLaunchGame={handleLaunchGame} />

        {/* 3. Page-wise Mini-Game Play Modal */}
        <GamePlayModal
          game={activeGameModal}
          onClose={() => setActiveGameModal(null)}
          onPlayMiniGame={handlePlayMiniGame}
        />
      </div>
    </div>
  );
}
