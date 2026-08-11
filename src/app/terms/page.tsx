'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { TermsContent } from '@/components/terms/TermsContent';

export default function TermsPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-10">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e6ca65]/10 border border-[#e6ca65]/30 text-[#e6ca65] text-xs font-mono font-bold">
            <FileText className="w-4 h-4 text-[#e6ca65]" />
            <span>LEGAL AGREEMENT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#faf6f0]">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-base text-[#b5a391]">
            Last updated: August 2026 • Please read our terms carefully.
          </p>
        </div>

        <TermsContent />
      </div>
    </main>
  );
}
