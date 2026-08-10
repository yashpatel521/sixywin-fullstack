'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: 'cyan' | 'pink' | 'amber' | 'purple' | 'none';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = true,
  glowColor = 'cyan',
}) => {
  const glows = {
    cyan: 'hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    pink: 'hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]',
    amber: 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    purple: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
    none: '',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'relative rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 shadow-2xl p-6 transition-all duration-300 overflow-hidden',
          hoverEffect && 'hover:-translate-y-1.5 hover:bg-slate-900/80',
          hoverEffect && glows[glowColor],
          className
        )
      )}
    >
      {/* Subtle glass reflection highlight */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      {children}
    </div>
  );
};
