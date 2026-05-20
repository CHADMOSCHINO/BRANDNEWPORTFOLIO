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
  const [motionMode, setMotionMode] = useState<'full' | 'gentle' | 'reduced'>('full');

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    setMotionMode(prefersReduced ? 'reduced' : coarsePointer ? 'gentle' : 'full');

    if (prefersReduced) {
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
  const effectiveBlur = motionMode === 'full' ? blur : 0;
  const effectiveStagger = motionMode === 'full' ? stagger : Math.min(stagger, 24);
  const effectiveDuration = motionMode === 'full' ? duration : Math.min(duration, 650);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
      }}
    >
      <span className="sr-only">{text}</span>
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
            filter: inView ? 'blur(0px)' : `blur(${effectiveBlur}px)`,
            transition: motionMode === 'reduced'
              ? 'none'
              : `opacity ${effectiveDuration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * effectiveStagger}ms, transform ${effectiveDuration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * effectiveStagger}ms, filter ${effectiveDuration}ms cubic-bezier(0.16,1,0.3,1) ${delay + i * effectiveStagger}ms`,
            willChange: inView ? 'auto' : 'transform, opacity, filter',
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}
