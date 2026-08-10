'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  variant?: 'hot' | 'popular' | 'live' | 'jackpot' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className,
}) => {
  const styles = {
    hot: 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse',
    popular: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    live: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    jackpot: 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-black',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-md gap-1',
          styles[variant],
          className
        )
      )}
    >
      {children}
    </span>
  );
};
