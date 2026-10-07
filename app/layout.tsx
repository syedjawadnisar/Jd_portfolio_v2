import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";
import { THEME_COLOR, THEME_INIT_SCRIPT } from "@/lib/theme";

import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-face",
});

/** Mono carries the technical register: eyebrows, stack chips, the monogram. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-face",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Senior Full-Stack Engineer",
    "Cloud Architect",
    "React",
    "TypeScript",
    "Next.js",
    "Ruby on Rails",
    "Node.js",
    "Python",
    "Go",
    "AWS",
    "Remote",
    "Lahore",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    // app/opengraph-image.tsx supplies the image for every route through the
    // file convention, so there is no images array to keep in sync here.
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  /**
   * One value, not a prefers-color-scheme pair. The theme is class +
   * localStorage driven and defaults to light regardless of the OS, so a
   * media-query'd theme-color would frame a white page in dark browser chrome
   * for every dark-mode phone. THEME_INIT_SCRIPT rewrites this before first
   * paint and ThemeToggle rewrites it on every toggle.
   */
  themeColor: THEME_COLOR.light,
};

/** Structured data. Only facts that appear on the page itself. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  description: site.description,
  url: siteUrl,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must stay blocking and must stay first: it decides the theme
            before the browser paints anything. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
