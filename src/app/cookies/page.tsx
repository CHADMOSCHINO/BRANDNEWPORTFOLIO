import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy | Grellax Labs',
  description: 'Cookie policy for Grellax Labs — what cookies we use and why.',
};

const LAST_UPDATED = 'February 21, 2026';

export default function CookiesPage() {
  return (
    <div className="bg-[#020202] text-white font-sans antialiased">
      <Navbar />
      <main className="min-h-screen pt-32 sm:pt-40 pb-20 px-5 sm:px-8">
        <article className="max-w-3xl mx-auto">
          <p className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-light mb-4">
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
            Cookie Policy
          </h1>

          <div className="space-y-10 text-zinc-400 text-sm font-light leading-relaxed">
            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website.
                They help the site remember your preferences and understand how you interact
                with the content.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Cookies We Use</h2>
              <p className="mb-4">Our website uses minimal cookies:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                  <span><span className="text-white font-normal">Essential cookies</span> — Required for the website to function properly. These cannot be disabled.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                  <span><span className="text-white font-normal">Analytics cookies</span> — Help us understand page views and site performance. This data is anonymized.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Third-Party Cookies</h2>
              <p>
                We do not use third-party advertising cookies. If you interact with embedded
                content (such as Calendly for scheduling), those services may set their own
                cookies according to their respective policies.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Managing Cookies</h2>
              <p>
                You can control and delete cookies through your browser settings. Note that
                disabling essential cookies may affect site functionality. Most browsers allow
                you to refuse or accept cookies, delete existing cookies, and set preferences
                for certain websites.
              </p>
            </section>

            <section>
              <h2 className="text-white text-lg font-medium tracking-tight mb-3">Contact</h2>
              <p>
                Questions about our cookie practices? Email{' '}
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
