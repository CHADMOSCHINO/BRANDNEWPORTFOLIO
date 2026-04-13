'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Check, Lock, ArrowRight, MessageCircle } from 'lucide-react';
import { PERSONAL } from '@/lib/constants';

const STORAGE_KEY = 'glx_popup_dismissed';
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000;

export default function WeekendSpecialPopup() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ts = parseInt(raw, 10);
        if (Date.now() - ts < DISMISS_DURATION_MS) return;
      }
    } catch {}

    const timer = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setClosing(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {}
    setTimeout(() => setVisible(false), 350);
  };

  const stars = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      width: Math.random() > 0.8 ? 2 : 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: 0.15 + Math.random() * 0.4,
      duration: `${2 + Math.random() * 4}s`,
      delay: `${Math.random() * 3}s`,
    })),
  []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${closing ? 'animate-popup-fade-out' : 'animate-popup-fade-in'}`}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={dismiss}
      />

      <div
        className={`relative w-full max-w-[480px] rounded-2xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.98)] ${closing ? 'animate-popup-scale-out' : 'animate-popup-scale-in'}`}
      >
        {/* ── Space / galaxy background ── */}
        <div className="absolute inset-0 bg-[#080810]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(40,20,60,0.8) 0%, rgba(15,10,30,0.6) 40%, rgba(8,8,16,0) 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 30% 70%, rgba(20,30,50,0.6) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, rgba(50,20,40,0.4) 0%, transparent 50%)',
          }}
        />

        {/* Star particles */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              width: s.width,
              height: s.width,
              top: s.top,
              left: s.left,
              opacity: s.opacity,
              animation: `starTwinkle ${s.duration} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}

        {/* Top green flare */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(74,222,128,0.4) 0%, rgba(74,222,128,0) 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-emerald-400/60 to-transparent" />

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />

        {/* ── Close button ── */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] text-zinc-400 hover:text-white hover:bg-white/[0.12] transition-all duration-300"
          aria-label="Close popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Content ── */}
        <div className="relative z-10 px-8 pt-10 pb-8 text-center">

          {/* Weekend Special label with decorative lines */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-zinc-600" />
            <span className="text-[11px] text-zinc-400 tracking-[0.25em] uppercase font-medium">
              Weekend Special
            </span>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-zinc-600" />
          </div>

          {/* Main heading */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase leading-tight mb-2">
            Get a premium website for
          </h2>

          {/* $200 price — big glowing green */}
          <div className="relative inline-block mb-3">
            <span
              className="text-[4.5rem] sm:text-[5.5rem] font-black tracking-tighter leading-none"
              style={{
                background: 'linear-gradient(180deg, #a7f3d0 0%, #34d399 40%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(52,211,153,0.3))',
              }}
            >
              $200!
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xs mx-auto mb-8">
            Perfect for landing pages or up to 3-page sites, with SEO built-in.
          </p>

          {/* ── Checklist ── */}
          <div className="space-y-4 text-left max-w-xs mx-auto mb-7">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              <span className="text-[13px] text-zinc-200 font-light">
                Complete website for <span className="font-semibold text-white">just $200</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shrink-0">
                <Lock className="w-3 h-3 text-amber-400" />
              </div>
              <span className="text-[13px] text-zinc-200 font-light">
                Domain name included for 1st year*
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              <span className="text-[13px] text-zinc-200 font-light">
                + Google Business Profile guide
              </span>
            </div>
          </div>

          {/* Fine print */}
          <p className="text-[11px] text-zinc-600 font-light mb-7">
            *Integrations available at extra cost.
          </p>

          {/* ── CTA Button — glowing green ── */}
          <a
            href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I'm interested in the $200 Weekend Special.")}`}
            className="group relative inline-flex items-center justify-center w-full max-w-[280px] mx-auto rounded-full overflow-hidden"
          >
            <div
              className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(52,211,153,0.25) 0%, rgba(16,185,129,0.15) 50%, rgba(52,211,153,0.25) 100%)',
                boxShadow: '0 0 30px rgba(52,211,153,0.2), inset 0 0 20px rgba(52,211,153,0.1)',
              }}
            />
            <div className="absolute inset-0 rounded-full border border-emerald-400/30 group-hover:border-emerald-400/50 transition-colors duration-300" />
            <span className="relative z-10 px-8 py-3.5 text-[12px] text-white font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Text Me for Details
            </span>
          </a>

          {/* Urgency */}
          <p className="text-[11px] text-zinc-500 font-light mt-5 mb-6">
            Offer valid through Sunday. Limited slots available.
          </p>

          {/* Divider */}
          <div className="h-[1px] w-full bg-white/[0.06] mb-6" />

          {/* Bottom tagline */}
          <p className="text-[13px] text-zinc-400 font-light leading-relaxed mb-4">
            No vibe-coded nonsense here. Just real, premium websites that work.
          </p>

          {/* Secondary CTA */}
          <a
            href={PERSONAL.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300"
          >
            <span className="text-[12px] font-light tracking-wide">
              Or book a call instead
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}
