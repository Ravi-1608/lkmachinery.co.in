import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CategoryBand, { type CategoryBandProps } from "@/components/home/CategoryBand";
import ApplicationsStrip from "@/components/home/ApplicationsStrip";
import CtaBand from "@/components/home/CtaBand";

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

  const dcmTags = Array.from(new Set(dcm.models.map(m => m.chamberType).filter(Boolean))) as string[];
  const immTags = Array.from(new Set(imm.models.map(m => m.machineType).filter(Boolean))) as string[];
  const cncTags = Array.from(new Set(cnc.models.map(m => m.machineType).filter(Boolean))) as string[];
  const autoTags = Array.from(new Set(auto.models.map(m => m.family).filter(Boolean))) as string[];

  const CATEGORY_BANDS: CategoryBandProps[] = [
    {
      index: "01",
      subtitle: dcm.categoryLabel,
      title: dcm.categoryName,
      description: dcm.categoryDescription,
      tags: dcmTags.slice(0, 4),
      spotlightTitle: dcmSpotlight.name,
      spotlightDescription: firstSentence(dcmSpotlight.description),
      spotlightBadge: dcmSpotlight.tonnage ? `Up to ${dcmSpotlight.tonnage}T` : undefined,
      ctaHref: "/products/dcm",
      variant: "dark",
    },
    {
      index: "02",
      subtitle: imm.categoryLabel,
      title: imm.categoryName,
      description: imm.categoryDescription,
      tags: immTags.slice(0, 4),
      spotlightTitle: immSpotlight.name,
      spotlightDescription: firstSentence(immSpotlight.description),
      spotlightBadge: immSpotlight.tonnage ? `Up to ${immSpotlight.tonnage}T` : undefined,
      ctaHref: "/products/imm",
      variant: "light",
    },
    {
      index: "03",
      subtitle: cnc.categoryLabel,
      title: cnc.categoryName,
      description: cnc.categoryDescription,
      tags: cncTags.slice(0, 4),
      spotlightTitle: cncSpotlight.name,
      spotlightDescription: firstSentence(cncSpotlight.description),
      spotlightBadge: undefined,
      ctaHref: "/products/cnc",
      variant: "dark",
    },
    {
      index: "04",
      subtitle: auto.categoryLabel,
      title: auto.categoryName,
      description: auto.categoryDescription,
      tags: autoTags.slice(0, 4),
      spotlightTitle: autoSpotlight.name,
      spotlightDescription: firstSentence(autoSpotlight.description),
      spotlightBadge: undefined,
      ctaHref: "/products/automation",
      variant: "light",
    },
  ];

  return (
    <>
      <Hero />

      {CATEGORY_BANDS.map((band) => (
        <CategoryBand key={band.index} {...band} />
      ))}

      <ApplicationsStrip />
      <CtaBand />
    </>
  );
}
