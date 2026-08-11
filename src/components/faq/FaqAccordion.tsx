'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Coins, Ticket, Sparkles } from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'GENERAL',
      question: 'What is SixyWin Gaming Arena?',
      answer:
        'SixyWin is a premier free-to-play spatial gaming arena offering provably fair mini-games, crash games, and the Official 6/49 Lottery Draw using virtual Sixy Coins (SC).',
    },
    {
      id: 'faq-2',
      category: 'CURRENCY',
      question: 'Are Sixy Coins (SC) real money?',
      answer:
        'No. Sixy Coins (SC) are 100% free virtual tokens with zero real-money wagering. All users start with a free 10,000.00 SC balance.',
    },
    {
      id: 'faq-3',
      category: 'LOTTERY',
      question: 'How does the daily 6/49 Lottery Draw work?',
      answer:
        'Select 6 numbers from 1 to 49 for 200 SC per entry. Daily draws execute automatically every 24 hours at 00:00 UTC using SHA-256 seed hashes.',
    },
    {
      id: 'faq-4',
      category: 'LOTTERY',
      question: 'What are the 6/49 Lottery payout tiers?',
      answer:
        'Match 6/6 wins the 1,250,000 SC Jackpot. Match 5/6 wins 50,000 SC, Match 4/6 wins 2,500 SC, and Match 3/6 wins a 250 SC free ticket refund.',
    },
    {
      id: 'faq-5',
      category: 'SECURITY',
      question: 'What is Provably Fair cryptographic gaming?',
      answer:
        'Provably Fair uses SHA-256 cryptographic hashes to ensure that neither SixyWin nor the player can manipulate game or lottery outcomes.',
    },
    {
      id: 'faq-6',
      category: 'ACCOUNT',
      question: 'How do I reset my balance or account settings?',
      answer:
        'Click your balance pill in the header navigation to open your account settings dropdown menu where you can view your VIP tier badge and profile.',
    },
  ];

  const categories = ['ALL', 'GENERAL', 'LOTTERY', 'CURRENCY', 'SECURITY', 'ACCOUNT'];

  const filteredFaqs = activeCategory === 'ALL' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-[#9c663b]/30">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] text-[#0c0a09] border-[#faf6f0]'
                : 'bg-[#18120e] text-[#b5a391] hover:text-[#e6ca65] border-[#9c663b]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-[#18120e]/85 border border-[#e6ca65]/40 shadow-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#281d14]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e6ca65]/20 text-[#e6ca65] text-[10px] font-mono font-extrabold uppercase">
                    {faq.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-[#faf6f0]">
                    {faq.question}
                  </h3>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-[#e6ca65] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#b5a391] leading-relaxed border-t border-[#9c663b]/20 pt-3 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
