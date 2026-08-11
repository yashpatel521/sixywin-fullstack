import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: 'Frequently Asked Questions (FAQ) | SixyWin',
  description:
    'Got questions about SixyWin 6/49 Lottery, free virtual Sixy Coins (SC), or provably fair gaming? Find all answers here.',
  keywords: [
    'SixyWin FAQ',
    '6/49 Lottery Rules FAQ',
    'Sixy Coins SC Currency Help',
    'Provably Fair Gaming FAQ',
    'Free Casino Games FAQ',
  ],
  alternates: {
    canonical: 'https://sixywin.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | SixyWin',
    description:
      'Learn how the 6/49 Lottery, free virtual SC coins, and provably fair games work on SixyWin.',
    url: 'https://sixywin.com/faq',
    siteName: 'SixyWin Gaming Arena',
    type: 'website',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
