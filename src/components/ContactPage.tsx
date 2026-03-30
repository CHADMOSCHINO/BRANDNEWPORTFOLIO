'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { PERSONAL, PROJECT_TYPES, BUDGET_RANGES } from '@/lib/constants';
import type { ContactFormData } from '@/types';
import { Mail, Calendar, MapPin, Instagram, CheckCircle2, AlertCircle, ArrowUpRight, Send } from 'lucide-react';

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const submitTimestampRef = useRef(0);

  /* ── Entrance animation ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
  });

  const inputClasses =
    'w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 font-light focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300';

  const selectClasses =
    'w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white font-light focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300 appearance-none cursor-pointer';

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#020202] pt-32 sm:pt-40 pb-20 px-5 sm:px-8"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] rounded-full opacity-[0.04] mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(80,80,120,0.4) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-20" style={stagger(0)}>
          <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light">
            Get in Touch
          </span>
          <h1
            className="mt-4 font-light tracking-tighter text-white leading-[0.9]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Let&apos;s build
            <br />
            <span className="text-zinc-400">something great.</span>
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* ── Form (left — 3 cols) ── */}
          <div className="lg:col-span-3" style={stagger(1)}>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12 sm:p-16 min-h-[400px]">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-6" />
                <h3 className="text-2xl font-light text-white tracking-tight mb-2">
                  Message Sent
                </h3>
                <p className="text-sm text-zinc-500 font-light mb-8 max-w-sm">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={reset}
                  className="text-[11px] text-zinc-400 tracking-[0.15em] uppercase font-light border border-white/10 rounded-full px-6 py-2.5 hover:bg-white/5 hover:border-white/20 transition-all duration-300"
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
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
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

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                    Name <span className="text-zinc-700">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                    Email <span className="text-zinc-700">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@company.com"
                    className={inputClasses}
                  />
                </div>

                {/* Project Type + Budget row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="projectType" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        value={form.projectType}
                        onChange={(e) => update('projectType', e.target.value)}
                        className={`${selectClasses} ${!form.projectType ? 'text-zinc-600' : ''}`}
                      >
                        <option value="" disabled>Select type</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-[#111] text-white">{t}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                      Budget Range
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={(e) => update('budget', e.target.value)}
                        className={`${selectClasses} ${!form.budget ? 'text-zinc-600' : ''}`}
                      >
                        <option value="" disabled>Select budget</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="bg-[#111] text-white">{b}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                    Message <span className="text-zinc-700">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={5000}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Tell me about your project..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-sm text-red-400 font-light">{errorMsg}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group w-full flex items-center justify-center gap-3 bg-white text-black rounded-xl px-6 py-4 text-sm font-medium tracking-wide hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Info Panel (right — 2 cols) ── */}
          <div className="lg:col-span-2 space-y-4" style={stagger(2)}>
            {/* Email card */}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="group flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-1">Email</p>
                <p className="text-sm text-white font-light truncate">{PERSONAL.email}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white shrink-0 mt-1 transition-colors duration-300" />
            </a>

            {/* Calendly card */}
            <a
              href={PERSONAL.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-1">Book a Call</p>
                <p className="text-sm text-white font-light">Free 30-min consultation</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white shrink-0 mt-1 transition-colors duration-300" />
            </a>

            {/* Location card */}
            <div className="flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-zinc-400" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-1">Location</p>
                <p className="text-sm text-white font-light">
                  {PERSONAL.location.city}, {PERSONAL.location.state}
                </p>
              </div>
            </div>

            {/* Availability indicator */}
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <span className="text-sm text-white font-light">Currently accepting new clients</span>
            </div>

            {/* Instagram card */}
            <a
              href={PERSONAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0">
                <Instagram className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-1">Instagram</p>
                <p className="text-sm text-white font-light">@oneflyassnerd</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-white shrink-0 mt-1 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
