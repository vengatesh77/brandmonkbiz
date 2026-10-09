import type { Metadata } from 'next';
import FounderProfile from '@/components/FounderProfile';

export const metadata: Metadata = {
  title: 'Arun Kumar Visweswaran | Brand Monk Group',
  description:
    'Official leadership profile of Arun Kumar Visweswaran, Founder & Chairman of Brand Monk Group of Companies.',
  openGraph: {
    title: 'Arun Kumar Visweswaran | Brand Monk Group',
    description:
      'Official leadership profile of Arun Kumar Visweswaran, Founder & Chairman of Brand Monk Group of Companies.',
    images: [
      {
        url: '/images/PHOTO-2026-09-29-07-49-28.jpg',
        width: 720,
        height: 1280,
        alt: 'Arun Kumar Visweswaran - Founder & Chairman, Brand Monk Group',
      },
    ],
  },
};

export default function FounderPage() {
  return <FounderProfile />;
}
