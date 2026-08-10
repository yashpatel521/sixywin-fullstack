'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Sparkles, Dices, Flame, Play, ShieldCheck, Zap, Layers } from 'lucide-react';
import gsap from 'gsap';

interface AntigravityHeroProps {
  onLaunchGame: (gameId: string) => void;
}

export const AntigravityHero: React.FC<AntigravityHeroProps> = ({ onLaunchGame }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const floatingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance animation for titles and buttons
      gsap.from('.hero-stagger', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Floating weightless Y-axis animation for 3D card deck preview
      if (floatingCardsRef.current) {
        gsap.to(floatingCardsRef.current.children, {
          y: 'random(-15, 15)',
          rotationZ: 'random(-3, 3)',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.4,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-[2.5rem] overflow-hidden bg-slate-950 border border-slate-800/80 p-8 sm:p-14 min-h-[520px] flex flex-col justify-center"
    >
      {/* Antigravity Spatial Glow Spheres */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-[30%] right-[30%] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="hero-stagger inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Antigravity Spatial Motion Engine</span>
          </div>

          <h1
            ref={titleRef}
            className="hero-stagger text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]"
          >
            Spatial iGaming & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 drop-shadow-[0_0_35px_rgba(0,242,254,0.4)]">
              Weightless Mini-Games
            </span>
          </h1>

          <p className="hero-stagger text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Experience spatial depth, glassmorphism, and 3D motion-heavy games with provably fair Next.js Server Actions & Drizzle Supabase transactions.
          </p>

          {/* Action CTAs */}
          <div className="hero-stagger flex flex-wrap items-center gap-4 pt-2">
            <Button
              size="lg"
              onClick={() => onLaunchGame('fortune-wheel')}
              className="px-8 py-4 text-base font-extrabold shadow-[0_0_30px_rgba(0,242,254,0.4)]"
            >
              <Play className="w-5 h-5 fill-current" /> Spin Cyber Wheel
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onLaunchGame('slot-machine')}
              className="px-7 py-4 text-base font-bold bg-slate-900/90 border-slate-700/80 hover:border-pink-500/50"
            >
              <Flame className="w-5 h-5 text-amber-400" /> Play Neon Slots
            </Button>
          </div>

          {/* Features Pills */}
          <div className="hero-stagger flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/80 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Provably Fair RNG
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Instant Server Action Settlement
            </span>
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" /> Supabase PostgreSQL DB
            </span>
          </div>
        </div>

        {/* Right Column: Floating 3D Isometric Card Deck Stack */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div
            ref={floatingCardsRef}
            className="relative w-full max-w-sm h-[340px] flex items-center justify-center [perspective:1000px]"
          >
            {/* Card 1: Wheel Game (Front) */}
            <div
              onClick={() => onLaunchGame('fortune-wheel')}
              className="absolute w-64 h-80 rounded-3xl bg-gradient-to-br from-cyan-900/60 via-slate-900/90 to-slate-950 border border-cyan-400/50 shadow-[0_25px_60px_rgba(0,242,254,0.3)] backdrop-blur-2xl p-6 cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{ transform: 'rotateX(15deg) rotateY(-12deg) translateZ(40px)', zIndex: 30 }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl">🎡</span>
                <Badge variant="hot">50x MAX</Badge>
              </div>
              <h3 className="text-xl font-black text-white mb-2">Cyber Wheel</h3>
              <p className="text-xs text-slate-300 mb-6">Spin 12-segment multiplier wheel with GSAP motion.</p>
              <div className="w-full py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-center text-xs font-bold text-cyan-300">
                Launch Arena →
              </div>
            </div>

            {/* Card 2: Slots Game (Back Left) */}
            <div
              onClick={() => onLaunchGame('slot-machine')}
              className="absolute w-56 h-72 rounded-3xl bg-gradient-to-br from-pink-900/50 via-slate-900/90 to-slate-950 border border-pink-500/40 shadow-[0_20px_50px_rgba(255,0,127,0.25)] backdrop-blur-xl p-5 cursor-pointer transition-transform duration-300 hover:scale-105 opacity-90"
              style={{ transform: 'rotateX(20deg) rotateY(-25deg) translateZ(-30px) translateX(-60px)', zIndex: 20 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-3xl">🎰</span>
                <Badge variant="jackpot">100x</Badge>
              </div>
              <h4 className="text-lg font-extrabold text-white mb-1">Neon Slot 777</h4>
              <p className="text-[11px] text-slate-400">Triple 777 Jackpot Reels.</p>
            </div>

            {/* Card 3: Cards Game (Back Right) */}
            <div
              onClick={() => onLaunchGame('high-low')}
              className="absolute w-52 h-64 rounded-3xl bg-gradient-to-br from-purple-900/50 via-slate-900/90 to-slate-950 border border-purple-500/40 shadow-[0_20px_50px_rgba(139,92,246,0.25)] backdrop-blur-xl p-5 cursor-pointer transition-transform duration-300 hover:scale-105 opacity-80"
              style={{ transform: 'rotateX(12deg) rotateY(20deg) translateZ(-60px) translateX(70px)', zIndex: 10 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-3xl">🃏</span>
                <Badge variant="neutral">2x</Badge>
              </div>
              <h4 className="text-base font-bold text-white mb-1">High-Low Cards</h4>
              <p className="text-[11px] text-slate-400">Instant Card Predictor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
