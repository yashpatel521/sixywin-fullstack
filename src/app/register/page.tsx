'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, UserPlus, Crown, ArrowRight, ShieldCheck, Trophy, Sparkles, Coins } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!username || !email || !password) {
        throw new Error('Please fill in all fields.');
      }

      await new Promise((resolve) => setTimeout(resolve, 800));
      alert(`Welcome to SixyWin! Account created for ${username}. Free 10,000 SC welcome bonus credited!`);
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
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
              <span className="text-[#faf6f0]">JOIN SIXYWIN TODAY</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#faf6f0] leading-[1.08]">
              Claim Your Free <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6ca65] via-[#faf6f0] to-[#b5952f] drop-shadow-sm">
                10,000 SC Welcome Bonus
              </span>
            </h1>
            <p className="text-[#e3d8c8] text-base sm:text-lg max-w-xl leading-relaxed">
              Create your free account now to enter the 6/49 Jackpot Lottery, spin the Cyber Fortune Wheel, and enjoy weekly rakeback bonuses!
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
              <Coins className="w-4 h-4" /> 10,000 Free SC Bonus
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-[#faf6f0]">
              <ShieldCheck className="w-4 h-4 text-[#e6ca65]" /> 100% Provably Fair
            </span>
          </div>
        </div>

        {/* Right 50% Column: Register Form Card */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-md space-y-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 shadow-[0_0_60px_rgba(212,175,55,0.2)] backdrop-blur-2xl">
            {/* Card Header with Logo */}
            <div className="text-center space-y-3">
              <Link href="/" className="inline-block">
                <div className="relative w-48 h-12 mx-auto">
                  <Image
                    src="/logo/logo7.png"
                    alt="SixyWin Official Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-[#faf6f0]">
                  Create Account
                </h2>
                <p className="text-xs text-[#b5a391]">
                  Sign up in seconds to start playing
                </p>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Username Field */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65] block">
                  Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#b5a391] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="HighRoller649"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0c0a09] border border-[#9c663b]/50 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65] block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#b5a391] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0c0a09] border border-[#9c663b]/50 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#e6ca65] block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#b5a391] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0c0a09] border border-[#9c663b]/50 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 rounded bg-[#0c0a09] border-[#9c663b]/60 text-[#e6ca65] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-[#b5a391] cursor-pointer select-none">
                  I agree to Terms & 100% Free Social Play Rules
                </label>
              </div>

              {/* 24K Gold Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-50"
              >
                <UserPlus className="w-4 h-4" />
                <span>{loading ? 'CREATING ACCOUNT...' : 'REGISTER & CLAIM 10,000 SC'}</span>
              </button>
            </form>

            {/* Card Footer: Login Link */}
            <div className="pt-3 border-t border-[#9c663b]/30 text-center text-xs text-[#b5a391]">
              <span>Already have an account? </span>
              <Link href="/login" className="text-[#e6ca65] font-extrabold hover:underline inline-flex items-center gap-1">
                Sign In Now <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
