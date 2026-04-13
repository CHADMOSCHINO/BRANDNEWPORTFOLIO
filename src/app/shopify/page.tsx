import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopifyLanding from '@/components/ShopifyLanding';

export const metadata: Metadata = {
  title: 'Custom Shopify Developer | Headless Stores with Zero Theme Limitations',
  description:
    'Headless Shopify stores built with React and Hydrogen. No templates. No page builders. Full creative control, real-time inventory sync, and 90+ Lighthouse scores. See live builds from Dreux Hamm, Project Prevail, and more.',
  openGraph: {
    title: 'Custom Shopify Developer | Headless Stores Built from Scratch',
    description:
      'React-powered Shopify storefronts with zero theme limitations. Hand-coded by a developer with 5+ years and 50+ brands delivered. See live work.',
  },
};

export default function Shopify() {
  return (
    <div className="bg-[#020202] text-white font-sans antialiased">
      <Navbar />
      <main>
        <ShopifyLanding />
      </main>
      <Footer />
    </div>
  );
}
