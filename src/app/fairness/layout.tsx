import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: 'Provably Fair Cryptographic Seeds | SixyWin',
  description: 'Verify 100% cryptographic SHA-256 seed hashes for SixyWin games and 6/49 Lottery draws.',
  alternates: {
    canonical: 'https://sixywin.com/fairness',
  },
};

export default function FairnessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
