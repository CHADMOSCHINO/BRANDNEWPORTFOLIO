'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { X, Send, ArrowUpRight, MessageCircle } from 'lucide-react';
import { QA_DATABASE, PERSONAL } from '@/lib/constants';
import type { ChatMessage } from '@/types';

const MAX_INPUT_LENGTH = 500;
const MAX_MESSAGES_PER_SESSION = 40;
const MIN_MESSAGE_INTERVAL_MS = 800;
const LEAD_CAPTURE_AFTER = 3;

const FALLBACK_RESPONSES = [
  "I don't have the answer to that one off the top of my head. But I can help with pricing, services, timelines, or Shopify builds. What sounds good?",
  "Hmm, that's a bit outside what I'm trained on. Try asking about our services, tech stack, or how to get started. Or drop your number and Chad will text you directly.",
  "Not sure on that one! I'm best at answering questions about pricing, what we build, how fast we deliver, and our process. What can I help with?",
  "That's a great question — just not one I have a canned answer for. Want to text Chad directly at (919) 526-0824? He can give you the full picture.",
];

const SUGGESTION_MAP: Record<string, string[]> = {
  default: ['What do you build?', 'How fast do you deliver?', 'Show me pricing'],
  special: ["What's included?", 'How do I get started?', 'Show me pricing'],
  pricing: ["What's included?", 'How do I get started?', 'Do you do Shopify?'],
  services: ['How much does it cost?', 'What tech do you use?', 'Can I see your work?'],
  contact: ["What's the process?", 'Are you available?', "What's your timeline?"],
  tech: ['Can you build a web app?', 'Do you do mobile apps?', 'Show me your portfolio'],
  shopify: ['How much for Shopify?', 'Do you do headless?', 'What about payments?'],
  timeline: ["What's the process?", 'How do I get started?', "What's your pricing?"],
  portfolio: ['What services do you offer?', 'How much does it cost?', "What's your process?"],
  greeting: ['What do you build?', 'Show me pricing', 'Tell me about Chad'],
  seo: ['How fast are the sites?', 'What tech do you use?', 'Show me examples'],
  redesign: ['How much does it cost?', 'How long does it take?', 'Can I see examples?'],
  retainer: ['What does retainer include?', 'How much does it cost?', 'How do I start?'],
  farewell: ['Text Chad', 'View the portfolio', 'Ask about pricing'],
};

const TOPIC_KEYWORDS: Record<string, string[]> = {
  special: ['500', 'starter', 'entry', 'deal', 'special', 'offer', 'promo', 'cheap', 'affordable', 'landing page'],
  pricing: ['pricing', 'cost', 'price', 'how much', 'budget', 'money', 'rate', 'quote', 'payment'],
  services: ['services', 'what do you do', 'offer', 'help', 'build', 'capabilities'],
  contact: ['contact', 'email', 'call', 'book', 'schedule', 'get started', 'start', 'hire', 'calendly'],
  tech: ['tech', 'stack', 'react', 'code', 'framework', 'next.js', 'typescript', 'tailwind'],
  shopify: ['shopify', 'ecommerce', 'store', 'products', 'headless', 'online store'],
  timeline: ['timeline', 'how long', 'fast', 'delivery', 'turnaround', 'days', 'weeks'],
  portfolio: ['experience', 'portfolio', 'work', 'projects', 'examples', 'clients'],
  greeting: ['hello', 'hi', 'hey', 'sup', 'yo', 'what up', 'good morning'],
  seo: ['seo', 'google', 'search', 'rank', 'traffic', 'lighthouse'],
  redesign: ['redesign', 'rebuild', 'redo', 'revamp', 'existing site', 'old site'],
  retainer: ['retainer', 'ongoing', 'monthly', 'subscription', 'maintenance'],
  farewell: ['thanks', 'thank you', 'bye', 'goodbye', 'appreciate', 'later'],
};

