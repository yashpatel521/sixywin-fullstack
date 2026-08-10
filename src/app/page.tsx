'use client';

import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Section 1: Espresso Brown Hero Section */}
      <HeroSection />

      {/* Section 2: Warm Cream Alternating Features Section */}
      <FeaturesSection />
    </div>
  );
}
