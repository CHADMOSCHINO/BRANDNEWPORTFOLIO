'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Max pixel displacement toward the cursor. Defaults to 8. */
  strength?: number;
  /** Radius in px within which the magnet engages. Defaults to 120. */
  radius?: number;
};

export default function Magnetic({
  children,
  className = '',
  strength = 8,
  radius = 120,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    // Falloff so pull is stronger near center
    const falloff = 1 - dist / radius;
    x.set((dx / radius) * strength * falloff * 2);
    y.set((dy / radius) * strength * falloff * 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
