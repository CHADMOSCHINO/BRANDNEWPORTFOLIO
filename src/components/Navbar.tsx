'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { PERSONAL } from '@/lib/constants';
import { X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#work', label: 'Our Work' },
  { href: '#services', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);

  const isHome = pathname === '/';

  /* ── Scroll: direction, progress, background ── */
  const scrollDelta = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastScrollY.current;

      // Accumulate scroll delta — only hide after 60px of sustained downward scroll
      if (diff > 0) {
        scrollDelta.current = Math.min(scrollDelta.current + diff, 100);
      } else {
        // Reset immediately on any upward scroll — show nav instantly
        scrollDelta.current = 0;
      }

      const shouldHide = scrollDelta.current > 60 && y > 200 && !menuOpen;
      setHidden(shouldHide);
      setScrolled(y > 50);
      lastScrollY.current = y;

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? Math.min(100, Math.round((y / docH) * 100)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  /* ── Active section tracking (only hash links, only on home) ── */
  useEffect(() => {
    if (!isHome) return;

    const hashLinks = NAV_LINKS.filter((l) => l.href.startsWith('#'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id);
          }
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

  /* ── Set active state for page routes ── */
  useEffect(() => {
    if (!isHome) {
      setActiveSection(pathname);
    }
  }, [isHome, pathname]);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Escape to close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    document.body.style.overflow = '';

    // Page route (e.g. /contact)
    if (href.startsWith('/')) {
      router.push(href);
      return;
    }

    // Hash link — if on home page, smooth scroll
    if (isHome) {
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      // Navigate home with hash
      router.push('/' + href);
    }
  }, [isHome, router]);

  const goToTop = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  }, [isHome, router]);

  return (
    <>
      {/* ─── Safe area background — always visible behind status bar ─── */}
      <div
        className="fixed top-0 left-0 w-full z-[86] pointer-events-none bg-[#020202]"
        style={{ height: 'env(safe-area-inset-top, 0px)' }}
      />

      {/* ─── Scroll progress bar ─── */}
      <div
        className="fixed left-0 w-full h-[1px] z-[86] pointer-events-none"
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div
          className="h-full bg-white/40"
          style={{ width: `${scrollPct}%`, transition: 'width 100ms linear' }}
        />
      </div>

      {/* ─── Main Navbar ─── */}
      <nav
        className={`fixed left-0 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'z-[85]' : 'z-[60]'
        } ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled && !menuOpen
            ? 'bg-[#020202]/80 backdrop-blur-xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={goToTop} className="relative z-10 mix-blend-difference group" aria-label="Go to top">
            <div className="flex items-center gap-2">
              {/* CG Monogram */}
              <span className="flex items-baseline leading-none">
                <span className="text-base font-bold tracking-tighter text-white">C</span>
                <span className="text-base font-light tracking-tighter text-white/50">G</span>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-white/30" />
              {/* CHAD brand */}
              <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white">
                {PERSONAL.brand}
              </span>
            </div>
            {/* Hover underline reveal */}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>

          {/* Desktop nav — centered */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((item) => {
              const isActive = item.href.startsWith('/')
                ? pathname === item.href
                : activeSection === item.href;

              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`relative text-[11px] tracking-[0.15em] uppercase font-light px-5 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/[0.06]'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop right: availability + Talk to James */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
              <span className="text-[10px] text-zinc-500 tracking-widest uppercase">Available</span>
            </div>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
              className="group flex items-center gap-3 bg-white/[0.08] border border-white/[0.1] rounded-full pl-1.5 pr-5 py-1.5 hover:bg-white/[0.14] hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(52,211,153,0.1)] transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image
                  src="/james-headshot.jpg"
                  alt="James"
                  width={96}
                  height={96}
                  quality={100}
                  sizes="32px"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#020202]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[11px] text-white tracking-[0.12em] uppercase font-light leading-tight">
                  Talk to James
                </span>
                <span className="text-[8px] text-emerald-400/70 tracking-widest uppercase font-light leading-tight">
                  Replies in &lt;60s
                </span>
              </div>
            </button>
          </div>

          {/* ─── Mobile right: scroll % + hamburger/close ─── */}
          <div className="lg:hidden flex items-center gap-3 relative z-10">
            {/* Scroll percentage — hide when menu is open */}
            <div
              className={`flex items-center gap-1.5 transition-all duration-300 ${
                scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
              <span className="text-[10px] text-zinc-400 font-light tabular-nums tracking-wider">
                {scrollPct}%
              </span>
            </div>

            {/* Hamburger / X toggle */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors duration-300"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <div className="flex flex-col items-end gap-[5px]">
                  <span className="block h-[1.5px] w-[20px] rounded-full bg-white" />
                  <span className="block h-[1.5px] w-[14px] rounded-full bg-white" />
                  <span className="block h-[1.5px] w-[20px] rounded-full bg-white" />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Full-screen mobile menu ─── */}
      <div
        className={`fixed inset-0 z-[80] bg-[#020202] lg:hidden transition-all duration-200 ease-out ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full opacity-[0.03] bg-gradient-to-tr from-white to-transparent"
            style={{ filter: 'blur(80px)' }}
          />
        </div>

        <div
          className="relative h-full flex flex-col px-6 sm:px-8"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5rem)', paddingBottom: 'env(safe-area-inset-bottom, 1.5rem)' }}
        >
          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center -mt-8">
            {NAV_LINKS.map((item, i) => {
              const isActive = item.href.startsWith('/')
                ? pathname === item.href
                : activeSection === item.href;

              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="group flex items-center justify-between w-full py-5 border-b border-white/[0.04] text-left active:bg-white/[0.02] transition-colors"
                  style={{
                    transform: menuOpen ? 'translateY(0)' : 'translateY(12px)',
                    opacity: menuOpen ? 1 : 0,
                    transition: `transform 250ms cubic-bezier(0.16,1,0.3,1) ${i * 40}ms, opacity 200ms ease ${i * 40}ms`,
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] text-zinc-700 font-light tabular-nums">
                      0{i + 1}
                    </span>
                    <span
                      className={`text-3xl sm:text-4xl font-light tracking-tight transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-zinc-400 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-zinc-700 group-hover:text-white transition-all duration-300"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div
            className="pb-6 sm:pb-10 space-y-5"
            style={{
              transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
              opacity: menuOpen ? 1 : 0,
              transition: `transform 250ms cubic-bezier(0.16,1,0.3,1) ${NAV_LINKS.length * 40 + 40}ms, opacity 200ms ease ${NAV_LINKS.length * 40 + 40}ms`,
            }}
          >
            {/* CTA — Talk to James */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setTimeout(() => window.dispatchEvent(new CustomEvent('open-chatbot')), 350);
              }}
              className="flex items-center justify-center gap-3 w-full bg-white/[0.06] border border-white/[0.08] text-white rounded-full py-3.5 hover:bg-white/[0.1] hover:border-white/[0.15] active:bg-white/10 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image
                  src="/james-headshot.jpg"
                  alt="James"
                  width={96}
                  height={96}
                  quality={100}
                  sizes="32px"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="text-xs tracking-[0.2em] uppercase font-light">
                Talk to James
              </span>
            </button>

            {/* Info row */}
            <div className="flex items-center justify-between text-[10px] text-zinc-600 uppercase tracking-widest">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="hover:text-white transition-colors duration-300 truncate max-w-[65%]"
              >
                {PERSONAL.email}
              </a>
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                <span>Available</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6 text-[10px] text-zinc-600 uppercase tracking-widest">
              <a
                href={PERSONAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
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
