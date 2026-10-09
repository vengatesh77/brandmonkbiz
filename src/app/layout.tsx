import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brand Monk Group | Enterprise Solutions, Academy & Ventures',
  description:
    'Brand Monk Group is a premier corporate conglomerate uniting world-class technology academy programs, high-frequency enterprise cloud engineering, and global digital ventures.',
  keywords: [
    'Brand Monk',
    'Brand Monk Group',
    'Brand Monk Academy',
    'Enterprise Cloud Solutions',
    'Corporate Skilling',
    'Full Stack Engineering',
    'AI Solutions',
    'Conglomerate',
  ],
  authors: [{ name: 'Brand Monk Group' }],
  icons: {
    icon: '/images/brandmonk-logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090a0f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      {/*
        overflow-x:clip (NOT hidden) on body — identical visual clipping
        without creating a scroll container that would break position:sticky
        in ScrollStage.
      */}
      <body
        className={montserrat.className}
        suppressHydrationWarning
        style={{ overflowX: 'clip' }}
      >
        {/* Lenis smooth-scroll — wraps everything, disabled when prefers-reduced-motion */}
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
