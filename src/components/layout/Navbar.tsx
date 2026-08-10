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
    <header className="sticky top-0 z-50 w-full border-b border-[#9c663b]/30 bg-[#0c0a09]/95 backdrop-blur-2xl px-4 sm:px-8 py-2 sm:py-2.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Official Logo7 Image */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-44 h-10 sm:w-56 sm:h-12 overflow-hidden flex items-center justify-center p-0 m-0">
            <Image
              src="/logo/logo7.png"
              alt="SixyWin Official Logo"
              fill
              className="object-contain p-0 m-0 group-hover:scale-105 transition-transform"
              priority
            />
          </div>
        </Link>

        {/* Right: Login & Register Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="px-4 py-2 text-xs font-extrabold text-[#faf6f0] hover:text-white bg-[#18120e] border border-[#9c663b]/50 hover:border-[#e6ca65] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <LogIn className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>LOGIN</span>
          </button>

          {/* Register Button */}
          <button
            onClick={onRegisterClick}
            className="px-5 py-2 text-xs font-extrabold text-[#0c0a09] bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] border border-[#faf6f0]/40 rounded-xl transition-all shadow-lg shadow-[#d4af37]/25 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>REGISTER</span>
          </button>
        </div>
      </div>
    </header>
  );
};
