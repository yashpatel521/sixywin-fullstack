import React from 'react';
import { SkeletonGameGrid } from '@/components/ui/SkeletonCard';

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse py-6">
      <div className="h-44 w-full bg-slate-900/60 rounded-3xl border border-slate-800" />
      <div className="h-10 w-48 bg-slate-800 rounded-xl" />
      <SkeletonGameGrid count={6} />
    </div>
  );
}
