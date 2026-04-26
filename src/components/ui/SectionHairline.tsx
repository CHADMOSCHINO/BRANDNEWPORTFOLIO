'use client';

import { useEffect, useRef, useState } from 'react';

type SectionHairlineProps = {
  className?: string;
  /** Delay in ms before drawing. Defaults to 0. */
  delay?: number;
  /** Stroke color override; defaults to white/[0.08]. */
  tone?: 'default' | 'bright';
};

export default function SectionHairline({
  className = '',
  delay = 0,
  tone = 'default',
}: SectionHairlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDrawn(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -15% 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const bg = tone === 'bright' ? 'bg-white/20' : 'bg-white/10';

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div
        className={`h-px origin-left ${bg}`}
        style={{
          transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
