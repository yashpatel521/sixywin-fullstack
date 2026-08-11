import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: 'About Us - SixyWin Virtual Gaming Arena',
  description:
    'Learn about SixyWin mission to build the world’s finest 100% free provably fair virtual gaming and 6/49 lottery platform.',
  keywords: [
    'About SixyWin',
    'Free Virtual Gaming Platform',
    'Provably Fair Casino Architecture',
    '6/49 Virtual Lottery Platform',
  ],
  alternates: {
    canonical: 'https://sixywin.com/about',
  },
  openGraph: {
    title: 'About Us - SixyWin Virtual Gaming Arena',
    description:
      'Learn about SixyWin mission to build the world’s finest 100% free provably fair virtual gaming platform.',
    url: 'https://sixywin.com/about',
    siteName: 'SixyWin Gaming Arena',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
