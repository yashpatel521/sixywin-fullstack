import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const FortuneWheel = dynamic(() => import('@/components/games/FortuneWheel'), {
  loading: () => <SkeletonCard />,
});
const SlotMachine = dynamic(() => import('@/components/games/SlotMachine'), {
  loading: () => <SkeletonCard />,
});
const HighLowGame = dynamic(() => import('@/components/games/HighLowGame'), {
  loading: () => <SkeletonCard />,
});

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Games
      </Link>

      <Suspense fallback={<SkeletonCard />}>
        {id === 'fortune-wheel' && <FortuneWheel />}
        {id === 'slot-machine' && <SlotMachine />}
        {id === 'high-low' && <HighLowGame />}
        {id !== 'fortune-wheel' && id !== 'slot-machine' && id !== 'high-low' && (
          <div className="text-center py-12 text-slate-400">Game not found</div>
        )}
      </Suspense>
    </div>
  );
}
