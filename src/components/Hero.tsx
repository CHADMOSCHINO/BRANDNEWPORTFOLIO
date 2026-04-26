'use client';

import { useState, useEffect, useRef } from 'react';
import { PERSONAL } from '@/lib/constants';
import Magnetic from '@/components/ui/Magnetic';

type Particle = {
  id: number;
  top: string;
  left: string;
  opacity: number;
  duration: string;
  delay: string;
  size: number;
};

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener('change', apply);
    return () => mql.removeEventListener('change', apply);
  }, []);

  /* ── Video autoplay — gentle recovery only, no pause/play war ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    attemptPlay();

    // Only retry on real buffering hiccups — NOT on 'pause' or 'suspend',
    // which would fight the browser in Low Power Mode and flash the play button.
    const onRecover = () => attemptPlay();
    video.addEventListener('stalled', onRecover);
    video.addEventListener('waiting', onRecover);

    // Latch first user interaction as a guaranteed play trigger (mobile autoplay gate)
    const tryPlayOnce = () => {
      attemptPlay();
      document.removeEventListener('touchstart', tryPlayOnce);
      document.removeEventListener('scroll', tryPlayOnce);
      document.removeEventListener('click', tryPlayOnce);
    };
    document.addEventListener('touchstart', tryPlayOnce, { once: true, passive: true });
    document.addEventListener('scroll', tryPlayOnce, { once: true, passive: true });
    document.addEventListener('click', tryPlayOnce, { once: true, passive: true });

    return () => {
      video.removeEventListener('stalled', onRecover);
      video.removeEventListener('waiting', onRecover);
      document.removeEventListener('touchstart', tryPlayOnce);
      document.removeEventListener('scroll', tryPlayOnce);
      document.removeEventListener('click', tryPlayOnce);
    };
  }, []);

  useEffect(() => {
    const count = window.matchMedia('(max-width: 767px)').matches ? 6 : 12;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${10 + Math.random() * 80}%`,
        left: `${5 + Math.random() * 90}%`,
        opacity: 0.03 + Math.random() * 0.03,
        duration: `${14 + Math.random() * 10}s`,
        delay: `${Math.random() * 8}s`,
        size: 2 + Math.random() * 2,
      }))
    );
  }, []);
  return (
    <section className="relative h-[150svh] md:h-[150vh] z-[1]">
      <div className="sticky top-0 h-[100svh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
        {/* ── Background video ── */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-bg-poster.jpg"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          width={1280}
          height={720}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none select-none"
          style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* ── WebGL-style ambient mesh background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Primary orbs — larger, subtle movement. Blur radius and will-change scaled down on mobile to ease GPU cost. */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-20 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(80,80,120,0.3) 0%, transparent 70%)',
              filter: `blur(${isMobile ? 30 : 80}px)`,
              animation: 'floatWebGL 20s ease-in-out infinite alternate',
              willChange: isMobile ? 'auto' : 'transform',
            }}
          />
          <div
            className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-15 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(60,60,100,0.25) 0%, transparent 70%)',
              filter: `blur(${isMobile ? 35 : 100}px)`,
              animation: 'floatWebGL 25s ease-in-out infinite alternate-reverse',
              willChange: isMobile ? 'auto' : 'transform',
            }}
          />
          <div
            className="absolute bottom-[20%] right-[15%] w-[40vw] h-[40vw] rounded-full opacity-10 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(100,70,120,0.2) 0%, transparent 70%)',
              filter: `blur(${isMobile ? 30 : 90}px)`,
              animation: 'floatOrb 30s ease-in-out infinite',
              willChange: isMobile ? 'auto' : 'transform',
            }}
          />

          {/* Secondary smaller orbs — more movement */}
          <div
            className="absolute top-[60%] left-[60%] w-[25vw] h-[25vw] rounded-full opacity-[0.08] mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(80,100,140,0.3) 0%, transparent 60%)',
              filter: `blur(${isMobile ? 20 : 60}px)`,
              animation: 'floatOrb 18s ease-in-out infinite reverse',
              willChange: isMobile ? 'auto' : 'transform',
            }}
          />
          <div
            className="absolute top-[20%] right-[30%] w-[20vw] h-[20vw] rounded-full opacity-[0.06] mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(120,80,100,0.2) 0%, transparent 60%)',
              filter: `blur(${isMobile ? 18 : 50}px)`,
              animation: 'floatOrb 22s ease-in-out infinite',
              willChange: isMobile ? 'auto' : 'transform',
            }}
          />

          {/* ── Floating particles — tiny ambient dots ── */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-white"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animation: `floatParticle ${p.duration} ease-in-out ${p.delay} infinite`,
              }}
            />
          ))}

          {/* ── Concentric pulsing rings ── */}
          {[280, 440, 600].map((size, i) => (
            <div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full border border-white/[0.03]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                animation: `concentricPulse ${6 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
              }}
            />
          ))}

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              animation: 'gridPulse 8s ease-in-out infinite',
            }}
          />
        </div>

        {/* ── Hero content ── */}
        <div className="z-10 text-center flex flex-col items-center justify-center w-full px-5 sm:px-8 pt-20 md:pt-28 lg:pt-32">
          {/* Status pill — mobile only */}
          <div className="overflow-hidden mb-6 sm:mb-8 md:hidden">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md"
              style={{ animation: 'revealText 1s var(--ease-out-expo) 2.5s both' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 uppercase tracking-[0.2em]">
                Accepting New Clients
              </span>
            </div>
          </div>

          {/* Main heading — clamped for ultra-wide */}
          <div className="overflow-hidden w-full flex justify-center">
            <h1
              className="leading-[0.8] tracking-tighter font-light text-white"
              style={{
                fontSize: 'clamp(3rem, 13vw, 12rem)',
                animation: 'revealText 1.5s 2.5s var(--ease-out-expo) both',
              }}
            >
              CREATIVE
            </h1>
          </div>
          <div className="overflow-hidden flex items-center justify-center gap-3 sm:gap-6 md:gap-8 w-full mt-1 sm:mt-2 md:mt-4">
            <div
              className="h-[1px] w-6 sm:w-12 md:w-24 bg-white/20 hidden sm:block origin-left"
              style={{ animation: 'lineGrow 1.5s 3s var(--ease-out-expo) both' }}
            />
            <h1
              className="leading-[0.8] tracking-tighter font-light text-zinc-300"
              style={{
                fontSize: 'clamp(3rem, 13vw, 12rem)',
                animation: 'revealText 1.5s 2.7s var(--ease-out-expo) both',
              }}
            >
              DEVELOPER
            </h1>
            <div
              className="h-[1px] w-6 sm:w-12 md:w-24 bg-white/20 hidden sm:block origin-right"
              style={{ animation: 'lineGrow 1.5s 3s var(--ease-out-expo) both' }}
            />
          </div>

          {/* Subhead */}
          <div className="overflow-hidden mt-8 sm:mt-12 md:mt-16">
            <p
              className="text-zinc-500 font-light tracking-wide text-[11px] sm:text-xs md:text-sm uppercase max-w-lg mx-auto leading-relaxed px-2 text-center"
              style={{ animation: 'revealText 1s 3.2s var(--ease-out-expo) both' }}
            >
              The websites your competitors don&apos;t want you to have. Designed, built, and shipped in days.
            </p>
          </div>

          {/* Trust badges */}
          <div
            className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10 mt-8 sm:mt-10 opacity-0"
            style={{ animation: 'revealText 1s 3.3s var(--ease-out-expo) forwards' }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-sm font-light">50+</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-400 tracking-[0.2em] uppercase">
                Brands Scaled
              </span>
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-zinc-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-sm font-light">5 to 7</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-400 tracking-[0.2em] uppercase">
                Day Delivery
              </span>
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-zinc-800" />
            <div className="flex flex-col items-center gap-1.5">
              <svg viewBox="0 0 109.5 124.5" className="w-4 h-4 sm:w-5 sm:h-5" aria-label="Shopify Partner">
                <path d="M95.6 28.2c-.1-.6-.6-1-1.1-1-.5 0-10.3-.8-10.3-.8s-6.8-6.8-7.5-7.5c-.7-.7-2.1-.5-2.6-.3 0 0-1.4.4-3.7 1.1-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7 0 0 0 0 0 0-.3 0-.7 0-1 .1-.2-.2-.3-.3-.5-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.6 3.6-11.7 3.6C11.4 38.5 11 39 11 39.8c-.3 3.5-9 69.3-9 69.3l70.4 13.2 38.1-8.2S95.7 28.8 95.6 28.2zM67.3 21.6c-1.7.5-3.6 1.1-5.7 1.8 0-3-.4-7.3-1.8-10.9C64 13.7 66.4 18.6 67.3 21.6zM57.3 24.8c-3.8 1.2-8 2.5-12.2 3.8 1.2-4.5 3.4-9 6.1-12 1-1.1 2.4-2.3 4.1-3 1.7 3.5 2.1 8.4 2 11.2zM49.3 7.7c1.3 0 2.4.3 3.4.8-1.5.8-3 2-4.4 3.5-3.6 3.9-6.4 10-7.5 15.9-3.5 1.1-6.9 2.1-10.1 3.1C32.9 22.5 40.3 8 49.3 7.7z" fill="#95BF47"/>
                <path d="M94.5 27.2c-.5 0-10.3-.8-10.3-.8s-6.8-6.8-7.5-7.5c-.3-.3-.6-.4-1-.4l-5.3 108.7 38.1-8.2S95.7 28.8 95.6 28.2c-.1-.6-.6-1-1.1-1" fill="#5E8E3E"/>
                <path d="M57.4 43.8l-4.9 14.5s-4.3-2.3-9.5-2.3c-7.7 0-8.1 4.8-8.1 6 0 6.6 17.3 9.2 17.3 24.7 0 12.2-7.7 20.1-18.2 20.1-12.5 0-18.9-7.8-18.9-7.8l3.3-11s6.6 5.7 12.1 5.7c3.6 0 5.1-2.8 5.1-4.9 0-8.6-14.2-9-14.2-23.3 0-12 8.6-23.6 26-23.6 6.7-.1 10 1.9 10 1.9" fill="#fff"/>
              </svg>
              <span className="text-[8px] sm:text-[9px] text-zinc-400 tracking-[0.2em] uppercase">
                Partner
              </span>
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-zinc-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-emerald-400 text-sm font-light">Open</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-400 tracking-[0.2em] uppercase">
                To Contract
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 opacity-0"
            style={{ animation: 'revealText 1s 3.5s var(--ease-out-expo) forwards' }}
          >
            <Magnetic strength={6} radius={100}>
              <a
                href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I'm interested in working together.")}`}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="text-white text-xs font-light tracking-widest uppercase">
                  Text Me
                </span>
                <div className="w-16 h-[1px] bg-zinc-800 group-hover:bg-white transition-colors duration-300 ease-out relative overflow-hidden">
                  <div className="absolute inset-0 origin-left scale-x-50 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </div>
              </a>
            </Magnetic>

            <span className="text-zinc-800 hidden sm:block">/</span>

            <Magnetic strength={6} radius={100}>
              <a
                href={PERSONAL.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="text-zinc-500 text-xs font-light tracking-widest uppercase hover:text-white transition-colors duration-300">
                  Book A Call
                </span>
              </a>
            </Magnetic>

            <span className="text-zinc-800 hidden sm:block">/</span>

            <Magnetic strength={6} radius={100}>
              <button
                onClick={() =>
                  document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group flex items-center gap-4 cursor-pointer"
              >
                <span className="text-zinc-500 text-xs font-light tracking-widest uppercase hover:text-white transition-colors duration-300">
                  View Work
                </span>
              </button>
            </Magnetic>
          </div>

          {/* Phone number for ad traffic / mobile */}
          <div
            className="mt-6 opacity-0"
            style={{ animation: 'revealText 1s 3.7s var(--ease-out-expo) forwards' }}
          >
            <a
              href={`tel:${PERSONAL.phone}`}
              className="text-[11px] text-zinc-600 font-light tracking-widest hover:text-white transition-colors duration-300"
            >
              (919) 526-0824
            </a>
          </div>

          {/* Immersion slider */}
          <div
            className="flex items-center gap-4 mt-12 sm:mt-16 w-44 sm:w-56 md:w-64 opacity-0"
            style={{ animation: 'revealText 1s 3.8s var(--ease-out-expo) forwards' }}
          >
            <span className="text-[10px] text-zinc-600 font-light uppercase tracking-widest">
              Immersion
            </span>
            <div className="h-[1px] bg-zinc-800 flex-1 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-zinc-400" />
              <div className="absolute left-[85%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
          </div>
        </div>

        {/* ── Spinning status badge — desktop only ── */}
        <div
          className="absolute bottom-8 left-8 z-20 hidden md:block opacity-0"
          style={{ animation: 'revealText 1s 4.2s var(--ease-out-expo) forwards' }}
        >
          <a
            href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I'm interested in working together.")}`}
            className="group relative block w-[100px] h-[100px] lg:w-[120px] lg:h-[120px] cursor-pointer"
          >
            {/* Spinning text ring */}
            <svg
              className="w-full h-full animate-[spin_20s_linear_infinite]"
              viewBox="0 0 120 120"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 60,60 m -48,0 a 48,48 0 1,1 96,0 a 48,48 0 1,1 -96,0"
                />
              </defs>
              <text className="fill-zinc-500 group-hover:fill-white transition-colors duration-500" style={{ fontSize: '9.8px', letterSpacing: '4.5px', fontWeight: 300 }}>
                <textPath href="#circlePath">
                  ACCEPTING CLIENTS &#x2022; OPEN NOW &#x2022;&#160;
                </textPath>
              </text>
            </svg>

            {/* Center pulse dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-emerald-500/40 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.5)] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.7)] transition-shadow duration-500" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
