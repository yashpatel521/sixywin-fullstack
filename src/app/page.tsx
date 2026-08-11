'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HeroSection } from '@/components/landing/HeroSection';
import { LotterySection } from '@/components/landing/LotterySection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { GamesSection } from '@/components/landing/GamesSection';
import { useAuthStore } from '@/store/useAuthStore';

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  // If user is logged in, automatically redirect to /games arena
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/games');
    }
  }, [isLoggedIn, router]);

  const handlePlayClick = (gameId?: string) => {
    if (isLoggedIn) {
      router.push('/games');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="w-full p-0 m-0 space-y-0">
      {/* 1. Hero Section */}
      <HeroSection onPlayClick={handlePlayClick} />

      {/* 2. 6/49 Lottery Jackpot Section */}
      <LotterySection />

      {/* 3. Features Section */}
      <FeaturesSection />

      {/* 4. Additional Games Showcase */}
      <GamesSection onPlayGame={() => router.push('/games')} />
    </div>
  );
}
