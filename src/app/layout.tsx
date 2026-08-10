import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { LiveTicker } from '@/components/layout/LiveTicker';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SixyWin - Next-Gen iGaming & Mini-Games Platform',
  description: 'Experience futuristic glassmorphic mini-games, fortune wheel, slots, and high-low cards with provably fair server actions and instant payouts.',
  keywords: ['iGaming', 'Casino', 'Slots', 'Fortune Wheel', 'Next.js 15', 'Tailwind CSS', 'Drizzle ORM'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-cyan-500 selection:text-slate-950`}>
        <Navbar />
        <LiveTicker />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
