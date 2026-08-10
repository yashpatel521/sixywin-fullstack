'use client';

import React from 'react';
import { Crown, Zap, ShieldCheck, Gift, Percent, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const VipSection: React.FC = () => {
  return (
    <section className="relative rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8 sm:p-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>SIXYWIN VIP CLUB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Unlock High Roller Perks & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
              15% Weekly Rakeback
            </span>
          </h2>

          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            Level up your account tier to claim instant rakeback on every bet, 24/7 dedicated concierge assistance, and custom high-limit tables.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <Percent className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">15% Weekly Rakeback</p>
                <p className="text-[11px] text-slate-500">Auto-credited every Monday</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Zero Gas Cashouts</p>
                <p className="text-[11px] text-slate-500">Instant chips & crypto settlement</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-end">
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 p-6 space-y-6 text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
              <Crown className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">CURRENT VIP TIER</span>
              <h3 className="text-2xl font-black text-white mt-1">EMERALD VIP</h3>
              <p className="text-xs text-slate-400 mt-1">Next Tier: Platinum (85% Progress)</p>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-full rounded-full w-[85%]" />
            </div>

            <Button variant="primary" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold border-amber-400">
              Claim VIP Level Up <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
