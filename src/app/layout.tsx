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
      <body className={`${inter.className} bg-black text-slate-100 min-h-screen antialiased flex flex-col p-0 m-0 overflow-x-hidden`}>
        <Navbar />
        <main className="flex-1 w-full p-0 m-0 bg-black">
          {children}
        </main>
      </body>
    </html>
  );
}
