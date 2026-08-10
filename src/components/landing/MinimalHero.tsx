'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Play, Sparkles, ShieldCheck, Zap, ArrowRight, Activity } from 'lucide-react';
import gsap from 'gsap';

interface MinimalHeroProps {
  onLaunchGame: (gameId: string) => void;
}

export const MinimalHero: React.FC<MinimalHeroProps> = ({ onLaunchGame }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.minimal-fade', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative rounded-[2rem] bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800/60 p-8 sm:p-14 overflow-hidden backdrop-blur-2xl"
    >
      {/* Subtle Minimal Background Ambiance */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Live Active Players Indicator */}
        <div className="minimal-fade inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-emerald-400 font-bold">14,290 PLAYERS</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Provably Fair iGaming</span>
        </div>

        {/* Minimal High-Contrast Headline */}
        <h1 className="minimal-fade text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
          The Minimal, Next-Gen <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Casino Platform
          </span>
        </h1>

        <p className="minimal-fade text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
          Zero clutter. Instant settlement. Play 3D Fortune Wheel, Slots, and High-Low cards with Next.js Server Actions & Drizzle Supabase.
        </p>

        {/* Action Buttons */}
        <div className="minimal-fade flex flex-wrap items-center gap-4 pt-2">
          <Button
            size="lg"
            onClick={() => onLaunchGame('fortune-wheel')}
            className="px-8 py-4 text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 border-emerald-400/50"
          >
            <Play className="w-5 h-5 fill-current" /> Play Cyber Wheel
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => onLaunchGame('slot-machine')}
            className="px-7 py-4 text-base font-semibold bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800"
          >
            Explore Slots <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Stats Ribbon */}
        <div className="minimal-fade grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/60 text-xs">
          <div>
            <span className="text-slate-500 font-medium block mb-1">TOTAL PLAYED</span>
            <span className="text-base font-bold text-white font-mono">$18,490,200+</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block mb-1">AVERAGE RTP</span>
            <span className="text-base font-bold text-emerald-400 font-mono">98.9%</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block mb-1">CASHOUT SPEED</span>
            <span className="text-base font-bold text-cyan-400 font-mono">&lt;1.2 SEC</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block mb-1">INTEGRATION</span>
            <span className="text-base font-bold text-amber-400 font-mono">SUPABASE DB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
