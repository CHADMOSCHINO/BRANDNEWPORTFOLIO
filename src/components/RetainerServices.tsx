'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Pen, Bug, Layers, Plug, TrendingUp, Bot } from 'lucide-react';
import SectionHairline from '@/components/ui/SectionHairline';

const SERVICES = [
  {
    num: '01',
    icon: Pen,
    title: 'Smarter theme design',
    description:
      'Update layouts, navigation, and styling to improve UX, loading speed, and brand feel — without full redesigns.',
  },
  {
    num: '02',
    icon: Bug,
    title: 'Fast bug resolution',
    description:
      'From cart glitches to layout bugs, we fix Shopify issues fast — without waiting days for freelancers or support.',
  },
  {
    num: '03',
    icon: Layers,
    title: 'Feature implementation',
    description:
      'Custom sections, filters, upsells, bundles, sticky carts — anything your product team dreams up, we ship it.',
  },
  {
    num: '04',
    icon: Plug,
    title: 'Third-party integrations',
    description:
      'Connect your store to CRMs, email tools, loyalty apps, reviews, and analytics — properly tested, zero guesswork.',
  },
  {
    num: '05',
    icon: TrendingUp,
    title: 'Conversion-focused audits',
    description:
      'Regular checks and A/B tests to identify what\'s blocking your conversions — then fix it directly.',
  },
  {
    num: '06',
    icon: Bot,
    title: 'AI & custom automation',
    description:
      'Custom chatbots trained on your business data, workflow automations via n8n and custom code. Designed to boost conversions and elevate user experience.',
  },
];

export default function RetainerServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const observe = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanup = observe(sectionRef.current);
    return cleanup;
  }, [observe]);

  const stagger = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#020202] py-14 sm:py-20 md:py-24 px-5 sm:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHairline className="mb-10 sm:mb-14" />
        {/* ── Headline ── */}
        <div className="text-center mb-10 sm:mb-14" style={stagger(0)}>
          <h2
            className="font-semibold tracking-tight text-white leading-[1.1]"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            What&apos;s covered in our
            <br />
            retainer services
          </h2>
        </div>

        {/* ── 6-card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.num}
                className="group relative rounded-2xl p-7 sm:p-8 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-500"
                style={stagger(i + 1)}
              >
                {/* Number */}
                <span className="text-[11px] text-zinc-600 font-light tracking-wider mb-5 block">
                  / {service.num}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center mb-6 group-hover:bg-white/[0.1] group-hover:border-white/[0.12] transition-all duration-400">
                  <Icon className="w-[18px] h-[18px] text-zinc-400 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-base tracking-tight mb-2.5">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-500 text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
