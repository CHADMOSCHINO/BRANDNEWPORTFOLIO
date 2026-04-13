'use client';

import Image from 'next/image';
import { PERSONAL, PROJECTS, TESTIMONIALS } from '@/lib/constants';
import { Check, ArrowUpRight, Star } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const smsLink = (msg: string) =>
  `sms:${PERSONAL.phone}?&body=${encodeURIComponent(msg)}`;

const PRIMARY_SMS = smsLink("Hey Chad! I saw your ad and I'm interested in working together.");

/* ── Top 3 case studies with budget context ── */
const FEATURED = [
  {
    ...PROJECTS.find((p) => p.id === 'dominican-barbershop')!,
    budget: '$2,500 – $5,000',
    timeline: '5 days',
  },
  {
    ...PROJECTS.find((p) => p.id === 'repair-wizardz')!,
    budget: '$2,500 – $7,500',
    timeline: '7 days',
  },
  {
    ...PROJECTS.find((p) => p.id === 'dreuxhamm')!,
    budget: '$5,000 – $10,000',
    timeline: '10 days',
  },
];

const TRUST_STATS = [
  { value: '50+', label: 'Brands Scaled' },
  { value: '5-7', label: 'Day Delivery' },
  { value: '25+', label: '5-Star Reviews' },
  { value: '5+', label: 'Years Experience' },
];

