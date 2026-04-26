'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Gauge,
  LayoutGrid,
  ShoppingBag,
  X,
} from 'lucide-react';
import { PERSONAL } from '@/lib/constants';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services', hasDropdown: true },
  { href: '#services', label: 'AI Systems' },
  { href: '#pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

const SERVICE_CARDS = [
  {
    title: 'Premium Sites',
    label: 'Design + dev',
    description: 'Hand-coded sites built to feel expensive, load fast, and convert real leads.',
    href: '#work',
    icon: LayoutGrid,
  },
  {
    title: 'AI Systems',
    label: 'Automations',
    description: 'Chatbots, workflows, and AI tools wired into the way your business actually works.',
    href: '#services',
    icon: Bot,
    featured: true,
  },
  {
    title: 'Shopify Builds',
    label: 'Commerce',
    description: 'Headless storefronts, custom product journeys, and sharper conversion flows.',
    href: '/shopify',
    icon: ShoppingBag,
  },
  {
    title: 'SEO + Speed',
    label: 'Performance',
    description: 'Core Web Vitals, local SEO, technical cleanup, and faster landing pages.',
    href: '#pricing',
    icon: Gauge,
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);
  const menuOpenRef = useRef(false);
  const lockedScrollY = useRef(0);
  const scrollDelta = useRef(0);

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastScrollY.current;

      if (diff > 0) {
        scrollDelta.current = Math.min(scrollDelta.current + diff, 100);
      } else {
        scrollDelta.current = 0;
      }

      setHidden(scrollDelta.current > 60 && y > 200 && !menuOpenRef.current && !servicesOpen);
      setScrolled(y > 40);
      lastScrollY.current = y;

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? Math.min(100, Math.round((y / docH) * 100)) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [servicesOpen]);

  useEffect(() => {
    if (!isHome) return;

    const hashLinks = NAV_LINKS.filter((link) => link.href.startsWith('#'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.25, rootMargin: '-15% 0px -55% 0px' }
    );

    hashLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isHome) setActiveSection(pathname);
  }, [isHome, pathname]);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    document.body.classList.toggle('menu-open', menuOpen);

    if (menuOpen) {
      lockedScrollY.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockedScrollY.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (lockedScrollY.current > 0) window.scrollTo(0, lockedScrollY.current);
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    setServicesOpen(false);

    if (href.startsWith('/')) {
      router.push(href);
      return;
    }

    if (isHome) {
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      router.push(`/${href}`);
    }
  }, [isHome, router]);

  const goToTop = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);

    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  }, [isHome, router]);

  const buildWithGrellax = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    window.open(PERSONAL.calendly, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full z-[86] pointer-events-none bg-[#020202]"
        style={{ height: 'env(safe-area-inset-top, 0px)' }}
      />

      <div
        className={`fixed left-0 w-full h-[1px] z-[86] pointer-events-none transition-opacity duration-200 ${
          menuOpen ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div
          className="h-full bg-white/40"
          style={{ width: `${scrollPct}%`, transition: 'width 100ms linear' }}
        />
      </div>

      <header
        className={`fixed left-0 right-0 px-3 sm:px-5 ${
          menuOpen ? 'z-[85]' : 'z-[60]'
        } ${hidden && !menuOpen ? '-translate-y-[120%]' : 'translate-y-0'}`}
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)',
          transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border px-3 pl-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-all duration-300 sm:h-16 sm:px-4 sm:pl-6 ${
            scrolled || servicesOpen || menuOpen
              ? 'border-white/[0.12] bg-[#050505]/80 backdrop-blur-2xl'
              : 'border-white/[0.08] bg-[#050505]/45 backdrop-blur-xl'
          }`}
        >
          <button
            onClick={goToTop}
            className="group flex min-w-0 items-center gap-2 rounded-full pr-2 text-left"
            aria-label="Go to top"
          >
            <span className="text-[11px] font-semibold tracking-[0.34em] text-white sm:text-xs">
              GRELLAX
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
            <span className="hidden text-[9px] uppercase tracking-[0.2em] text-zinc-600 transition-colors group-hover:text-zinc-400 sm:block">
              Studio
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => {
              const isActive = item.href.startsWith('/')
                ? pathname === item.href
                : activeSection === item.href && item.label !== 'AI Systems';

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onPointerEnter={() => setServicesOpen(true)}
                    onPointerLeave={() => setServicesOpen(false)}
                  >
                    <button
                      onClick={() => setServicesOpen((open) => !open)}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      className={`group flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-light uppercase tracking-[0.15em] transition-all duration-300 ${
                        isActive || servicesOpen
                          ? 'bg-white/[0.07] text-white'
                          : 'text-zinc-500 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <div
                      className={`absolute left-1/2 top-[calc(100%+0.9rem)] w-[34rem] -translate-x-1/2 overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-[#050505]/90 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-200 ${
                        servicesOpen
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none translate-y-2 opacity-0'
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_55%)]" />
                      <div className="relative grid grid-cols-2 gap-3">
                        {SERVICE_CARDS.map((service) => {
                          const Icon = service.icon;

                          return (
                            <button
                              key={service.title}
                              onClick={() => scrollTo(service.href)}
                              className={`group/card relative min-h-36 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                                service.featured
                                  ? 'border-white/[0.16] bg-white/[0.08]'
                                  : 'border-white/[0.07] bg-white/[0.035] hover:border-white/[0.14] hover:bg-white/[0.06]'
                              }`}
                            >
                              <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="rounded-full border border-white/[0.08] bg-black/30 p-2 text-white">
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                                    {service.label}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-sm font-light tracking-tight text-white">
                                    {service.title}
                                  </h3>
                                  <p className="mt-1.5 max-w-[14rem] text-xs font-light leading-relaxed text-zinc-500">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                              <ArrowUpRight className="absolute bottom-4 right-4 h-4 w-4 text-zinc-700 transition-all duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-white" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={`${item.label}-${item.href}`}
                  onClick={() => scrollTo(item.href)}
                  className={`rounded-full px-4 py-2 text-[11px] font-light uppercase tracking-[0.15em] transition-all duration-300 ${
                    isActive
                      ? 'bg-white/[0.07] text-white'
                      : 'text-zinc-500 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
                Available for 2 builds
              </span>
            </div>
            <button
              onClick={buildWithGrellax}
              className="group relative overflow-hidden rounded-full bg-white px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-black transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Build With Grellax
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="absolute inset-0 translate-y-full bg-zinc-200 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={buildWithGrellax}
              className="hidden rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-emerald-300/80 min-[380px]:block"
            >
              2 builds
            </button>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-colors duration-300 hover:bg-white/[0.07]"
            >
              {menuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <div className="flex flex-col items-end gap-[5px]">
                  <span className="block h-[1.5px] w-5 rounded-full bg-white" />
                  <span className="block h-[1.5px] w-3.5 rounded-full bg-white" />
                  <span className="block h-[1.5px] w-5 rounded-full bg-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[80] bg-[#020202] lg:hidden transition-opacity duration-200 ease-out ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute left-1/2 top-1/3 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.018) 40%, transparent 70%)',
            }}
          />
        </div>

        <div
          className="relative flex h-[100svh] flex-col px-5 sm:px-8"
          style={{
            paddingTop: 'calc(env(safe-area-inset-top, 0px) + 6rem)',
            paddingBottom: 'env(safe-area-inset-bottom, 1.5rem)',
          }}
        >
          <div className="flex items-center justify-between rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
                Available for 2 builds
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
              {scrollPct}%
            </span>
          </div>

          <nav className="mt-8 flex flex-col">
            {NAV_LINKS.map((item, i) => {
              const isActive = item.href.startsWith('/')
                ? pathname === item.href
                : activeSection === item.href && item.label !== 'AI Systems';

              return (
                <button
                  key={`${item.label}-${item.href}`}
                  onClick={() => scrollTo(item.href)}
                  className="group flex w-full items-center justify-between border-b border-white/[0.04] py-4 text-left active:bg-white/[0.02]"
                  style={{
                    transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                    opacity: menuOpen ? 1 : 0,
                    transition: `transform 250ms cubic-bezier(0.16,1,0.3,1) ${i * 30}ms, opacity 200ms ease ${i * 30}ms`,
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] text-zinc-700 font-light tabular-nums">
                      0{i + 1}
                    </span>
                    <span
                      className={`text-3xl font-light tracking-tight transition-colors duration-300 sm:text-4xl ${
                        isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </button>
              );
            })}
          </nav>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {SERVICE_CARDS.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.title}
                  onClick={() => scrollTo(service.href)}
                  className={`min-h-32 rounded-2xl border p-3 text-left transition-colors ${
                    service.featured
                      ? 'border-white/[0.14] bg-white/[0.08]'
                      : 'border-white/[0.07] bg-white/[0.035]'
                  }`}
                >
                  <Icon className="mb-6 h-4 w-4 text-white" />
                  <span className="block text-sm font-light text-white">{service.title}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                    {service.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto space-y-4 pb-5">
            <button
              onClick={buildWithGrellax}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-black transition-colors duration-300 active:bg-zinc-200"
            >
              Build With Grellax
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <div className="flex items-center justify-between text-[10px] text-zinc-600 uppercase tracking-widest">
              <a href={`mailto:${PERSONAL.email}`} className="truncate pr-4">
                {PERSONAL.email}
              </a>
              <a
                href={PERSONAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
