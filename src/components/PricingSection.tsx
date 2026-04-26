'use client';

import TextScramble from '@/components/ui/TextScramble';
import LetterReveal from '@/components/ui/LetterReveal';
import SectionHairline from '@/components/ui/SectionHairline';

import { useRef, useEffect, useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { PERSONAL } from '@/lib/constants';

const smsLink = (msg: string) =>
  `sms:${PERSONAL.phone}?&body=${encodeURIComponent(msg)}`;

const TIERS = [
  {
    num: '01',
    name: 'Starter',
    price: '$500',
    term: 'one-time',
    tagline: 'Perfect for landing pages & MVPs',
    popular: false,
    features: [
      'Hand-coded landing page',
      'Mobile-first responsive design',
      'SEO-optimized codebase',
      'Contact form integration',
      'Google Business Profile setup',
      '2 revision rounds',
      '14-day post-launch support',
      'Delivered in 2–3 business days',
    ],
    cta: 'Get Started',
    href: smsLink("Hey Chad! I'm interested in the Starter package."),
  },
  {
    num: '02',
    name: 'Custom Build',
    price: '$2,500',
    priceEnd: '$7,500',
    term: 'project',
    tagline: 'Full websites & Shopify stores',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      '5–10+ custom pages',
      'CMS or Shopify integration',
      'Advanced animations & interactions',
      'Analytics & conversion tracking',
      'Third-party integrations',
      'Performance optimization (95+ Lighthouse)',
      'Delivered in 5–7 business days',
    ],
    cta: 'Text Me',
    href: smsLink("Hey Chad! I'm interested in a Custom Build."),
  },
  {
    num: '03',
    name: 'Enterprise',
    price: '$10K',
    priceEnd: '+',
    term: 'project',
    tagline: 'Web apps, SaaS & complex platforms',
    popular: false,
    features: [
      'Everything in Custom Build, plus:',
      'Full-stack app development',
      'Headless architecture (React + API)',
      'User auth & dashboards',
      'Payment processing (Stripe)',
      'Database design & API development',
      'Ongoing maintenance available',
      'Custom timeline scoped to project',
    ],
    cta: 'Text Me',
    href: smsLink("Hey Chad! I'm interested in an Enterprise build."),
  },
];

