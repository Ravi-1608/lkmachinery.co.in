import Link from "next/link";
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
  spotlightBadge?: string;
  ctaHref: string;
  variant: "dark" | "light";
}

export default function CategoryBand({
  index,
  title,
  subtitle,
  description,
  tags,
  spotlightTitle,
  spotlightDescription,
  spotlightBadge,
  ctaHref,
  variant,
}: CategoryBandProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-20 lg:py-28 ${isDark ? "bg-brand-dark2" : "bg-brand-offwhite"}`}
      aria-labelledby={`cat-${index}-heading`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Two-column grid on desktop: text left, spotlight right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left column: copy ─────────────────────────────────────── */}
          <div>
            {/* Index label */}
            <p className={`font-heading font-bold text-sm tracking-[0.25em] uppercase mb-4
              ${isDark ? "text-brand-red" : "text-brand-red"}`}>
              {index} — {subtitle}
            </p>

            {/* Heading */}
            <h2
              id={`cat-${index}-heading`}
              className={`font-heading font-bold tracking-[15%] text-5xl sm:text-6xl lg:text-[80px] leading-tight mb-6
                ${isDark ? "text-white" : "text-brand-dark"}`}
            >
              {title}
            </h2>

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

            {/* CTA */}
            <Link
              href={ctaHref}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                         transition-all duration-200 active:scale-95 font-body
                         ${isDark
                           ? "bg-brand-red text-white hover:bg-brand-redDark"
                           : "bg-brand-dark text-white hover:bg-brand-dark2"
                         }`}
            >
              View All {subtitle} Models
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* ── Right column: spotlight card ─────────────────────────── */}
          <div className="w-full">
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
    </section>
  );
}
