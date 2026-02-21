'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, ArrowUpRight } from 'lucide-react';
import { QA_DATABASE, PERSONAL } from '@/lib/constants';
import type { ChatMessage } from '@/types';

const DEFAULT_RESPONSE =
  "I'm not sure about that one. Try asking about pricing, timeline, services, or how to get started!";

function findAnswer(query: string): string {
  const lower = query.toLowerCase();
  for (const qa of QA_DATABASE) {
    for (const keyword of qa.keywords) {
      if (lower.includes(keyword)) return qa.answer;
    }
  }
  return DEFAULT_RESPONSE;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'bot',
      content:
        "Ask me about pricing, timeline, services, or how to get started.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Show promo after 8 seconds if chat hasn't been opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !promoDismissed) {
        setShowPromo(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [isOpen, promoDismissed]);

  // Hide promo when chat opens
  useEffect(() => {
    if (isOpen) setShowPromo(false);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: userMsg },
    ]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: findAnswer(userMsg),
        },
      ]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const dismissPromo = () => {
    setShowPromo(false);
    setPromoDismissed(true);
  };

  const openFromPromo = () => {
    setShowPromo(false);
    setPromoDismissed(true);
    setIsOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', paddingRight: 'env(safe-area-inset-right, 0px)' }}>
      {/* ── Promo pop-out ── */}
      {showPromo && !isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-72 bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] p-5 animate-fade-in-up">
          {/* Close */}
          <button
            onClick={dismissPromo}
            className="absolute top-3 right-3 text-zinc-600 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Content */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-400/80 tracking-widest uppercase font-light">
              Limited Offer
            </span>
          </div>

          <p className="text-white text-sm font-light tracking-tight leading-relaxed mb-1">
            Q1 & Q2 Discounted Rates
          </p>
          <p className="text-zinc-500 text-xs font-light leading-relaxed mb-4">
            Special pricing available now. DM for details or chat with us
            below.
          </p>

          <div className="flex gap-2">
            <a
              href={PERSONAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 rounded-lg py-2.5 text-[10px] text-white uppercase tracking-widest font-light hover:bg-white/5 transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 opacity-40" />
            </a>
            <button
              onClick={openFromPromo}
              className="flex-1 flex items-center justify-center gap-2 bg-white/[0.08] border border-white/10 rounded-lg py-2.5 text-[10px] text-white uppercase tracking-widest font-light hover:bg-white/[0.12] transition-colors"
            >
              Chat Now
            </button>
          </div>
        </div>
      )}

      {/* ── Chat panel ── */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-80 h-[460px] max-h-[80vh] bg-[#0a0a0a] border border-white/[0.06] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light block">
                Assistant
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-white font-light tracking-tight">
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-600 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed font-light ${
                    msg.role === 'user'
                      ? 'bg-white/[0.08] text-white rounded-xl rounded-br-sm'
                      : 'text-zinc-400'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 py-3">
                  <span
                    className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/[0.06]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white text-sm font-light placeholder:text-zinc-700 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-8 h-8 flex shrink-0 items-center justify-center text-zinc-600 hover:text-white transition-colors disabled:opacity-20"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── "Need Help?" label — shows before promo, always visible ── */}
      {!isOpen && !showPromo && !promoDismissed && (
        <button
          onClick={() => {
            setShowPromo(true);
          }}
          className="absolute bottom-14 right-0 whitespace-nowrap bg-[#0a0a0a]/90 backdrop-blur border border-white/[0.06] rounded-full px-3.5 py-1.5 text-[10px] text-zinc-400 uppercase tracking-widest font-light hover:text-white hover:border-white/10 transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '6s', animationFillMode: 'both' }}
        >
          Need Help?
        </button>
      )}

      {/* ── Toggle button ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
          isOpen
            ? 'bg-transparent text-zinc-500 hover:text-white'
            : 'bg-[#0a0a0a] border border-white/[0.06] text-zinc-500 hover:text-white hover:border-white/10'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
