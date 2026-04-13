import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ContactPage from '@/components/ContactPage';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Grellax | Get a Free Quote in 24 Hours',
  description:
    'Ready to build? Text (919) 526-0824, book a free consultation, or fill out our project form. Custom websites and Shopify stores starting at $500. Response within 24 hours. 25+ five-star Google reviews.',
  openGraph: {
    title: 'Contact Grellax | Get a Free Quote in 24 Hours',
    description:
      'Text us, book a free call, or submit your project details. Custom websites starting at $500. 25+ five-star Google reviews. We respond within 24 hours.',
  },
};

export default function Contact() {
  return (
    <div className="bg-[#020202] text-white font-sans antialiased">
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
}
