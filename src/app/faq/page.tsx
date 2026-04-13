import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQContent from '@/components/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ | Grellax | Pricing, Timelines, and How We Work',
  description: 'Everything you need to know before hiring Grellax. How much does a website cost? How fast do we deliver? What is the process? Get clear answers to the most common questions.',
};

export default function FAQPage() {
  return (
    <div className="bg-[#020202] text-white font-sans antialiased">
      <Navbar />
      <main className="min-h-screen pt-32 sm:pt-40 pb-20 px-5 sm:px-8">
        <FAQContent />
      </main>
      <Footer />
    </div>
  );
}
