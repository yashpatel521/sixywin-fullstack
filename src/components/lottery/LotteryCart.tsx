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
    <div className="w-full rounded-2xl bg-[#18120e]/90 border border-[#e6ca65]/50 p-4 shadow-xl backdrop-blur-xl space-y-3">
      {/* Order Slip Header */}
      <div className="flex justify-between items-center border-b border-[#9c663b]/30 pb-2">
        <div className="flex items-center gap-1.5 text-sm font-black text-[#faf6f0]">
          <ShoppingBag className="w-4 h-4 text-[#e6ca65]" />
          <span>Ticket Order Slip ({slips.length})</span>
        </div>
        {slips.length > 0 && (
          <button
            onClick={onClearSlips}
            className="text-[11px] text-[#b5a391] hover:text-red-400 font-extrabold cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Slips List */}
      {slips.length === 0 ? (
        <div className="py-6 text-center space-y-1 border border-dashed border-[#9c663b]/30 rounded-xl bg-[#0c0a09]/60 p-3">
          <Ticket className="w-6 h-6 text-[#b5a391]/30 mx-auto" />
          <p className="text-xs text-[#b5a391] font-bold">Order slip is empty.</p>
          <p className="text-[10px] text-[#b5a391]/60">Select 6 numbers to add tickets!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-none">
          {slips.map((slip, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-[#0c0a09]/90 border border-[#e6ca65]/40 flex items-center justify-between shadow-xs"
            >
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-[#e6ca65] font-extrabold uppercase">
                  ENTRY #{idx + 1}
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {slip.numbers.map((num) => (
                    <span
                      key={num}
                      className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] text-[#0c0a09] text-[10px] font-mono font-black flex items-center justify-center"
                    >
                      {num.toString().padStart(2, '0')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pl-1">
                <span className="text-xs font-mono font-black text-[#e6ca65] shrink-0">
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

      {/* Summary & Buy Button */}
      {slips.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-[#9c663b]/30">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-[#b5a391]">
              <span>Quantity</span>
              <span className="font-mono font-bold text-[#faf6f0]">{slips.length} Ticket(s)</span>
            </div>
            <div className="flex justify-between text-xs font-black text-[#faf6f0] pt-1 border-t border-[#9c663b]/20">
              <span>Total Cost</span>
              <span className="font-mono text-[#e6ca65]">{totalCost} SC</span>
            </div>
          </div>

          <button
            onClick={onBuyTickets}
            disabled={loading || !canAfford}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#f0d885] via-[#d4af37] to-[#b5952f] hover:from-[#fff0ad] hover:to-[#d4af37] text-[#0c0a09] text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer active:scale-95 border border-[#faf6f0]/40 disabled:opacity-50"
          >
            <Coins className="w-4 h-4 fill-current" />
            <span>{loading ? 'PURCHASING...' : `CONFIRM & BUY (${totalCost} SC)`}</span>
          </button>
        </div>
      )}
    </div>
  );
};
