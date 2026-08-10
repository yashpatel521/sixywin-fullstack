import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#0c0a09] px-6 sm:px-16 py-12 space-y-12 max-w-[1800px] mx-auto overflow-hidden">
      {/* Hero Skeleton Loading Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {/* Badge Skeleton */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-44 h-8 rounded-full" />
            <Skeleton className="w-36 h-8 rounded-full" />
          </div>

          {/* Headline Skeleton */}
          <div className="space-y-3">
            <Skeleton className="w-32 h-4 rounded-md" />
            <Skeleton className="w-full h-16 sm:h-20 rounded-2xl" />
            <Skeleton className="w-3/4 h-16 sm:h-20 rounded-2xl" />
          </div>

          {/* Subtitle Skeleton */}
          <Skeleton className="w-full max-w-xl h-12 rounded-xl" />

          {/* Quick Pills Skeleton */}
          <div className="flex gap-3">
            <Skeleton className="w-32 h-10 rounded-xl" />
            <Skeleton className="w-32 h-10 rounded-xl" />
            <Skeleton className="w-32 h-10 rounded-xl" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex gap-4 pt-2">
            <Skeleton className="w-52 h-14 rounded-2xl" />
            <Skeleton className="w-44 h-14 rounded-2xl" />
          </div>
        </div>

        {/* Right Column Skeleton (3D Art Placeholder) */}
        <div className="flex items-center justify-center">
          <Skeleton className="w-full max-w-md aspect-square rounded-full shadow-2xl shadow-[#d4af37]/10" />
        </div>
      </div>

      {/* Grid Section Skeleton */}
      <div className="space-y-6 pt-10">
        <div className="flex justify-between items-end pb-4 border-b border-[#9c663b]/30">
          <div className="space-y-2">
            <Skeleton className="w-28 h-6 rounded-full" />
            <Skeleton className="w-64 h-10 rounded-xl" />
          </div>
          <Skeleton className="w-48 h-6 rounded-md hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
