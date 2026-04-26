'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';

type TextScrambleProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  threshold?: number;
  once?: boolean;
};

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function TextScramble({
  children,
  as: Tag = 'span',
  className,
  duration = 0.9,
  speed = 0.04,
  characterSet = DEFAULT_CHARS,
  threshold = 0.3,
  once = true,
}: TextScrambleProps) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(children);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(children);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          if (once) observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [children, threshold, once]);

  useEffect(() => {
    if (!run) return;
    const text = children;
    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      const progress = step / steps;
      let scrambled = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { scrambled += ' '; continue; }
        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }
      setDisplay(scrambled);
      step++;
      if (step > steps) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [run, children, duration, speed, characterSet]);

  return (
    <Tag ref={ref} className={className}>
      {display}
    </Tag>
  );
}
