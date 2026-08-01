import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/lib/products";
import { getBreadcrumbSchema } from "@/lib/seo";
import "./products.css";

export const metadata: Metadata = {
  title: "Industrial Machinery Products — DCM, IMM, CNC & Automation",
  description:
    "LK Machinery India delivers comprehensive industrial equipment solutions for die-casting, injection molding, precision machining, and automated manufacturing.",
  openGraph: { url: "/products" },
  alternates: { canonical: "/products" },
};

const jsonLd = getBreadcrumbSchema([
  { name: "Home", item: "/" },
  { name: "Products", item: "/products" },
]);

// Each band shows one representative product image -- this codebase has no
// composite/lineup photography (Figma shows multi-model line-ups per band),
// only individual model shots. Reusing the same real images already used as
// each category's own hero image rather than fabricating a composite.
const BAND_IMAGES: Record<string, string> = {
  dcm: "/images/products/dcm/impress-iii.png",
  cnc: "/images/products/cnc/mcg5.png",
  imm: "/images/products/imm/potenza-a.png",
};

// Figma's real hub-page export only shows DCM, CNC, and IMM bands (in that
// order) -- Automation has no Figma design anywhere in this project (already
// established for the category/model pages). Automation remains fully
// reachable via the main nav and footer; it's just not featured in this
// specific hub scroller, matching the real design exactly rather than
// inventing a 4th band for a category Figma never included here.
const BAND_ORDER = ["dcm", "cnc", "imm"] as const;

export default function ProductsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="products-hero">
        <Image
          src="/images/products/dcm/impress-iii.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          className="products-hero__image"
          sizes="100vw"
        />
        <div className="products-hero__gradient" aria-hidden="true" />
        <div className="container products-hero__inner">
          <h1 className="products-hero__title">
            Our Product <span className="products-hero__highlight">Portfolio</span>
          </h1>
          <p className="products-hero__subtitle">
            LK Machinery India delivers comprehensive industrial equipment solutions for
            die-casting, injection molding, precision machining, and automated
            manufacturing.
          </p>
        </div>
      </section>

      {/* ── Section heading ──────────────────────────────────────────────── */}
      <section className="products-heading-section">
        <div className="container">
          <h2 className="products-heading-section__title">
            PROD<span className="products-heading-section__highlight">UCTS</span>
          </h2>
          <p className="products-heading-section__subtitle">
            Our product range combines proven technology with advanced engineering to
            meet the demanding requirements of modern production facilities.
          </p>
        </div>
      </section>

      {/* ── Category bands ───────────────────────────────────────────────── */}
      {BAND_ORDER.map((slug, i) => {
        const cat = getCategory(slug);
        if (!cat) return null;
        return (
          <section
            key={slug}
            className={`products-band ${i % 2 === 1 ? "products-band--alt" : ""}`}
          >
            <div className="container products-band__inner">
              <p className="products-band__label">{cat.categoryLabel}</p>
              <p className="products-band__description">{cat.categoryDescription}</p>
              <div className="products-band__image-wrap">
                <Image
                  src={BAND_IMAGES[slug]}
                  alt={cat.categoryName}
                  fill
                  className="products-band__image"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <Link href={`/products/${slug}`} className="products-band__cta">
                Learn More
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </section>
        );
      })}
    </main>
  );
}
