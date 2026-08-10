'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, Dices, Trophy, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-16 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                SIXY<span className="text-emerald-400">WIN</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The modern minimal casino platform. Next.js 15 Server Actions, Zustand state, and Drizzle ORM Supabase database.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Mini-Games</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Cyber Fortune Wheel</Link></li>
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Neon Slot 777</Link></li>
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">High-Low Cards</Link></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Platform</h4>
            <ul className="space-y-2 font-medium">
              <li><Link href="/leaderboard" className="hover:text-amber-400 transition-colors">Global Leaderboard</Link></li>
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Provably Fair Engine</Link></li>
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">VIP Rewards Club</Link></li>
            </ul>
          </div>

          {/* Verified Certification */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Security & Status</h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> 100% Provably Fair
              </div>
              <p className="text-[11px] text-slate-400">
                Server seed verification enabled for all transactions.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} SixyWin Casino. Built for Next.js 15 & Supabase.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
