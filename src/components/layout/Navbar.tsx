'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LogIn,
  UserPlus,
  Coins,
  Crown,
  LogOut,
  User,
  Settings,
  Bell,
  Volume2,
  VolumeX,
  ShieldCheck,
  ChevronDown,
  Gift,
  Ticket,
  HelpCircle,
  Info,
  Mail,
  Gamepad2,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '@/components/ui/Skeleton';
import { toast } from 'sonner';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    toast.info('Logged out successfully.');
  };

  const handleClaimBonus = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toast.success('Daily SC Bonus Claimed!', {
      description: '+1,000 Free Sixy Coins (SC) added to your account!',
    });
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast.info(soundEnabled ? 'Game Sound Effects Muted' : 'Game Sound Effects Enabled');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.info(notificationsEnabled ? 'Draw Alerts Disabled' : '6/49 Draw Alerts Enabled');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#9c663b]/30 bg-[#0c0a09]/95 backdrop-blur-2xl px-4 sm:px-12 py-2.5 sm:py-3.5 m-0">
      <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Left: Official Logo + Navigation Links */}
        <div className="flex items-center gap-6 sm:gap-10">
          <Link href={isLoggedIn ? '/games' : '/'} className="flex items-center group shrink-0">
            <div className="relative w-36 h-9 sm:w-52 sm:h-12 overflow-hidden flex items-center justify-center p-0 m-0">
              <Image
                src="/logo/logo7.png"
                alt="SixyWin Official Logo"
                fill
                className="object-contain p-0 m-0 group-hover:scale-105 transition-transform"
                priority
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-black uppercase tracking-wider">
            <Link
              href="/games"
              className="text-[#faf6f0] hover:text-[#e6ca65] transition-colors flex items-center gap-1.5"
            >
              <Gamepad2 className="w-4 h-4 text-[#e6ca65]" />
              <span>ARENA</span>
            </Link>

            <Link
              href="/games/lottery"
              className="text-[#faf6f0] hover:text-[#e6ca65] transition-colors flex items-center gap-1.5"
            >
              <Ticket className="w-4 h-4 text-[#e6ca65]" />
              <span>6/49 LOTTERY</span>
            </Link>

            <Link
              href="/faq"
              className="text-[#b5a391] hover:text-[#faf6f0] transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-[#e6ca65]" />
              <span>FAQ</span>
            </Link>

            <Link
              href="/about"
              className="text-[#b5a391] hover:text-[#faf6f0] transition-colors flex items-center gap-1.5"
            >
              <Info className="w-4 h-4 text-[#e6ca65]" />
              <span>ABOUT US</span>
            </Link>

            <Link
              href="/contact"
              className="text-[#b5a391] hover:text-[#faf6f0] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-[#e6ca65]" />
              <span>CONTACT</span>
            </Link>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {!mounted ? (
            /* Skeleton Loading State during Hydration */
            <div className="flex items-center gap-3">
              <Skeleton className="w-36 h-9 rounded-xl" />
              <Skeleton className="w-9 h-9 rounded-xl" />
            </div>
          ) : isLoggedIn && user ? (
            /* 🪙 Combined Sixy Coins Balance & Settings Icon Pill */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3.5 px-4 py-2 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#e6ca65]/60 hover:border-[#e6ca65] transition-all cursor-pointer shadow-md group active:scale-95 text-left"
                title="Account Wallet & Settings"
              >
                {/* Coins Balance Info */}
                <div className="flex items-center gap-2">
                  <Coins className="w-4.5 h-4.5 text-[#e6ca65]" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#b5a391] uppercase tracking-wider font-extrabold leading-none">
                      BALANCE
                    </span>
                    <span className="text-xs sm:text-sm font-black font-mono text-[#e6ca65]">
                      {user.sixyCoinsBalance || '10,000.00'} SC
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-5 w-[1px] bg-[#9c663b]/40" />

                {/* Settings Gear Icon */}
                <div className="flex items-center gap-1.5 text-[#e6ca65]">
                  <Settings className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-90 text-[#faf6f0]' : 'group-hover:rotate-45'}`} />
                  <ChevronDown className={`w-3 h-3 text-[#b5a391] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Combined Dropdown Menu Modal */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-gradient-to-b from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* 1. Logged-In User Profile & VIP Tier Section */}
                  <div className="p-3.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#18120e] border border-[#e6ca65]/60 flex items-center justify-center text-[#e6ca65]">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <strong className="text-sm font-black text-[#faf6f0] block">
                            @{user.username}
                          </strong>
                          <span className="text-[11px] text-[#b5a391] block truncate max-w-[140px]">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {/* VIP Tier Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#18120e] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-extrabold font-mono shrink-0">
                        <Crown className="w-3 h-3 text-[#e6ca65] animate-pulse" />
                        <span>{user.vipLevel || 'BRONZE VIP'}</span>
                      </span>
                    </div>
                  </div>

                  {/* 2. Wallet & Daily SC Bonus Card */}
                  <div className="p-3 rounded-xl bg-[#18120e] border border-[#9c663b]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#faf6f0]">
                      <Gift className="w-4 h-4 text-[#e6ca65]" />
                      <span>Daily Rakeback Bonus</span>
                    </div>
                    <button
                      onClick={handleClaimBonus}
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-[11px] font-extrabold shadow-sm cursor-pointer hover:from-[#f0d885]"
                    >
                      CLAIM 1,000 SC
                    </button>
                  </div>

                  {/* 3. Settings Menu Options */}
                  <div className="space-y-1 text-xs">
                    <Link
                      href="/faq"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-3 py-2.5 rounded-xl hover:bg-[#281d14] text-[#faf6f0] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-[#e6ca65]" />
                        <span>FAQ & Knowledge Base</span>
                      </span>
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-3 py-2.5 rounded-xl hover:bg-[#281d14] text-[#faf6f0] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Info className="w-4 h-4 text-[#e6ca65]" />
                        <span>About SixyWin</span>
                      </span>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-3 py-2.5 rounded-xl hover:bg-[#281d14] text-[#faf6f0] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-[#e6ca65]" />
                        <span>Contact Support</span>
                      </span>
                    </Link>

                    {/* Sound FX Toggle */}
                    <button
                      onClick={toggleSound}
                      className="w-full px-3 py-2.5 rounded-xl hover:bg-[#281d14] text-[#faf6f0] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        {soundEnabled ? (
                          <Volume2 className="w-4 h-4 text-[#e6ca65]" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-[#b5a391]" />
                        )}
                        <span>Sound Effects</span>
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${soundEnabled ? 'bg-[#e6ca65]/20 text-[#e6ca65]' : 'bg-[#0c0a09] text-[#b5a391]'}`}>
                        {soundEnabled ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    {/* Logged-In User Sign Out */}
                    <div className="pt-2 border-t border-[#9c663b]/30">
                      <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2.5 rounded-xl hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center gap-2.5 transition-colors cursor-pointer font-bold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out Account</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest Login / Register Buttons + Settings Icon */
            <div className="flex items-center gap-3">
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

              {/* Guest Settings Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2.5 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#9c663b]/50 hover:border-[#e6ca65] text-[#e6ca65] transition-all cursor-pointer shadow-md"
                  title="Settings"
                >
                  <Settings className={`w-4.5 h-4.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-90 text-[#faf6f0]' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-gradient-to-b from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 p-3 space-y-2 z-50 shadow-2xl">
                    <div className="px-2 py-1 text-xs font-black uppercase text-[#e6ca65] border-b border-[#9c663b]/30">
                      PLATFORM SETTINGS
                    </div>
                    <Link
                      href="/faq"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-3 py-2 rounded-xl hover:bg-[#281d14] text-[#faf6f0] text-xs flex items-center gap-2"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#e6ca65]" />
                      <span>FAQ</span>
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-3 py-2 rounded-xl hover:bg-[#281d14] text-[#faf6f0] text-xs flex items-center gap-2"
                    >
                      <Info className="w-3.5 h-3.5 text-[#e6ca65]" />
                      <span>About Us</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full px-3 py-2 rounded-xl hover:bg-[#281d14] text-[#faf6f0] text-xs flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#e6ca65]" />
                      <span>Contact Us</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
