'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <main className="w-full min-h-screen p-0 m-0 bg-[#0c0a09] overflow-x-hidden">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full p-0 m-0 bg-[#0c0a09]" id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};
