import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Custom Website in 5–7 Days | Grellax',
  description:
    'Hand-coded websites and Shopify stores built by a real developer. 50+ brands scaled. Starting at $500. Text (919) 526-0824 for a free quote in 24 hours.',
  openGraph: {
    title: 'Get a Custom Website in 5–7 Days | Grellax',
    description:
      'Not a template. Not AI-generated. Custom-built websites shipped in days. 50+ brands, 25+ five-star reviews. Text for a free quote.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
