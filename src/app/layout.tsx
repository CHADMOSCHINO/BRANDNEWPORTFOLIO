import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: true,
});

const siteUrl = "https://grellax.agency";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Grellax | Premium Web Design & Shopify Development | 5 to 7 Day Delivery",
  description:
    "Hand-coded websites, headless Shopify stores, and custom web apps built by a real developer. Not templates. Not AI slop. 50+ shipped projects, 5+ years of experience, and 5 to 7 day turnarounds. Based in Raleigh, NC. Serving clients nationwide.",
  keywords: [
    "web design agency Raleigh NC",
    "best web agency East Coast",
    "web developer Raleigh",
    "Shopify developer North Carolina",
    "app development agency",
    "headless Shopify developer",
    "React developer for hire",
    "fast website turnaround",
    "custom web design USA",
    "freelance web developer Raleigh NC",
    "e-commerce website builder",
    "small business web design",
    "UX designer developer",
    "graphic designer web developer",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Grellax",
    title: "Grellax | Premium Web Design & Shopify Development | 5 to 7 Day Delivery",
    description:
      "Custom websites and Shopify stores hand-coded from scratch. No page builders. No shortcuts. 5+ years, 50+ shipped projects, 5 to 7 day turnarounds. Text us to get started.",
    images: [
      {
        url: `${siteUrl}/og-preview.png`,
        width: 1920,
        height: 1071,
        alt: "Grellax | Premium Web Design Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grellax | Premium Web Design & Shopify Development",
    description:
      "Hand-coded websites and Shopify stores. No templates. 5+ years, 25+ five-star reviews. 5 to 7 day delivery. Text (919) 526-0824 to start.",
    images: [`${siteUrl}/og-preview.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Chad Green",
        jobTitle: "Designer & Full-Stack Developer",
        url: siteUrl,
        sameAs: [
          "https://instagram.com/oneflyassnerd",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Grellax",
        },
      },
      {
        "@type": "LocalBusiness",
        name: "Grellax",
        description:
          "Hand-coded websites, headless Shopify stores, and custom web apps delivered in 5 to 7 days. Built by a real developer with 5+ years of experience and 25+ five-star reviews. Based in Raleigh, NC.",
        url: siteUrl,
        telephone: "+1-919-526-0824",
        email: "chadmoschino@grellaxlabs.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Raleigh",
          addressRegion: "NC",
          addressCountry: "US",
        },
        priceRange: "$500 to $10,000+",
        areaServed: [
          { "@type": "State", name: "North Carolina" },
          { "@type": "Country", name: "United States" },
        ],
        founder: {
          "@type": "Person",
          name: "Chad Green",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Hidden Netlify form for chatbot lead capture */}
        <form name="chatbot-leads" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="tel" name="phone" />
          <input type="text" name="source" />
        </form>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
