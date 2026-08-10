'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, LogIn, Crown, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate / Process authentication
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      
      // Temporary authentication mock delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      alert(`Welcome back to SixyWin! Logged in as ${email}`);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] px-6 sm:px-16 flex items-center justify-center py-16 m-0 overflow-hidden">
      {/* 24K Champagne Gold Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Main Glass Login Card */}
      <div className="relative z-10 w-full max-w-md space-y-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 shadow-[0_0_60px_rgba(212,175,55,0.2)] backdrop-blur-2xl">
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
            <h1 className="text-2xl sm:text-3xl font-black text-[#faf6f0]">
              Welcome Back
            </h1>
            <p className="text-xs text-[#b5a391]">
              Sign in to play 6/49 Lottery & Spatial Games
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1.5">
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
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/50 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
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
                className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/50 focus:border-[#e6ca65] text-[#faf6f0] placeholder-[#b5a391]/60 text-xs sm:text-sm font-medium focus:outline-none transition-all"
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
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded bg-[#0c0a09] border-[#9c663b]/60 text-[#e6ca65] focus:ring-0 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-[#b5a391] cursor-pointer select-none">
              Keep me signed in on this device
            </label>
          </div>

          {/* 24K Gold Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4 fill-current" />
            <span>{loading ? 'SIGNING IN...' : 'LOGIN TO ACCOUNT'}</span>
          </button>
        </form>

        {/* Card Footer: Register Link */}
        <div className="pt-4 border-t border-[#9c663b]/30 text-center text-xs text-[#b5a391]">
          <span>Don't have a SixyWin account? </span>
          <Link href="/register" className="text-[#e6ca65] font-extrabold hover:underline inline-flex items-center gap-1">
            Register Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Virtual Play Disclaimer */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#b5a391]/80 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-[#e6ca65]" />
          <span>100% Free Social Casino • Virtual Sixy Coins</span>
        </div>
      </div>
    </div>
  );
}
