'use client';

import React from 'react';
import { X, HelpCircle, Trophy, ShieldCheck, Coins, CheckCircle2, Flame } from 'lucide-react';

interface LotteryRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LotteryRulesModal: React.FC<LotteryRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0a09]/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border-2 border-[#e6ca65]/70 shadow-[0_0_80px_rgba(212,175,55,0.3)] space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#b5a391] hover:text-[#faf6f0] p-1.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#9c663b]/30 pb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] flex items-center justify-center text-[#0c0a09] font-black shadow-md">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#e6ca65] font-extrabold uppercase tracking-wider block">
              OFFICIAL GAME RULES & PAYOUTS
            </span>
            <h3 className="text-xl font-black text-[#faf6f0]">How to Play 6/49 Lottery</h3>
          </div>
        </div>

        {/* Rules Body Content */}
        <div className="space-y-4 text-xs text-[#e3d8c8] leading-relaxed">
          {/* Rule 1 */}
          <div className="p-3.5 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#faf6f0] text-sm">
              <CheckCircle2 className="w-4 h-4 text-[#e6ca65]" />
              <span>1. Pick Your 6 Lucky Numbers</span>
            </div>
            <p className="text-[#b5a391] pl-6">
              Select 6 unique numbers from 1 to 49 on the ball matrix, or click <strong className="text-[#e6ca65]">Quick Pick</strong> to automatically generate random numbers.
            </p>
          </div>

          {/* Rule 2: 5X Lucky Ball Rule */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/50 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#faf6f0] text-sm">
              <Flame className="w-4.5 h-4.5 text-amber-400 animate-bounce" />
              <span>2. Today's 5X Lucky Ball Multiplier</span>
            </div>
            <p className="text-[#e3d8c8] pl-6">
              Each daily draw features an official <strong className="text-[#e6ca65]">5X Lucky Ball</strong>. If your ticket includes this ball and hits any winning match tier (3/6, 4/6, 5/6, 6/6), your payout is multiplied by <strong className="text-amber-400 font-mono font-black text-sm">5X INSTANTLY</strong>!
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-3.5 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#faf6f0] text-sm">
              <Coins className="w-4 h-4 text-[#e6ca65]" />
              <span>3. Ticket Pricing & SC Wallet Settlement</span>
            </div>
            <p className="text-[#b5a391] pl-6">
              Each ticket entry costs <strong className="text-[#e6ca65]">200 Sixy Coins (SC)</strong>. Sixy Coins are 100% free virtual tokens with zero real-money wagering.
            </p>
          </div>

          {/* Rule 4: Payout Table */}
          <div className="p-3.5 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#faf6f0] text-sm">
              <Trophy className="w-4 h-4 text-[#e6ca65]" />
              <span>4. Payout Structure & Prize Tiers</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-[#18120e] border border-[#e6ca65]/30 text-center">
                <span className="text-[10px] text-[#b5a391] font-bold block">MATCH 6/6</span>
                <span className="font-mono font-black text-[#e6ca65] text-xs">1,250,000 SC</span>
                <span className="text-[9px] text-amber-400 font-bold block">(6.25M WITH 5X)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18120e] border border-[#e6ca65]/30 text-center">
                <span className="text-[10px] text-[#b5a391] font-bold block">MATCH 5/6</span>
                <span className="font-mono font-black text-[#faf6f0] text-xs">50,000 SC</span>
                <span className="text-[9px] text-amber-400 font-bold block">(250K WITH 5X)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18120e] border border-[#e6ca65]/30 text-center">
                <span className="text-[10px] text-[#b5a391] font-bold block">MATCH 4/6</span>
                <span className="font-mono font-black text-[#faf6f0] text-xs">2,500 SC</span>
                <span className="text-[9px] text-amber-400 font-bold block">(12.5K WITH 5X)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#18120e] border border-[#e6ca65]/30 text-center">
                <span className="text-[10px] text-[#b5a391] font-bold block">MATCH 3/6</span>
                <span className="font-mono font-black text-[#faf6f0] text-xs">250 SC</span>
                <span className="text-[9px] text-amber-400 font-bold block">(1,250 WITH 5X)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] text-[#0c0a09] font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg active:scale-95 transition-all"
        >
          I UNDERSTAND • GOT IT!
        </button>
      </div>
    </div>
  );
};
