'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SeedVerifierTool } from '@/components/fairness/SeedVerifierTool';

export default function FairnessPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-10">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e6ca65]/10 border border-[#e6ca65]/30 text-[#e6ca65] text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-[#e6ca65]" />
            <span>CRYPTOGRAPHIC TRANSPARENCY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#faf6f0]">
            Provably Fair Engine & Seeds
          </h1>
          <p className="text-xs sm:text-base text-[#b5a391] max-w-xl mx-auto">
            Every game outcome and daily 6/49 Lottery draw on SixyWin is mathematically deterministic and independently verifiable.
          </p>
        </div>

        <SeedVerifierTool />
      </div>
    </main>
  );
}
