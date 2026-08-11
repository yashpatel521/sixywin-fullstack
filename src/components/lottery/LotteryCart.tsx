'use client';

import React from 'react';
import { ShoppingBag, Ticket, Trash2, Coins, ShieldCheck } from 'lucide-react';
import { TicketSlip } from '@/actions/lottery/lotteryActions';

interface LotteryCartProps {
  slips: TicketSlip[];
  onRemoveSlip: (index: number) => void;
  onClearSlips: () => void;
  onBuyTickets: () => void;
  loading: boolean;
  userBalance: string;
}

export const LotteryCart: React.FC<LotteryCartProps> = ({
  slips,
  onRemoveSlip,
  onClearSlips,
  onBuyTickets,
  loading,
  userBalance,
}) => {
  const totalCost = slips.reduce((sum, s) => sum + s.cost, 0);
  const userCoins = parseFloat(userBalance || '10000');
  const canAfford = userCoins >= totalCost;

  return (
    <div className="w-full space-y-5">
      {/* Unboxed Order Slip Header */}
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-3">
        <div className="flex items-center gap-2 text-lg font-black text-[#faf6f0]">
          <ShoppingBag className="w-5 h-5 text-[#e6ca65]" />
          <span>Ticket Order Slip ({slips.length})</span>
        </div>
        {slips.length > 0 && (
          <button
            onClick={onClearSlips}
            className="text-xs text-[#b5a391] hover:text-red-400 font-extrabold cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Slips List */}
      {slips.length === 0 ? (
        <div className="py-12 text-center space-y-2 border-2 border-dashed border-[#9c663b]/30 rounded-2xl p-6">
          <Ticket className="w-10 h-10 text-[#b5a391]/30 mx-auto" />
          <p className="text-sm text-[#b5a391] font-bold">Your order slip is empty.</p>
          <p className="text-xs text-[#b5a391]/60">Select 6 numbers on the ball matrix to generate tickets!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1 scrollbar-none">
          {slips.map((slip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#18120e] border border-[#e6ca65]/50 flex items-center justify-between shadow-md group hover:border-[#e6ca65]"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#e6ca65] font-extrabold uppercase tracking-wider block">
                  TICKET #{idx + 1}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {slip.numbers.map((num) => (
                    <span
                      key={num}
                      className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e6ca65] via-[#d4af37] to-[#b5952f] text-[#0c0a09] text-xs font-mono font-black flex items-center justify-center shadow-xs"
                    >
                      {num.toString().padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pl-2">
                <span className="text-xs font-mono font-black text-[#e6ca65] shrink-0">
                  {slip.cost} SC
                </span>
                <button
                  onClick={() => onRemoveSlip(idx)}
                  className="text-[#b5a391] hover:text-red-400 p-1 cursor-pointer transition-colors"
                  title="Remove Ticket"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Summary & Buy Button */}
      {slips.length > 0 && (
        <div className="space-y-4 pt-3 border-t border-[#9c663b]/30">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#b5a391]">
              <span>Tickets Quantity</span>
              <span className="font-mono font-extrabold text-[#faf6f0]">{slips.length} Ticket(s)</span>
            </div>
            <div className="flex justify-between text-[#b5a391]">
              <span>Your SC Balance</span>
              <span className="font-mono font-extrabold text-[#e6ca65]">{userBalance} SC</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#faf6f0] pt-2 border-t border-[#9c663b]/20">
              <span>Total SC Cost</span>
              <span className="font-mono text-[#e6ca65] text-base">{totalCost} SC</span>
            </div>
          </div>

          <button
            onClick={onBuyTickets}
            disabled={loading || !canAfford}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-base font-black flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/30 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-50"
          >
            <Coins className="w-5 h-5 fill-current" />
            <span>{loading ? 'PURCHASING...' : `CONFIRM & BUY (${totalCost} SC)`}</span>
          </button>

          {!canAfford && (
            <p className="text-center text-xs text-red-400 font-extrabold">
              Insufficient SC balance to complete purchase.
            </p>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#b5a391]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>100% Cryptographic Provably Fair Draw</span>
          </div>
        </div>
      )}
    </div>
  );
};
