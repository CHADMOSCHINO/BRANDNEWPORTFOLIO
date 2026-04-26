'use client';

import { useEffect, useState } from 'react';

type SlotCounterProps = {
  /** The target value to count up to. */
  value: number;
  /** Trigger the animation when true. */
  active: boolean;
  /** Animation duration in ms. Defaults to 1800. */
  duration?: number;
  /** Optional delay before animation starts, in ms. Defaults to 0. */
  delay?: number;
  /** Minimum digit count (pads with leading "0"-slots). Auto-fits otherwise. */
  minDigits?: number;
  className?: string;
};

/**
 * Odometer-style digit counter.
 * Each digit is rendered as a vertical column 0-9 with overflow-hidden,
 * translating up to reveal the target digit. Staggered per column.
 */
export default function SlotCounter({
  value,
  active,
  duration = 1800,
  delay = 0,
  minDigits,
  className = '',
}: SlotCounterProps) {
  const [started, setStarted] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReduced(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  const str = String(Math.max(0, Math.floor(value)));
  const padded = minDigits && str.length < minDigits
    ? str.padStart(minDigits, '0')
    : str;
  const digits = padded.split('').map((d) => parseInt(d, 10));

  // Reduced motion: skip animation.
  const animate = started && !prefersReduced;

  return (
    <span
      className={`inline-flex leading-none tabular-nums ${className}`}
      aria-label={String(value)}
      role="text"
    >
      {digits.map((d, i) => {
        // Stagger: leftmost digit moves first (like a real odometer rollover)
        const colDelay = i * 80;
        return (
          <span
            key={i}
            className="relative inline-block overflow-hidden"
            style={{ height: '1em', width: '0.62em' }}
            aria-hidden
          >
            <span
              className="absolute inset-x-0 top-0 flex flex-col"
              style={{
                transform: animate
                  ? `translateY(-${d * 10}%)`
                  : 'translateY(0%)',
                transition: animate
                  ? `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${colDelay}ms`
                  : 'none',
                willChange: 'transform',
              }}
            >
              {Array.from({ length: 10 }).map((_, n) => (
                <span
                  key={n}
                  className="block text-center"
                  style={{ height: '1em' }}
                >
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
