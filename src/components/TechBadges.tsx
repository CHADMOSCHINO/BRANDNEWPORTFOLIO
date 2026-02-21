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

export default function TechBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section
      ref={ref}
      className="relative z-40 bg-[#020202] py-16 sm:py-24 px-5 sm:px-8 md:px-20 border-t border-white/[0.04] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
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

        {/* Grid wall — hairline borders create the cell structure */}
        <div
          className={`grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 bg-white/[0.03] gap-[1px] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-1000 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: inView ? '300ms' : '0ms' }}
        >
          {TECH_BADGES.map((badge, i) => (
            <div
              key={badge.name}
              className="group relative bg-[#020202] hover:bg-[#0a0a0a] flex flex-col items-center justify-center py-6 sm:py-8 px-2 transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Hover color glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${badge.color}08 0%, transparent 70%)`,
                }}
              />

              {/* Tech name */}
              <span
                className="relative z-10 text-[10px] sm:text-[11px] text-zinc-600 group-hover:text-zinc-200 uppercase tracking-[0.12em] font-light text-center whitespace-nowrap transition-colors duration-500"
                style={
                  {
                    '--hover-color': badge.color,
                  } as React.CSSProperties
                }
              >
                {badge.name}
              </span>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: badge.color, opacity: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
