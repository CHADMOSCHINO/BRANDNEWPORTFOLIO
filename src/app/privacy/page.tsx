import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Grellax Labs',
  description: 'Privacy policy for Grellax Labs — how we handle your data.',
};

const LAST_UPDATED = 'February 21, 2026';

export default function PrivacyPage() {
  return (
    <div className="bg-[#020202] text-white font-sans antialiased">
      <Navbar />
      <main className="min-h-screen pt-32 sm:pt-40 pb-20 px-5 sm:px-8">
        <article className="max-w-3xl mx-auto">
          <p className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light mb-4">
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
            Privacy Policy
          </h1>

          <div className="space-y-10 text-zinc-400 text-sm font-light leading-relaxed">
            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Information We Collect</h2>
              <p>
                When you submit the contact form on our website, we collect your name, email address,
                project type, budget range, and message content. This information is submitted through
                Netlify Forms and stored securely on Netlify&apos;s servers.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">How We Use Your Information</h2>
              <p>
                We use the information you provide solely to respond to your inquiry, discuss potential
                projects, and provide our web design and development services. We do not sell, rent, or
                share your personal information with third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Data Storage & Security</h2>
              <p>
                Your form submissions are processed and stored by Netlify, Inc. in accordance with
                their privacy practices. We take reasonable measures to protect your personal
                information from unauthorized access, use, or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Analytics</h2>
              <p>
                We may use basic analytics to understand how visitors interact with our website.
                This data is anonymized and used solely to improve our site experience. We do not
                track individual users across websites.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Your Rights</h2>
              <p>
                You may request access to, correction of, or deletion of your personal data at any
                time by contacting us at{' '}
                <a href="mailto:chadmoschino@grellaxlabs.com" className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors">
                  chadmoschino@grellaxlabs.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Contact</h2>
              <p>
                If you have questions about this privacy policy, reach out to us at{' '}
                <a href="mailto:chadmoschino@grellaxlabs.com" className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors">
                  chadmoschino@grellaxlabs.com
                </a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
