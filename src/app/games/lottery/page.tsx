'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { LotteryHeader } from '@/components/lottery/LotteryHeader';
import { LotteryBallSelector } from '@/components/lottery/LotteryBallSelector';
import { LotteryCart } from '@/components/lottery/LotteryCart';
import { MyTicketsTab, PurchasedTicket } from '@/components/lottery/MyTicketsTab';
import { DrawHistorySection } from '@/components/lottery/DrawHistorySection';
import { TicketSlip, buyLotteryTicketsAction, getUserTicketsAction } from '@/actions/lottery/lotteryActions';

export default function LotteryPage() {
  const { user, isLoggedIn, updateBalance } = useAuthStore();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [slips, setSlips] = useState<TicketSlip[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize with REAL data (empty array - no mock records!)
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([]);

  // Fetch user's real purchased tickets on mount
  useEffect(() => {
    async function loadRealTickets() {
      if (isLoggedIn) {
        const res = await getUserTicketsAction();
        if (res.success && res.tickets) {
          setPurchasedTickets(res.tickets);
        }
      }
    }
    loadRealTickets();
  }, [isLoggedIn]);

  // Toggle ball selection (Max 6)
  const handleToggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      if (selectedNumbers.length >= 6) {
        toast.info('Maximum 6 numbers selected!', {
          description: 'Deselect a number to pick a different one.',
        });
        return;
      }
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  // Quick Pick generator (6 unique random numbers 1-49)
  const handleQuickPick = () => {
    const picked = new Set<number>();
    while (picked.size < 6) {
      picked.add(Math.floor(Math.random() * 49) + 1);
    }
    const numbersArray = Array.from(picked).sort((a, b) => a - b);
    setSelectedNumbers(numbersArray);
    toast.success('🎲 Quick Pick Generated!', {
      description: `Numbers: ${numbersArray.join(', ')}`,
    });
  };

  // Clear selected numbers
  const handleClear = () => {
    setSelectedNumbers([]);
  };

  // Add ticket to slip
  const handleAddTicketToSlip = () => {
    if (selectedNumbers.length !== 6) {
      toast.error('Please pick exactly 6 numbers.');
      return;
    }

    const newSlip: TicketSlip = {
      numbers: [...selectedNumbers],
      cost: 200,
    };

    setSlips([...slips, newSlip]);
    setSelectedNumbers([]);
    toast.success('Ticket added to order slip!', {
      description: `Ticket: ${newSlip.numbers.join(', ')} (200 SC)`,
    });
  };

  // Remove single slip
  const handleRemoveSlip = (index: number) => {
    setSlips(slips.filter((_, i) => i !== index));
  };

  // Clear all slips
  const handleClearSlips = () => {
    setSlips([]);
  };

  // Buy all tickets in order slip
  const handleBuyTickets = async () => {
    if (!isLoggedIn) {
      toast.error('Authentication Required', {
        description: 'Please sign in to buy 6/49 lottery tickets.',
      });
      return;
    }

    if (slips.length === 0) {
      toast.error('Your ticket order slip is empty.');
      return;
    }

    setLoading(true);
    try {
      const result = await buyLotteryTicketsAction(slips);

      if (!result.success) {
        toast.error(result.error || 'Failed to complete ticket purchase.');
        return;
      }

      // Update client balance
      if (result.newBalance) {
        updateBalance(result.newBalance);
      }

      // Add real DB returned tickets to state
      if (result.purchasedTickets) {
        const newlyBought: PurchasedTicket[] = result.purchasedTickets.map((t: any) => ({
          id: t.ticketCode,
          numbers: t.numbers.split(',').map((n: string) => parseInt(n, 10)),
          purchasedAt: 'Just Now',
          status: 'PENDING',
          potentialWin: '1,250,000 SC',
        }));
        setPurchasedTickets([...newlyBought, ...purchasedTickets]);
      }

      setSlips([]);

      toast.success('🎉 TICKETS PURCHASED SUCCESSFULLY!', {
        description: `${slips.length} ticket(s) entered into today's 1,250,000 SC draw!`,
      });
    } catch (err: any) {
      toast.error(err.message || 'Server error during ticket purchase.');
    } finally {
      setLoading(false);
    }
  };

  // Schema.org JSON-LD Structured Data with fixed date to prevent hydration mismatch
  const lotteryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'SixyWin 6/49 Live Jackpot Lottery Draw #1492',
    description: 'Daily 6/49 Lottery Jackpot Draw with 1,250,000 Sixy Coins (SC) prize pool.',
    startDate: '2026-01-01T00:00:00.000Z',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: 'https://sixywin.com/games/lottery',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: 'https://sixywin.com/games/lottery',
      validFrom: '2026-01-01T00:00:00.000Z',
    },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-4 sm:px-10 py-5 overflow-hidden">
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lotteryJsonLd) }}
      />

      {/* Ambient Gold Glows */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto space-y-4">
        {/* 1. Ultra-Compact Top Bar Ticker */}
        <LotteryHeader />

        {/* 2. Main Ticket Purchase Area (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (60%): 1-49 Ball Selector */}
          <div className="lg:col-span-7">
            <LotteryBallSelector
              selectedNumbers={selectedNumbers}
              onToggleNumber={handleToggleNumber}
              onQuickPick={handleQuickPick}
              onClear={handleClear}
              onAddTicketToSlip={handleAddTicketToSlip}
            />
          </div>

          {/* Right Column (40%): Ticket Cart Order Slip */}
          <div className="lg:col-span-5">
            <LotteryCart
              slips={slips}
              onRemoveSlip={handleRemoveSlip}
              onClearSlips={handleClearSlips}
              onBuyTickets={handleBuyTickets}
              loading={loading}
              userBalance={user?.sixyCoinsBalance || '10000.00'}
            />
          </div>
        </div>

        {/* 3. Bottom Row: Side-by-Side Draw History & Purchased Tickets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DrawHistorySection />
          <MyTicketsTab purchasedTickets={purchasedTickets} />
        </div>
      </div>
    </div>
  );
}
