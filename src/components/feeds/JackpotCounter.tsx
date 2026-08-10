'use client';

import React, { useEffect, useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Trophy, Sparkles } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const JackpotCounter: React.FC = () => {
  const [jackpot, setJackpot] = useState(258490);

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot((prev) => prev + Math.floor(Math.random() * 25) + 5);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard glowColor="amber" className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-300 p-0.5 shadow-xl shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-7 h-7 text-amber-400 animate-bounce" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="jackpot">SUPER JACKPOT</Badge>
              <span className="text-xs text-amber-300 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Live Growth
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">Grand Platform Jackpot</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono font-black text-3xl sm:text-4xl text-amber-300 tracking-wider bg-slate-950/80 px-6 py-3 rounded-2xl border border-amber-500/40 shadow-inner">
          <span className="text-amber-500">$</span>
          <span>{jackpot.toLocaleString()}</span>
          <span className="text-xs font-sans text-amber-400/80 self-end mb-1">CHIPS</span>
        </div>
      </div>
    </GlassCard>
  );
};
