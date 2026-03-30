import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQContent from '@/components/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ | Grellax Labs — Frequently Asked Questions',
  description: 'Common questions about working with Grellax Labs — pricing, timelines, process, and more.',
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
