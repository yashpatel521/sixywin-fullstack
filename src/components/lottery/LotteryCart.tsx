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
    <div className="space-y-6 rounded-3xl bg-gradient-to-br from-[#281d14] via-[#18120e] to-[#0c0a09] border border-[#e6ca65]/60 p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-4">
        <div className="flex items-center gap-2 text-lg font-black text-[#faf6f0]">
          <ShoppingBag className="w-5 h-5 text-[#e6ca65]" />
          <span>Ticket Order Slip ({slips.length})</span>
        </div>
        {slips.length > 0 && (
          <button
            onClick={onClearSlips}
            className="text-xs text-[#b5a391] hover:text-red-400 font-bold"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Slips List */}
      {slips.length === 0 ? (
        <div className="py-12 text-center space-y-2 border border-dashed border-[#9c663b]/40 rounded-2xl bg-[#0c0a09]/50">
          <Ticket className="w-8 h-8 text-[#b5a391]/40 mx-auto" />
          <p className="text-xs text-[#b5a391] font-semibold">Your ticket order slip is empty.</p>
          <p className="text-[11px] text-[#b5a391]/60">Select 6 numbers to add tickets to your order!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-none">
          {slips.map((slip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0c0a09] border border-[#9c663b]/40 flex items-center justify-between shadow-md"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#e6ca65] font-extrabold uppercase">
                  TICKET #{idx + 1}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {slip.numbers.map((num) => (
                    <span
                      key={num}
                      className="px-2 py-0.5 rounded-md bg-[#18120e] border border-[#e6ca65]/40 text-[#faf6f0] text-xs font-mono font-extrabold"
                    >
                      {num.toString().padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold text-[#e6ca65] shrink-0">
                  {slip.cost} SC
                </span>
                <button
                  onClick={() => onRemoveSlip(idx)}
                  className="text-[#b5a391] hover:text-red-400 p-1 cursor-pointer"
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
        <div className="space-y-4 pt-4 border-t border-[#9c663b]/30">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#b5a391]">
              <span>Tickets Quantity</span>
              <span className="font-mono font-bold text-[#faf6f0]">{slips.length} Ticket(s)</span>
            </div>
            <div className="flex justify-between text-[#b5a391]">
              <span>Your SC Wallet Balance</span>
              <span className="font-mono font-bold text-[#e6ca65]">{userBalance} SC</span>
            </div>
            <div className="flex justify-between text-sm font-black text-[#faf6f0] pt-2 border-t border-[#9c663b]/20">
              <span>Total Cost</span>
              <span className="font-mono text-[#e6ca65] text-base">{totalCost} SC</span>
            </div>
          </div>

          <button
            onClick={onBuyTickets}
            disabled={loading || !canAfford}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#b5952f] hover:from-[#f0d885] hover:to-[#d4af37] text-[#0c0a09] text-base font-black flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-50"
          >
            <Coins className="w-5 h-5 fill-current" />
            <span>{loading ? 'PROCESSING PURCHASE...' : `CONFIRM PURCHASE (${totalCost} SC)`}</span>
          </button>

          {!canAfford && (
            <p className="text-center text-xs text-red-400 font-extrabold">
              Insufficient SC balance to complete purchase.
            </p>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#b5a391] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>100% Cryptographic Provably Fair Draw</span>
          </div>
        </div>
      )}
    </div>
  );
};
