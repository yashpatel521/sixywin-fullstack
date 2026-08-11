'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { LotteryHeader } from '@/components/lottery/LotteryHeader';
import { LotteryBallSelector } from '@/components/lottery/LotteryBallSelector';
import { LotteryCart } from '@/components/lottery/LotteryCart';
import { MyTicketsTab, PurchasedTicket } from '@/components/lottery/MyTicketsTab';
import { TicketSlip, buyLotteryTicketsAction } from '@/actions/lottery/lotteryActions';

export default function LotteryPage() {
  const { user, isLoggedIn, updateBalance } = useAuthStore();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [slips, setSlips] = useState<TicketSlip[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([
    {
      id: 'TICK-649-9812-01',
      numbers: [6, 7, 14, 21, 42, 49],
      purchasedAt: 'Today, 02:15 PM',
      status: 'PENDING',
      potentialWin: '1,250,000 SC',
    },
  ]);

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

      // Add to purchased tickets history list
      const newPurchased: PurchasedTicket[] = slips.map((s, idx) => ({
        id: result.ticketIds?.[idx] || `TICK-649-${Date.now()}-${idx + 1}`,
        numbers: s.numbers,
        purchasedAt: 'Just Now',
        status: 'PENDING',
        potentialWin: '1,250,000 SC',
      }));

      setPurchasedTickets([...newPurchased, ...purchasedTickets]);
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

  // Schema.org JSON-LD Structured Data
  const lotteryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'SixyWin 6/49 Live Jackpot Lottery Draw #1492',
    description: 'Daily 6/49 Lottery Jackpot Draw with 1,250,000 Sixy Coins (SC) prize pool.',
    startDate: new Date().toISOString(),
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
      validFrom: new Date().toISOString(),
    },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-6 sm:px-16 py-8 overflow-hidden">
      {/* Schema.org JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lotteryJsonLd) }}
      />

      {/* Ambient Gold Glows */}
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-[#9c663b]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto space-y-10">
        {/* 1. Header Banner */}
        <LotteryHeader />

        {/* 2. Main Ticket Purchase Area (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 1-49 Ball Selector */}
          <div className="lg:col-span-7">
            <LotteryBallSelector
              selectedNumbers={selectedNumbers}
              onToggleNumber={handleToggleNumber}
              onQuickPick={handleQuickPick}
              onClear={handleClear}
              onAddTicketToSlip={handleAddTicketToSlip}
            />
          </div>

          {/* Right Column: Ticket Cart / Order Slip */}
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

        {/* 3. User's Purchased Tickets History Tab */}
        <MyTicketsTab purchasedTickets={purchasedTickets} />
      </div>
    </div>
  );
}
