'use client';

import React from 'react';
import { FileText, ShieldCheck, AlertCircle } from 'lucide-react';

export const TermsContent: React.FC = () => {
  return (
    <div className="space-y-8 text-[#e3d8c8] text-xs sm:text-sm leading-relaxed">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#18120e] border border-[#e6ca65]/40 flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-[#e6ca65] shrink-0" />
        <p className="text-xs text-[#b5a391]">
          <strong className="text-[#e6ca65]">ZERO REAL MONEY WAGERING NOTICE:</strong> SixyWin is a free-to-play virtual entertainment platform. Sixy Coins (SC) have zero monetary value, cannot be deposited, purchased with real funds, or exchanged for real currency.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">1. Acceptance of Terms</h2>
        <p className="text-[#b5a391]">
          By accessing or using SixyWin Gaming Arena (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to all terms, do not use the Platform.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">2. Virtual Currency (Sixy Coins - SC)</h2>
        <p className="text-[#b5a391]">
          Sixy Coins (SC) are virtual tokens used exclusively for gameplay entertainment. All accounts start with a default virtual balance of 10,000.00 SC. SC holds zero cash value.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">3. 6/49 Lottery & Mini-Game Rules</h2>
        <p className="text-[#b5a391]">
          All lottery entries cost 200 SC per entry. Daily draws execute automatically every 24 hours at 00:00 UTC using cryptographic SHA-256 seed hashing.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">4. User Accounts & Fair Conduct</h2>
        <p className="text-[#b5a391]">
          Users must maintain one account. Automated bots, script manipulation, or exploitation of platform vulnerabilities are strictly prohibited.
        </p>
      </section>
    </div>
  );
};
