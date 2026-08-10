'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, UserPlus, Coins, Crown, LogOut, User, PlusCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const { user, isLoggedIn, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully.');
  };

  const handleClaimBonus = () => {
    toast.success('Daily Bonus Claimed!', {
      description: '+1,000 Free Sixy Coins (SC) added to your wallet!',
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#9c663b]/30 bg-[#0c0a09]/95 backdrop-blur-2xl px-6 sm:px-16 py-2.5 sm:py-3.5 m-0">
      <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Left: Official Logo7 Image */}
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

        {/* Right: Dynamic Header State (Guest vs Logged-In User) */}
        {isLoggedIn && user ? (
          <div className="flex items-center gap-3 sm:gap-5">
            {/* 1. Live Sixy Coins (SC) Balance Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#18120e] border border-[#e6ca65]/50 shadow-md">
              <div className="flex items-center gap-1.5">
                <Coins className="w-4.5 h-4.5 text-[#e6ca65]" />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-[#b5a391] uppercase tracking-wider font-extrabold leading-none">
                    BALANCE
                  </span>
                  <span className="text-xs sm:text-sm font-black font-mono text-[#e6ca65]">
                    {user.sixyCoinsBalance || '10,000.00'} SC
                  </span>
                </div>
              </div>

              {/* Quick Add SC Bonus Button */}
              <button
                onClick={handleClaimBonus}
                className="p-1 text-[#e6ca65] hover:text-[#faf6f0] hover:scale-110 transition-transform cursor-pointer"
                title="Claim Free SC Daily Bonus"
              >
                <PlusCircle className="w-4 h-4 fill-[#d4af37]/20" />
              </button>
            </div>

            {/* 2. VIP Tier Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18120e] border border-[#9c663b]/40 text-[#faf6f0] text-xs font-bold font-mono">
              <Crown className="w-3.5 h-3.5 text-[#e6ca65] animate-pulse" />
              <span>{user.vipLevel || 'BRONZE VIP'}</span>
            </div>

            {/* 3. Logged-In User Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#9c663b]/30">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#18120e] border border-[#9c663b]/40">
                <User className="w-4 h-4 text-[#e6ca65]" />
                <span className="text-xs font-extrabold text-[#faf6f0] max-w-[100px] sm:max-w-[140px] truncate">
                  @{user.username}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-[#18120e] hover:bg-red-500/20 text-[#b5a391] hover:text-red-400 border border-[#9c663b]/40 hover:border-red-500/40 transition-all cursor-pointer shadow-md"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Guest Buttons */
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/login"
              onClick={onLoginClick}
              className="px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-extrabold text-[#faf6f0] hover:text-white bg-[#18120e] border border-[#9c663b]/50 hover:border-[#e6ca65] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <LogIn className="w-4 h-4 text-[#e6ca65]" />
              <span>LOGIN</span>
            </Link>

            <Link
              href="/register"
              onClick={onRegisterClick}
              className="px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-extrabold text-[#0c0a09] bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] border border-[#faf6f0]/40 rounded-xl transition-all shadow-lg shadow-[#d4af37]/25 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>REGISTER</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
