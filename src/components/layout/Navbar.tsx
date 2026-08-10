'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#9c663b]/30 bg-[#0c0a09]/95 backdrop-blur-2xl px-6 sm:px-16 py-2.5 sm:py-3.5 m-0">
      <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Left: Official Logo7 Image (Extra Large Screen Scaling) */}
        <Link href="/" className="flex items-center group shrink-0">
          <div className="relative w-40 h-9 sm:w-60 sm:h-14 overflow-hidden flex items-center justify-center p-0 m-0">
            <Image
              src="/logo/logo7.png"
              alt="SixyWin Official Logo"
              fill
              className="object-contain p-0 m-0 group-hover:scale-105 transition-transform"
              priority
            />
          </div>
        </Link>

        {/* Right: Responsive Login & Register Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Login Link */}
          <Link
            href="/login"
            onClick={onLoginClick}
            className="px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-extrabold text-[#faf6f0] hover:text-white bg-[#18120e] border border-[#9c663b]/50 hover:border-[#e6ca65] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <LogIn className="w-4 h-4 text-[#e6ca65]" />
            <span>LOGIN</span>
          </Link>

          {/* Register Link */}
          <Link
            href="/register"
            onClick={onRegisterClick}
            className="px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-extrabold text-[#0c0a09] bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] border border-[#faf6f0]/40 rounded-xl transition-all shadow-lg shadow-[#d4af37]/25 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>REGISTER</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
