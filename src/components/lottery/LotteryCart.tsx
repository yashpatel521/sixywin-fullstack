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
    <div className="space-y-4 rounded-2xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 p-4 sm:p-5 shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-3">
        <div className="flex items-center gap-2 text-base font-black text-[#faf6f0]">
          <ShoppingBag className="w-4 h-4 text-[#e6ca65]" />
          <span>Ticket Order Slip ({slips.length})</span>
        </div>
        {slips.length > 0 && (
          <button
            onClick={onClearSlips}
            className="text-[11px] text-[#b5a391] hover:text-red-400 font-bold"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Slips List */}
      {slips.length === 0 ? (
        <div className="py-8 text-center space-y-1.5 border border-dashed border-[#9c663b]/40 rounded-xl bg-[#0c0a09]/50">
          <Ticket className="w-6 h-6 text-[#b5a391]/40 mx-auto" />
          <p className="text-xs text-[#b5a391] font-semibold">Order slip is empty.</p>
          <p className="text-[10px] text-[#b5a391]/60">Select 6 numbers to add tickets!</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 scrollbar-none">
          {slips.map((slip, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#0c0a09] border border-[#9c663b]/40 flex items-center justify-between shadow-sm"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-[#e6ca65] font-extrabold uppercase">
                  TICKET #{idx + 1}
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {slip.numbers.map((num) => (
                    <span
                      key={num}
                      className="px-1.5 py-0.5 rounded bg-[#18120e] border border-[#e6ca65]/40 text-[#faf6f0] text-[11px] font-mono font-extrabold"
                    >
                      {num.toString().padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-extrabold text-[#e6ca65] shrink-0">
                  {slip.cost} SC
                </span>
                <button
                  onClick={() => onRemoveSlip(idx)}
                  className="text-[#b5a391] hover:text-red-400 p-0.5 cursor-pointer"
                  title="Remove Ticket"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Summary & Buy Button */}
      {slips.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-[#9c663b]/30">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#b5a391]">
              <span>Tickets Quantity</span>
              <span className="font-mono font-bold text-[#faf6f0]">{slips.length} Ticket(s)</span>
            </div>
            <div className="flex justify-between text-[#b5a391]">
              <span>Your SC Balance</span>
              <span className="font-mono font-bold text-[#e6ca65]">{userBalance} SC</span>
            </div>
            <div className="flex justify-between text-xs font-black text-[#faf6f0] pt-1.5 border-t border-[#9c663b]/20">
              <span>Total Cost</span>
              <span className="font-mono text-[#e6ca65] text-sm">{totalCost} SC</span>
            </div>
          </div>

          <button
            onClick={onBuyTickets}
            disabled={loading || !canAfford}
            className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-50"
          >
            <Coins className="w-4 h-4 fill-current" />
            <span>{loading ? 'PROCESSING...' : `CONFIRM PURCHASE (${totalCost} SC)`}</span>
          </button>

          {!canAfford && (
            <p className="text-center text-[11px] text-red-400 font-extrabold">
              Insufficient SC balance to complete purchase.
            </p>
          )}

          <div className="flex items-center justify-center gap-1 text-[10px] text-[#b5a391]">
            <ShieldCheck className="w-3 h-3 text-[#e6ca65]" />
            <span>100% Cryptographic Provably Fair Draw</span>
          </div>
        </div>
      )}
    </div>
  );
};
