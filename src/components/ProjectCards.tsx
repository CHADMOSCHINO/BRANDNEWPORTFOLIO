'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';

/* ── Slice overlays — reveal on scroll, hover re-trigger on desktop ── */

function VerticalSlices({ bg, revealed }: { bg: string; revealed: boolean }) {
  const delays = [0, 50, 100, 150, 200];
  return (
    <div className="absolute inset-0 flex z-10 pointer-events-none">
      {delays.map((delay, i) => (
        <div
          key={i}
          className={`flex-1 will-change-transform ${
            i % 2 === 0 ? 'origin-top' : 'origin-bottom'
          } transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            revealed ? 'scale-y-0' : 'scale-y-100'
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
          className={`flex-1 will-change-transform ${
            i % 2 === 0 ? 'origin-left' : 'origin-right'
          } transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
            revealed ? 'scale-x-0' : 'scale-x-100'
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
        className={`absolute inset-[-50%] rotate-45 will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          revealed ? 'translate-x-[150%]' : 'translate-x-0'
        }`}
        style={{ backgroundColor: bg, transitionDelay: revealed ? '300ms' : '0ms' }}
      />
    </div>
  );
}

/* ── Project Card ───────────────────────────────────────────────── */

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Observe a non-sticky sentinel element instead of the sticky card itself.
  // Sticky elements fill the viewport once stuck, making IntersectionObserver
  // fire immediately. The sentinel stays in normal document flow.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: '0px 0px -30% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const isEven = index % 2 === 0;
  const bgColors = ['#050505', '#080808', '#0a0a0a', '#070707'];
  const bg = bgColors[index % bgColors.length];
  const sliceType = index % 3;

  return (
    <>
    <div
      ref={sentinelRef}
      className="w-full pointer-events-none"
      style={{ height: 1, marginTop: index > 0 ? 'max(5vh, 60px)' : undefined }}
    />
    <div
      className="sticky top-0 h-[100svh] md:h-screen w-full"
      style={{ zIndex: index + 1 }}
    >
      <div
        className="h-full w-full flex items-center justify-center px-4 py-5 sm:p-8 md:p-10 lg:p-16 overflow-hidden rounded-t-[1.75rem] sm:rounded-t-[2.5rem] border-t border-white/5"
        style={{ backgroundColor: bg }}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-24 items-center">
          {/* Text */}
          <div
            className={`flex min-w-0 flex-col gap-4 sm:gap-5 lg:gap-8 lg:col-span-5 ${
              isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2 lg:pl-8'
            }`}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateY(12px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <div className="flex min-w-0 items-center gap-3">
              {project.stats === 'Active Build' ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              ) : project.stats === 'Live' ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
                </span>
              ) : (
                <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-zinc-500" />
              )}
              <span className={`shrink-0 text-[10px] tracking-[0.2em] uppercase font-light ${
                project.stats === 'Active Build' ? 'text-emerald-400' :
                project.stats === 'Live' ? 'text-sky-400' :
                'text-zinc-500'
              }`}>
                {project.stats === 'Active Build' ? 'Currently Building' :
                 project.stats === 'Live' ? 'Live' :
                 project.category}
              </span>
              <span className="shrink-0 text-zinc-700 text-[10px]">·</span>
              <span className="min-w-0 truncate text-[10px] text-zinc-600 tracking-[0.15em] uppercase font-light">
                {project.category}
              </span>
            </div>
            <h2 className="text-[clamp(2.4rem,12vw,4rem)] sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter text-white leading-[0.9]">
              {project.title}
            </h2>
            <p className="text-zinc-500 font-light text-sm max-w-md leading-relaxed hidden sm:block">
              {project.description}
            </p>

            {/* Scope tags */}
            {project.scope && project.scope.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {project.scope.map((tag, si) => (
                  <span key={si} className="text-[9px] text-zinc-500 tracking-widest uppercase border border-zinc-800 hover:border-zinc-600 hover:text-zinc-400 transition-colors duration-300 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Performance metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid w-full max-w-sm grid-cols-3 gap-3 sm:gap-8 mt-1 pt-2 border-t border-zinc-900">
                {project.metrics.map((metric, mi) => (
                  <div key={mi} className="flex min-w-0 flex-col items-start gap-0.5">
                    <span className="text-white text-sm sm:text-base font-light tracking-tight tabular-nums">{metric.value}</span>
                    <span className="text-[8px] sm:text-[9px] text-zinc-600 tracking-[0.15em] uppercase">{metric.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-5 flex-wrap mt-1">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-3 w-max cursor-pointer"
              >
                <span className="text-white text-xs font-light tracking-widest uppercase group-hover/link:text-zinc-300 transition-colors duration-300">
                  View Live Site
                </span>
                <div className="relative w-14 h-[1px] bg-zinc-800 overflow-hidden">
                  <div className="absolute inset-0 origin-left scale-x-[0.57] bg-white transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                </div>
              </a>
              {project.isShopify && (
                <span className="text-[10px] text-zinc-600 tracking-widest uppercase border border-zinc-800 rounded-full px-3 py-1">
                  Shopify
                </span>
              )}
            </div>
          </div>

          {/* Image with slice reveals */}
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`lg:col-span-7 relative aspect-[4/3] lg:aspect-video w-full group overflow-hidden cursor-pointer rounded-sm block ${
              isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'
            }`}
            style={{
              backgroundColor: bg,
              opacity: inView ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.1s',
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={index < 2}
              className="object-cover lg:group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />

            {/* Click-to-view overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
              <div className="flex items-center gap-2 bg-black/50 border border-white/20 rounded-full px-5 py-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[11px] text-white tracking-[0.15em] uppercase font-light">
                  View Live Site
                </span>
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>

            {/* Status badge on image */}
            {(project.stats === 'Active Build' || project.stats === 'Live') && (
              <div className={`absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/60 rounded-full px-3 py-1.5 ${
                project.stats === 'Active Build' ? 'border border-emerald-500/30' : 'border border-sky-400/30'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    project.stats === 'Active Build' ? 'bg-emerald-500' : 'bg-sky-400'
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    project.stats === 'Active Build' ? 'bg-emerald-500' : 'bg-sky-400'
                  }`} />
                </span>
                <span className={`text-[9px] tracking-widest uppercase font-light ${
                  project.stats === 'Active Build' ? 'text-emerald-400' : 'text-sky-400'
                }`}>
                  {project.stats === 'Active Build' ? 'In Progress' : 'Live'}
                </span>
              </div>
            )}

            {/* Slice overlays — reveal on scroll */}
            {sliceType === 0 && <VerticalSlices bg={bg} revealed={inView} />}
            {sliceType === 1 && <HorizontalSlices bg={bg} revealed={inView} />}
            {sliceType === 2 && <DiagonalWipe bg={bg} revealed={inView} />}
          </a>
        </div>
      </div>
    </div>
    </>
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
