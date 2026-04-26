import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProofSection from '@/components/SocialProofSection';
import RetainerServices from '@/components/RetainerServices';
import MarqueeBanner from '@/components/MarqueeBanner';
import ProjectCards from '@/components/ProjectCards';
import ServicesSection from '@/components/ServicesSection';
import PricingSection from '@/components/PricingSection';
import TechBadges from '@/components/TechBadges';
import Testimonials from '@/components/Testimonials';
import GoogleReviews from '@/components/GoogleReviews';
import FAQContent from '@/components/FAQContent';
import Footer from '@/components/Footer';
import DeferredChatbot from '@/components/DeferredChatbot';

export default function Home() {
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
        <section id="faq" className="relative z-10 bg-[#020202] py-14 sm:py-20 md:py-24 px-5 sm:px-8">
          <FAQContent />
        </section>
      </main>
      <Footer />
      <DeferredChatbot />
    </div>
  );
}
