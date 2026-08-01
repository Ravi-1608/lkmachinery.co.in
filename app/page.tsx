import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WelcomeSection from "@/components/home/WelcomeSection";
import CategoryBand, { type CategoryBandProps } from "@/components/home/CategoryBand";
import ApplicationsStrip from "@/components/home/ApplicationsStrip";
import QuickLinks from "@/components/home/QuickLinks";
import CtaBand from "@/components/home/CtaBand";
import ClientLogos from "@/components/home/ClientLogos";
import "./page.css";

import { getCategory, firstSentence } from "@/lib/products";

// ─── Page-specific metadata ───────────────────────────────────────────────────
// Descriptions here refer to "LK" / "LK Group" only for the parent's global
// heritage (1979, patents, countries served) -- never to LK Machinery India
// Pvt. Ltd. itself, which was incorporated in 2012 and serves India only.
// Keeps the entity distinction CLAUDE.md requires and keeps this India-only
// site's SEO copy from reading as a global-market page.
export const metadata: Metadata = {
  title: "Die Casting, Injection Molding & CNC Machines Manufacturer in India",
  description:
    "LK Machinery India Pvt. Ltd. — Pune-based manufacturer and supplier of die casting machines, injection molding machines, CNC machining centers, and industrial automation for customers across India.",
  openGraph: {
    title: "LK Machinery India — Industrial Equipment & Solutions",
    description:
      "Precision die casting, injection molding, CNC, and automation machinery — manufactured by LK and supplied across India by LK Machinery India Pvt. Ltd., Pune.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

// ─── Homepage ─────────────────────────────────────────────────────────────────
// Pure Server Component — no client-side interactivity on this page.
export default async function HomePage() {
  const dcm = getCategory("dcm")!;
  const imm = getCategory("imm")!;
  const cnc = getCategory("cnc")!;
  const auto = getCategory("automation")!;

  // Spotlight picks match Figma's exact curation, not first-in-array — verified
  // against Figma homepage export per-band spotlight card copy.
  const dcmSpotlight = dcm.models.find(m => m.slug === "classic-v") || dcm.models[0];
  const immSpotlight = imm.models.find(m => m.slug === "potenza-iii") || imm.models[0];
  const cncSpotlight = cnc.models.find(m => m.slug === "lt-series") || cnc.models[0];
  const autoSpotlight = auto.models.find(m => m.slug === "lr-100-dp") || auto.models[0];

  // ── Model-name tags — explicit slug selection to match Figma curation exactly
  // Helper: pick models by slug in the specified display order
  const pick = (models: typeof dcm.models, slugs: string[], cat: string) =>
    slugs.flatMap(slug => {
      const m = models.find(x => x.slug === slug);
      return m ? [{ label: m.name, href: `/products/${cat}/${m.slug}` }] : [];
    });

  // DCM (4): Classic V, D Series, IMPRESS III, AVISS II — Figma tag order
  const dcmTags = pick(dcm.models, ["classic-v", "d-series", "impress-iii", "aviss-ii"], "dcm");
  // IMM (3): Potenza III, FORZA, Potenza A  (Figma — not first-3 in array)
  const immTags = pick(imm.models, ["potenza-iii", "forza", "potenza-a"], "imm");
  // CNC (4): LT Series, LTR Series, TC Series, VM Series  (Figma — not first-4 in array)
  const cncTags = pick(cnc.models, ["lt-series", "ltr-series", "tc-series", "vm-series"], "cnc");
  // Automation (3): LT04N, LR 100 DP, LR 50 D
  const autoTags = pick(auto.models, ["lt04n", "lr-100-dp", "lr-50-d"], "automation");

  const CATEGORY_BANDS: CategoryBandProps[] = [
    {
      index: "01",
      subtitle: dcm.categoryLabel,
      title: dcm.categoryName,
      description: dcm.categoryDescription,
      tags: dcmTags,
      spotlightTitle: dcmSpotlight.name,
      spotlightDescription: firstSentence(dcmSpotlight.description),
      spotlightImage: dcmSpotlight.image,
      spotlightBadge: dcmSpotlight.tonnage ? `Up to ${dcmSpotlight.tonnage}T` : undefined,
      ctaHref: "/products/dcm",
      variant: "dark",
      zIndex: 1,
    },
    {
      index: "02",
      subtitle: imm.categoryLabel,
      title: imm.categoryName,
      description: imm.categoryDescription,
      tags: immTags,
      spotlightTitle: immSpotlight.name,
      spotlightDescription: firstSentence(immSpotlight.description),
      spotlightImage: immSpotlight.image,
      spotlightBadge: immSpotlight.tonnage ? `Up to ${immSpotlight.tonnage}T` : undefined,
      ctaHref: "/products/imm",
      variant: "light",
      zIndex: 2,
    },
    {
      index: "03",
      subtitle: cnc.categoryLabel,
      title: cnc.categoryName,
      description: cnc.categoryDescription,
      tags: cncTags,
      spotlightTitle: cncSpotlight.name,
      spotlightDescription: firstSentence(cncSpotlight.description),
      spotlightImage: cncSpotlight.image,
      spotlightBadge: undefined,
      ctaHref: "/products/cnc",
      variant: "dark",
      zIndex: 3,
    },
    {
      index: "04",
      subtitle: auto.categoryLabel,
      title: auto.categoryName,
      description: auto.categoryDescription,
      tags: autoTags,
      spotlightTitle: autoSpotlight.name,
      spotlightDescription: firstSentence(autoSpotlight.description),
      spotlightImage: autoSpotlight.image,
      spotlightBadge: undefined,
      ctaHref: "/products/automation",
      variant: "light",
      zIndex: 4,
    },
  ];

  return (
    <>
      <Hero />
      <WelcomeSection />

      {/* PRODUCTS header + sticky-stacked category bands */}
      <section className="home-products-heading" style={{ zIndex: 0, position: "relative" }}>
        <div className="container">
          <h2 className="home-products-heading__title">
            PROD<span className="home-products-heading__highlight">UCTS</span>
          </h2>
        </div>
      </section>

      {/* Sticky-stacking wrapper — each band is position:sticky with increasing z-index */}
      <div>
        {CATEGORY_BANDS.map((band) => (
          <CategoryBand key={band.index} {...band} />
        ))}
      </div>

      <ApplicationsStrip />
      <QuickLinks />
      <CtaBand />
      <ClientLogos />
    </>
  );
}
