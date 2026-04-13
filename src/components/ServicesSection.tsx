'use client';

import { useRef, useEffect, useState } from 'react';
import { LayoutTemplate, Code2, BarChart3 } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  layout: LayoutTemplate,
  code: Code2,
  chart: BarChart3,
};

const CARD_ACCENTS = [
  'radial-gradient(ellipse at top left, rgba(100,120,255,0.06) 0%, transparent 60%)',
  'radial-gradient(ellipse at top right, rgba(140,80,220,0.06) 0%, transparent 60%)',
  'radial-gradient(ellipse at bottom left, rgba(60,180,160,0.06) 0%, transparent 60%)',
];

const CARD_TAGS = [
  ['Custom Design', 'Mobile-First', '95+ Lighthouse', '7-Day Delivery'],
  ['React Native', 'SaaS Dashboards', 'Custom Platforms', 'Scalable'],
  ['Core Web Vitals', 'Technical SEO', 'Speed Audit', 'Schema Markup'],
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const services = SERVICES.filter((s) => !s.isComingSoon);

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-40 bg-[#020202] py-20 sm:py-28 md:py-32 px-5 sm:px-8 md:px-20 border-t border-white/5"
    >
      {/* Ambient gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(80,80,140,0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div
          className={`mb-14 sm:mb-20 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light mb-4 block">
            What We Build
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-white mb-4">
            Three things.{' '}
            <span className="text-zinc-500 italic">Done right.</span>
          </h2>
          <p className="text-zinc-500 text-sm font-light max-w-lg leading-relaxed">
            The difference between a website that sits there and one that
            actually converts? The code behind it. Every line is intentional.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const isHero = i === 0;
            const tags = CARD_TAGS[i] || [];

            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.04] hover:border-white/[0.1] transition-all duration-700 hover:-translate-y-1 ${
                  isHero ? 'lg:col-span-2' : ''
                } ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: inView ? `${200 + i * 120}ms` : '0ms',
                }}
              >
                {/* Card background with colored accent */}
                <div className="absolute inset-0 bg-[#080808]" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: CARD_ACCENTS[i] }}
                />

                {/* Top border glow on hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

                {/* Content */}
                <div
                  className={`relative z-10 p-6 sm:p-8 md:p-10 ${
                    isHero
                      ? 'lg:flex lg:items-start lg:justify-between lg:gap-16 lg:p-12'
                      : ''
                  }`}
                >
                  {/* Left side */}
                  <div className={isHero ? 'lg:flex-1' : ''}>
                    {/* Number + Icon row */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <span
                        className={`font-light tracking-tighter text-zinc-800 group-hover:text-zinc-700 transition-colors duration-700 ${
                          isHero
                            ? 'text-5xl sm:text-7xl md:text-8xl'
                            : 'text-4xl sm:text-6xl'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center justify-center group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-500">
                        {Icon && (
                          <Icon className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-500" />
                        )}
                      </div>
                    </div>

                    <h3
                      className={`font-light tracking-tight text-white mb-3 ${
                        isHero
                          ? 'text-2xl sm:text-3xl md:text-4xl'
                          : 'text-xl sm:text-2xl'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`text-zinc-500 font-light leading-relaxed ${
                        isHero
                          ? 'text-sm sm:text-base max-w-lg'
                          : 'text-[13px] sm:text-sm max-w-md'
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div
                    className={`flex flex-wrap gap-2 ${
                      isHero
                        ? 'mt-8 lg:mt-0 lg:flex-col lg:items-end lg:gap-2.5 lg:shrink-0'
                        : 'mt-6'
                    }`}
                  >
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1.5 text-[10px] text-zinc-600 group-hover:text-zinc-400 uppercase tracking-widest font-light border border-white/[0.04] group-hover:border-white/[0.08] rounded-lg transition-all duration-500 bg-white/[0.01] group-hover:bg-white/[0.03]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
