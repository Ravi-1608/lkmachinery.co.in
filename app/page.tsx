import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WelcomeSection from "@/components/home/WelcomeSection";
import CategoryBand, { type CategoryBandProps } from "@/components/home/CategoryBand";
import ApplicationsStrip from "@/components/home/ApplicationsStrip";
import QuickLinks from "@/components/home/QuickLinks";
import CtaBand from "@/components/home/CtaBand";
import ClientLogos from "@/components/home/ClientLogos";

import { getCategory, firstSentence } from "@/lib/products";

// ─── Page-specific metadata ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "LK Machinery — Industrial Equipment & Solutions",
  description:
    "LK Machinery India Pvt. Ltd. delivers die casting, injection moulding, CNC machining, and automation solutions trusted by industry leaders across 60+ countries since 1979.",
  openGraph: {
    title: "LK Machinery — Industrial Equipment & Solutions",
    description:
      "Precision industrial equipment — DCM, IMM, CNC, and Automation — engineered to perform.",
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

  const dcmSpotlight = dcm.models.find(m => m.slug === "impress-plus") || dcm.models[0];
  const immSpotlight = imm.models.find(m => m.slug === "potenza-a") || imm.models[0];
  const cncSpotlight = cnc.models.find(m => m.slug === "mcg5-series") || cnc.models[0];
  const autoSpotlight = auto.models.find(m => m.slug === "lr-100-dp") || auto.models[0];

  // ── Model-name tags — explicit slug selection to match Figma curation exactly
  // Helper: pick models by slug in the specified display order
  const pick = (models: typeof dcm.models, slugs: string[], cat: string) =>
    slugs.flatMap(slug => {
      const m = models.find(x => x.slug === slug);
      return m ? [{ label: m.name, href: `/products/${cat}/${m.slug}` }] : [];
    });

  // DCM (4): AVISS II, Classic V, D Series, IMPRESS III
  const dcmTags = pick(dcm.models, ["aviss-ii", "classic-v", "d-series", "impress-iii"], "dcm");
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
      <section className="bg-brand-dark2 pt-16 pb-6" style={{ zIndex: 0, position: "relative" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl uppercase tracking-widest inline-block border-b-2 border-brand-red pb-2">
            PROD<span className="text-brand-red">UCTS</span>
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
