'use client';

import { useRef, useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import TextScramble from '@/components/ui/TextScramble';

type Category = 'Pricing' | 'Timeline' | 'Process' | 'Stack' | 'Support' | 'Logistics';

const FAQS: { q: string; a: string; category: Category }[] = [
  {
    category: 'Pricing',
    q: 'How much does a website cost?',
    a: 'Our Starter package is $500 for a hand-coded landing page with SEO, mobile-first design, and Google Business Profile setup. Full custom websites range from $2,500 to $7,500. Headless Shopify builds start at $5,000. Enterprise web apps and complex platforms are $10,000+. Every project is scoped and quoted individually — text us at (919) 526-0824 to get an exact number.',
  },
  {
    category: 'Timeline',
    q: 'How fast do you deliver?',
    a: 'Most projects ship in 5 to 7 business days. Starter landing pages can be done in 2 to 3 days. We prioritize speed without cutting corners on quality.',
  },
  {
    category: 'Process',
    q: "What's included in every project?",
    a: 'Custom design, hand-coded development, mobile responsiveness, SEO optimization, 2 revision rounds, 14 days of post-launch support, and a walkthrough video. Every project also includes contact form integration and performance optimization targeting 95+ Lighthouse scores.',
  },
  {
    category: 'Stack',
    q: 'Do you build Shopify stores?',
    a: 'Yes. Both standard Shopify themes and fully custom headless Shopify builds using React and Hydrogen. We also handle Stripe integrations for non-Shopify e-commerce. Headless builds start at $5,000 and give you full creative control with zero theme limitations.',
  },
  {
    category: 'Stack',
    q: "What's your tech stack?",
    a: 'Frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: Node.js, Bun, Express, Go, Rust, Python. Plus Shopify and Stripe integrations. No page builders or templates. Everything is hand-coded for speed and control.',
  },
  {
    category: 'Logistics',
    q: 'Do you work with clients outside Raleigh?',
    a: 'Absolutely. We work with clients nationwide and internationally. All communication happens async or via text. Timezone is never an issue.',
  },
  {
    category: 'Support',
    q: 'What if I need changes after launch?',
    a: 'Every project includes 2 revision rounds during the build and 14 days of post-launch support for minor adjustments. Beyond that, we offer retainer plans starting at $500/mo for ongoing maintenance, $1,500/mo for active growth, and $3,000/mo for a dedicated dev team. No contracts — cancel anytime.',
  },
  {
    category: 'Stack',
    q: 'Do you build AI features and automations?',
    a: 'Yes. We build custom AI chatbots trained on your business data, workflow automations using n8n and custom code, and AI-powered features that boost conversions and user experience. From intelligent assistants to automated pipelines, we integrate it directly into your product.',
  },
  {
    category: 'Pricing',
    q: 'What are your payment terms?',
    a: '50% deposit upfront to start, 50% on completion before final handoff. No hidden fees or surprise charges. We accept most payment methods.',
  },
  {
    category: 'Process',
    q: 'How do I get started?',
    a: "Text us at (919) 526-0824 — it's the fastest way. You can also send a message through the contact page or book a call. We typically respond within 24 hours.",
  },
];

function FAQRow({
  faq,
  index,
  total,
  isOpen,
  onToggle,
  isFaded,
}: {
  faq: (typeof FAQS)[number];
  index: number;
  total: number;
  isOpen: boolean;
  onToggle: () => void;
  isFaded: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const num = String(index + 1).padStart(2, '0');
  const totalNum = String(total).padStart(2, '0');

  return (
    <div
      className={`group relative border-b border-white/[0.06] transition-opacity duration-500 ${
        isFaded ? 'opacity-40 hover:opacity-100' : 'opacity-100'
      }`}
    >
      {/* Vertical accent line — slides in when open */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/60 via-white/30 to-transparent origin-top transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
        aria-hidden
      />

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        className="w-full text-left py-7 sm:py-8 pl-4 sm:pl-6 pr-3 flex items-start gap-4 sm:gap-8 cursor-pointer"
      >
        {/* Index */}
        <div className="shrink-0 w-14 sm:w-16 pt-1 flex flex-col gap-0.5 font-mono">
          <span
            className={`text-[10px] sm:text-[11px] tracking-[0.15em] transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
            }`}
          >
            {num}
          </span>
          <span className="text-[9px] text-zinc-700 tracking-[0.15em]">/ {totalNum}</span>
        </div>

        {/* Question + category */}
        <div className="flex-1 min-w-0">
          <span
            className={`block text-[9px] sm:text-[10px] mb-2 tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
              isOpen ? 'text-emerald-400/80' : 'text-zinc-500 group-hover:text-zinc-400'
            }`}
          >
            {faq.category}
          </span>
          <span
            className={`block text-base sm:text-lg md:text-xl font-light tracking-tight leading-snug transition-colors duration-300 ${
              isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'
            }`}
          >
            {faq.q}
          </span>
        </div>

        {/* Plus → X morph icon */}
        <div className="shrink-0 pt-2 w-6 h-6 relative">
          <span
            className={`absolute inset-x-0 top-1/2 h-px bg-current transition-[transform,background-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'text-white' : 'text-zinc-500 group-hover:text-white'
            }`}
            style={{ transform: isOpen ? 'translateY(-0.5px) rotate(45deg)' : 'translateY(-0.5px) rotate(0deg)' }}
            aria-hidden
          />
          <span
            className={`absolute inset-x-0 top-1/2 h-px bg-current transition-[transform,background-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'text-white' : 'text-zinc-500 group-hover:text-white'
            }`}
            style={{ transform: isOpen ? 'translateY(-0.5px) rotate(-45deg)' : 'translateY(-0.5px) rotate(90deg)' }}
            aria-hidden
          />
        </div>
      </button>

      {/* Answer panel — grid-rows trick for perfect-height animation */}
      <div
        id={`faq-panel-${index}`}
        role="region"
        className="grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div
            ref={contentRef}
            className="pl-4 sm:pl-6 pr-3 pb-8 flex items-start gap-4 sm:gap-8"
          >
            <div className="shrink-0 w-14 sm:w-16" aria-hidden />
            <p
              className={`flex-1 text-zinc-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
              style={{
                transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: isOpen ? '120ms' : '0ms',
              }}
            >
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-14 sm:mb-16 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <TextScramble
            as="span"
            className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block"
          >
            Common Questions
          </TextScramble>
          <Reveal delay={120}>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
              Frequently Asked<br className="hidden sm:block" /> Questions
            </h1>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-mono">
            <span>{String(FAQS.length).padStart(2, '0')} Entries</span>
            <span className="w-8 h-px bg-white/10" />
            <span className="text-zinc-600">Click To Expand</span>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-white/[0.06]">
        {FAQS.map((faq, i) => (
          <Reveal key={i} y={14} duration={650} delay={i * 40}>
            <FAQRow
              faq={faq}
              index={i}
              total={FAQS.length}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isFaded={openIndex !== null && openIndex !== i}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
