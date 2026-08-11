import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://sixywin.com'),
  title: 'Privacy Policy | SixyWin',
  description: 'Privacy Policy for SixyWin gaming platform.',
  alternates: {
    canonical: 'https://sixywin.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
