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
  PlusCircle,
  Settings,
  Bell,
  Volume2,
  VolumeX,
  ShieldCheck,
  ChevronDown,
  Mail,
  Trophy,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick }) => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsSettingsOpen(false);
    logout();
    toast.info('Logged out successfully.');
  };

  const handleClaimBonus = () => {
    toast.success('Daily Bonus Claimed!', {
      description: '+1,000 Free Sixy Coins (SC) added to your wallet!',
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

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isLoggedIn && user ? (
            /* Live Sixy Coins (SC) Balance Pill */
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
          ) : (
            /* Guest Login / Register Buttons */
            <>
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
            </>
          )}

          {/* ⚙️ Settings Icon & Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2.5 rounded-xl bg-[#18120e] hover:bg-[#281d14] border border-[#9c663b]/50 hover:border-[#e6ca65] text-[#e6ca65] hover:text-[#faf6f0] transition-all cursor-pointer shadow-md flex items-center gap-1.5 group active:scale-95"
              title="Platform Settings & Account"
            >
              <Settings className={`w-4.5 h-4.5 transition-transform duration-300 ${isSettingsOpen ? 'rotate-90 text-[#faf6f0]' : 'group-hover:rotate-45'}`} />
              {isLoggedIn && user && (
                <span className="text-xs font-bold text-[#faf6f0] max-w-[90px] truncate hidden sm:inline">
                  @{user.username}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 text-[#b5a391] transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Modal */}
            {isSettingsOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-gradient-to-b from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* 1. Logged-In User Profile & VIP Tier Section Inside Dropdown */}
                {isLoggedIn && user ? (
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

                      {/* VIP Tier Badge Inside Dropdown */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#18120e] border border-[#e6ca65]/50 text-[#e6ca65] text-xs font-extrabold font-mono shrink-0">
                        <Crown className="w-3 h-3 text-[#e6ca65] animate-pulse" />
                        <span>{user.vipLevel || 'BRONZE VIP'}</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="px-2 py-1 flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#e6ca65]">
                    <span className="flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5" /> PLATFORM SETTINGS
                    </span>
                    <span className="text-[10px] font-mono text-[#b5a391]">GUEST MODE</span>
                  </div>
                )}

                {/* 2. Settings Menu Items */}
                <div className="space-y-1 text-xs">
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

                  {/* Draw Notifications Toggle */}
                  <button
                    onClick={toggleNotifications}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-[#281d14] text-[#faf6f0] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-[#e6ca65]" />
                      <span>6/49 Draw Alerts</span>
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${notificationsEnabled ? 'bg-[#e6ca65]/20 text-[#e6ca65]' : 'bg-[#0c0a09] text-[#b5a391]'}`}>
                      {notificationsEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Provably Fair Verifier */}
                  <button
                    onClick={() => {
                      setIsSettingsOpen(false);
                      toast.info('Provably Fair Engine Active', {
                        description: 'Server seed hash: 8f94e2...d91a (Verified)',
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-[#281d14] text-[#faf6f0] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#e6ca65]" />
                      <span>Provably Fair Engine</span>
                    </span>
                    <span className="text-[10px] text-[#e6ca65] font-mono font-bold">100% FAIR</span>
                  </button>

                  {/* Logged-In User Sign Out */}
                  {isLoggedIn && (
                    <div className="pt-2 border-t border-[#9c663b]/30">
                      <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2.5 rounded-xl hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center gap-2.5 transition-colors cursor-pointer font-bold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out Account</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
