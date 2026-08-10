'use client';

import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { GamesSection } from '@/components/landing/GamesSection';

export default function HomePage() {
  return (
    <div className="w-full p-0 m-0 space-y-0">
      {/* 1. Espresso Brown Hero Section */}
      <HeroSection />

      {/* 2. Warm Cream Features Section */}
      <FeaturesSection />

      {/* 3. Espresso Brown Games Section */}
      <GamesSection />
    </div>
  );
}
