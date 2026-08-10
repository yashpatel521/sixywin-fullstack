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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#121624]/90 backdrop-blur-2xl px-4 sm:px-8 py-3.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Logo Emblem + Logo5 Name Image */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center p-0 m-0">
            <Image
              src="/logo/logo1.png"
              alt="SixyWin Emblem"
              fill
              className="object-contain p-0 m-0"
              priority
            />
          </div>

          <div className="relative w-36 h-9 overflow-hidden flex items-center justify-center p-0 m-0">
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
            className="px-4 py-2 text-xs font-extrabold text-slate-200 hover:text-white bg-[#181d2e] border border-slate-800 hover:border-slate-700 rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-amber-400" />
            <span>LOGIN</span>
          </button>

          {/* Register Button */}
          <button
            onClick={onRegisterClick}
            className="px-5 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 border border-amber-300/40 rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>REGISTER</span>
          </button>
        </div>
      </div>
    </header>
  );
};
