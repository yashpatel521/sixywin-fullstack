import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: 'Terms of Service | SixyWin',
  description: 'Terms of Service for SixyWin virtual gaming arena and 6/49 lottery platform.',
  alternates: {
    canonical: 'https://sixywin.com/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
