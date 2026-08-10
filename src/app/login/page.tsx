'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, LogIn, Crown, ArrowRight, ShieldCheck, Trophy, UserCheck, X } from 'lucide-react';
import { toast } from 'sonner';
import { loginUserAction, quickLoginAction } from '@/app/actions/authActions';

interface SavedProfile {
  username: string;
  email: string;
  scBalance: string;
  vipLevel: string;
  icon?: string;
  lastLogin?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);

  // Load ONLY real saved profiles from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sixywin_saved_profiles');
      if (stored) {
        const parsed: SavedProfile[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedProfiles(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load saved profiles from localStorage', e);
    }
  }, []);

  // Helper to save a profile into localStorage upon login
  const saveProfileToLocalStorage = (user: { username: string; email: string; sixyCoinsBalance: string; vipLevel: string }) => {
    try {
      const stored = localStorage.getItem('sixywin_saved_profiles');
      let currentProfiles: SavedProfile[] = stored ? JSON.parse(stored) : [];
      
      // Filter out existing profile if already saved to update it
      currentProfiles = currentProfiles.filter((p) => p.email.toLowerCase() !== user.email.toLowerCase());
      
      // Prepend newly logged-in profile
      const newProfile: SavedProfile = {
        username: user.username,
        email: user.email,
        scBalance: `${user.sixyCoinsBalance} SC`,
        vipLevel: user.vipLevel || 'BRONZE',
        icon: '👤',
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      const updated = [newProfile, ...currentProfiles].slice(0, 5);
      localStorage.setItem('sixywin_saved_profiles', JSON.stringify(updated));
      setSavedProfiles(updated);
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  };

  // Remove a profile from localStorage
  const removeSavedProfile = (e: React.MouseEvent, emailToRemove: string) => {
    e.stopPropagation();
    try {
      const updated = savedProfiles.filter((p) => p.email.toLowerCase() !== emailToRemove.toLowerCase());
      setSavedProfiles(updated);
      localStorage.setItem('sixywin_saved_profiles', JSON.stringify(updated));
      toast.info('Saved account removed from device.');
    } catch (err) {
      console.error(err);
    }
  };

  // 1-Click Saved Profile Login Handler
  const handleQuickProfileLogin = async (profile: SavedProfile) => {
    setLoading(true);
    try {
      const result = await quickLoginAction(
        profile.email,
        profile.username,
        profile.scBalance.replace(/[^0-9.]/g, '') || '10000',
        profile.vipLevel || 'BRONZE'
      );

      if (!result.success) {
        toast.error(result.error || 'Quick login failed.');
        return;
      }

      if (result.user) {
        saveProfileToLocalStorage(result.user);
      }

      toast.success(result.message, {
        description: `Active balance: ${result.user?.sixyCoinsBalance} SC (${result.user?.vipLevel})`,
      });

      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err: any) {
      toast.error('Quick login error.');
    } finally {
      setLoading(false);
    }
  };

  // Credentials Login Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error('Please enter both email and password.');
        return;
      }

      const result = await loginUserAction({
        email,
        password,
        rememberMe,
      });

      if (!result.success) {
        toast.error(result.error || 'Failed to sign in.');
        return;
      }

      // Save user profile to localStorage on successful login
      if (result.user) {
        saveProfileToLocalStorage(result.user);
      }

      toast.success(result.message, {
        description: rememberMe
          ? 'Saved to this device. Welcome back!'
          : `Active balance: ${result.user?.sixyCoinsBalance} SC`,
      });

      setTimeout(() => {
        router.push('/');
      }, 1200);
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen max-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] px-6 sm:px-16 flex items-center justify-center py-6 m-0 overflow-hidden">
      {/* 24K Champagne Gold Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#d4af37]/12 rounded-full blur-[180px] pointer-events-none" />

      {/* 50-50 2-Column Layout */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
        {/* Left 50% Column: 3D Art & Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#e6ca65]">
              <Crown className="w-5 h-5 text-[#e6ca65] animate-pulse" />
              <span className="text-[#faf6f0]">SIXYWIN 24K VIP LOUNGE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
              Welcome Back To The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                6/49 Lottery Realm
              </span>
            </h1>
            <p className="text-[#e3d8c8] text-base sm:text-lg max-w-xl leading-relaxed">
              Access your virtual wallet, track your 6/49 Lottery tickets, and play 3D spatial games with free Sixy Coins (SC).
            </p>
          </div>

          {/* 3D Blended Crown Art */}
          <div className="relative w-full max-w-md aspect-square mx-auto">
            <Image
              src="/landing/blendable_hero_3d.png"
              alt="3D Luxury Casino Crown & Dice"
              fill
              className="object-contain remove-img-bg"
              priority
            />
            <div className="absolute inset-0 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>

          {/* Key Perks Ribbon */}
          <div className="flex items-center gap-6 pt-2 text-xs text-[#b5a391]">
            <span className="flex items-center gap-1.5 text-[#e6ca65]">
              <Trophy className="w-4 h-4" /> 1,250,000 SC Jackpot
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#faf6f0]">
              <ShieldCheck className="w-4 h-4 text-[#e6ca65]" /> Provably Fair RNG
            </span>
          </div>
        </div>

        {/* Right 50% Column: Login Form Card */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-md space-y-5 p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 shadow-[0_0_60px_rgba(212,175,55,0.2)] backdrop-blur-2xl">
            {/* Card Header with Logo */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-block">
                <div className="relative w-44 h-11 mx-auto">
                  <Image
                    src="/logo/logo7.png"
                    alt="SixyWin Official Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              <div className="space-y-0.5">
                <h2 className="text-xl sm:text-2xl font-black text-[#faf6f0]">
                  Account Sign In
                </h2>
                <p className="text-xs text-[#b5a391]">
                  Enter your credentials to access your account
                </p>
              </div>
            </div>

            {/* LocalStorage Saved Profiles Selector (ONLY shown if user previously logged in on this device) */}
            {savedProfiles.length > 0 && (
              <div className="space-y-2 pb-1">
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#e6ca65] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#e6ca65]" />
                    <span>PREVIOUSLY SIGNED-IN ACCOUNTS</span>
                  </span>
                  <span className="text-[10px] text-[#b5a391] font-normal">1-Click Sign In</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-36 overflow-y-auto">
                  {savedProfiles.map((p) => (
                    <div
                      key={p.email}
                      onClick={() => handleQuickProfileLogin(p)}
                      className="relative p-3 rounded-xl bg-[#0c0a09] hover:bg-[#281d14] border border-[#9c663b]/50 hover:border-[#e6ca65] text-left transition-all cursor-pointer shadow-md group active:scale-95 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-[#18120e] border border-[#9c663b]/40 flex items-center justify-center text-sm shrink-0">
                          {p.icon || '👤'}
                        </div>
                        <div className="overflow-hidden">
                          <strong className="text-xs text-[#faf6f0] block truncate group-hover:text-[#e6ca65]">
                            {p.username}
                          </strong>
                          <span className="text-[10px] font-mono text-[#b5a391] block truncate">
                            {p.scBalance}
                          </span>
                        </div>
                      </div>

                      {/* Remove saved profile */}
                      <button
                        type="button"
                        onClick={(e) => removeSavedProfile(e, p.email)}
                        className="p-1 text-[#b5a391] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        title="Remove account from device"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="relative flex items-center justify-center pt-1">
                  <div className="border-t border-[#9c663b]/30 w-full" />
                  <span className="bg-[#18120e] px-3 text-[9px] text-[#b5a391] uppercase tracking-wider font-bold shrink-0">
                    OR SIGN IN ANOTHER ACCOUNT
                  </span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65] block">
                  Email Address or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#b5a391] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com or username"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/50 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65] block">
                    Password
                  </label>
                  <Link href="#" className="text-[11px] text-[#e6ca65] hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#b5a391] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/50 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b5a391] hover:text-[#faf6f0] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#0c0a09] border-[#9c663b]/60 text-[#e6ca65] focus:ring-0 cursor-pointer accent-[#d4af37]"
                />
                <label htmlFor="remember" className="text-xs text-[#b5a391] cursor-pointer select-none">
                  Keep me signed in on this device (30 Days)
                </label>
              </div>

              {/* 24K Gold Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-50"
              >
                <LogIn className="w-4 h-4 fill-current" />
                <span>{loading ? 'AUTHENTICATING...' : 'LOGIN TO ACCOUNT'}</span>
              </button>
            </form>

            {/* Card Footer: Register Link */}
            <div className="pt-2 border-t border-[#9c663b]/30 text-center text-xs text-[#b5a391]">
              <span>Don't have a SixyWin account? </span>
              <Link href="/register" className="text-[#e6ca65] font-extrabold hover:underline inline-flex items-center gap-1">
                Register Now <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
