'use client';

import React from 'react';
import { ShieldCheck, Crown, Zap } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#fbf8f3] via-[#f0e8db] to-[#1c120c] px-6 sm:px-16 py-24 text-[#1a100a] m-0 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#8c5a2b]/20 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c120c] text-[#d4af37] text-xs font-bold border border-[#8c5a2b]/30">
              <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>ELITE ADVANTAGES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1a100a]">
              Why High Rollers Choose SixyWin
            </h2>
          </div>
          <p className="text-base font-medium text-[#5a483a] max-w-md">
            Built for luxury, speed, and 100% cryptographic transparency.
          </p>
        </div>

        {/* 3 Espresso Brown Cards on Cream Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-3xl bg-[#1c120c] border border-[#8c5a2b]/40 p-8 space-y-4 text-[#fbf8f3] shadow-2xl hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#fbf8f3]">15% Weekly Rakeback</h3>
            <p className="text-[#a89582] text-xs leading-relaxed">
              Auto-credited to your wallet every Monday. Enjoy zero wagering requirements on all cashback.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-[#1c120c] border border-[#8c5a2b]/40 p-8 space-y-4 text-[#fbf8f3] shadow-2xl hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#fbf8f3]">Instant Settlement</h3>
            <p className="text-[#a89582] text-xs leading-relaxed">
              Sub-second Server Actions execution with Drizzle ORM and Supabase PostgreSQL backend.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-[#1c120c] border border-[#8c5a2b]/40 p-8 space-y-4 text-[#fbf8f3] shadow-2xl hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#fbf8f3]">Provably Fair Engine</h3>
            <p className="text-[#a89582] text-xs leading-relaxed">
              100% verifiable server seeds for Fortune Wheel, Slot Machine, and High-Low card outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