function sanitizeInput(raw: string): string {
  return raw
    .replace(/&(?:#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'`]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 500);
}

/* ── Lightweight Levenshtein distance ── */
function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function detectTopic(query: string): string {
  const lower = query.toLowerCase();
  let bestTopic = 'default';
  let bestScore = 0;
  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.includes(' ') ? 3 : 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }
  return bestTopic;
}

let fallbackIndex = 0;

function findAnswer(query: string): { answer: string; topic: string } {
  const lower = query.toLowerCase().replace(/[^a-z0-9\s$]/g, ' ');
  const words = lower.split(/\s+/).filter(Boolean);

  let bestMatch = { score: 0, answer: '' };
  for (const qa of QA_DATABASE) {
    let score = 0;
    for (const keyword of qa.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.includes(' ') ? 3 : 1;
      } else {
        const kwParts = keyword.split(' ');
        for (const qw of words) {
          for (const kp of kwParts) {
            if (kp.length > 3 && qw.length > 3 && levenshtein(qw, kp) <= 2) {
              score += 0.5;
            }
          }
        }
      }
    }
    if (score > bestMatch.score) {
      bestMatch = { score, answer: qa.answer };
    }
  }

  const topic = detectTopic(query);

  if (bestMatch.score > 0) {
    return { answer: bestMatch.answer, topic };
  }

  const response = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
  fallbackIndex++;
  return { answer: response, topic: 'default' };
}

