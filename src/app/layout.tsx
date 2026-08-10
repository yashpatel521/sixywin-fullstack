import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SixyWin - Modern 6/49 Lottery & Casino Platform',
  description: 'SixyWin iGaming Platform with 6/49 Lottery and free Virtual Sixy Coins (SC)',
  icons: {
    icon: [
      { url: '/logo/logo10.png?v=2', type: 'image/png' },
      { url: '/favicon.ico?v=2' },
    ],
    apple: '/logo/logo10.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0c0a09] text-slate-100 min-h-screen antialiased flex flex-col p-0 m-0 overflow-x-hidden`}>
        <Navbar />
        <main className="flex-1 w-full p-0 m-0 bg-[#0c0a09]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
