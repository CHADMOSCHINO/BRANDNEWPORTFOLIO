'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none"
      style={{ animation: 'fadeOut 1.5s ease-in-out 2.5s forwards' }}
    >
      <div className="overflow-hidden mb-8">
        <div
          className="text-xs text-zinc-500 tracking-widest uppercase font-light"
          style={{ animation: 'revealText 1s var(--ease-out-expo) 0.2s both' }}
        >
          System Boot
        </div>
      </div>
      <div className="overflow-hidden">
        <h1
          className="text-4xl md:text-6xl tracking-tighter font-light text-white"
          style={{ animation: 'revealText 1s var(--ease-out-expo) 0.4s both' }}
        >
          INITIALIZING
        </h1>
      </div>

      {/* Slice exit */}
      <div className="absolute inset-0 flex z-[-1]">
        <div className="flex-1 bg-[#050505]" style={{ animation: 'slideUpSlice 1.2s var(--ease-out-expo) 1.8s forwards' }} />
        <div className="flex-1 bg-[#070707]" style={{ animation: 'slideUpSlice 1.2s var(--ease-out-expo) 1.9s forwards' }} />
        <div className="flex-1 bg-[#050505]" style={{ animation: 'slideUpSlice 1.2s var(--ease-out-expo) 2.0s forwards' }} />
        <div className="flex-1 bg-[#070707]" style={{ animation: 'slideUpSlice 1.2s var(--ease-out-expo) 2.1s forwards' }} />
      </div>
    </div>
  );
}
