'use client';

import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { LotterySection } from '@/components/landing/LotterySection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { GamesSection } from '@/components/landing/GamesSection';

export default function HomePage() {
  return (
    <div className="w-full p-0 m-0 space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. 6/49 Lottery Jackpot Section */}
      <LotterySection />

      {/* 3. Features Section */}
      <FeaturesSection />

      {/* 4. Additional Games Showcase */}
      <GamesSection />
    </div>
  );
}
