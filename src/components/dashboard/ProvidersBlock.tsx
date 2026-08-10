'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PROVIDERS = [
  { name: 'zillion GAMES', style: 'text-amber-400 font-extrabold' },
  { name: 'endorphina', style: 'text-orange-400 font-bold italic' },
  { name: 'THUNDERKICK', style: 'text-cyan-400 font-black' },
  { name: 'PRAGMATIC', style: 'text-purple-400 font-extrabold' },
];

export const ProvidersBlock: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">PROVIDERS</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PROVIDERS.map((prov, i) => (
          <div
            key={i}
            className="h-16 rounded-2xl bg-[#181d2e] border border-slate-800/80 hover:border-indigo-500/40 flex items-center justify-center p-3 text-xs tracking-tight transition-all cursor-pointer select-none"
          >
            <span className={prov.style}>{prov.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
