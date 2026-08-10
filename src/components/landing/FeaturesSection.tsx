'use client';

import React from 'react';
import { ShieldCheck, Crown, Zap, Gift, Coins, ChevronRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="rounded-[2.5rem] bg-[#fbf8f3] border border-[#e8dfd1] p-8 sm:p-14 space-y-10 text-[#1a100a] shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a100a] text-[#d4af37] text-xs font-bold">
            <Crown className="w-3.5 h-3.5" />
            <span>ELITE ADVANTAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a100a]">
            Why High Rollers Choose SixyWin
          </h2>
        </div>
        <p className="text-sm font-medium text-[#7a6452] max-w-xs">
          Built for luxury, speed, and 100% cryptographic transparency.
        </p>
      </div>

      {/* 3 Espresso Brown Cards on Cream Background */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="rounded-3xl bg-[#1c120c] border border-[#8c5a2b]/30 p-8 space-y-4 text-[#fbf8f3] shadow-lg hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <Crown className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#fbf8f3]">15% Weekly Rakeback</h3>
          <p className="text-[#a89582] text-xs leading-relaxed">
            Auto-credited to your wallet every Monday. Enjoy zero wagering requirements on all cashback.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-3xl bg-[#1c120c] border border-[#8c5a2b]/30 p-8 space-y-4 text-[#fbf8f3] shadow-lg hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#fbf8f3]">Instant Settlement</h3>
          <p className="text-[#a89582] text-xs leading-relaxed">
            Sub-second Server Actions execution with Drizzle ORM and Supabase PostgreSQL backend.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-3xl bg-[#1c120c] border border-[#8c5a2b]/30 p-8 space-y-4 text-[#fbf8f3] shadow-lg hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#fbf8f3]">Provably Fair Engine</h3>
          <p className="text-[#a89582] text-xs leading-relaxed">
            100% verifiable server seeds for Fortune Wheel, Slot Machine, and High-Low card outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};
