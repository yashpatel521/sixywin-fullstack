'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const StatsCard: React.FC = () => {
  return (
    <div className="rounded-3xl bg-[#181d2e] border border-slate-800/80 p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">STATS</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-black text-white tracking-tight">568.5b</h3>
        <p className="text-xs text-slate-400 font-medium">- Total Pixels</p>
      </div>

      {/* 3D Colorful Smooth Wave SVG Line */}
      <div className="w-full h-16 relative flex items-center">
        <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <path
            d="M 0,40 Q 30,55 60,30 T 120,25 T 180,45 T 200,20"
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
