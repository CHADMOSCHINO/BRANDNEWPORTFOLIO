'use client';

import { PERSONAL } from '@/lib/constants';

/* ── Floating particles data ── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${10 + Math.random() * 80}%`,
  left: `${5 + Math.random() * 90}%`,
  opacity: 0.03 + Math.random() * 0.03,
  duration: `${14 + Math.random() * 10}s`,
  delay: `${Math.random() * 8}s`,
  size: 2 + Math.random() * 2,
}));

export default function Hero() {
  return (
    <section className="relative h-[150vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020202]">
        {/* ── Background video ── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none"
          aria-hidden="true"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* ── WebGL-style ambient mesh background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Primary orbs — larger, subtle movement */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full opacity-20 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(80,80,120,0.3) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'floatWebGL 20s ease-in-out infinite alternate',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full opacity-15 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(60,60,100,0.25) 0%, transparent 70%)',
              filter: 'blur(100px)',
              animation: 'floatWebGL 25s ease-in-out infinite alternate-reverse',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute bottom-[20%] right-[15%] w-[40vw] h-[40vw] rounded-full opacity-10 mix-blend-screen"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(100,70,120,0.2) 0%, transparent 70%)',
              filter: 'blur(90px)',
              animation: 'floatOrb 30s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* Secondary smaller orbs — more movement */}
          <div
            className="absolute top-[60%] left-[60%] w-[25vw] h-[25vw] rounded-full opacity-[0.08] mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(80,100,140,0.3) 0%, transparent 60%)',
              filter: 'blur(60px)',
              animation: 'floatOrb 18s ease-in-out infinite reverse',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute top-[20%] right-[30%] w-[20vw] h-[20vw] rounded-full opacity-[0.06] mix-blend-screen"
            style={{
              background: 'radial-gradient(circle, rgba(120,80,100,0.2) 0%, transparent 60%)',
              filter: 'blur(50px)',
              animation: 'floatOrb 22s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* ── Floating particles — tiny ambient dots ── */}
          {PARTICLES.map((p) => (
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

          {/* ── Slowly rotating square ── */}
          <div
            className="absolute top-1/2 left-1/2 border border-white/[0.025]"
            style={{
              width: '40vw',
              height: '40vw',
              animation: 'slowRotate 120s linear infinite',
            }}
          />

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
        <div className="z-10 text-center flex flex-col items-center w-full px-5 sm:px-8">
          {/* Status pill */}
          <div className="overflow-hidden mb-6 sm:mb-8">
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
              className="text-zinc-500 font-light tracking-wide text-[11px] sm:text-xs md:text-sm uppercase max-w-lg mx-auto leading-relaxed px-2"
              style={{ animation: 'revealText 1s 3.2s var(--ease-out-expo) both' }}
            >
              Premium websites &amp; apps — designed, built, and shipped in days. Not months.
            </p>
          </div>

          {/* Trust badges */}
          <div
            className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10 mt-8 sm:mt-10 opacity-0"
            style={{ animation: 'revealText 1s 3.3s var(--ease-out-expo) forwards' }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-sm font-light">50+</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
                Brands Scaled
              </span>
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-zinc-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-sm font-light">5–7</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
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
              <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
                Partner
              </span>
            </div>
            <div className="w-[1px] h-7 sm:h-8 bg-zinc-800" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-emerald-400 text-sm font-light">Open</span>
              <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.2em] uppercase">
                To Contract
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 opacity-0"
            style={{ animation: 'revealText 1s 3.5s var(--ease-out-expo) forwards' }}
          >
            <a
              href={PERSONAL.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 cursor-pointer"
            >
              <span className="text-white text-xs font-light tracking-widest uppercase">
                Book A Call
              </span>
              <div className="w-8 h-[1px] bg-zinc-800 group-hover:w-16 group-hover:bg-white transition-all duration-500 ease-out relative overflow-hidden">
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </div>
            </a>

            <span className="text-zinc-800 hidden sm:block">/</span>

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
      </div>
    </section>
  );
}
