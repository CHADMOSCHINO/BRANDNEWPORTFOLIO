'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('@/components/Chatbot'), { ssr: false });

export default function DeferredChatbot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = () => setReady(true);
    const idle = (window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (idle) {
      idle(mount, { timeout: 3000 });
    } else {
      const t = setTimeout(mount, 2500);
      return () => clearTimeout(t);
    }
  }, []);

  if (!ready) return null;
  return <Chatbot />;
}
