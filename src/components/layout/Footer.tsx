'use client';

import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center text-slate-950 font-black">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-extrabold text-slate-200">SixyWin iGaming Platform</p>
            <p className="text-xs text-slate-400">Next.js 15 • Tailwind CSS • Drizzle ORM • Supabase</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Provably Fair Server Actions Engine • 100% Transparent RNG</span>
        </div>

        <div className="text-xs text-slate-400">
          © {new Date().getFullYear()} SixyWin. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
