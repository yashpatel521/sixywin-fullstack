'use client';

import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const SIDEBAR_GAMES = [
  { title: 'CS:GO', subtitle: 'Esports Odds', icon: '🔫', active: true },
  { title: 'League of Legends', subtitle: 'MOBA Battles', icon: '👑', active: false },
  { title: 'Super Mario Bro', subtitle: 'Retro Classic', icon: '🍄', active: false },
];

export const RightSidebar: React.FC<{ onLaunchGame: (id: string) => void }> = ({ onLaunchGame }) => {
  return (
    <aside className="w-full space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">SIDEBAR</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top Banner Artwork Thumbnails */}
      <div className="grid grid-cols-2 gap-3">
        <div className="h-28 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-600/30 border border-pink-500/30 p-3 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
          <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🎂</div>
          <span className="text-[11px] font-bold text-white leading-tight">Sweet Bonus</span>
        </div>
        <div className="h-28 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/30 p-3 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
          <div className="text-3xl mb-1 group-hover:scale-110 transition-transform">🐝</div>
          <span className="text-[11px] font-bold text-white leading-tight">Honey Vault</span>
        </div>
      </div>

      {/* Vertical Games List */}
      <div className="space-y-3">
        {SIDEBAR_GAMES.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onLaunchGame('fortune-wheel')}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#181d2e] border border-slate-800/80 hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium">{item.subtitle}</p>
              </div>
            </div>

            <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Colorful "Rewards!" Card */}
      <div className="rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-6 text-white space-y-4 shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <h3 className="text-2xl font-black tracking-tight">Rewards!</h3>
          <button className="w-9 h-9 rounded-2xl bg-slate-950/80 hover:bg-slate-950 flex items-center justify-center text-white border border-white/20 transition-all">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-white/90 font-medium max-w-[180px] leading-snug relative z-10">
          Get weekly cashback & other privileges
        </p>
      </div>
    </aside>
  );
};
