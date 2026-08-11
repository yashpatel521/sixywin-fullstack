import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gaming Hall & 6/49 Lottery Tables | SixyWin',
  description:
    'Explore free-to-play 6/49 Live Jackpot Lottery, HighLow Double Trouble, Minesweeper Matrix, and Cyber Fortune Wheel with free virtual Sixy Coins (SC). 100% Provably Fair.',
  keywords: [
    'SixyWin Games',
    '6/49 Lottery Tables',
    'Free Virtual Lottery',
    'HighLow Card Game',
    'Minesweeper Matrix',
    'Cyber Fortune Wheel',
    'Sixy Coins Arena',
    'Provably Fair Games',
  ],
  openGraph: {
    title: 'Gaming Hall & 6/49 Lottery Tables | SixyWin',
    description:
      'Play 6/49 Live Jackpot Lottery and 3D spatial casino tables with free virtual Sixy Coins (SC). 100% Provably Fair cryptographic settlement.',
    url: 'https://sixywin.com/games',
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
    title: 'Gaming Hall & 6/49 Lottery Tables | SixyWin',
    description:
      'Play 6/49 Live Jackpot Lottery and 3D spatial casino tables with free virtual Sixy Coins (SC).',
    images: ['/landing/lottery_ticket_3d.png'],
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
