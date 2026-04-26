'use client';

import { useEffect, useRef, useState, type ElementType, type CSSProperties } from 'react';

type LetterRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the first letter starts animating (ms) */
  delay?: number;
  /** Per-letter stagger (ms) */
  stagger?: number;
  /** Total duration per letter (ms) */
  duration?: number;
  /** Translate Y offset in px */
  y?: number;
  /** Blur amount in px at start */
  blur?: number;
  threshold?: number;
  once?: boolean;
  style?: CSSProperties;
};

export default function LetterReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 60,
  duration = 900,
  y = 28,
  blur = 12,
  threshold = 0.3,
  once = true,
  style,
}: LetterRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -5% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  const chars = Array.from(text);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
            filter: inView ? 'blur(0px)' : `blur(${blur}px)`,
            transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, filter ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms`,
            willChange: 'transform, opacity, filter',
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}
