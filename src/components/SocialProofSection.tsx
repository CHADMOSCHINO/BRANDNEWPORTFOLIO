'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Pain-point bullets ── */
const PAIN_POINTS = [
  { prefix: 'While you wait weeks,', bold: 'your competitors are launching', suffix: '' },
  { prefix: 'Every day without a real site is', bold: 'revenue you never recover', suffix: '' },
  { prefix: 'Agencies charge $10K+ for what', bold: 'one focused developer ships in days', suffix: '' },
  { prefix: 'Template sites look like templates.', bold: 'Your customers notice', suffix: '' },
  { prefix: 'The right website doesn\'t cost money.', bold: 'It makes money', suffix: '' },
];

/* ── Bottom metrics ── */
const METRICS = [
  { value: 50, suffix: '+', label: 'brands transformed' },
  { value: 90, suffix: '%', label: 'delivered without a single revision' },
  { value: 5, suffix: '-7d', label: 'from first call to live site' },
];

/* ── Count-up hook ── */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);

  return count;
}

/* ── Metric card ── */
function MetricCard({
  value, suffix, label, active, delay,
}: {
  value: number; suffix: string; label: string; active: boolean; delay: number;
}) {
  const count = useCountUp(value, active);

  return (
    <div
      className="group text-center px-6 py-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, background-color 0.5s, border-color 0.5s`,
      }}
    >
      <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-white leading-none">
        {count}
        <span className="text-zinc-600">{suffix}</span>
      </div>
      <p className="mt-3 text-xs text-zinc-500 font-light leading-relaxed">
        {label}
      </p>
    </div>
  );
}

/* ── Main component ── */
export default function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05, rootMargin: '100px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#020202] py-16 sm:py-28 md:py-40 px-5 sm:px-8 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vw] rounded-full opacity-[0.025]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Two-column: headline LEFT / pain points RIGHT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── LEFT — Headline ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block mb-6">
              Why work with us
            </span>
            <h2
              className="font-semibold tracking-tight text-white leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              Your current site is
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">costing you money</span>
                <svg
                  className="absolute -inset-x-2 -bottom-1 w-[calc(100%+16px)] h-[calc(100%+8px)] z-0 -top-1"
                  viewBox="0 0 200 60"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M8 45 C40 52, 80 55, 120 48 C150 42, 180 38, 195 42"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M12 48 C50 54, 90 56, 130 50 C160 44, 185 42, 192 45"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-6 text-zinc-500 text-sm font-light leading-relaxed max-w-md">
              One developer. Design, code, and strategy — all under one roof. The brands that move fast are the ones that win.
            </p>
          </div>

          {/* ── RIGHT — Pain points (dark card) ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-[#0f0f0f] to-[#141414] rounded-2xl" />
            <div className="absolute inset-0 border border-white/[0.06] rounded-2xl pointer-events-none" />

            <div className="relative z-10 p-7 sm:p-9">
              <div className="space-y-1">
                {PAIN_POINTS.map((point, i) => (
                  <div
                    key={i}
                    className="group/item flex items-center gap-4 py-4 border-b border-white/[0.04] last:border-0 cursor-default"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(10px)',
                      transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.09}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.09}s`,
                    }}
                  >
                    <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover/item:bg-white/[0.08] group-hover/item:border-white/[0.12] transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover/item:bg-white/60 transition-colors duration-300" />
                    </div>
                    <p className="text-zinc-400 text-sm font-light leading-snug group-hover/item:text-zinc-200 transition-colors duration-300">
                      {point.prefix}{' '}
                      <span className="text-white font-medium">{point.bold}</span>
                      {point.suffix && ` ${point.suffix}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom metrics row with count-up ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-14 sm:mt-20">
          {METRICS.map((m, i) => (
            <MetricCard
              key={m.label}
              value={m.value}
              suffix={m.suffix}
              label={m.label}
              active={visible}
              delay={0.5 + i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
