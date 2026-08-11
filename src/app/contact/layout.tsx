import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: 'Contact Us - SixyWin Gaming Arena',
  description:
    'Have questions or feedback? Contact the SixyWin support team 24/7. We are here to help.',
  keywords: [
    'Contact SixyWin',
    'SixyWin Support',
    '6/49 Lottery Support',
    'Free Virtual Gaming Help',
  ],
  alternates: {
    canonical: 'https://sixywin.com/contact',
  },
  openGraph: {
    title: 'Contact Us - SixyWin Gaming Arena',
    description:
      'Have questions or feedback? Contact the SixyWin support team 24/7.',
    url: 'https://sixywin.com/contact',
    siteName: 'SixyWin Gaming Arena',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
