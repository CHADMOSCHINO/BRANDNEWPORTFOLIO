'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { PERSONAL } from '@/lib/constants';

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const pricing = document.getElementById('pricing');

      if (!pricing) {
        setVisible(window.scrollY > window.innerHeight * 1.2);
        return;
      }

      const pricingTop = pricing.getBoundingClientRect().top;
      setVisible(pricingTop < window.innerHeight * -0.55);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed left-3 right-[5.4rem] z-[45] flex h-14 items-center justify-between gap-3 rounded-full border border-white/[0.12] bg-[#080808]/80 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-[opacity,transform] duration-300 ease-out will-change-transform sm:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{
        bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="min-w-0 pl-1">
        <p className="truncate text-[10px] font-light uppercase tracking-[0.16em] text-zinc-500">
          From $500
        </p>
        <p className="truncate text-xs font-light text-white">
          2-3 day build
        </p>
      </div>
      <a
        href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I want to reserve the $500 Starter Launch build.")}`}
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-[10px] font-medium uppercase tracking-[0.14em] text-[#020202]"
      >
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
        Reserve
        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
      </a>
    </div>
  );
}
