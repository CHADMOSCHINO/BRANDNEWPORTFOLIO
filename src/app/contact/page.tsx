import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import ContactPage from '@/components/ContactPage';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact | Chad Green — Let\'s Build Something Great',
  description:
    'Get in touch with Chad Green for premium web design, Shopify stores, and custom web apps. Free 30-minute consultation available.',
  openGraph: {
    title: 'Contact | Chad Green — Let\'s Build Something Great',
    description:
      'Get in touch for premium web design, Shopify stores, and custom web apps. Free 30-minute consultation.',
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