const RETAINER_PLANS = [
  {
    name: 'Maintenance',
    price: '$500',
    term: '/mo',
    hours: '5 hrs',
    description: 'Keep your site running smooth',
    includes: [
      'Bug fixes & updates',
      'Content changes',
      'Plugin/app updates',
      'Monthly performance check',
      'Email support (24h response)',
    ],
  },
  {
    name: 'Growth',
    price: '$1,500',
    term: '/mo',
    hours: '15 hrs',
    description: 'Actively improve & scale your site',
    popular: true,
    includes: [
      'Everything in Maintenance',
      'New feature development',
      'A/B testing & CRO audits',
      'SEO improvements',
      'Third-party integrations',
      'Priority Slack/text support',
    ],
  },
  {
    name: 'Scale',
    price: '$3,000',
    term: '/mo',
    hours: '30 hrs',
    description: 'Your dedicated dev team',
    includes: [
      'Everything in Growth',
      'Custom automation & AI builds',
      'Full redesigns & new pages',
      'Advanced analytics setup',
      'Shopify app customization',
      'Same-day response guarantee',
    ],
  },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.08) {
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

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  const stagger = (i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
  });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative z-10 bg-[#020202] py-14 sm:py-20 md:py-24 px-5 sm:px-8 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHairline className="mb-14 sm:mb-16" />
        {/* ── Header ── */}
        <div className="text-center mb-16 sm:mb-20" style={stagger(0)}>
          <TextScramble
            as="span"
            className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-5"
          >
            Pricing
          </TextScramble>
          <h2
            className="font-light tracking-tighter text-white leading-[0.95]"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          >
            <LetterReveal text="Transparent pricing. " stagger={60} duration={900} />
            <LetterReveal
              as="span"
              text="No surprises."
              className="text-zinc-500 italic"
              stagger={60}
              duration={900}
              delay={20 * 60}
            />
          </h2>
          <p className="mt-5 text-zinc-500 text-sm font-light max-w-lg mx-auto leading-relaxed">
            50% deposit to start. 50% on completion. Every project includes revisions,
            post-launch support, and a walkthrough video.
          </p>
        </div>

        {/* ── Project-Based Tiers ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-20 sm:mb-28">
          {TIERS.map((tier, i) => {
            const isPopular = tier.popular;

            return (
              <div
                key={tier.name}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  isPopular
                    ? 'border-white/[0.12] bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                } border hover:border-white/[0.15]`}
                style={stagger(i + 1)}
              >
                {/* Popular indicator */}
                {isPopular && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                )}

                <div className="p-7 sm:p-8">
                  {/* Badge row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-zinc-600 font-light tracking-wider">
                        / {tier.num}
                      </span>
                      <span className="text-white text-sm font-medium tracking-tight">
                        {tier.name}
                      </span>
                    </div>
                    {isPopular && (
                      <span className="text-[9px] text-emerald-400 tracking-[0.2em] uppercase font-light border border-emerald-500/20 bg-emerald-500/10 rounded-full px-3 py-1">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
                      {tier.price}
                    </span>
                    {tier.priceEnd && (
                      <span className="text-2xl sm:text-3xl font-light tracking-tighter text-zinc-600">
                        {tier.priceEnd.startsWith('$') ? ` – ${tier.priceEnd}` : tier.priceEnd}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-600 tracking-wider uppercase font-light mb-1">
                    {tier.term}
                  </p>
                  <p className="text-zinc-500 text-sm font-light mb-7">
                    {tier.tagline}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-500/70 transition-colors duration-500 mt-0.5 shrink-0" />
                        <span className="text-zinc-400 text-[13px] font-light leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA — primary SMS */}
                  <a
                    href={tier.href}
                    className={`group/cta flex items-center justify-center gap-3 w-full rounded-xl py-3.5 text-[11px] tracking-[0.15em] uppercase font-light transition-all duration-300 ${
                      isPopular
                        ? 'bg-white text-[#020202] hover:bg-zinc-200'
                        : 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.15]'
                    }`}
                  >
                    {tier.cta}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
                  </a>

                  {/* Secondary — Calendly */}
                  <a
                    href={PERSONAL.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-3 text-[10px] text-zinc-600 tracking-wider uppercase font-light hover:text-white transition-colors duration-300"
                  >
                    or book a call
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Retainer Plans ── */}
        <div className="text-center mb-14 sm:mb-16" style={stagger(5)}>
          <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-5">
            Retainer Plans
          </span>
          <h3
            className="font-light tracking-tighter text-white leading-[1.1]"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
          >
            Ongoing support.{' '}
            <span className="text-zinc-500 italic">Predictable cost.</span>
          </h3>
          <p className="mt-4 text-zinc-500 text-sm font-light max-w-md mx-auto leading-relaxed">
            No contracts. Cancel anytime. Unused hours don&apos;t roll over — we keep it simple
            so you only pay for what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {RETAINER_PLANS.map((plan, i) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.name}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  isPopular
                    ? 'border-white/[0.12] bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                } border hover:border-white/[0.15]`}
                style={stagger(i + 6)}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                )}

                <div className="p-7 sm:p-8">
                  {/* Name + hours badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-white text-sm font-medium tracking-tight">
                      {plan.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase font-light border border-white/[0.06] rounded-full px-3 py-1">
                      {plan.hours}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl sm:text-5xl font-light tracking-tighter text-white">
                      {plan.price}
                    </span>
                    <span className="text-lg text-zinc-600 font-light tracking-tight">
                      {plan.term}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm font-light mb-7">
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

                  {/* Includes */}
                  <ul className="space-y-3 mb-8">
                    {plan.includes.map((item, ii) => (
                      <li key={ii} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-500/70 transition-colors duration-500 mt-0.5 shrink-0" />
                        <span className="text-zinc-400 text-[13px] font-light leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={smsLink(`Hey Chad! I'm interested in the ${plan.name} retainer plan.`)}
                    className={`group/cta flex items-center justify-center gap-3 w-full rounded-xl py-3.5 text-[11px] tracking-[0.15em] uppercase font-light transition-all duration-300 ${
                      isPopular
                        ? 'bg-white text-[#020202] hover:bg-zinc-200'
                        : 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1] hover:border-white/[0.15]'
                    }`}
                  >
                    Text Me
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
                  </a>

                  {/* Secondary — Calendly */}
                  <a
                    href={PERSONAL.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center mt-3 text-[10px] text-zinc-600 tracking-wider uppercase font-light hover:text-white transition-colors duration-300"
                  >
                    or book a call
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom trust line ── */}
        <div
          className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          style={stagger(10)}
        >
          {[
            { label: '50% upfront / 50% on delivery' },
            { label: 'No hidden fees or surprises' },
            { label: '14-day post-launch support included' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="text-[11px] text-zinc-500 tracking-wider font-light">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
