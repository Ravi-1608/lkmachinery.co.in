import Link from "next/link";
import Image from "next/image";
import TagPill from "@/components/product/TagPill";
import SpotlightCard from "@/components/product/SpotlightCard";

export interface CategoryBandProps {
  index: string;          // "01", "02", …
  title: string;          // "Die Casting Machines"
  subtitle: string;       // "DCM" — short category code
  description: string;
  tags: string[];
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
    <div
      className="sticky-band-wrapper"
      style={{ minHeight: "100vh" }}
    >
      {/* The sticky card itself */}
      <section
        className={`sticky top-16 lg:top-[72px] min-h-screen flex flex-col justify-center
          ${isDark ? "bg-brand-dark2" : "bg-brand-offwhite"}`}
        style={{ zIndex }}
        aria-labelledby={`cat-${index}-heading`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">

          {/* ── Two-column layout ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* ── Left column: text + tags + CTA ──────────────────────── */}
            <div>
              {/* Index label */}
              <p className="font-heading font-bold text-sm tracking-[0.25em] uppercase mb-3 text-brand-red">
                {index} — {subtitle}
              </p>

              {/* Big short-code heading — Bug 2 fix: was {title}, now {subtitle} */}
              <h2
                id={`cat-${index}-heading`}
                className={`font-heading font-bold tracking-[15%] text-5xl sm:text-6xl lg:text-[80px] leading-none mb-6
                  ${isDark ? "text-white" : "text-brand-dark"}`}
              >
                {subtitle}
              </h2>

              {/* Full name as sub-label */}
              <p className={`text-sm font-body uppercase tracking-widest mb-4
                ${isDark ? "text-white/40" : "text-brand-dark/40"}`}>
                {title}
              </p>

              {/* Description */}
              <p className={`text-base leading-relaxed max-w-lg mb-8 font-body
                ${isDark ? "text-white/60" : "text-brand-dark/60"}`}>
                {description}
              </p>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag) => (
                  <TagPill key={tag} label={tag} variant={isDark ? "dark" : "light"} />
                ))}
              </div>

              {/* CTA — outline pill style per Figma */}
              <Link
                href={ctaHref}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold font-body
                           border-2 transition-all duration-200 active:scale-95
                           ${isDark
                             ? "border-white/30 text-white hover:border-white hover:bg-white/10"
                             : "border-brand-dark/30 text-brand-dark hover:border-brand-dark hover:bg-brand-dark/10"
                           }`}
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* ── Right column: circular glow + image + overlapping card ── */}
            <div className="relative flex items-center justify-center min-h-[380px] lg:min-h-[500px]">

              {/* Radial glow behind image */}
              <div
                className={`absolute inset-0 rounded-full blur-3xl opacity-30 scale-90
                  ${isDark ? "bg-brand-red" : "bg-brand-dark"}`}
                aria-hidden="true"
              />

              {/* Product image — centered */}
              <div className="relative z-10 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px]">
                <Image
                  src={spotlightImage}
                  alt={`${spotlightTitle} — ${subtitle} machine`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 400px"
                />
              </div>

              {/* SpotlightCard — absolutely positioned top-right, overlapping */}
              <div className="absolute top-0 right-0 z-20 w-[220px] sm:w-[260px]">
                <SpotlightCard
                  title={spotlightTitle}
                  description={spotlightDescription}
                  ctaHref={ctaHref}
                  image={spotlightImage}
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
