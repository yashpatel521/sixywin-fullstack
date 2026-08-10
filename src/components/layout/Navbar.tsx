'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#121624]/90 backdrop-blur-2xl px-4 sm:px-8 py-3.5">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Logo with Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform overflow-hidden">
            <div className="w-full h-full bg-[#181d2e] rounded-[14px] flex items-center justify-center text-xl">
              🐱
            </div>
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            SIXY<span className="text-indigo-400">WIN</span>
          </span>
        </Link>

        {/* Right: Login & Register Buttons */}
        <div className="flex items-center gap-3">
          {/* Login Button */}
          <button
            onClick={onLoginClick}
            className="px-4 py-2 text-xs font-extrabold text-slate-200 hover:text-white bg-[#181d2e] border border-slate-800 hover:border-slate-700 rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-indigo-400" />
            <span>LOGIN</span>
          </button>

          {/* Register Button */}
          <button
            onClick={onRegisterClick}
            className="px-5 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/30 rounded-2xl transition-all shadow-lg shadow-indigo-600/30 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>REGISTER</span>
          </button>
        </div>
      </div>
    </header>
  );
};
