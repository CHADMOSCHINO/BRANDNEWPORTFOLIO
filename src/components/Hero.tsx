'use client';

import { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { ArrowDown, Check, MessageCircle } from 'lucide-react';
import { PERSONAL, PROJECTS } from '@/lib/constants';
import Magnetic from '@/components/ui/Magnetic';

const CARD_FRAMES = [
  { className: 'h-24 w-[4.5rem] sm:h-32 sm:w-24 md:h-44 md:w-32', width: 320, height: 448 },
  { className: 'h-20 w-20 sm:h-32 sm:w-32 md:h-40 md:w-40', width: 384, height: 384 },
  { className: 'h-20 w-28 sm:h-28 sm:w-40 md:h-36 md:w-52', width: 520, height: 360 },
  { className: 'h-24 w-20 sm:h-36 sm:w-28 md:h-48 md:w-36', width: 360, height: 480 },
] as const;

const OFFER_POINTS = [
  'Hand-coded landing page',
  '2-3 day starter delivery',
  'Mobile-first + SEO-ready',
  '2 revisions + 14-day support',
];

const TRUST_POINTS = ['50+ projects', '25+ reviews', 'No templates'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const featuredProjects = useMemo(() => PROJECTS, []);
  const railProjects = featuredProjects.slice(0, 5);

  useEffect(() => {
    let animationFrame = 0;
    let isVisible = true;
    let time = -0.7;
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;
    let viewportWidth = window.innerWidth;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const positionCards = () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const total = cards.length;
      if (!total) return;

      const isMobile = viewportWidth < 768;
      const isTablet = viewportWidth >= 768 && viewportWidth < 1180;
      const radiusX = isMobile ? 132 : isTablet ? 300 : 430;
      const radiusZ = isMobile ? 70 : isTablet ? 230 : 330;
      const wave = isMobile ? 26 : isTablet ? 76 : 98;

      cards.forEach((card, index) => {
        const angle = time + (index / total) * Math.PI * 2;
        const z = Math.sin(angle) * radiusZ;
        const depth = (z + radiusZ) / (radiusZ * 2);
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle * 1.75 + index * 0.45) * wave;
        const parallaxX = easedX * (isMobile ? 16 : 76) * depth;
        const parallaxY = easedY * (isMobile ? 14 : 58) * depth;
        const scale = 0.54 + depth * (isMobile ? 0.28 : 0.56);
        const rotate = Math.cos(angle) * (isMobile ? 5 : 9);

        card.style.opacity = `${isMobile ? 0.12 + depth * 0.58 : 0.2 + depth * 0.8}`;
        card.style.zIndex = `${Math.round(10 + depth * 40)}`;
        card.style.transform = [
          'translate(-50%, -50%)',
          `translate3d(${x + parallaxX}px, ${y + parallaxY}px, ${z}px)`,
          `scale(${scale})`,
          `rotate(${rotate}deg)`,
        ].join(' ');
      });
    };

    const animate = () => {
      if (!isVisible || document.hidden) {
        animationFrame = 0;
        return;
      }

      time += viewportWidth < 768 ? 0.0035 : 0.0045;
      easedX += (pointerX - easedX) * 0.055;
      easedY += (pointerY - easedY) * 0.055;
      positionCards();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (reduceMotion || animationFrame || !isVisible || document.hidden) return;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      viewportWidth = window.innerWidth;
      positionCards();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          positionCards();
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: '20% 0px 20% 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (reduceMotion) {
      positionCards();
    } else {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      startAnimation();
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [featuredProjects.length]);

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative z-[1] h-[132svh] md:h-[138vh] bg-[#020202]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#020202] sm:min-h-[660px]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
              backgroundSize: '84px 84px',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.08) 45%, transparent 58%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020202] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-[#020202] via-[#020202]/88 to-transparent" />
        </div>

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          aria-hidden="true"
        >
          {featuredProjects.map((project, index) => {
            const frame = CARD_FRAMES[index % CARD_FRAMES.length];
            return (
              <div
                key={project.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={`absolute left-1/2 top-[24%] block overflow-hidden rounded-[1.2rem] border border-white/[0.1] bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.55)] brightness-[0.68] saturate-[0.85] md:top-[38%] md:rounded-[1.75rem] md:brightness-75 md:saturate-[0.9] ${frame.className}`}
                style={{
                  opacity: 0,
                  transform: 'translate(-50%, -50%) scale(0.6)',
                  willChange: 'transform, opacity',
                }}
              >
                <Image
                  src={project.image}
                  alt=""
                  width={frame.width}
                  height={frame.height}
                  priority={index < 3}
                  quality={75}
                  sizes="(max-width: 767px) 132px, (max-width: 1179px) 180px, 220px"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <span className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-8 text-[10px] font-light uppercase leading-none tracking-[0.16em] text-white/80 md:block">
                  {project.title}
                </span>
              </div>
            );
          })}
        </div>

        <aside className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
          {railProjects.map((project, index) => (
            <a
              key={project.id}
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full border px-4 py-2 text-[10px] font-light uppercase tracking-[0.16em] backdrop-blur-xl transition-colors duration-300 ${
                index === 1
                  ? 'border-white/25 bg-white/[0.09] text-white'
                  : 'border-white/[0.1] bg-black/35 text-zinc-500 hover:border-white/25 hover:text-white'
              }`}
            >
              {project.title}
            </a>
          ))}
        </aside>

        <div className="absolute inset-x-0 bottom-0 z-40 px-5 pb-12 sm:px-8 sm:pb-8 md:pb-10 [@media(max-height:700px)]:pb-7">
          <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <div className="mb-4 overflow-hidden [@media(max-height:700px)]:hidden">
                <p
                  className="text-[10px] font-light uppercase tracking-[0.24em] text-zinc-500"
                  style={{ animation: 'revealText 0.8s var(--ease-out-expo) 0.08s both' }}
                >
                  Launch Sprint + Portfolio Builds
                </p>
              </div>

              <div className="overflow-hidden pb-1">
                <h1
                  className="text-[40px] font-light leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl xl:text-8xl [@media(max-height:700px)]:text-[34px]"
                  style={{ animation: 'revealText 1s var(--ease-out-expo) 0.16s both' }}
                >
                  Launch a site that sells.
                </h1>
              </div>
              <div className="overflow-hidden pb-2">
                <p
                  className="text-[40px] font-light leading-[0.95] tracking-normal text-zinc-500 sm:text-6xl md:text-7xl xl:text-8xl [@media(max-height:700px)]:text-[34px]"
                  style={{ animation: 'revealText 1s var(--ease-out-expo) 0.28s both' }}
                >
                  Built in days.
                </p>
              </div>

              <p
                className="mt-5 max-w-xl text-sm font-light leading-relaxed text-zinc-500 sm:text-base [@media(max-height:700px)]:hidden"
                style={{ animation: 'fadeInUp 0.8s ease-out 0.42s both' }}
              >
                Premium hand-coded websites for brands that need leads, bookings, or sales fast.
                Starter builds from $500.
              </p>

              <div
                className="mt-5 hidden max-w-2xl flex-wrap items-center gap-2 sm:flex [@media(max-height:760px)]:hidden"
                style={{ animation: 'fadeInUp 0.8s ease-out 0.48s both' }}
              >
                {TRUST_POINTS.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[10px] font-light uppercase tracking-[0.16em] text-zinc-400"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="flex flex-col gap-4 md:min-w-[24rem] md:items-end"
              style={{ animation: 'fadeInUp 0.8s ease-out 0.55s both' }}
            >
              <div className="hidden w-full rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:block sm:p-5 [@media(max-height:760px)]:hidden">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-light uppercase tracking-[0.22em] text-emerald-400">
                      Buy the outcome
                    </p>
                    <p className="mt-2 text-lg font-light tracking-tight text-white">
                      $500 Starter Launch
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[9px] font-light uppercase tracking-[0.16em] text-emerald-300">
                    2-3 days
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {OFFER_POINTS.map((point) => (
                    <div key={point} className="flex min-w-0 items-center gap-2 text-[11px] font-light text-zinc-400">
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400/80" aria-hidden="true" />
                      <span className="truncate">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
                <Magnetic strength={5} radius={100}>
                  <a
                    href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I want to reserve the $500 Starter Launch build.")}`}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white px-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#020202] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_52px_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 hover:bg-zinc-200 sm:w-auto sm:gap-3 sm:px-5 sm:text-[11px] sm:tracking-[0.16em]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span className="sm:hidden">Reserve</span>
                    <span className="hidden sm:inline">Reserve My Build</span>
                  </a>
                </Magnetic>
                <Magnetic strength={5} radius={100}>
                  <button
                    onClick={scrollToWork}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-black/30 px-3 text-[10px] font-light uppercase tracking-[0.12em] text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:text-white sm:w-auto sm:gap-3 sm:px-5 sm:text-[11px] sm:tracking-[0.16em]"
                  >
                    View Work
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
