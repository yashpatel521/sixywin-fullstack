'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Crown, Heart, Ticket, Gamepad2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#9c663b]/30 bg-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-12">
      <div className="w-full max-w-[1800px] mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-12">
                <Image
                  src="/logo/logo7.png"
                  alt="SixyWin Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-[#b5a391] leading-relaxed">
              SixyWin is a free-to-play virtual gaming arena featuring provably fair mini-games and the official 6/49 Lottery Draw using virtual Sixy Coins (SC).
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#e6ca65]">
              Gaming Arena
            </h4>
            <ul className="space-y-2 text-xs text-[#b5a391]">
              <li>
                <Link href="/games" className="hover:text-[#faf6f0] transition-colors">
                  All Game Tables
                </Link>
              </li>
              <li>
                <Link href="/games/lottery" className="hover:text-[#e6ca65] text-[#e6ca65] font-bold transition-colors">
                  6/49 Lottery Draw
                </Link>
              </li>
              <li>
                <Link href="/fairness" className="hover:text-[#faf6f0] transition-colors">
                  Provably Fair Verifier
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#e6ca65]">
              Company & Help
            </h4>
            <ul className="space-y-2 text-xs text-[#b5a391]">
              <li>
                <Link href="/about" className="hover:text-[#faf6f0] transition-colors">
                  About SixyWin
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#faf6f0] transition-colors">
                  FAQ & Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#faf6f0] transition-colors">
                  24/7 Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#e6ca65]">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs text-[#b5a391]">
              <li>
                <Link href="/terms" className="hover:text-[#faf6f0] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#faf6f0] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18120e] border border-[#e6ca65]/40 text-[#e6ca65] text-[10px] font-mono font-bold">
                  <ShieldCheck className="w-3 h-3 text-[#e6ca65]" />
                  <span>100% FREE PLAY (ZERO REAL MONEY)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#9c663b]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b5a391]">
          <p>© {new Date().getFullYear()} SixyWin Gaming Arena. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with 24K Gold Precision for High-Roller Entertainment
          </p>
        </div>
      </div>
    </footer>
  );
};
