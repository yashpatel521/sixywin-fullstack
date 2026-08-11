import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy 6/49 Lottery Jackpot Tickets | SixyWin',
  description:
    'Select 6 lucky numbers from 1 to 49 for your chance to win the daily 1,250,000 SC Jackpot. 100% Free Virtual Currency lottery draw.',
  keywords: [
    'Buy 6/49 Lottery Tickets',
    'SixyWin Lottery',
    'Free Virtual Lottery Tickets',
    '6/49 Jackpot Draw',
    'Sixy Coins Lottery',
    'Provably Fair Lottery',
  ],
  openGraph: {
    title: 'Buy 6/49 Lottery Jackpot Tickets | SixyWin',
    description:
      'Select 6 lucky numbers from 1 to 49 to win up to 1,250,000 SC in free virtual jackpot prizes.',
    url: 'https://sixywin.com/games/lottery',
    siteName: 'SixyWin',
    images: [
      {
        url: '/landing/lottery_ticket_3d.png',
        width: 1200,
        height: 630,
        alt: 'SixyWin 6/49 Lottery Ticket 3D Render',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy 6/49 Lottery Jackpot Tickets | SixyWin',
    description:
      'Select 6 lucky numbers from 1 to 49 for your chance to win the daily 1,250,000 SC Jackpot.',
    images: ['/landing/lottery_ticket_3d.png'],
  },
};

export default function LotteryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
