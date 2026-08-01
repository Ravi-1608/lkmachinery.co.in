import Link from "next/link";
import Image from "next/image";
import TagPill from "@/components/product/TagPill";
import SpotlightCard from "@/components/product/SpotlightCard";
import "./CategoryBand.css";

export interface CategoryBandProps {
  index: string;          // "01", "02", …
  title: string;          // "Die Casting Machines"
  subtitle: string;       // "DCM" — short category code
  description: string;
  tags: { label: string; href: string }[];
  spotlightTitle: string;
  spotlightDescription: string;
  spotlightImage: string; // real product image path from data/products.json
  spotlightBadge?: string;
  ctaHref: string;
  variant: "dark" | "light";
  zIndex: number;         // for sticky stacking: 1..4
}

export default function CategoryBand({
  index,
  title,
  subtitle,
  description,
  tags,
  spotlightTitle,
  spotlightDescription,
  spotlightImage,
  spotlightBadge,
  ctaHref,
  variant,
  zIndex,
}: CategoryBandProps) {
  const isDark = variant === "dark";

  return (
    // ── Sticky-wrapper: tall enough that each card stays pinned for a full scroll
    <div className="category-band-wrapper">
      {/* The sticky card itself */}
      <section
        className={`category-band ${isDark ? "category-band--dark" : "category-band--light"}`}
        style={{ zIndex }}
        aria-labelledby={`cat-${index}-heading`}
      >
        <div className="category-band__container">

          {/* ── Two-column layout ─────────────────────────────────────── */}
          <div className="category-band__grid">

            {/* ── Left column: text + tags + CTA ──────────────────────── */}
            <div>
              {/* Index label */}
              <p className="category-band__index">
                {index} — {subtitle}
              </p>

              {/* Big short-code heading — Bug 2 fix: was {title}, now {subtitle} */}
              <h2 id={`cat-${index}-heading`} className="category-band__heading">
                {subtitle}
              </h2>

              {/* Full name as sub-label */}
              <p className="category-band__title">
                {title}
              </p>

              {/* Description */}
              <p className="category-band__description">
                {description}
              </p>

              {/* Tag pills — each links to its model page */}
              <div className="category-band__tags">
                {tags.map(({ label, href }) => (
                  <TagPill key={label} label={label} href={href} variant={isDark ? "dark" : "light"} />
                ))}
              </div>

              {/* CTA — outline pill style per Figma */}
              <Link href={ctaHref} className="category-band__cta">
                Learn More
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* ── Right column: circular glow + image + overlapping card ── */}
            <div className="category-band__visual">

              {/* Radial glow behind image */}
              <div className="category-band__glow" aria-hidden="true" />

              {/* Product image — centered */}
              <div className="category-band__image-wrap">
                <Image
                  src={spotlightImage}
                  alt={`${spotlightTitle} — ${subtitle} machine`}
                  fill
                  className="category-band__image"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 400px"
                />
              </div>

              {/* SpotlightCard — absolutely positioned top-right, overlapping */}
              <div className="category-band__spotlight-wrap">
                <SpotlightCard
                  title={spotlightTitle}
                  description={spotlightDescription}
                  ctaHref={ctaHref}
                  variant={isDark ? "dark" : "light"}
                  badge={spotlightBadge}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
