'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeBanner from '@/components/MarqueeBanner';
import ProjectCards from '@/components/ProjectCards';
import ServicesSection from '@/components/ServicesSection';
import Testimonials from '@/components/Testimonials';
import TechBadges from '@/components/TechBadges';
import GoogleReviews from '@/components/GoogleReviews';
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
        <MarqueeBanner />
        <ProjectCards />
        <ServicesSection />
        <TechBadges />
        <Testimonials />
        <GoogleReviews />
      </main>
      <Footer />
      {loaded && <Chatbot />}
    </div>
  );
}
