'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { PERSONAL, PROJECTS } from '@/lib/constants';
import {
  ArrowUpRight,
  Check,
  Code2,
  Layers,
  Zap,
} from 'lucide-react';

const SHOPIFY_PROJECTS = PROJECTS.filter((p) => p.isShopify);

const CAPABILITIES = [
  {
    icon: Code2,
    title: 'Headless Architecture',
    description:
      'React-powered storefronts using Shopify Hydrogen. Zero theme limitations, total creative control, and blazing-fast load times.',
  },
  {
    icon: Layers,
    title: 'Full Custom Design',
    description:
      'Every pixel designed from scratch. No cookie-cutter templates. Your brand identity, built into every interaction.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description:
      'Sub-2-second loads, 90+ Lighthouse scores, and SEO baked into the code. Your store ranks higher and converts better.',
  },
];

export default function ShopifyLanding() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.02 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stagger = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s`,
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans antialiased">
      <div ref={sectionRef} className="relative pt-28 sm:pt-36 pb-20 px-5 sm:px-8">
        {/* ── Ambient mesh background (matches main site) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-20 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(80,80,120,0.3) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-full opacity-[0.06]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(150,191,72,0.35) 0%, rgba(80,80,120,0.15) 40%, transparent 70%)',
              filter: 'blur(120px)',
            }}
          />
          <div
            className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full opacity-10 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(100,70,120,0.2) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* ═══════════════════════════════════════════
              HERO
          ═══════════════════════════════════════════ */}
          <div className="text-center mb-20 sm:mb-28" style={stagger(0)}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-zinc-700" />
              <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light">
                Shopify Development
              </span>
              <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-zinc-700" />
            </div>

            <h1
              className="font-light tracking-tighter text-white leading-[0.9] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
            >
              CUSTOM SHOPIFY
              <br />
              <span
                className="inline-block mt-2"
                style={{
                  background:
                    'linear-gradient(180deg, #d4e7a5 0%, #96BF48 40%, #6a8a30 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 0 30px rgba(150,191,72,0.2))',
                }}
              >
                STORES
              </span>
            </h1>

            <p className="text-zinc-500 text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto mb-10 tracking-wide">
              Headless Shopify storefronts built with React and Hydrogen. Full
              creative control, blazing speed, and code that scales with your brand.
              No templates. No page builders. Just premium e-commerce.
            </p>

            {/* CTA — matches main site style */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I need a custom Shopify store.")}`}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="text-white text-xs font-light tracking-widest uppercase">
                  Text Me
                </span>
                <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-16 group-hover:bg-[#96BF48] transition-all duration-500 ease-out relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#96BF48] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </a>

              <span className="text-zinc-800 hidden sm:block">/</span>

              <a
                href={PERSONAL.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 text-xs font-light tracking-widest uppercase hover:text-white transition-colors duration-300"
              >
                Book A Call
              </a>
            </div>

            <a
              href={`tel:${PERSONAL.phone}`}
              className="mt-4 text-[11px] text-zinc-600 font-light tracking-widest hover:text-white transition-colors duration-300"
            >
              (919) 526-0824
            </a>

            {/* Trust badges — matches main site */}
            <div className="flex items-center justify-center gap-5 sm:gap-8 mt-10">
              <div className="flex flex-col items-center gap-1">
                <span className="text-white text-sm font-light">50+</span>
                <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
                  Projects Shipped
                </span>
              </div>
              <div className="w-[1px] h-7 sm:h-8 bg-zinc-800" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-white text-sm font-light">5 to 7</span>
                <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
                  Day Delivery
                </span>
              </div>
              <div className="w-[1px] h-7 sm:h-8 bg-zinc-800" />
              <div className="flex flex-col items-center gap-1.5">
                <svg viewBox="0 0 109.5 124.5" className="w-4 h-4 sm:w-5 sm:h-5" aria-label="Shopify Partner">
                  <path d="M95.6 28.2c-.1-.6-.6-1-1.1-1-.5 0-10.3-.8-10.3-.8s-6.8-6.8-7.5-7.5c-.7-.7-2.1-.5-2.6-.3 0 0-1.4.4-3.7 1.1-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7 0 0 0 0 0 0-.3 0-.7 0-1 .1-.2-.2-.3-.3-.5-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.6 3.6-11.7 3.6C11.4 38.5 11 39 11 39.8c-.3 3.5-9 69.3-9 69.3l70.4 13.2 38.1-8.2S95.7 28.8 95.6 28.2zM67.3 21.6c-1.7.5-3.6 1.1-5.7 1.8 0-3-.4-7.3-1.8-10.9C64 13.7 66.4 18.6 67.3 21.6zM57.3 24.8c-3.8 1.2-8 2.5-12.2 3.8 1.2-4.5 3.4-9 6.1-12 1-1.1 2.4-2.3 4.1-3 1.7 3.5 2.1 8.4 2 11.2zM49.3 7.7c1.3 0 2.4.3 3.4.8-1.5.8-3 2-4.4 3.5-3.6 3.9-6.4 10-7.5 15.9-3.5 1.1-6.9 2.1-10.1 3.1C32.9 22.5 40.3 8 49.3 7.7z" fill="#95BF47"/>
                  <path d="M94.5 27.2c-.5 0-10.3-.8-10.3-.8s-6.8-6.8-7.5-7.5c-.3-.3-.6-.4-1-.4l-5.3 108.7 38.1-8.2S95.7 28.8 95.6 28.2c-.1-.6-.6-1-1.1-1" fill="#5E8E3E"/>
                  <path d="M57.4 43.8l-4.9 14.5s-4.3-2.3-9.5-2.3c-7.7 0-8.1 4.8-8.1 6 0 6.6 17.3 9.2 17.3 24.7 0 12.2-7.7 20.1-18.2 20.1-12.5 0-18.9-7.8-18.9-7.8l3.3-11s6.6 5.7 12.1 5.7c3.6 0 5.1-2.8 5.1-4.9 0-8.6-14.2-9-14.2-23.3 0-12 8.6-23.6 26-23.6 6.7-.1 10 1.9 10 1.9" fill="#fff"/>
                </svg>
                <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
                  Partner
                </span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              CAPABILITIES
          ═══════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 sm:mb-28">
            {CAPABILITIES.map((cap, i) => (
              <div
                key={cap.title}
                className="rounded-sm bg-white/[0.02] border border-white/[0.05] p-7 hover:border-white/[0.1] transition-colors duration-500"
                style={stagger(i + 1)}
              >
                <cap.icon className="w-5 h-5 text-[#96BF48] mb-4 opacity-70" />
                <h3 className="text-xs text-white font-light tracking-widest uppercase mb-3">
                  {cap.title}
                </h3>
                <p className="text-[13px] text-zinc-500 font-light leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>

          {/* ═══════════════════════════════════════════
              SHOPIFY PROJECTS
          ═══════════════════════════════════════════ */}
          <div className="mb-20 sm:mb-28">
            <div className="text-center mb-12" style={stagger(4)}>
              <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light">
                Selected Work
              </span>
              <h2
                className="font-light tracking-tighter text-white leading-[0.9] mt-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                RECENT BUILDS
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {SHOPIFY_PROJECTS.map((project, i) => (
                <a
                  key={project.id}
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-sm bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:border-white/[0.1] transition-all duration-500"
                  style={stagger(i + 5)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-[45%] aspect-[16/10] md:aspect-auto overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020202]/80 hidden md:block" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-7 sm:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#96BF48]" />
                        <span className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase font-light">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tighter text-white leading-[0.9] mb-4 group-hover:text-[#96BF48] transition-colors duration-500">
                        {project.title}
                      </h3>

                      <p className="text-[13px] text-zinc-500 font-light leading-relaxed mb-5 max-w-md">
                        {project.impact}
                      </p>

                      {/* Scope tags */}
                      {project.scope && project.scope.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mb-5">
                          {project.scope.map((tag, si) => (
                            <span key={si} className="text-[9px] text-zinc-500 tracking-widest uppercase border border-zinc-800 rounded-full px-3 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Performance metrics */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="flex items-center gap-5 mb-5">
                          {project.metrics.map((metric, mi) => (
                            <div key={mi} className="flex flex-col items-start gap-0.5">
                              <span className="text-white text-sm font-light tracking-tight">{metric.value}</span>
                              <span className="text-[8px] text-zinc-600 tracking-[0.15em] uppercase">{metric.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-white text-xs font-light tracking-widest uppercase">
                          View Live Site
                        </span>
                        <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-16 group-hover:bg-[#96BF48] transition-all duration-500 ease-out relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#96BF48] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#96BF48] transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              WHAT'S INCLUDED
          ═══════════════════════════════════════════ */}
          <div
            className="rounded-sm bg-white/[0.02] border border-white/[0.05] p-7 sm:p-10 mb-20 sm:mb-28"
            style={stagger(8)}
          >
            <h3 className="text-[10px] text-[#96BF48] tracking-[0.3em] uppercase font-light mb-8">
              Every Shopify Build Includes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Custom React/Hydrogen storefront',
                'Real-time Shopify inventory sync',
                'Seamless cart and checkout',
                'Mobile-first responsive design',
                'SEO optimized at the code level',
                '90+ Lighthouse performance scores',
                'Product filtering and search',
                '14 days post-launch support',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#96BF48]/10 border border-[#96BF48]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#96BF48]" />
                  </div>
                  <span className="text-[13px] text-zinc-400 font-light leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              CTA
          ═══════════════════════════════════════════ */}
          <div className="text-center" style={stagger(9)}>
            <h2
              className="font-light tracking-tighter text-white leading-[0.9] mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              READY TO BUILD?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-light max-w-md mx-auto mb-10 tracking-wide">
              Text us your vision. We will scope the project, give you a clear quote,
              and get to work.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
              <a
                href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I need a custom Shopify store. Here's what I'm thinking:")}`}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="text-white text-xs font-light tracking-widest uppercase">
                  Text Me Now
                </span>
                <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-16 group-hover:bg-[#96BF48] transition-all duration-500 ease-out relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#96BF48] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </a>

              <span className="text-zinc-800 hidden sm:block">/</span>

              <a
                href={PERSONAL.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 text-xs font-light tracking-widest uppercase hover:text-white transition-colors duration-300"
              >
                Book A Call
              </a>
            </div>

            <a
              href={`tel:${PERSONAL.phone}`}
              className="text-[11px] text-zinc-600 font-light tracking-widest hover:text-white transition-colors duration-300"
            >
              (919) 526-0824
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
