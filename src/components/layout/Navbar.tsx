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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#121624]/95 backdrop-blur-2xl px-4 sm:px-8 py-4">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Prominent Large Logo Emblem + Logo5 Name Image */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden flex items-center justify-center p-0 m-0 shrink-0">
            <Image
              src="/logo/logo1.png"
              alt="SixyWin Emblem"
              fill
              className="object-contain p-0 m-0 group-hover:scale-105 transition-transform"
              priority
            />
          </div>

          <div className="relative w-48 h-12 sm:w-60 sm:h-16 overflow-hidden flex items-center justify-center p-0 m-0">
            <Image
              src="/logo/logo5.png"
              alt="SixyWin Brand"
              fill
              className="object-contain p-0 m-0"
              priority
            />
          </div>
        </Link>

        {/* Right: Login & Register Buttons */}
        <div className="flex items-center gap-3">
          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-200 hover:text-white bg-[#181d2e] border border-slate-800 hover:border-slate-700 rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <LogIn className="w-4 h-4 text-amber-400" />
            <span>LOGIN</span>
          </button>

          {/* Register Button */}
          <button
            onClick={onRegisterClick}
            className="px-6 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 border border-amber-300/40 rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>REGISTER</span>
          </button>
        </div>
      </div>
    </header>
  );
};
