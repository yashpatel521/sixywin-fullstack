'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { LotteryHeader } from '@/components/lottery/LotteryHeader';
import { LotteryBallSelector } from '@/components/lottery/LotteryBallSelector';
import { LotteryCart } from '@/components/lottery/LotteryCart';
import { MyTicketsTab, PurchasedTicket } from '@/components/lottery/MyTicketsTab';
import { DrawHistorySection } from '@/components/lottery/DrawHistorySection';
import { LotteryActivityTable, LiveLotteryActivity } from '@/components/lottery/LotteryActivityTable';
import { LeaderboardWidget } from '@/components/games/LeaderboardWidget';
import { TicketSlip, buyLotteryTicketsAction, getUserTicketsAction } from '@/actions/lottery/lotteryActions';

export default function LotteryPage() {
  const { user, isLoggedIn, updateBalance } = useAuthStore();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [slips, setSlips] = useState<TicketSlip[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize with REAL data (empty array - no mock records!)
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>([]);

  // Fetch user's real purchased tickets from DB
  const loadRealTickets = useCallback(async () => {
    if (isLoggedIn) {
      const res = await getUserTicketsAction();
      if (res.success && res.tickets) {
        setPurchasedTickets(res.tickets);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    loadRealTickets();
  }, [loadRealTickets]);

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

      // Refresh real tickets from DB
      await loadRealTickets();
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

  // Build user-only real ticket activity feed from database
  const userTicketsActivity: LiveLotteryActivity[] = purchasedTickets.map((t) => ({
    id: t.id,
    player: `@${user?.username || 'you'}`,
    ticketCode: t.id,
    numbers: t.numbers,
    cost: '200.00 SC',
    status: t.status === 'WON' ? '🎉 WON' : t.status === 'LOST' ? 'LOST' : 'PENDING DRAW',
    timeAgo: t.purchasedAt,
    isCurrentUser: true,
  }));

  // Expanded Schema.org JSON-LD Structured Data Suite for Google Rich Snippets
  const lotteryEventJsonLd = {
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

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sixywin.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Games',
        item: 'https://sixywin.com/games',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '6/49 Lottery',
        item: 'https://sixywin.com/games/lottery',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I buy 6/49 Lottery tickets on SixyWin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select 6 numbers from 1 to 49 on the ball matrix or click Quick Pick, then add tickets to your order slip and confirm purchase for 200 Sixy Coins (SC) per entry.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the daily 6/49 jackpot prize?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Matching all 6 numbers wins the daily 1,250,000 SC Jackpot pool. Match 5 wins 50,000 SC, Match 4 wins 2,500 SC, and Match 3 wins 250 SC.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the 6/49 Lottery draw provably fair?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All daily draws execute automatically every 24 hours using cryptographic SHA-256 seed hashes for 100% independent verification.',
        },
      },
    ],
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0c0a09] via-[#18120e] to-[#0c0a09] text-[#faf6f0] px-4 sm:px-10 py-5 overflow-hidden">
      {/* Hidden <h1> tag for SEO heading hierarchy */}
      <h1 className="sr-only">Official 6/49 Lottery Draw - Buy Virtual Jackpot Tickets on SixyWin</h1>

      {/* Schema.org JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lotteryEventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Ambient Gold Glows */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto space-y-4">
        {/* 1. Top Bar Ticker HUD */}
        <LotteryHeader />

        {/* 2. Main 2-Column Master Command Grid */}
        <section aria-label="6/49 Ticket Selector and Order Slip" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (7/12 Width): Ticket Selector + Active Tickets History */}
          <div className="lg:col-span-7 space-y-5">
            <LotteryBallSelector
              selectedNumbers={selectedNumbers}
              onToggleNumber={handleToggleNumber}
              onQuickPick={handleQuickPick}
              onClear={handleClear}
              onAddTicketToSlip={handleAddTicketToSlip}
            />

            <MyTicketsTab purchasedTickets={purchasedTickets} />
          </div>

          {/* Right Column (5/12 Width): Order Checkout Slip + Draw Schedule + High-Roller Leaderboard */}
          <div className="lg:col-span-5 space-y-5">
            <LotteryCart
              slips={slips}
              onRemoveSlip={handleRemoveSlip}
              onClearSlips={handleClearSlips}
              onBuyTickets={handleBuyTickets}
              loading={loading}
              userBalance={user?.sixyCoinsBalance || '10000.00'}
            />

            <DrawHistorySection onDrawSettled={loadRealTickets} />

            <LeaderboardWidget />
          </div>
        </section>

        {/* 3. User's Ticket Purchase & Settlement History Table */}
        <section aria-label="My Ticket Purchase & Settlement History">
          <LotteryActivityTable recentActivity={userTicketsActivity} />
        </section>
      </div>
    </main>
  );
}
