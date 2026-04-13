'use client';

import { useRef, useEffect, useState } from 'react';
import { PERSONAL } from '@/lib/constants';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-zinc-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-40 bg-[#020202] py-16 sm:py-24 border-t border-white/5"
    >
      <div
        className={`max-w-3xl mx-auto px-5 sm:px-8 md:px-20 transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-gradient-to-b from-[#0a0a0a] to-[#060606] border border-white/[0.06] rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center">
          {/* Google badge area */}
          <div className="flex items-center gap-3 mb-6">
            <GoogleIcon />
            <span className="text-[11px] text-zinc-400 tracking-[0.2em] uppercase font-light">
              Google Reviews
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl sm:text-5xl font-light text-white tracking-tighter">
              5.0
            </span>
            <div className="flex flex-col items-start gap-1">
              <StarDisplay rating={5} />
              <span className="text-[10px] text-zinc-500 tracking-wider uppercase">
                25+ Five-Star Reviews
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-12 h-[1px] bg-white/[0.06] my-6" />

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a
              href={PERSONAL.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-white/10 rounded-full px-6 py-3 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
            >
              <span className="text-[11px] text-white tracking-[0.15em] uppercase font-light">
                Leave a Review
              </span>
              <svg
                className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
            <a
              href={PERSONAL.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-zinc-500 tracking-[0.15em] uppercase font-light hover:text-white transition-colors duration-300"
            >
              Read Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
