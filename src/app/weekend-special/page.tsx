'use client';

import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react';
import Link from 'next/link';
import { PERSONAL } from '@/lib/constants';
import {
  Check,
  ArrowRight,
  Upload,
  Phone,
  Mail,
  Clock,
  Shield,
  FileText,
  Globe,
  X,
  AlertCircle,
  Instagram,
} from 'lucide-react';

const STRIPE_PAYMENT_LINK = 'PASTE_YOUR_STRIPE_LINK_HERE';

const SITE_TYPES = [
  { value: 'landing', label: 'Landing Page (1 page)' },
  { value: '2-page', label: '2-Page Site' },
  { value: '3-page', label: '3-Page Site' },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface SpecialFormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  siteType: string;
  preferredDomain: string;
  siteRequirements: string;
  additionalNotes: string;
}

export default function WeekendSpecialPage() {
  const [form, setForm] = useState<SpecialFormData>({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    siteType: '',
    preferredDomain: '',
    siteRequirements: '',
    additionalNotes: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.02 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const update = (field: keyof SpecialFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files);
    const totalSize = [...files, ...incoming].reduce((sum, f) => sum + f.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      setErrorMsg('Total file size cannot exceed 10 MB.');
      return;
    }
    if (files.length + incoming.length > 8) {
      setErrorMsg('You can upload a maximum of 8 files.');
      return;
    }
    setFiles((prev) => [...prev, ...incoming]);
    setErrorMsg('');
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    if (!form.businessName || !form.contactName || !form.email || !form.phone || !form.siteType || !form.siteRequirements) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const phoneClean = form.phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setStatus('error');
      setErrorMsg('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const body = new FormData();
      body.append('form-name', 'weekend-special');
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      files.forEach((f) => body.append('files', f));

      const res = await fetch('/__forms.html', {
        method: 'POST',
        body,
      });

      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');

      if (STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== 'PASTE_YOUR_STRIPE_LINK_HERE') {
        setTimeout(() => {
          window.open(STRIPE_PAYMENT_LINK, '_blank', 'noopener,noreferrer');
        }, 1500);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
    }
  };

  const stagger = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s`,
  });

  const inputBase =
    'w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 font-light focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300';

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans antialiased">
      {/* ── Back nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020202]/80 backdrop-blur-lg border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light hover:text-white transition-colors">
            &larr; Back to Grellax
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-400/80 tracking-widest uppercase font-light">
              Spots Open
            </span>
          </div>
        </div>
      </nav>

      <div ref={sectionRef} className="relative pt-28 sm:pt-36 pb-20 px-5 sm:px-8">
        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90vw] h-[60vw] rounded-full opacity-[0.04]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.3) 0%, rgba(80,80,120,0.2) 40%, transparent 70%)',
              filter: 'blur(120px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* ═══════════════════════════════════════════
              HERO — The Offer
          ═══════════════════════════════════════════ */}
          <div className="text-center mb-16 sm:mb-20" style={stagger(0)}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-zinc-600" />
              <span className="text-[11px] text-zinc-400 tracking-[0.25em] uppercase font-medium">
                Weekend Special
              </span>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-zinc-600" />
            </div>

            <h1
              className="font-bold tracking-tighter text-white leading-[1.05] mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
            >
              A real website. Built by a real developer.
              <br />
              <span
                className="inline-block mt-1"
                style={{
                  background: 'linear-gradient(180deg, #a7f3d0 0%, #34d399 40%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(0 0 20px rgba(52,211,153,0.25))',
                }}
              >
                $200 flat.
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              This isn&apos;t a template. It&apos;s not a drag-and-drop page builder. It&apos;s not
              vibe-coded AI slop. You&apos;re getting a hand-coded, SEO-optimized, mobile-first
              website from a developer with 5+ years of experience and 25+ five-star Google reviews.
              Fill out the form below, pay, and we get to work.
            </p>
          </div>

          {/* ═══════════════════════════════════════════
              THE FORM — placed first for ad traffic
          ═══════════════════════════════════════════ */}
          <div style={stagger(1)}>
            <div className="text-center mb-10">
              <h2
                className="font-semibold tracking-tight text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}
              >
                Ready? Let&apos;s build your site.
              </h2>
              <p className="text-sm text-zinc-500 font-light max-w-md mx-auto">
                Fill out every field below so we have everything we need to start building
                the moment your payment clears. No back-and-forth. No wasted time.
              </p>
            </div>

            {status === 'success' ? (
              <div className="max-w-lg mx-auto text-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 sm:p-14">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Check className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">
                  Submission Received
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-4 max-w-sm mx-auto">
                  We&apos;ve got your project details. Please allow up to
                  <span className="text-white font-medium"> 24 hours </span>
                  for us to review everything and reach out to you directly.
                </p>
                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8 max-w-sm mx-auto">
                  If your payment link didn&apos;t open automatically, click the button below
                  to complete your payment and lock in your spot.
                </p>

                {STRIPE_PAYMENT_LINK && STRIPE_PAYMENT_LINK !== 'PASTE_YOUR_STRIPE_LINK_HERE' ? (
                  <a
                    href={STRIPE_PAYMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black rounded-xl px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-zinc-200 transition-all duration-300 mb-6"
                  >
                    Complete Payment
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <p className="text-xs text-amber-400/80 font-light mb-6">
                    Payment link coming soon. We&apos;ll send it to your email.
                  </p>
                )}

                <div className="h-[1px] w-full bg-white/[0.06] mb-6" />

                <p className="text-[11px] text-zinc-600 font-light">
                  Questions? Email{' '}
                  <a href={`mailto:${PERSONAL.email}`} className="text-zinc-400 underline underline-offset-2 hover:text-white transition-colors">
                    {PERSONAL.email}
                  </a>
                  {' '}or DM us on{' '}
                  <a href={PERSONAL.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 underline underline-offset-2 hover:text-white transition-colors">
                    Instagram
                  </a>
                </p>
              </div>
            ) : (
              <form
                name="weekend-special"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto space-y-6"
              >
                <input type="hidden" name="form-name" value="weekend-special" />
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                {/* ── Row 1: Business + Contact Name ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="businessName" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                      Business Name <span className="text-zinc-700">*</span>
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      maxLength={120}
                      value={form.businessName}
                      onChange={(e) => update('businessName', e.target.value)}
                      placeholder="Your business name"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="contactName" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                      Your Name <span className="text-zinc-700">*</span>
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      maxLength={100}
                      value={form.contactName}
                      onChange={(e) => update('contactName', e.target.value)}
                      placeholder="Full name"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* ── Row 2: Email + Phone ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      placeholder="you@business.com"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                      Phone Number <span className="text-zinc-700">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      maxLength={20}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* ── Row 3: Site Type + Preferred Domain ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="siteType" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                      Site Type <span className="text-zinc-700">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="siteType"
                        name="siteType"
                        required
                        value={form.siteType}
                        onChange={(e) => update('siteType', e.target.value)}
                        className={`${inputBase} appearance-none cursor-pointer ${!form.siteType ? 'text-zinc-600' : ''}`}
                      >
                        <option value="" disabled>Select site type</option>
                        {SITE_TYPES.map((t) => (
                          <option key={t.value} value={t.value} className="bg-[#111] text-white">{t.label}</option>
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
                    <label htmlFor="preferredDomain" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                      Preferred Domain Name
                    </label>
                    <input
                      id="preferredDomain"
                      name="preferredDomain"
                      type="text"
                      maxLength={100}
                      value={form.preferredDomain}
                      onChange={(e) => update('preferredDomain', e.target.value)}
                      placeholder="yourbusiness.com"
                      className={inputBase}
                    />
                    <p className="text-[10px] text-zinc-700 font-light mt-1.5">
                      We&apos;ll check availability and register it for you (up to $15).
                    </p>
                  </div>
                </div>

                {/* ── Site Requirements ── */}
                <div>
                  <label htmlFor="siteRequirements" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                    What Must the Site Have? <span className="text-zinc-700">*</span>
                  </label>
                  <textarea
                    id="siteRequirements"
                    name="siteRequirements"
                    required
                    rows={5}
                    maxLength={3000}
                    value={form.siteRequirements}
                    onChange={(e) => update('siteRequirements', e.target.value)}
                    placeholder="Tell us exactly what you need. Pages, sections, features, color preferences, reference sites you like, anything that helps us nail it the first time."
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {/* ── Additional Notes ── */}
                <div>
                  <label htmlFor="additionalNotes" className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={3}
                    maxLength={2000}
                    value={form.additionalNotes}
                    onChange={(e) => update('additionalNotes', e.target.value)}
                    placeholder="Anything else we should know. Deadlines, special requests, brand guidelines, etc."
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {/* ── File Upload ── */}
                <div>
                  <label className="block text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-light mb-2">
                    Photos, Logos & Reference Materials
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="group cursor-pointer w-full border border-dashed border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/[0.02]"
                  >
                    <Upload className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 mx-auto mb-2 transition-colors" />
                    <p className="text-xs text-zinc-500 font-light">
                      Click to upload: logos, photos, screenshots, brand assets
                    </p>
                    <p className="text-[10px] text-zinc-700 font-light mt-1">
                      Max 8 files, 10 MB total. JPG, PNG, PDF, SVG accepted.
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="files"
                    multiple
                    accept="image/*,.pdf,.svg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {files.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5"
                        >
                          <span className="text-[11px] text-zinc-400 font-light truncate max-w-[160px]">{f.name}</span>
                          <button type="button" onClick={() => removeFile(i)} className="text-zinc-600 hover:text-white transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Error ── */}
                {status === 'error' && errorMsg && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-sm text-red-400 font-light">{errorMsg}</p>
                  </div>
                )}

                {/* ── Submit ── */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group w-full flex items-center justify-center gap-3 bg-white text-black rounded-xl px-6 py-4 text-sm font-semibold tracking-wide hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit &amp; Proceed to Payment
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-600 font-light text-center">
                  By submitting, you agree to our process. After payment, allow up to 24 hours for us to reach out.
                </p>
              </form>
            )}
          </div>

          {/* ═══════════════════════════════════════════
              WHAT YOU GET + THE RULES
          ═══════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16 sm:mt-20">
            {/* What's included */}
            <div
              className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-7 sm:p-8"
              style={stagger(2)}
            >
              <h3 className="text-xs text-emerald-400 tracking-[0.2em] uppercase font-medium mb-6">
                What&apos;s Included
              </h3>
              <div className="space-y-4">
                {[
                  'Up to 3 hand-coded pages',
                  'SEO baked directly into the code',
                  'Mobile-first, fully responsive design',
                  'Google Business Profile setup guide',
                  'First year domain registration (up to $15)',
                  '2 revision rounds to get it right',
                  'Walkthrough video of your finished site',
                  '5 to 7 business day delivery',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                    </div>
                    <span className="text-[13px] text-zinc-300 font-light leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Rules */}
            <div
              className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-7 sm:p-8"
              style={stagger(3)}
            >
              <h3 className="text-xs text-amber-400 tracking-[0.2em] uppercase font-medium mb-6">
                The Rules
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">3 pages maximum. No exceptions.</p>
                    <p className="text-[12px] text-zinc-500 font-light leading-relaxed">
                      This offer covers a landing page, a 2-page site, or a 3-page site. Need more?
                      Book a regular project call instead.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">You provide the content.</p>
                    <p className="text-[12px] text-zinc-500 font-light leading-relaxed">
                      Send us your text, images, logos, and any brand assets. The clearer you are,
                      the faster we ship.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">Integrations are extra.</p>
                    <p className="text-[12px] text-zinc-500 font-light leading-relaxed">
                      Payment processing, booking systems, CRMs, or other third-party tools are
                      scoped and quoted separately.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium mb-1">24-hour response time after payment.</p>
                    <p className="text-[12px] text-zinc-500 font-light leading-relaxed">
                      Once you pay and submit this form, give us up to 24 hours to review
                      everything and reach out to you directly. We move fast.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              CONTACT INFO STRIP
          ═══════════════════════════════════════════ */}
          <div className="mt-16 sm:mt-20" style={stagger(4)}>
            <div className="h-[1px] w-full bg-white/[0.06] mb-10" />
            <div className="text-center mb-8">
              <h3 className="text-sm text-white font-medium tracking-tight mb-1">
                Need to reach us directly?
              </h3>
              <p className="text-xs text-zinc-500 font-light">
                Questions before you commit? We&apos;re here.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <a
                href={`sms:${PERSONAL.phone}?&body=${encodeURIComponent("Hey Chad! I'm interested in the $200 Weekend Special.")}`}
                className="group flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                <span className="text-sm text-emerald-300 font-light">(919) 526-0824</span>
              </a>
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-sm text-zinc-300 font-light">{PERSONAL.email}</span>
              </a>
              <a
                href={PERSONAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <Instagram className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-sm text-zinc-300 font-light">@oneflyassnerd</span>
              </a>
              <a
                href={PERSONAL.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-3 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                <span className="text-sm text-zinc-300 font-light">Book a Call</span>
              </a>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="mt-16 text-center">
            <p className="text-[10px] text-zinc-700 font-light uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Grellax. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
