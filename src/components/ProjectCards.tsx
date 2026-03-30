'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* ── Slice overlays — auto-reveal on scroll, hover on desktop ── */

function VerticalSlices({ bg, revealed }: { bg: string; revealed: boolean }) {
  const delays = [0, 50, 100, 150, 200];
  return (
    <div className="absolute inset-0 flex z-10 pointer-events-none">
      {delays.map((delay, i) => (
        <div
          key={i}
          className={`flex-1 transform ${
            i % 2 === 0 ? 'origin-top' : 'origin-bottom'
          } transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            revealed ? 'scale-y-0' : 'scale-y-100 lg:group-hover:scale-y-0'
          }`}
          style={{ backgroundColor: bg, transitionDelay: revealed ? `${300 + delay}ms` : `${delay}ms` }}
        />
      ))}
    </div>
  );
}

function HorizontalSlices({ bg, revealed }: { bg: string; revealed: boolean }) {
  const delays = [0, 75, 150, 225];
  return (
    <div className="absolute inset-0 flex flex-col z-10 pointer-events-none">
      {delays.map((delay, i) => (
        <div
          key={i}
          className={`flex-1 transform ${
            i % 2 === 0 ? 'origin-left' : 'origin-right'
          } transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            revealed ? 'scale-x-0' : 'scale-x-100 lg:group-hover:scale-x-0'
          }`}
          style={{ backgroundColor: bg, transitionDelay: revealed ? `${300 + delay}ms` : `${delay}ms` }}
        />
      ))}
    </div>
  );
}

function DiagonalWipe({ bg, revealed }: { bg: string; revealed: boolean }) {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <div
        className={`absolute inset-[-50%] rotate-45 transition-transform duration-[1.2s] ease-[cubic-bezier(0.77,0,0.175,1)] ${
          revealed ? 'translate-x-[150%]' : 'translate-x-0 lg:group-hover:translate-x-[150%]'
        }`}
        style={{ backgroundColor: bg, transitionDelay: revealed ? '300ms' : '0ms' }}
      />
    </div>
  );
}

/* ── Project Card ───────────────────────────────────────────────── */

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.15);
  const isEven = index % 2 === 0;
  const bgColors = ['#050505', '#080808', '#0a0a0a', '#070707'];
  const bg = bgColors[index % bgColors.length];
  const sliceType = index % 3;

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen w-full"
      style={{ zIndex: index + 1, marginTop: index > 0 ? '5vh' : undefined }}
    >
      <div
        className="h-full w-full flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-16 overflow-hidden rounded-t-[2.5rem] border-t border-white/5"
        style={{
          backgroundColor: bg,
          boxShadow: `0 -${20 + index * 10}px ${50 + index * 10}px rgba(0,0,0,${0.8 + index * 0.02})`,
        }}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center">
          {/* Text — fades in on scroll */}
          <div
            className={`flex flex-col gap-5 lg:gap-8 lg:col-span-5 transition-all duration-1000 ease-out ${
              isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2 lg:pl-8'
            } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase font-light">
                {project.category}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter text-white leading-[0.9]">
              {project.title}
            </h2>
            <p className="text-zinc-500 font-light text-sm max-w-md leading-relaxed hidden sm:block">
              {project.description}
            </p>

            <div className="flex items-center gap-4 flex-wrap mt-2">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-4 w-max cursor-pointer"
              >
                <span className="text-white text-xs font-light tracking-widest uppercase">
                  View Live Site
                </span>
                <div className="w-8 h-[1px] bg-zinc-800 group-hover/link:w-16 group-hover/link:bg-white transition-all duration-500 ease-out relative overflow-hidden">
                  <div className="absolute inset-0 bg-white transform -translate-x-full group-hover/link:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </a>
              {project.isShopify && (
                <span className="text-[10px] text-zinc-600 tracking-widest uppercase border border-zinc-800 rounded-full px-3 py-1">
                  Shopify
                </span>
              )}
            </div>
          </div>

          {/* Image — clickable link, slices auto-reveal on scroll */}
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`lg:col-span-7 relative aspect-[4/3] lg:aspect-video w-full group overflow-hidden cursor-pointer rounded-sm transition-all duration-1000 delay-150 ease-out block ${
              isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
            } ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.92]'}`}
            style={{ backgroundColor: bg }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-1000 ease-out ${
                inView
                  ? 'opacity-100 lg:group-hover:scale-105'
                  : 'opacity-0'
              }`}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Slice overlays — auto-reveal when scrolled into view */}
            {sliceType === 0 && <VerticalSlices bg={bg} revealed={inView} />}
            {sliceType === 1 && <HorizontalSlices bg={bg} revealed={inView} />}
            {sliceType === 2 && <DiagonalWipe bg={bg} revealed={inView} />}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────── */

export default function ProjectCards() {
  return (
    <section id="work" className="relative z-30 bg-[#020202]">
      <div className="relative z-[10] py-16 text-center">
        <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light">
          Selected Work
        </span>
      </div>

      <div style={{ paddingBottom: `${PROJECTS.length * 5}vh` }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
