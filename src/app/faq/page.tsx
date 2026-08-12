'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FaqAccordion } from '@/components/faq/FaqAccordion';

export default function FaqPage() {
  const faqPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is SixyWin Gaming Arena?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SixyWin is a premier free-to-play spatial gaming arena offering provably fair mini-games, crash games, and the Official 6/49 Lottery Draw using virtual Sixy Coins (SC).',
        },
      },
      {
        '@type': 'Question',
        name: 'Are Sixy Coins (SC) real money?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Sixy Coins (SC) are 100% free virtual tokens with zero real-money wagering. All users start with a free 10,000.00 SC balance.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the daily 6/49 Lottery Draw work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select 6 numbers from 1 to 49 for 200 SC per entry. Daily draws execute automatically every 24 hours at 00:00 UTC using SHA-256 seed hashes.',
        },
      },
    ],
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />

      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e6ca65]/10 border border-[#e6ca65]/30 text-[#e6ca65] text-xs font-mono font-bold">
            <HelpCircle className="w-4 h-4 text-[#e6ca65]" />
            <span>KNOWLEDGE BASE & FAQ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#faf6f0]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-base text-[#b5a391] max-w-xl mx-auto">
            Everything you need to know about 6/49 Lottery draws, virtual Sixy Coins (SC), and provably fair cryptographic gameplay.
          </p>
        </div>

        {/* Faq Accordion List Component */}
        <FaqAccordion />
      </div>
    </main>
  );
}
