'use client';

import { useState, useEffect } from 'react';

const TRUST_ITEMS = [
  { stat: '50+', label: 'Brands Scaled' },
  { stat: '5 to 7', label: 'Day Delivery' },
  { stat: '95+', label: 'Lighthouse Score' },
  { stat: '15+', label: 'Sites Monthly' },
  { stat: '5+', label: 'Years Experience' },
  { stat: '★', label: 'Shopify Partner' },
];

export default function MarqueeBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TRUST_ITEMS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 sm:py-10 bg-[#020202] border-y border-white/[0.04] relative z-20">
      <div className="flex items-center justify-center gap-6 sm:gap-8 px-5">
        {/* Left line */}
        <div className="hidden sm:block h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-white/10" />

        {/* Cycling trust badge */}
        <div className="relative h-10 min-w-[220px] sm:min-w-[280px] flex items-center justify-center overflow-hidden">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transform:
                  i === activeIndex
                    ? 'translateY(0)'
                    : i ===
                      (activeIndex - 1 + TRUST_ITEMS.length) %
                        TRUST_ITEMS.length
                    ? 'translateY(-100%)'
                    : 'translateY(100%)',
              }}
            >
              <span className="text-white text-xl sm:text-2xl font-light tracking-tighter">
                {item.stat}
              </span>
              <span className="text-zinc-500 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right line */}
        <div className="hidden sm:block h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-5">
        {TRUST_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === activeIndex
                ? 'bg-white/60 w-5'
                : 'bg-zinc-800 w-[3px] hover:bg-zinc-600'
            }`}
            aria-label={`Show badge ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
