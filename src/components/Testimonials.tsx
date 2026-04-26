'use client';

import { useRef, useEffect, useState } from 'react';
import { TESTIMONIALS } from '@/lib/constants';
import TextScramble from '@/components/ui/TextScramble';
import LetterReveal from '@/components/ui/LetterReveal';
import SectionHairline from '@/components/ui/SectionHairline';

function StarRating() {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-amber-400 transition-colors duration-300"
          style={{ transitionDelay: `${i * 60}ms` }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    let scrollPos = 0;
    const speed = 0.4;
    const singleSetWidth = container.scrollWidth / 3;

    const animate = () => {
      if (!isPaused) {
        scrollPos += speed;
        if (scrollPos >= singleSetWidth) {
          scrollPos -= singleSetWidth;
        }
        container.scrollLeft = scrollPos;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  return (
    <section
      id="testimonials"
      className="relative z-40 bg-[#020202] py-14 sm:py-20 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-20 mb-12 sm:mb-16">
        <SectionHairline className="mb-14 sm:mb-16" />
        <TextScramble
          as="span"
          className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light mb-3 sm:mb-4 block"
        >
          Testimonials
        </TextScramble>
        <h2
          className="font-light tracking-tighter text-white leading-[0.95]"
          style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
        >
          <LetterReveal text="Words from " stagger={60} duration={900} />
          <LetterReveal
            as="span"
            text="those who've trusted us."
            className="text-zinc-500 italic"
            stagger={60}
            duration={900}
            delay={11 * 60}
          />
        </h2>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

      {/* Scrolling testimonials */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-hidden px-5 sm:px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((t, i) => (
          <div
            key={`${t.id}-${i}`}
            className="group flex-shrink-0 w-[min(320px,85vw)] sm:w-[380px] md:w-[440px] bg-gradient-to-b from-[#0a0a0a] to-[#060606] border border-white/[0.04] p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl hover:border-white/[0.1] transition-all duration-700 relative overflow-hidden"
          >
            {/* Radial glow hover effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Star rating */}
            <div className="relative z-10">
              <StarRating />
            </div>

            {/* Large gradient quote mark */}
            <span className="text-6xl sm:text-7xl font-serif leading-none block mb-3 sm:mb-4 relative z-10 select-none bg-gradient-to-b from-zinc-600 to-zinc-800/50 bg-clip-text text-transparent">
              &ldquo;
            </span>

            {/* Quote */}
            <p className="text-zinc-300 text-[14px] sm:text-[15px] leading-relaxed font-light relative z-10 mb-6 sm:mb-8">
              {t.content}
            </p>

            {/* Author — separated by border */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-10 pt-5 sm:pt-6 border-t border-white/[0.04]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#111] border border-white/[0.06] rounded-lg flex items-center justify-center text-[10px] font-medium text-zinc-500 tracking-wider">
                {t.initials}
              </div>
              <div>
                <p className="text-white text-xs font-light tracking-tight">{t.name}</p>
                <p className="text-zinc-600 text-[10px] font-light tracking-wide uppercase">
                  {t.role}
                  {t.company ? ` at ${t.company}` : ''}
                </p>
              </div>
            </div>

            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </div>
        ))}
      </div>
    </section>
  );
}
