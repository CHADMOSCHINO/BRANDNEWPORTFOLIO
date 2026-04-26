import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '$200 Weekend Special | Hand-Coded Website by a Real Developer',
  description:
    'Get a premium, hand-coded website for just $200. Up to 3 pages, SEO built in, mobile-first design, Google Business Profile setup guide, and first year domain included. Not a template. Not AI generated. Built by a developer with 5+ years of experience and 25+ five-star reviews. Limited spots available.',
  openGraph: {
    title: '$200 Weekend Special | Hand-Coded Website in 5 to 7 Days',
    description:
      'A real website built by a real developer for $200 flat. SEO, mobile-first design, domain registration, and 2 revision rounds included. Limited spots.',
  },
};

export default function WeekendSpecialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
