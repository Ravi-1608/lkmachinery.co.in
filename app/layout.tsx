import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getOrganizationSchema } from "@/lib/seo";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// ─── Site-wide default metadata ───────────────────────────────────────────────
// Per-page metadata (milestones M2+) should export their own `metadata` object
// or call `generateMetadata()` from lib/seo.ts — Next.js merges with this template.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://lkmachinery.co.in"
  ),
  title: {
    // Per-page: "Products | LK Machinery"  — root fallback: "LK Machinery"
    template: "%s | LK Machinery",
    default: "LK Machinery — Industrial Equipment & Solutions",
  },
  description:
    "LK Machinery India Pvt. Ltd. — precision industrial equipment and end-to-end engineering solutions trusted across industries.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased overflow-x-clip`}
    >
      <body className="min-h-screen flex flex-col font-body bg-brand-offwhite text-brand-dark">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
      </body>
    </html>
  );
}
