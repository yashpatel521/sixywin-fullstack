'use client';

import React from 'react';
import { ShieldCheck, Crown, Zap } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 space-y-12 text-[#1a100a]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#e8dfd1]/20 pb-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbf8f3] text-[#1a100a] text-xs font-bold border border-[#e8dfd1]">
            <Crown className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>ELITE ADVANTAGES</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-[#fbf8f3]">
            Why High Rollers Choose SixyWin
          </h2>
        </div>
        <p className="text-sm font-medium text-[#a89582] max-w-xs">
          Built for luxury, speed, and 100% cryptographic transparency.
        </p>
      </div>

      {/* 3 Espresso Brown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
