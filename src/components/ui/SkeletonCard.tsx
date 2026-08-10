'use client';

import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="relative rounded-2xl bg-slate-900/40 border border-slate-800 p-6 overflow-hidden animate-pulse">
      <div className="w-full h-44 bg-slate-800/60 rounded-xl mb-4" />
      <div className="flex items-center justify-between mb-3">
        <div className="h-5 w-32 bg-slate-800 rounded-md" />
        <div className="h-4 w-16 bg-slate-800 rounded-full" />
      </div>
      <div className="h-4 w-4/5 bg-slate-800/50 rounded-md mb-4" />
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
        <div className="h-4 w-20 bg-slate-800 rounded-md" />
        <div className="h-9 w-24 bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
};

export const SkeletonGameGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
