'use client';

import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { ShieldCheck, Lock, Award, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SixyWin Gaming Arena',
    url: 'https://sixywin.com',
    logo: 'https://sixywin.com/landing/lottery_ticket_3d.png',
    description: 'Free-to-play spatial gaming arena offering provably fair mini-games and 6/49 Lottery draws.',
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="w-full max-w-5xl mx-auto space-y-12">
        <AboutHero />

        {/* Pillars Section */}
        <section aria-label="Our Core Pillars" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#faf6f0]">
              Our Core Platform Pillars
            </h2>
            <p className="text-xs sm:text-sm text-[#b5a391]">
              Built on transparency, speed, and player entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#18120e] border border-[#e6ca65]/40 space-y-3 shadow-xl">
              <ShieldCheck className="w-8 h-8 text-[#e6ca65]" />
              <h3 className="text-lg font-black text-[#faf6f0]">100% Cryptographic Fairness</h3>
              <p className="text-xs text-[#b5a391] leading-relaxed">
                Every game outcome and lottery draw is verifiable on-chain or via SHA-256 seed hashing.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#18120e] border border-[#e6ca65]/40 space-y-3 shadow-xl">
              <Lock className="w-8 h-8 text-[#e6ca65]" />
              <h3 className="text-lg font-black text-[#faf6f0]">Zero Financial Risk</h3>
              <p className="text-xs text-[#b5a391] leading-relaxed">
                All wagers use virtual Sixy Coins (SC). No real money wagering, deposits, or credit cards required.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#18120e] border border-[#e6ca65]/40 space-y-3 shadow-xl">
              <Award className="w-8 h-8 text-[#e6ca65]" />
              <h3 className="text-lg font-black text-[#faf6f0]">Sub-Second Settlement</h3>
              <p className="text-xs text-[#b5a391] leading-relaxed">
                High-speed engine processing instant bet calculations and instant wallet updates.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
