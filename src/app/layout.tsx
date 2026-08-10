import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0c0a09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: {
    default: 'SixyWin | #1 Free 6/49 Lottery & Spatial Casino Arena',
    template: '%s | SixyWin Casino',
  },
  description:
    'Experience SixyWin 6/49 Live Lottery, Cyber Fortune Wheel, High-Low Double Trouble, and Minesweeper with free virtual Sixy Coins (SC). 100% Provably Fair sub-second settlement.',
  keywords: [
    'SixyWin',
    '6/49 Lottery',
    'Free Lottery Online',
    'Virtual Casino',
    'Provably Fair Casino',
    'Sixy Coins',
    'Cyber Fortune Wheel',
    'HighLow Double Trouble',
    'Minesweeper Matrix',
    'Social Gaming Arena',
  ],
  authors: [{ name: 'SixyWin Team' }],
  creator: 'SixyWin',
  publisher: 'SixyWin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo/logo10.png?v=2', type: 'image/png' },
      { url: '/favicon.ico?v=2' },
    ],
    apple: '/logo/logo10.png?v=2',
  },
  openGraph: {
    title: 'SixyWin | #1 Free 6/49 Lottery & Spatial Casino Arena',
    description:
      'Play 6/49 Live Jackpot Lottery and 3D Spatial Casino tables with free Sixy Coins (SC). Provably Fair cryptographic seed verification.',
    url: 'https://sixywin.com',
    siteName: 'SixyWin',
    images: [
      {
        url: '/logo/logo7.png',
        width: 1200,
        height: 630,
        alt: 'SixyWin 6/49 Lottery & Casino Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SixyWin | Free 6/49 Lottery & Casino Arena',
    description:
      'Win up to 1,000,000 SC on the 6/49 Lottery. 100% Free-to-play Provably Fair virtual casino.',
    images: ['/logo/logo7.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SixyWin',
    url: 'https://sixywin.com',
    description:
      'SixyWin is an elite free-to-play social gaming arena offering 6/49 Live Lottery, Cyber Fortune Wheel, and High-Low tables powered by free virtual Sixy Coins (SC).',
    publisher: {
      '@type': 'Organization',
      name: 'SixyWin',
      logo: 'https://sixywin.com/logo/logo10.png',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#0c0a09] text-slate-100 min-h-screen antialiased flex flex-col p-0 m-0 overflow-x-hidden`}>
        <AppLayout>{children}</AppLayout>
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}
