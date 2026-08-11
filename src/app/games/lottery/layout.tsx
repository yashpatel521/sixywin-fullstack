import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: 'Official 6/49 Lottery Draw - Buy Virtual Jackpot Tickets | SixyWin',
  description:
    'Play the official SixyWin 6/49 Lottery Draw. Select 6 lucky numbers from 1 to 49 for your chance to win the daily 1,250,000 Sixy Coins (SC) Jackpot. 100% Free Virtual Currency with zero real money wagering.',
  keywords: [
    'Official 6/49 Lottery Draw',
    'Buy 6/49 Lottery Tickets',
    'SixyWin Virtual Lottery',
    'Free 6/49 Jackpot Draw',
    'Sixy Coins Lottery Payouts',
    'Cryptographic Provably Fair Lottery',
  ],
  alternates: {
    canonical: 'https://sixywin.com/games/lottery',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Official 6/49 Lottery Draw - Buy Virtual Jackpot Tickets | SixyWin',
    description:
      'Select 6 lucky numbers from 1 to 49 for your chance to win up to 1,250,000 SC in free daily virtual jackpot prizes.',
    url: 'https://sixywin.com/games/lottery',
    siteName: 'SixyWin Gaming Arena',
    images: [
      {
        url: '/landing/lottery_ticket_3d.png',
        width: 1200,
        height: 630,
        alt: 'SixyWin 6/49 Lottery Ticket 3D Golden Render',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Official 6/49 Lottery Draw - Buy Virtual Jackpot Tickets | SixyWin',
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
  return <>{children}</>;
}
