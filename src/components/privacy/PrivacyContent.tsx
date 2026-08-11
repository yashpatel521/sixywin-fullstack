'use client';

import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const PrivacyContent: React.FC = () => {
  return (
    <div className="space-y-8 text-[#e3d8c8] text-xs sm:text-sm leading-relaxed">
      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">1. Data We Collect</h2>
        <p className="text-[#b5a391]">
          We collect basic account credentials (username and hashed email) required for platform access, gameplay session persistence, and ticket ownership records.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">2. How We Use Data</h2>
        <p className="text-[#b5a391]">
          Your information is strictly used to deliver free gaming services, calculate Sixy Coins balances, manage lottery entries, and provide security protection against multi-account abuse.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">3. No Financial Data Storage</h2>
        <p className="text-[#b5a391]">
          Because SixyWin is 100% free-to-play with zero real-money deposits, we never request or store credit card numbers, bank details, or financial payment info.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base sm:text-lg font-black text-[#faf6f0]">4. Data Protection & Encryption</h2>
        <p className="text-[#b5a391]">
          All account passwords are encrypted using industry-standard bcrypt hashing. Sessions are protected via HTTP-Only SSL encrypted cookies.
        </p>
      </section>
    </div>
  );
};