/* ── Submit lead to Netlify Forms ── */
async function submitLeadToNetlify(name: string, phone: string) {
  const body = new URLSearchParams({
    'form-name': 'chatbot-leads',
    name,
    phone,
    source: 'chatbot',
  }).toString();

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch (err) {
    console.error('Form submission failed:', err);
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'bot',
      content:
        "Hey! I'm James, the 24/7 concierge for Grellax. I can answer questions about pricing, services, timelines, and more. We've built for 50+ brands including 8- and 9-figure clients. What can I help you with?",
      suggestions: ['What do you build?', 'Show me pricing', 'How fast do you deliver?'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const lastSentRef = useRef(0);
  const messageCountRef = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !promoDismissed) {
        setShowPromo(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isOpen, promoDismissed]);

  useEffect(() => {
    if (isOpen) setShowPromo(false);
  }, [isOpen]);

  /* ── Allow external components to open the chatbot via custom event ── */
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handler);
    return () => window.removeEventListener('open-chatbot', handler);
  }, []);

  /* ── UTM-aware greeting for Google Ads traffic ── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmCampaign = params.get('utm_campaign');

    if (utmSource === 'google' || utmCampaign) {
      const adGreeting = utmCampaign?.toLowerCase().includes('shopify')
        ? "Hey! Looks like you're interested in a custom Shopify store. We build headless stores for 8- and 9-figure brands. I can walk you through pricing, our process, and show you live builds. What would you like to know?"
        : utmCampaign?.toLowerCase().includes('landing')
        ? "Hey! Looking for a custom site? Our Starter package gets you a hand-coded landing page in 5 days. I can break down everything that's included."
        : "Hey! Welcome to Grellax. I'm James — 50+ brands scaled, 25+ five-star reviews. I can help with pricing, services, timelines, and more. What brings you here today?";

      setMessages([{
        id: '0',
        role: 'bot',
        content: adGreeting,
        suggestions: ['What do you build?', 'Show me pricing', 'How fast do you deliver?'],
      }]);
    }
  }, []);

  /* ── Proactive scroll-depth trigger — open chat at 55% scroll ── */
  useEffect(() => {
    let fired = false;
    const onScroll = () => {
      if (fired || isOpen || promoDismissed) return;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;
      const pct = window.scrollY / docH;
      if (pct >= 0.55) {
        fired = true;
        setShowPromo(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen, promoDismissed]);

  /* ── Exit-intent trigger on desktop ── */
  useEffect(() => {
    let fired = false;
    const onMouseLeave = (e: MouseEvent) => {
      if (fired || isOpen || promoDismissed || showPromo) return;
      if (e.clientY <= 5) {
        fired = true;
        setShowPromo(true);
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, [isOpen, promoDismissed, showPromo]);

  const sendMessage = useCallback((text: string) => {
    const sanitized = sanitizeInput(text);
    if (!sanitized) return;

    const now = Date.now();
    if (now - lastSentRef.current < MIN_MESSAGE_INTERVAL_MS) return;
    if (messageCountRef.current >= MAX_MESSAGES_PER_SESSION) {
      setMessages((prev) => [
        ...prev,
        {
          id: now.toString(),
          role: 'bot',
          content: `You've been chatting a lot — love the energy! For a deeper conversation, text Chad directly at (919) 526-0824. He'll get back to you fast.`,
        },
      ]);
      setInput('');
      return;
    }

    lastSentRef.current = now;
    messageCountRef.current += 1;

    const userMsg = sanitized.slice(0, MAX_INPUT_LENGTH);
    setMessages((prev) => [
      ...prev,
      { id: now.toString(), role: 'user', content: userMsg },
    ]);
    setInput('');
    setIsTyping(true);

    // Variable typing delay based on response length for realism
    const baseDelay = 500 + Math.random() * 500;

    setTimeout(() => {
      const { answer, topic } = findAnswer(userMsg);
      const suggestions = SUGGESTION_MAP[topic] || SUGGESTION_MAP.default;

      // Show lead capture after N user messages if not already captured
      const shouldShowLeadCapture =
        messageCountRef.current >= LEAD_CAPTURE_AFTER && !leadCaptured && !showLeadCapture;

      if (shouldShowLeadCapture) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'bot',
            content: answer,
            suggestions,
          },
          {
            id: (Date.now() + 2).toString(),
            role: 'bot',
            content: "You seem pretty interested — want to take this further? You can text Chad directly and he'll get back to you personally. Or drop your name and number and he'll reach out to you.",
          },
        ]);
        setShowLeadCapture(true);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'bot',
            content: answer,
            suggestions,
          },
        ]);
      }

      setIsTyping(false);
    }, baseDelay);
  }, [leadCaptured, showLeadCapture]);

  const handleSend = useCallback(() => {
    sendMessage(input);
  }, [input, sendMessage]);

  const handleChipClick = useCallback((text: string) => {
    sendMessage(text);
  }, [sendMessage]);

  const handleLeadSubmit = useCallback(async () => {
    if (!leadName.trim() || !leadPhone.trim()) return;
    const phoneClean = leadPhone.replace(/\D/g, '');
    if (phoneClean.length < 10) return;

    setSubmitting(true);

    // Submit to Netlify Forms → triggers serverless function → sends Chad SMS
    await submitLeadToNetlify(leadName.trim(), leadPhone.trim());

    setShowLeadCapture(false);
    setLeadCaptured(true);
    setSubmitting(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'bot',
        content: `Got it, ${leadName}! Chad will text you at ${leadPhone} shortly. In the meantime, feel free to keep asking me anything.`,
        suggestions: ["What's the process?", 'What tech do you use?', 'Tell me about retainers'],
      },
    ]);

    setLeadName('');
    setLeadPhone('');
  }, [leadName, leadPhone]);

  const dismissPromo = () => {
    setShowPromo(false);
    setPromoDismissed(true);
  };

  const openFromPromo = () => {
    setShowPromo(false);
    setPromoDismissed(true);
    setIsOpen(true);
  };

  const lastBotMessageIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'bot') return i;
    }
    return -1;
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[50]" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', paddingRight: 'env(safe-area-inset-right, 0px)' }}>
      {/* ── Promo pop-out ── */}
      {showPromo && !isOpen && (
        <div className="absolute bottom-16 right-0 w-[min(calc(100vw-2rem),18rem)] bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] p-5 animate-fade-in-up">
          {/* Close */}
          <button
            onClick={dismissPromo}
            className="absolute top-3 right-3 text-zinc-600 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Content */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
              <Image
                src="/james-headshot.jpg"
                alt="James"
                width={160}
                height={160}
                quality={100}
                sizes="120px"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
              <span className="text-xs text-white font-light tracking-tight block">James</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-emerald-400/80 tracking-widest uppercase font-light">
                  Online Now
                </span>
              </div>
            </div>
          </div>

          <p className="text-white text-sm font-light tracking-tight leading-relaxed mb-1">
            Have a project in mind?
          </p>
          <p className="text-zinc-500 text-xs font-light leading-relaxed mb-4">
            Get a custom quote in under 60 seconds. 25+ five-star reviews.
          </p>

          <div className="flex gap-2">
            <a
              href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I saw your site and I'm interested.")}`}
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 rounded-lg py-2.5 text-[10px] text-white uppercase tracking-widest font-light hover:bg-white/5 transition-colors"
            >
              <MessageCircle className="w-3 h-3 opacity-60" />
              <span>Text Me</span>
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
        <div className="absolute bottom-16 right-0 w-[min(calc(100vw-2rem),20rem)] h-[460px] max-h-[80vh] bg-[#0a0a0a] border border-white/[0.06] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header — James branded */}
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image
                  src="/james-headshot.jpg"
                  alt="James"
                  width={108}
                  height={108}
                  quality={100}
                  sizes="36px"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <span className="text-xs text-white font-light tracking-tight block">
                  James
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] text-zinc-500 tracking-widest uppercase font-light">
                    Online 24/7
                  </span>
                </div>
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
            {messages.map((msg, idx) => (
              <div key={msg.id}>
                <div
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  } gap-2`}
                >
                  {/* James avatar on bot messages */}
                  {msg.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0 mt-1">
                      <Image
                        src="/james-headshot.jpg"
                        alt="James"
                        width={72}
                        height={72}
                        quality={100}
                        sizes="24px"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 text-[13px] leading-relaxed font-light ${
                      msg.role === 'user'
                        ? 'bg-white/[0.08] text-white rounded-xl rounded-br-sm'
                        : 'text-zinc-400 bg-white/[0.03] rounded-xl rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>

                {/* Suggestion chips — only on the latest bot message */}
                {msg.role === 'bot' &&
                  msg.suggestions &&
                  idx === lastBotMessageIndex &&
                  !isTyping &&
                  !showLeadCapture && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 ml-8">
                      {msg.suggestions.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => handleChipClick(chip)}
                          className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-200"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Lead capture — two options */}
            {showLeadCapture && !isTyping && (
              <div className="space-y-3 ml-8">
                {/* Option 1: Text Chad directly */}
                <a
                  href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I was chatting with James on your site and I'm interested in working together.")}`}
                  className="flex items-center justify-center gap-2 w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl py-3 text-[11px] font-medium tracking-wide uppercase hover:bg-emerald-500/30 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Text Chad Directly
                </a>

                {/* Option 2: Drop your number */}
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 space-y-3">
                  <span className="text-[10px] text-zinc-500 tracking-widest uppercase font-light">
                    Or leave your number
                  </span>
                  <input
                    type="text"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Your name"
                    maxLength={80}
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2.5 text-[13px] text-white font-light placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.15] transition-colors"
                  />
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="Phone number"
                    maxLength={20}
                    className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2.5 text-[13px] text-white font-light placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.15] transition-colors"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleLeadSubmit}
                      disabled={!leadName.trim() || !leadPhone.trim() || submitting}
                      className="flex-1 bg-white/[0.06] border border-white/[0.08] text-white rounded-lg py-2.5 text-[11px] font-medium tracking-wide uppercase hover:bg-white/[0.1] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Submit'}
                    </button>
                    <button
                      onClick={() => {
                        setShowLeadCapture(false);
                        setLeadCaptured(true);
                      }}
                      className="px-4 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src="/james-headshot.jpg"
                    alt="James"
                    width={72}
                    height={72}
                    quality={100}
                    sizes="24px"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="bg-white/[0.03] rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                  <span className="text-[10px] text-zinc-600 tracking-wider uppercase font-light mr-1.5">
                    James is typing
                  </span>
                  <span
                    className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                    style={{ animation: 'typingFloat 1.4s ease-in-out infinite 0ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                    style={{ animation: 'typingFloat 1.4s ease-in-out infinite 200ms' }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-zinc-500 rounded-full"
                    style={{ animation: 'typingFloat 1.4s ease-in-out infinite 400ms' }}
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
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                placeholder="Ask James anything..."
                maxLength={MAX_INPUT_LENGTH}
                autoComplete="off"
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
