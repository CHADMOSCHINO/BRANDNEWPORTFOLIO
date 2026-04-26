'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Image from 'next/image';
import { PERSONAL, PROJECT_TYPES, BUDGET_RANGES } from '@/lib/constants';
import type { ContactFormData } from '@/types';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Send,
  CalendarCheck,
  Clock,
} from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import Reveal from '@/components/ui/Reveal';
import TextScramble from '@/components/ui/TextScramble';
import Magnetic from '@/components/ui/Magnetic';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const submitTimestampRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const update = (field: keyof ContactFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    const now = Date.now();
    if (now - submitTimestampRef.current < 3000) {
      setStatus('error');
      setErrorMsg('Please wait a moment before submitting again.');
      return;
    }
    submitTimestampRef.current = now;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (form.name.length > 100 || form.email.length > 200 || form.message.length > 5000) {
      setStatus('error');
      setErrorMsg('One or more fields exceed the maximum length.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        ...form,
      });

      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email directly.');
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
    setStatus('idle');
    setErrorMsg('');
  };

  const stagger = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.09}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.09}s`,
  });

  const inputClasses =
    'peer w-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-xl px-4 pt-5 pb-2 text-sm text-white placeholder-transparent font-light focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.04] focus:ring-2 focus:ring-emerald-500/10 transition-all duration-500';

  const selectClasses =
    'peer w-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-xl px-4 pt-5 pb-2 text-sm text-white font-light focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.04] focus:ring-2 focus:ring-emerald-500/10 transition-all duration-500 appearance-none cursor-pointer';

  const floatLabel =
    'absolute left-4 top-2 text-[9px] text-zinc-500 tracking-[0.2em] uppercase font-light pointer-events-none transition-all duration-300';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#020202] pt-32 sm:pt-40 pb-20 px-5 sm:px-8 overflow-hidden"
    >
      {/* Ambient gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full opacity-[0.06] mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute top-[40%] right-[5%] w-[45vw] h-[45vw] rounded-full opacity-[0.05] mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-20" style={stagger(0)}>
          <TextScramble
            as="span"
            className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light block"
          >
            Get in Touch
          </TextScramble>
          <Reveal delay={120}>
            <h1
              className="mt-4 font-light tracking-tighter text-white leading-[0.9]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              Let&apos;s build
              <br />
              <span className="bg-gradient-to-r from-zinc-400 via-zinc-500 to-zinc-700 bg-clip-text text-transparent italic">
                something great.
              </span>
            </h1>
          </Reveal>

          {/* Credibility strip */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Accepting new clients
            </span>
            <span className="text-zinc-700">/</span>
            <span>24h Response</span>
            <span className="text-zinc-700">/</span>
            <span>{PERSONAL.projectCount} Projects</span>
            <span className="text-zinc-700">/</span>
            <span>{PERSONAL.trackRecord}</span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Form (left — 3 cols) ── */}
          <div className="lg:col-span-3" style={stagger(1)}>
            <div className="relative">
              {/* Gradient border wrapper */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none" />
              <div className="relative bg-[#050505]/80 backdrop-blur-2xl border border-white/[0.06] rounded-3xl p-6 sm:p-8 md:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
                      <CheckCircle2 className="relative w-14 h-14 text-emerald-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight mb-3">
                      Message Sent
                    </h3>
                    <p className="text-sm text-zinc-500 font-light mb-8 max-w-sm leading-relaxed">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={reset}
                      className="text-[11px] text-zinc-400 tracking-[0.15em] uppercase font-light border border-white/10 rounded-full px-6 py-2.5 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-500"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form
                    name="contact"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: '-9999px',
                        top: '-9999px',
                        opacity: 0,
                        height: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-1 pb-4 border-b border-white/[0.04]">
                      <span className="text-[10px] text-emerald-500/70 tracking-[0.3em] uppercase font-light">
                        01
                      </span>
                      <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light">
                        Tell me about you
                      </span>
                    </div>

                    {/* Name */}
                    <div className="relative group">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name"
                        className={inputClasses}
                      />
                      <label
                        htmlFor="name"
                        className={`${floatLabel} ${
                          focusedField === 'name' ? 'text-emerald-400/80' : ''
                        }`}
                      >
                        Name <span className="text-zinc-700">*</span>
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@company.com"
                        className={inputClasses}
                      />
                      <label
                        htmlFor="email"
                        className={`${floatLabel} ${
                          focusedField === 'email' ? 'text-emerald-400/80' : ''
                        }`}
                      >
                        Email <span className="text-zinc-700">*</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 mt-8 mb-1 pb-4 border-b border-white/[0.04]">
                      <span className="text-[10px] text-emerald-500/70 tracking-[0.3em] uppercase font-light">
                        02
                      </span>
                      <span className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light">
                        The project
                      </span>
                    </div>

                    {/* Project Type + Budget row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative group">
                        <select
                          id="projectType"
                          name="projectType"
                          value={form.projectType}
                          onChange={(e) => update('projectType', e.target.value)}
                          onFocus={() => setFocusedField('projectType')}
                          onBlur={() => setFocusedField(null)}
                          className={`${selectClasses} ${
                            !form.projectType ? 'text-zinc-600' : ''
                          }`}
                        >
                          <option value="" disabled>
                            Select type
                          </option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-[#111] text-white">
                              {t}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="projectType"
                          className={`${floatLabel} ${
                            focusedField === 'projectType' ? 'text-emerald-400/80' : ''
                          }`}
                        >
                          Project Type
                        </label>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-3.5 h-3.5 text-zinc-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="relative group">
                        <select
                          id="budget"
                          name="budget"
                          value={form.budget}
                          onChange={(e) => update('budget', e.target.value)}
                          onFocus={() => setFocusedField('budget')}
                          onBlur={() => setFocusedField(null)}
                          className={`${selectClasses} ${
                            !form.budget ? 'text-zinc-600' : ''
                          }`}
                        >
                          <option value="" disabled>
                            Select budget
                          </option>
                          {BUDGET_RANGES.map((b) => (
                            <option key={b} value={b} className="bg-[#111] text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="budget"
                          className={`${floatLabel} ${
                            focusedField === 'budget' ? 'text-emerald-400/80' : ''
                          }`}
                        >
                          Budget Range
                        </label>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-3.5 h-3.5 text-zinc-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        maxLength={5000}
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your project..."
                        className={`${inputClasses} resize-none pt-7`}
                      />
                      <label
                        htmlFor="message"
                        className={`${floatLabel} ${
                          focusedField === 'message' ? 'text-emerald-400/80' : ''
                        }`}
                      >
                        Message <span className="text-zinc-700">*</span>
                      </label>
                      <span className="absolute right-3 bottom-3 text-[10px] text-zinc-700 font-light tabular-nums">
                        {form.message.length}/5000
                      </span>
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                      <div className="flex items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 backdrop-blur-sm">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <p className="text-sm text-red-400 font-light">{errorMsg}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Magnetic strength={6} radius={140} className="flex-1 w-full">
                      <HoverBorderGradient
                        as="button"
                        type="submit"
                        disabled={status === 'submitting'}
                        containerClassName="rounded-xl flex-1 w-full"
                        className="w-full rounded-xl px-6 py-3.5"
                        duration={1}
                      >
                        <span className="flex items-center justify-center gap-3 text-sm font-medium tracking-wide text-white">
                          {status === 'submitting' ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </span>
                      </HoverBorderGradient>
                      </Magnetic>
                      <p className="text-[10px] text-zinc-600 tracking-[0.15em] uppercase font-light text-center sm:text-left sm:max-w-[140px] leading-relaxed">
                        Or email direct &middot; 24h reply
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* ── Sidebar Bento (right — 2 cols) ── */}
          <div className="lg:col-span-2 space-y-3" style={stagger(2)}>
            {/* Featured: Direct Line */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl p-5 sm:p-6 backdrop-blur-xl">
              <div
                className="absolute -top-20 -right-20 w-52 h-52 rounded-full opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <div className="relative flex items-start gap-4 mb-5">
                <Image
                  src="/chad-headshot.png"
                  alt={`${PERSONAL.name}, Founder of Grellax`}
                  width={96}
                  height={96}
                  className="w-12 h-12 rounded-xl object-cover border border-white/[0.1] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-[13px] font-medium tracking-tight">
                      {PERSONAL.name}
                    </span>
                    <span className="text-zinc-600 text-[11px] font-light">&middot;</span>
                    <span className="text-zinc-500 text-[11px] font-light">Founder</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="text-[10px] text-emerald-400/90 font-light tracking-wider uppercase">
                      Online now
                    </span>
                  </div>
                </div>
              </div>
              <p className="relative text-zinc-400 text-[12px] sm:text-[13px] leading-relaxed font-light italic">
                &ldquo;You&apos;ll talk to me directly. No account managers, no gatekeepers.&rdquo;
              </p>
            </div>

            {/* Email + Text row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-500">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <p className="text-[9px] text-zinc-500 tracking-[0.25em] uppercase font-light mb-1">
                  Email
                </p>
                <p className="text-[12px] text-white font-light truncate">{PERSONAL.email}</p>
                <ArrowUpRight className="absolute top-4 right-4 w-3.5 h-3.5 text-zinc-700 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
              </a>

              <a
                href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I'm reaching out from your site.")}`}
                className="group relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-500">
                  <Phone className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <p className="text-[9px] text-zinc-500 tracking-[0.25em] uppercase font-light mb-1">
                  Text
                </p>
                <p className="text-[12px] text-white font-light">(919) 526-0824</p>
                <ArrowUpRight className="absolute top-4 right-4 w-3.5 h-3.5 text-zinc-700 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
              </a>
            </div>

            {/* Book a call — featured CTA */}
            <a
              href={PERSONAL.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden flex items-center gap-4 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-white/[0.01] backdrop-blur-xl border border-emerald-500/[0.15] rounded-2xl p-5 hover:border-emerald-500/[0.3] hover:from-emerald-500/[0.12] transition-all duration-500"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 100%, rgba(16,185,129,0.12) 0%, transparent 60%)',
                }}
              />
              <div className="relative w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[9px] text-emerald-400/80 tracking-[0.25em] uppercase font-light">
                    Book a Call
                  </p>
                  <span className="text-[9px] text-zinc-600 tracking-[0.2em] uppercase">&middot; 15 min</span>
                </div>
                <p className="text-sm text-white font-light">Free consultation</p>
              </div>
              <ArrowUpRight className="relative w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0 transition-all duration-500" strokeWidth={1.5} />
            </a>

            {/* Location + Response time row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
                </div>
                <p className="text-[9px] text-zinc-500 tracking-[0.25em] uppercase font-light mb-1">
                  Based
                </p>
                <p className="text-[12px] text-white font-light">
                  {PERSONAL.location.city}, {PERSONAL.location.state}
                </p>
                <p className="text-[10px] text-zinc-600 font-light mt-0.5">EST &middot; Remote</p>
              </div>

              <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" strokeWidth={1.5} />
                </div>
                <p className="text-[9px] text-zinc-500 tracking-[0.25em] uppercase font-light mb-1">
                  Reply
                </p>
                <p className="text-[12px] text-white font-light">Within 24h</p>
                <p className="text-[10px] text-zinc-600 font-light mt-0.5">Usually much faster</p>
              </div>
            </div>

            {/* Instagram — slim */}
            <a
              href={PERSONAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl px-5 py-3.5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
            >
              <Instagram className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              <span className="text-[11px] text-zinc-400 group-hover:text-white font-light tracking-wide transition-colors duration-500">
                @oneflyassnerd
              </span>
              <ArrowUpRight className="ml-auto w-3.5 h-3.5 text-zinc-700 group-hover:text-white transition-all duration-500" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
