'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProofSection from '@/components/SocialProofSection';
import RetainerServices from '@/components/RetainerServices';
import MarqueeBanner from '@/components/MarqueeBanner';
import ProjectCards from '@/components/ProjectCards';
import ServicesSection from '@/components/ServicesSection';
import Testimonials from '@/components/Testimonials';
import TechBadges from '@/components/TechBadges';
import PricingSection from '@/components/PricingSection';
import GoogleReviews from '@/components/GoogleReviews';
import FAQContent from '@/components/FAQContent';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#020202] text-white font-sans antialiased">
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <SocialProofSection />
        <RetainerServices />
        <MarqueeBanner />
        <ProjectCards />
        <ServicesSection />
        <PricingSection />
        <TechBadges />
        <Testimonials />
        <GoogleReviews />
        <section id="faq" className="relative z-10 bg-[#020202] py-20 sm:py-28 md:py-40 px-5 sm:px-8">
          <FAQContent />
        </section>
      </main>
      <Footer />
      {loaded && <Chatbot />}
    </div>
  );
}
