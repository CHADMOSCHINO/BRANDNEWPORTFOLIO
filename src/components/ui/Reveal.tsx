'use client';

import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from 'react';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  threshold?: number;
  once?: boolean;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  duration = 900,
  y = 24,
  threshold = 0.15,
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </Tag>
  );
}