const PROBLEMS = [
  { problem: 'Your current site looks like a template', solve: 'because it is one. We hand-code every pixel.' },
  { problem: 'Agencies quote 6 weeks and $15K', solve: 'for what one focused developer ships in days.' },
  { problem: "You're losing leads to slow load times", solve: 'We build for 95+ Lighthouse scores, every time.' },
  { problem: 'Your Shopify store feels generic', solve: 'Headless builds give you full creative control.' },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
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

export default function AdsLandingPage() {
  const proofRef = useRef<HTMLDivElement>(null);
  const proofInView = useInView(proofRef);
  const casesRef = useRef<HTMLDivElement>(null);
  const casesInView = useInView(casesRef);
  const pricingRef = useRef<HTMLDivElement>(null);
  const pricingInView = useInView(pricingRef);

  const stagger = (inView: boolean, i: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
  });

  return (
    <div className="bg-[#020202] text-white font-sans antialiased min-h-screen">
      {/* ── Sticky top bar — logo + CTA only ── */}
      <nav className="sticky top-0 z-50 bg-[#020202]/90 backdrop-blur-lg border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-white">
            GRELLAX
          </span>
          <a
            href={PRIMARY_SMS}
            className="flex items-center gap-2 bg-white text-[#020202] rounded-full px-5 py-2 text-[11px] font-medium tracking-[0.1em] uppercase hover:bg-zinc-200 transition-colors duration-300"
          >
            Text Me Now
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* ── Hero — clarity over creativity ── */}
      <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-20 px-5 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] rounded-full opacity-[0.03]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-400 tracking-[0.2em] uppercase font-light">
              Currently Accepting Clients
            </span>
          </div>

          <h1
            className="font-light tracking-tighter text-white leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}
          >
            A hand-coded website
            <br />
            <span className="text-zinc-400">shipped in 5–7 days.</span>
          </h1>

          <p className="mt-6 text-zinc-500 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Not a template. Not AI-generated. Custom-built by a developer who&apos;s
            scaled 50+ brands — from local businesses to 8- and 9-figure clients.
          </p>

          {/* Primary CTA */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={PRIMARY_SMS}
              className="group inline-flex items-center gap-3 bg-white text-[#020202] rounded-full px-8 sm:px-10 py-4 text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors duration-300"
            >
              Text (919) 526-0824
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
            <span className="text-[11px] text-zinc-600 font-light">
              Free quote in under 24 hours. No call required.
            </span>
          </div>

          {/* Trust row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-white text-lg sm:text-xl font-light tracking-tight">{stat.value}</span>
                <span className="text-[9px] text-zinc-600 tracking-[0.2em] uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problems We Solve ── */}
      <section
        ref={proofRef}
        className="py-16 sm:py-24 px-5 sm:px-8 border-t border-white/[0.04]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" style={stagger(proofInView, 0)}>
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-4">
              Sound Familiar?
            </span>
            <h2
              className="font-light tracking-tighter text-white"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Problems we solve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROBLEMS.map((item, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
                style={stagger(proofInView, i + 1)}
              >
                <p className="text-white text-sm font-medium leading-snug mb-2">
                  {item.problem}
                </p>
                <p className="text-zinc-500 text-[13px] font-light leading-relaxed">
                  {item.solve}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Case Studies ── */}
      <section
        ref={casesRef}
        className="py-16 sm:py-24 px-5 sm:px-8 border-t border-white/[0.04]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14" style={stagger(casesInView, 0)}>
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-4">
              Real Results
            </span>
            <h2
              className="font-light tracking-tighter text-white"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Recent builds with real KPIs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED.map((project, i) => (
              <a
                key={project.id}
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-all duration-500"
                style={stagger(casesInView, i + 1)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-white text-lg font-light tracking-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-zinc-600 tracking-wider uppercase font-light mb-4">
                    {project.category}
                  </p>

                  {/* Budget + Timeline */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-zinc-600 tracking-[0.15em] uppercase">Budget</span>
                      <span className="text-white text-xs font-light">{project.budget}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-zinc-800" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] text-zinc-600 tracking-[0.15em] uppercase">Delivered</span>
                      <span className="text-white text-xs font-light">{project.timeline}</span>
                    </div>
                  </div>

                  {/* KPIs */}
                  {project.metrics && (
                    <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                      {project.metrics.map((m, mi) => (
                        <div key={mi} className="flex flex-col gap-0.5">
                          <span className="text-white text-sm font-light tracking-tight">{m.value}</span>
                          <span className="text-[8px] text-zinc-600 tracking-[0.15em] uppercase">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — compact ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-4">
              What Clients Say
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-white text-white" />
                  ))}
                </div>
                <p className="text-zinc-400 text-sm font-light leading-relaxed mb-5">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <span className="text-[10px] text-zinc-400 font-medium">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">{t.name}</p>
                    <p className="text-zinc-600 text-[10px]">{t.role}{t.company ? `, ${t.company}` : ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href={PERSONAL.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-zinc-600 tracking-wider uppercase font-light hover:text-white transition-colors duration-300"
            >
              Read all 25+ reviews on Google &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ── Full Portfolio CTA ── */}
      <section className="px-5 sm:px-8">
        <a
          href="/"
          className="group block max-w-5xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500 p-8 sm:p-10 text-center"
        >
          <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-3">
            Want the full picture?
          </span>
          <span
            className="block font-light tracking-tighter text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
          >
            See all 50+ projects, our process, and the tech behind it
          </span>
          <span className="inline-flex items-center gap-2 text-zinc-400 group-hover:text-white text-sm font-light transition-colors duration-300">
            Visit grellax.agency
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </a>
      </section>

      {/* ── Compact Pricing ── */}
      <section
        ref={pricingRef}
        className="py-16 sm:py-24 px-5 sm:px-8 border-t border-white/[0.04]"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14" style={stagger(pricingInView, 0)}>
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-4">
              Pricing
            </span>
            <h2
              className="font-light tracking-tighter text-white"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Simple pricing.{' '}
              <span className="text-zinc-500 italic">Real results.</span>
            </h2>
            <p className="mt-4 text-zinc-500 text-sm font-light max-w-md mx-auto">
              50% upfront. 50% on completion. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'Starter',
                price: '$500',
                term: 'one-time',
                desc: 'Hand-coded landing page',
                features: ['Mobile-first design', 'SEO optimized', 'Contact form', 'Google Business setup', '2–3 day delivery'],
                popular: false,
              },
              {
                name: 'Custom Build',
                price: '$2,500 – $7,500',
                term: 'project',
                desc: 'Full website or Shopify store',
                features: ['5–10+ custom pages', 'CMS or Shopify', 'Advanced animations', 'Analytics & tracking', '5–7 day delivery'],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '$10K+',
                term: 'project',
                desc: 'Web apps & complex platforms',
                features: ['Full-stack development', 'User auth & dashboards', 'Stripe payments', 'API development', 'Custom timeline'],
                popular: false,
              },
            ].map((tier, i) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                  tier.popular
                    ? 'border-white/[0.12] bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02]'
                }`}
                style={stagger(pricingInView, i + 1)}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                )}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-white text-sm font-medium">{tier.name}</span>
                    {tier.popular && (
                      <span className="text-[9px] text-emerald-400 tracking-[0.2em] uppercase font-light border border-emerald-500/20 bg-emerald-500/10 rounded-full px-3 py-1">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="mb-1">
                    <span className="text-3xl sm:text-4xl font-light tracking-tighter text-white">{tier.price}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 tracking-wider uppercase font-light mb-1">{tier.term}</p>
                  <p className="text-zinc-500 text-sm font-light mb-6">{tier.desc}</p>

                  <ul className="space-y-2.5 mb-7">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2.5">
                        <Check className="w-3 h-3 text-zinc-600 shrink-0" />
                        <span className="text-zinc-400 text-[13px] font-light">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={smsLink(`Hey Chad! I'm interested in the ${tier.name} package.`)}
                    className={`group/cta flex items-center justify-center gap-2.5 w-full rounded-xl py-3 text-[11px] tracking-[0.15em] uppercase font-light transition-all duration-300 ${
                      tier.popular
                        ? 'bg-white text-[#020202] hover:bg-zinc-200'
                        : 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1]'
                    }`}
                  >
                    Text Me
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 sm:py-32 px-5 sm:px-8 border-t border-white/[0.04]">
        <div className="max-w-2xl mx-auto text-center">
          <Image
            src="/chad-headshot.png"
            alt="Chad Green"
            width={72}
            height={72}
            className="w-[72px] h-[72px] rounded-full object-cover grayscale mx-auto mb-6 border-2 border-white/[0.06]"
          />
          <h2
            className="font-light tracking-tighter text-white leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)' }}
          >
            Ready to build something real?
          </h2>
          <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-md mx-auto mb-8">
            Text me directly. I&apos;ll respond within 24 hours with a free quote
            scoped to your project. No sales call required.
          </p>
          <a
            href={PRIMARY_SMS}
            className="group inline-flex items-center gap-3 bg-white text-[#020202] rounded-full px-8 sm:px-10 py-4 text-[12px] font-medium tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors duration-300"
          >
            Text (919) 526-0824
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
          <div className="mt-4">
            <a
              href={PERSONAL.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-zinc-600 tracking-wider uppercase font-light hover:text-white transition-colors duration-300"
            >
              or book a call instead
            </a>
          </div>
        </div>
      </section>

      {/* ── Minimal footer ── */}
      <footer className="py-8 px-5 sm:px-8 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-zinc-700 font-light tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Grellax. All Rights Reserved.
          </span>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-[10px] text-zinc-700 font-light tracking-widest uppercase hover:text-zinc-400 transition-colors">Privacy</a>
            <a href="/" className="text-[10px] text-zinc-700 font-light tracking-widest uppercase hover:text-zinc-400 transition-colors">Main Site</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
