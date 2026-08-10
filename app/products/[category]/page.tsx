import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getCategory,
  getCategorySlugs,
  getAllModelParams,
} from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import FilterGrid from "@/components/product/FilterGrid";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { getBreadcrumbSchema } from "@/lib/seo";
import "./category.css";

// ─── Static generation ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

// India-specific meta descriptions -- deliberately separate from the visible
// `categoryDescription` (which is real Figma-sourced copy about the LK Group
// parent's global manufacturing footprint). Using that global-sounding text
// as the SEO meta description would work against this India-only site's
// local search relevance, so these are written fresh for that purpose only.
const META_DESCRIPTIONS: Record<string, string> = {
  dcm: "Die casting machines (DCM) from LK Machinery India — hot & cold chamber models for aluminum and zinc die casting, sales and service across India.",
  imm: "Injection molding machines (IMM) from LK Machinery India — precision plastic injection molding equipment with sales and service support across India.",
  cnc: "CNC machining centers from LK Machinery India — vertical, horizontal, and five-axis machining solutions, supplied and serviced across India.",
  automation: "Industrial robot automation from LK Machinery India — robot arms and automation cells for die casting and injection molding lines across India.",
};

// ─── Per-page metadata ────────────────────────────────────────────────────────
interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const description = META_DESCRIPTIONS[category] ?? cat.categoryDescription;
  return {
    title: `${cat.categoryName} (${cat.categoryLabel}) Manufacturer in India`,
    description,
    openGraph: { url: `/products/${category}`, description },
    alternates: { canonical: `/products/${category}` },
  };
}

// ─── Category hero image map ──────────────────────────────────────────────────
const HERO_IMAGES: Record<string, string> = {
  dcm:        "/images/products/dcm/impress-iii.png",
  imm:        "/images/products/imm/potenza-a.png",
  cnc:        "/images/products/cnc/mcg5.png",
  automation: "/images/products/automation/lr-100-dp.png",
};

// Figma's category-page hero uses the same generic copy on every category —
// the long per-category paragraph belongs on the /products hub page only.
const HERO_SUBTITLE =
  "LK Machinery India delivers comprehensive industrial equipment solutions for die-casting, injection molding, precision machining, and automated manufacturing.";

// ─── Filter tabs per category — Figma shows these on DCM/IMM/CNC (not just
// DCM), keyed to whichever type field that category's models actually use.
// No "All" tab and no count badges in Figma; first tab is the default-active one.
const FILTER_CONFIG: Record<string, { field: "chamberType" | "machineType"; filters: string[] } | undefined> = {
  dcm: { field: "chamberType", filters: ["Cold Chamber", "Hot Chamber"] },
  imm: { field: "machineType", filters: ["Toggle Type", "Two Platen", "Electric", "Direct Press"] },
  cnc: {
    field: "machineType",
    filters: [
      "Vertical Machining Center",
      "High-speed Drilling and Tapping Center",
      "Horizontal Machining Center",
      "High-speed Gantry Machining Center",
      "Five-axis Machining Center",
      "Horizontal Lathe",
    ],
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const heroImage = HERO_IMAGES[category];
  const filterConfig = FILTER_CONFIG[category];

  const jsonLd = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Products", item: "/products" },
    { name: cat.categoryName, item: `/products/${category}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <section className="category-hero">
        {/* Background image -- was alt="" aria-hidden (purely decorative),
            which Bing's quality checker flags as missing alt text on every
            category page. Given a real descriptive alt like every other
            image on the site, built from the same category data. */}
        {heroImage && (
          <Image
            src={heroImage}
            alt={`${cat.categoryName} (${cat.categoryLabel}) — LK Machinery India`}
            fill
            className="category-hero__image"
            priority
            sizes="100vw"
          />
        )}
        {/* Gradient overlay */}
        <div className="category-hero__gradient" aria-hidden="true" />

        <div className="container category-hero__inner">
          <h1 className="category-hero__title">
            Our Product <span className="category-hero__highlight">Portfolio</span>
          </h1>
          <p className="category-hero__subtitle">
            {HERO_SUBTITLE}
          </p>
        </div>
      </section>

      {/* ── Products grid ────────────────────────────────────────────────── */}
      <section className="category-products" aria-labelledby="products-heading">
        <div className="container">
          <h2 id="products-heading" className="category-products__heading">
            PRODUCT <span className="category-products__highlight">SERIES</span>
          </h2>

          {filterConfig ? (
            <FilterGrid
              models={cat.models}
              categorySlug={category}
              filterField={filterConfig.field}
              filters={filterConfig.filters}
            />
          ) : (
            <div className="category-products__grid">
              {cat.models.map((model) => (
                <ProductCard key={model.slug} model={model} categorySlug={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Industries strip ─────────────────────────────────────────────── */}
      {cat.industryTiles && (
        <section className="category-industries" aria-labelledby="industries-heading">
          <div className="container">
            <h2 id="industries-heading" className="category-industries__heading">
              Applicable <span className="category-industries__highlight">Industries</span>
            </h2>
            <div className="category-industries__grid">
              {cat.industryTiles.map((tile, i) => (
                <div key={i} className="category-industries__tile">
                  <div className="category-industries__tile-image-wrap">
                    <Image
                      src={tile.image}
                      alt={`${tile.industry} — ${tile.caption}`}
                      fill
                      className="category-industries__tile-image"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <p className="category-industries__tile-caption">
                    {tile.industry}-{tile.caption}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/applications" className="category-industries__cta">
              Learn More
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* ── Enquiry form ─────────────────────────────────────────────────── */}
      <section className="category-enquiry" aria-labelledby="enquiry-cat-heading">
        <div className="container category-enquiry__container">
          <div className="category-enquiry__header">
            <h2 id="enquiry-cat-heading" className="category-enquiry__heading">
              CONTACT <span className="category-enquiry__highlight">US</span>
            </h2>
          </div>
          <div className="category-enquiry__form-wrap">
            <EnquiryForm productInterested={`${cat.categoryName} (${cat.categoryLabel})`} />
          </div>
        </div>
      </section>
    </>
  );
}
