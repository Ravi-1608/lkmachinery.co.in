import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/seo";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// ─── Site-wide default metadata ───────────────────────────────────────────────
// Per-page metadata (milestones M2+) should export their own `metadata` object
// or call `generateMetadata()` from lib/seo.ts — Next.js merges with this template.
export const metadata: Metadata = {
  // Must match the domain hardcoded in lib/seo.ts, app/sitemap.ts, and
  // app/robots.ts (all use www) -- otherwise relative canonical/OG URLs here
  // resolve to a different host than the sitemap/schema URLs, splitting SEO
  // signals between www and non-www. Phase 3 deployment still needs a DNS/
  // Vercel redirect from the non-www host to this one.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lkmachinery.co.in"
  ),
  title: {
    // Per-page: "Products | LK Machinery"  — root fallback: "LK Machinery"
    template: "%s | LK Machinery",
    default: "LK Machinery — Industrial Equipment & Solutions",
  },
  description:
    "LK Machinery India Pvt. Ltd. — precision die casting, injection molding, CNC machining, and automation equipment, with sales and service support across India.",
  openGraph: {
    siteName: "LK Machinery",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  // Robots: allow indexing by default; per-page overrides where needed
  robots: {
    index: true,
    follow: true,
  },
  // Search-engine ownership verification -- set these Vercel project env vars
  // once you have the real codes from Google Search Console / Bing Webmaster
  // Tools (see deployment checklist). Both are safely omitted when unset.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={inter.variable}
    >
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema()),
          }}
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
