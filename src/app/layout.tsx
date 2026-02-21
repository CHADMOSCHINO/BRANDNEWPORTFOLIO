import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://chadgreen.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Chad Green | Web Design Agency Raleigh NC — Ultra Fast Turnovers",
  description:
    "Professional graphic designer turned full-stack developer in Raleigh NC — UX-driven websites, headless Shopify stores, and custom web apps delivered in 5–7 days. 5+ years of design & engineering experience. 50+ brands scaled nationwide.",
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
    siteName: "Chad Green — Grellax Labs",
    title: "Chad Green | Web Design Agency Raleigh NC — Ultra Fast Turnovers",
    description:
      "Grellax Labs — The #1 Web Services Agency. Premium websites, headless Shopify, and UX-driven web apps. 50+ brands scaled nationwide.",
    images: [
      {
        url: `${siteUrl}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "Grellax Labs — The #1 Web Services Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chad Green | Web Design Agency Raleigh NC",
    description:
      "Grellax Labs — The #1 Web Services Agency. 50+ brands scaled. Book a free call.",
    images: [`${siteUrl}/og-preview.png`],
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
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
          name: "Grellax Labs",
        },
      },
      {
        "@type": "LocalBusiness",
        name: "Grellax Labs",
        description:
          "Premium web design agency delivering custom websites, headless Shopify stores, and full-stack applications in 5–7 days.",
        url: siteUrl,
        telephone: "",
        email: "chadmoschino@grellaxlabs.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Raleigh",
          addressRegion: "NC",
          addressCountry: "US",
        },
        priceRange: "$300 – $4,000+",
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
        {children}
      </body>
    </html>
  );
}
