'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Play, Sparkles } from 'lucide-react';

interface MinimalGameCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  rtp: string;
  maxMultiplier: string;
  iconName: string;
  hot?: boolean;
  popular?: boolean;
  isActive: boolean;
  onLaunch: (id: string) => void;
}

export const MinimalGameCard: React.FC<MinimalGameCardProps> = ({
  id,
  title,
  category,
  description,
  rtp,
  maxMultiplier,
  iconName,
  hot,
  popular,
  isActive,
  onLaunch,
}) => {
  return (
    <div className="group relative rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Subtle hover gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
            {iconName}
          </div>
          <div className="flex items-center gap-1.5">
            {hot && <Badge variant="hot">HOT</Badge>}
            {popular && <Badge variant="popular">POPULAR</Badge>}
            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
              RTP {rtp}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-6 font-normal">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Max Payout</span>
          <span className="text-sm font-black font-mono text-emerald-400">{maxMultiplier}</span>
        </div>

        <Button
          size="sm"
          variant={isActive ? 'accent' : 'primary'}
          onClick={() => onLaunch(id)}
          className={
            isActive
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400/40 shadow-emerald-500/10'
          }
        >
          {isActive ? 'Playing' : 'Play Now'}
        </Button>
      </div>
    </div>
  );
};
