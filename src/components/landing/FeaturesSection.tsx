'use client';

import React from 'react';
import { ShieldCheck, Crown, Zap } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#faf6f0] via-[#f3ebd9] to-[#18120e] px-6 sm:px-16 py-24 text-[#18120e] m-0 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#9c663b]/25 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18120e] text-[#e6ca65] text-xs font-bold border border-[#9c663b]/40 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-[#e6ca65]" />
              <span>ELITE ADVANTAGES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#18120e]">
              Why High Rollers Choose SixyWin
            </h2>
          </div>
          <p className="text-base font-medium text-[#6e5847] max-w-md">
            Built for luxury, speed, and 100% cryptographic transparency.
          </p>
        </div>

        {/* 3 Deep Onyx Velvet Cards on Champagne Silk Cream Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="rounded-3xl bg-[#18120e] border border-[#9c663b]/40 p-8 space-y-4 text-[#faf6f0] shadow-2xl hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#e6ca65]/20 border border-[#e6ca65]/40 flex items-center justify-center text-[#e6ca65]">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#faf6f0]">15% Weekly SC Bonus</h3>
            <p className="text-[#b5a391] text-xs leading-relaxed">
              Auto-credited to your virtual wallet every Monday. Enjoy zero wagering requirements on all cashback.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-[#18120e] border border-[#9c663b]/40 p-8 space-y-4 text-[#faf6f0] shadow-2xl hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#e6ca65]/20 border border-[#e6ca65]/40 flex items-center justify-center text-[#e6ca65]">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#faf6f0]">Instant Settlement</h3>
            <p className="text-[#b5a391] text-xs leading-relaxed">
              Sub-second Server Actions execution with Drizzle ORM and Supabase PostgreSQL backend.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-[#18120e] border border-[#9c663b]/40 p-8 space-y-4 text-[#faf6f0] shadow-2xl hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#e6ca65]/20 border border-[#e6ca65]/40 flex items-center justify-center text-[#e6ca65]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#faf6f0]">Provably Fair Engine</h3>
            <p className="text-[#b5a391] text-xs leading-relaxed">
              100% verifiable server seeds for 6/49 Lottery, Fortune Wheel, and High-Low card outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
