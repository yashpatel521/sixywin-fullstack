'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Coins, Sliders, AlertCircle, Play } from 'lucide-react';
import { Game } from './GamesGrid';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

interface GamePlayModalProps {
  game: Game | null;
  onClose: () => void;
  onPlayMiniGame: (betAmount: number) => void;
}

export const GamePlayModal: React.FC<GamePlayModalProps> = ({
  game,
  onClose,
  onPlayMiniGame,
}) => {
  const { user } = useAuthStore();
  const currentBalance = parseFloat(user?.sixyCoinsBalance || '10000');

  // Wager State with clamping
  const defaultBet = Math.min(100, currentBalance > 0 ? currentBalance : 100);
  const [wagerAmount, setWagerAmount] = useState<number>(defaultBet);

  // Keep wager capped if balance updates
  useEffect(() => {
    if (wagerAmount > currentBalance) {
      setWagerAmount(Math.max(10, currentBalance));
    }
  }, [currentBalance, wagerAmount]);

  if (!game) return null;

  const minBet = 10;
  const maxBet = Math.max(minBet, currentBalance);
  const isOverBalance = wagerAmount > currentBalance;

  const handleWagerChange = (val: number) => {
    // Clamp val between minBet and currentBalance
    const clamped = Math.min(Math.max(minBet, val), currentBalance);
    setWagerAmount(clamped);
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value) || 0;
    if (parsed > currentBalance) {
      setWagerAmount(currentBalance);
      toast.info(`Maximum wager capped at your current SC balance (${currentBalance} SC).`);
    } else {
      setWagerAmount(parsed);
    }
  };

  const handleConfirmPlay = () => {
    if (wagerAmount <= 0) {
      toast.error('Please select a valid wager amount.');
      return;
    }
    if (wagerAmount > currentBalance) {
      toast.error('Wager exceeds your current SC balance!');
      return;
    }
    onPlayMiniGame(wagerAmount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0a09]/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border-2 border-[#e6ca65]/70 shadow-[0_0_80px_rgba(212,175,55,0.3)] space-y-5 animate-in fade-in zoom-in duration-200">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#b5a391] hover:text-[#faf6f0] p-1.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Game Title & Category */}
        <div className="flex items-center gap-3.5 border-b border-[#9c663b]/30 pb-3.5">
          <span className="text-4xl">{game.icon}</span>
          <div>
            <span className="text-[10px] font-mono text-[#e6ca65] font-extrabold uppercase">
              {game.category}
            </span>
            <h3 className="text-xl font-black text-[#faf6f0]">{game.title}</h3>
            <span className="text-xs text-[#b5a391]">
              RTP {game.rtp} • {game.badge}
            </span>
          </div>
        </div>

        {/* User Balance Header Pill */}
        <div className="flex justify-between items-center px-4 py-2.5 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 text-xs">
          <span className="text-[#b5a391] font-bold">YOUR SC BALANCE</span>
          <span className="font-mono font-black text-[#e6ca65] text-sm flex items-center gap-1">
            <Coins className="w-4 h-4" />
            {currentBalance.toFixed(2)} SC
          </span>
        </div>

        {/* Interactive Wager Control */}
        <div className="space-y-4 p-4 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#b5a391] uppercase flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#e6ca65]" /> WAGER AMOUNT
            </span>

            {/* Custom Input Field */}
            <div className="relative w-28">
              <input
                type="number"
                min={minBet}
                max={currentBalance}
                value={wagerAmount}
                onChange={handleCustomInputChange}
                className="w-full pl-2 pr-7 py-1 rounded-lg bg-[#18120e] border border-[#e6ca65]/50 font-mono font-black text-right text-xs text-[#e6ca65] focus:outline-none focus:border-[#e6ca65]"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#b5a391] pointer-events-none">
                SC
              </span>
            </div>
          </div>

          {/* Interactive Range Slider (Capped to current balance) */}
          <div className="space-y-1">
            <input
              type="range"
              min={minBet}
              max={maxBet}
              step={5}
              value={wagerAmount}
              onChange={(e) => handleWagerChange(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg bg-[#18120e] appearance-none cursor-pointer accent-[#d4af37]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#b5a391]">
              <span>Min: {minBet} SC</span>
              <span>Max: {maxBet.toFixed(0)} SC</span>
            </div>
          </div>

          {/* Quick Preset Chips */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {[50, 100, 250].map((preset) => (
              <button
                key={preset}
                type="button"
                disabled={preset > currentBalance}
                onClick={() => handleWagerChange(preset)}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                  wagerAmount === preset
                    ? 'bg-gradient-to-r from-[#e6ca65] to-[#d4af37] text-[#0c0a09] border-[#faf6f0]'
                    : preset > currentBalance
                    ? 'bg-[#18120e]/50 text-[#b5a391]/30 border-transparent cursor-not-allowed'
                    : 'bg-[#18120e] hover:bg-[#281d14] text-[#e6ca65] border-[#9c663b]/40'
                }`}
              >
                {preset} SC
              </button>
            ))}

            {/* 50% Half Balance Chip */}
            <button
              type="button"
              disabled={currentBalance <= 0}
              onClick={() => handleWagerChange(Math.floor(currentBalance * 0.5))}
              className="py-1.5 rounded-lg text-xs font-mono font-bold bg-[#18120e] hover:bg-[#281d14] text-[#faf6f0] border border-[#9c663b]/40 transition-all cursor-pointer"
            >
              50%
            </button>

            {/* MAX Balance Chip */}
            <button
              type="button"
              disabled={currentBalance <= 0}
              onClick={() => handleWagerChange(currentBalance)}
              className="py-1.5 rounded-lg text-xs font-mono font-black bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] border border-[#faf6f0]/40 transition-all cursor-pointer active:scale-95"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Warning if wager exceeds balance */}
        {isOverBalance && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Wager exceeds active SC balance. Please lower your bet.</span>
          </div>
        )}

        {/* Confirm Play Button */}
        <button
          onClick={handleConfirmPlay}
          disabled={isOverBalance || wagerAmount <= 0}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/25 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>CONFIRM WAGER ({wagerAmount.toFixed(0)} SC) & PLAY</span>
        </button>

        <div className="flex items-center justify-between text-[11px] text-[#b5a391] pt-1">
          <span className="flex items-center gap-1 text-[#e6ca65]">
            <ShieldCheck className="w-3.5 h-3.5" /> Provably Fair Engine
          </span>
          <span>100% Free SC Currency</span>
        </div>
      </div>
    </div>
  );
};
