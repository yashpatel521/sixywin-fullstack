'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Coins } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c0a09] border-t border-[#9c663b]/30 px-6 sm:px-16 pt-16 pb-12 text-[#faf6f0] m-0 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Logo & Responsive Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="relative w-48 h-12">
                <Image
                  src="/logo/logo7.png"
                  alt="SixyWin Official Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-[#b5a391] leading-relaxed max-w-sm">
              The Realm of High-Stakes 6/49 Lottery & Spatial Gaming. Powered by free virtual Sixy Coins (SC).
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18120e] border border-[#9c663b]/50 text-[#e6ca65] text-xs font-mono font-bold">
              <Coins className="w-3.5 h-3.5" />
              <span>100% FREE PLAY (SC)</span>
            </div>
          </div>

          {/* Column 2: Featured Games */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65]">
              Featured Games
            </h4>
            <ul className="space-y-2 text-xs text-[#b5a391]">
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  🎟️ 6/49 Lottery Jackpot
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  🃏 HighLow (Double Trouble)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  💣 Minesweeper Matrix
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  🎡 Cyber Fortune Wheel
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  🎰 Neon Slot 777
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65]">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-[#b5a391]">
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  Shield Check Provably Fair
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  15% Weekly Rakeback (SC)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  24K VIP Suite Lounge
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#faf6f0] transition-colors">
                  Cryptographic Server Seeds
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Responsible Gaming */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65]">
              Responsible Gaming
            </h4>
            <p className="text-xs text-[#b5a391] leading-relaxed">
              SixyWin is a free-to-play social entertainment platform operating exclusively with virtual Sixy Coins (SC). No real money wagering or real currency prizes are involved.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#e6ca65] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-[#e6ca65]" />
              <span>18+ Entertainment Platform</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Responsive Flexbox) */}
        <div className="pt-8 border-t border-[#9c663b]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#b5a391] text-center sm:text-left">
          <p>© 2026 SIXYWIN. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="#" className="hover:text-[#faf6f0] transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-[#faf6f0] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#faf6f0] transition-colors">
              Fairness Seeds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
