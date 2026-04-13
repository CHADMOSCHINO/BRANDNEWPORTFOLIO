'use client';

import { useRef, useEffect, useState } from 'react';
import { TECH_BADGES } from '@/lib/constants';

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

function BadgeItem({ badge }: { badge: typeof TECH_BADGES[number] }) {
  return (
    <div className="flex items-center gap-2 px-5 sm:px-6 py-3 shrink-0">
      <div
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: badge.color, opacity: 0.6 }}
      />
      <span className="text-[11px] sm:text-xs text-zinc-500 uppercase tracking-[0.15em] font-light whitespace-nowrap">
        {badge.name}
      </span>
    </div>
  );
}

export default function TechBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  // Double the badges for seamless loop
  const doubled = [...TECH_BADGES, ...TECH_BADGES];

  return (
    <section
      ref={ref}
      className="relative z-40 bg-[#020202] py-16 sm:py-24 border-t border-white/[0.04] overflow-hidden"
    >
      {/* Header */}
      <div
        className={`text-center mb-10 sm:mb-14 px-5 sm:px-8 transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-3">
          Technologies
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tighter text-white">
          The tools behind{' '}
          <span className="text-zinc-500 italic">every build.</span>
        </h3>
      </div>

      {/* Infinite marquee */}
      <div
        className={`relative transition-opacity duration-700 ease-out ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: inView ? '300ms' : '0ms' }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

        {/* Top row — scrolls left */}
        <div className="flex border-y border-white/[0.04]">
          <div className="flex animate-tech-marquee">
            {doubled.map((badge, i) => (
              <BadgeItem key={`top-${badge.name}-${i}`} badge={badge} />
            ))}
          </div>
        </div>

        {/* Bottom row — scrolls right */}
        <div className="flex border-b border-white/[0.04] mt-[1px]">
          <div
            className="flex animate-tech-marquee"
            style={{ animationDirection: 'reverse', animationDuration: '35s' }}
          >
            {[...doubled].reverse().map((badge, i) => (
              <BadgeItem key={`bot-${badge.name}-${i}`} badge={badge} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
