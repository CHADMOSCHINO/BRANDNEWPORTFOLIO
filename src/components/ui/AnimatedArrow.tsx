'use client';

import { type CSSProperties } from 'react';

type AnimatedArrowProps = {
  className?: string;
  size?: number;
  /** Listens for parent `.group:hover` to animate. Defaults to true. */
  group?: boolean;
  style?: CSSProperties;
};

/**
 * Hairline arrow with stroke draw-in and head nudge on hover.
 * Drop inside a `group` element to trigger on parent hover.
 */
export default function AnimatedArrow({
  className = '',
  size = 20,
  group = true,
  style,
}: AnimatedArrowProps) {
  const hoverCls = group ? 'group-hover:[&_.shaft]:[stroke-dashoffset:0] group-hover:[&_.head]:translate-x-[3px]' : '';
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      className={`shrink-0 overflow-visible ${className} ${hoverCls}`}
      style={style}
      aria-hidden="true"
    >
      <line
        className="shaft transition-[stroke-dashoffset] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        x1="2"
        y1="12"
        x2="22"
        y2="12"
        style={{ strokeDasharray: 20, strokeDashoffset: 14 }}
      />
      <polyline
        className="head transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        points="15,5 22,12 15,19"
      />
    </svg>
  );
}
