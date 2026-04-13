'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How much does a website cost?',
    a: 'Our Starter package is $500 for a hand-coded landing page with SEO, mobile-first design, and Google Business Profile setup. Full custom websites range from $2,500 to $7,500. Headless Shopify builds start at $5,000. Enterprise web apps and complex platforms are $10,000+. Every project is scoped and quoted individually — text us at (919) 526-0824 to get an exact number.',
  },
  {
    q: 'How fast do you deliver?',
    a: 'Most projects ship in 5 to 7 business days. Starter landing pages can be done in 2 to 3 days. We prioritize speed without cutting corners on quality.',
  },
  {
    q: 'What\'s included in every project?',
    a: 'Custom design, hand-coded development, mobile responsiveness, SEO optimization, 2 revision rounds, 14 days of post-launch support, and a walkthrough video. Every project also includes contact form integration and performance optimization targeting 95+ Lighthouse scores.',
  },
  {
    q: 'Do you build Shopify stores?',
    a: 'Yes. Both standard Shopify themes and fully custom headless Shopify builds using React and Hydrogen. We also handle Stripe integrations for non-Shopify e-commerce. Headless builds start at $5,000 and give you full creative control with zero theme limitations.',
  },
  {
    q: 'What\'s your tech stack?',
    a: 'React, Next.js, TypeScript, Tailwind CSS, Node.js, and Shopify/Stripe integrations. No page builders or templates. Everything is hand-coded for speed and control.',
  },
  {
    q: 'Do you work with clients outside Raleigh?',
    a: 'Absolutely. We work with clients nationwide and internationally. All communication happens async or via text. Timezone is never an issue.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'Every project includes 2 revision rounds during the build and 14 days of post-launch support for minor adjustments. Beyond that, we offer retainer plans starting at $500/mo for ongoing maintenance, $1,500/mo for active growth, and $3,000/mo for a dedicated dev team. No contracts — cancel anytime.',
  },
  {
    q: 'Do you build AI features and automations?',
    a: 'Yes. We build custom AI chatbots trained on your business data, workflow automations using n8n and custom code, and AI-powered features that boost conversions and user experience. From intelligent assistants to automated pipelines, we integrate it directly into your product.',
  },
  {
    q: 'What are your payment terms?',
    a: '50% deposit upfront to start, 50% on completion before final handoff. No hidden fees or surprise charges. We accept most payment methods.',
  },
  {
    q: 'How do I get started?',
    a: 'Text us at (919) 526-0824 — it\'s the fastest way. You can also send a message through the contact page or book a call. We typically respond within 24 hours.',
  },
];

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light">
        Common Questions
      </span>
      <h1 className="mt-4 text-3xl sm:text-4xl font-light tracking-tight text-white mb-14">
        Frequently Asked Questions
      </h1>

      <div className="space-y-0">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-white/[0.06]">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className={`text-sm sm:text-base font-light tracking-tight pr-8 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  maxHeight: isOpen ? '500px' : '0',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="text-zinc-500 text-sm font-light leading-relaxed pb-6 pr-12">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
