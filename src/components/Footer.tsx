'use client';

import { PERSONAL } from '@/lib/constants';
import { Instagram } from 'lucide-react';

function FlickerEmail({ email }: { email: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {email.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: `emailFlicker 0.6s ease-out ${i * 0.03}s both`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-40 bg-[#020202] border-t border-white/5 min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center px-5 sm:px-8 md:px-20 py-16 sm:py-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.08] mix-blend-screen pointer-events-none"
        style={{ filter: 'blur(120px)' }}
      >
        <div className="w-[90vw] sm:w-[80vw] h-[50vw] sm:h-[40vw] rounded-full bg-gradient-to-t from-zinc-800 to-transparent absolute bottom-[-15vw] sm:bottom-[-20vw]" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-5xl mx-auto">
        <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light mb-6 sm:mb-8">
          Got a project?
        </span>

        {/* Big email link — enhanced flicker with slide-up */}
        <a
          href={`mailto:${PERSONAL.email}`}
          aria-label={`Email ${PERSONAL.email}`}
          className="group relative inline-block overflow-hidden w-full"
        >
          <h2
            className="font-light tracking-tighter text-white leading-none group-hover:text-transparent transition-colors duration-500 uppercase break-all sm:break-normal"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
          >
            <FlickerEmail email={PERSONAL.email} />
          </h2>
          <h2
            className="font-light tracking-tighter text-white leading-none absolute top-0 left-0 w-full h-full text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] uppercase"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
          >
            {PERSONAL.email}
          </h2>
        </a>

        {/* Book a call CTA */}
        <a
          href={PERSONAL.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 sm:mt-10 inline-flex items-center gap-3 border border-white/10 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
        >
          <span className="text-[11px] text-white tracking-[0.15em] uppercase font-light">
            Schedule a Call
          </span>
          <svg
            className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>

        {/* Bio paragraph */}
        <p className="mt-10 sm:mt-14 text-zinc-500 font-light text-sm leading-relaxed max-w-md mx-auto">
          {PERSONAL.bio}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mt-6 sm:mt-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-sm font-light">{PERSONAL.projectCount}</span>
            <span className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase">Projects</span>
          </div>
          <div className="w-[1px] h-6 bg-zinc-800" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-sm font-light">{PERSONAL.trackRecord}</span>
            <span className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase">Years</span>
          </div>
          <div className="w-[1px] h-6 bg-zinc-800" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-sm font-light">15+</span>
            <span className="text-[8px] text-zinc-600 tracking-[0.2em] uppercase">Monthly</span>
          </div>
        </div>

        {/* Availability toggle */}
        <div className="mt-12 sm:mt-16 flex items-center gap-1 border border-zinc-800/50 p-1.5 rounded-full bg-white/[0.03] backdrop-blur-sm">
          <div className="px-4 sm:px-5 py-2 bg-zinc-800 rounded-full text-white text-[10px] font-light tracking-widest uppercase shadow-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-glow" />
            Available
          </div>
          <div className="px-4 sm:px-5 py-2 text-zinc-500 text-[10px] font-light tracking-widest uppercase cursor-not-allowed hover:text-zinc-400 transition-colors">
            Busy
          </div>
        </div>

        {/* Nav + social links */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-[10px] text-zinc-600 font-light uppercase tracking-widest mt-16 sm:mt-20 gap-5 sm:gap-8">
          <div className="flex gap-6 sm:gap-8">
            <button
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-white transition-colors duration-300"
              aria-label="Scroll to Work section"
            >
              Work
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-white transition-colors duration-300"
              aria-label="Scroll to Services section"
            >
              Services
            </button>
            <button
              onClick={() => document.querySelector('#testimonials')?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-white transition-colors duration-300"
              aria-label="Scroll to Testimonials section"
            >
              Testimonials
            </button>
          </div>
          <div className="flex gap-6 sm:gap-8 items-center">
            <a
              href={PERSONAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              Instagram
            </a>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2">
          <span className="text-[10px] text-zinc-600 font-light uppercase tracking-widest">
            by Grellax Labs — designed and coded
          </span>
          <span className="text-[10px] text-zinc-700 font-light uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Grellax Labs. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
