import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SixyWin - Modern Casino Platform',
  description: 'SixyWin iGaming Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#121624] text-slate-100 min-h-screen antialiased flex flex-col`}>
        <Navbar />
        <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
