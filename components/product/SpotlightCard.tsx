import Link from "next/link";

interface SpotlightCardProps {
  title: string;
  description: string;
  ctaHref: string;
  /** "dark" = card sits on a dark band, uses light card style; "light" = card on light band */
  variant?: "dark" | "light";
  /** Optional stat badge e.g. "Up to 6,000T clamping force" */
  badge?: string;
}

export default function SpotlightCard({
  title,
  description,
  ctaHref,
  variant = "dark",
  badge,
}: SpotlightCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border transition-shadow duration-300
        hover:shadow-2xl
        ${isDark
          ? "bg-white/5 border-white/10 hover:bg-white/8"
          : "bg-white border-brand-dark/10 shadow-md"
        }`}
    >
      {/* Image / placeholder area */}
      <div className={`relative w-full aspect-[4/3] flex items-center justify-center
        ${isDark ? "bg-white/5" : "bg-brand-offwhite"}`}>
        {/* Styled placeholder — real images come in a later milestone */}
        <div className="flex flex-col items-center gap-3 opacity-40">
          {/* Machine silhouette placeholder */}
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            aria-hidden="true"
            className={isDark ? "text-white" : "text-brand-dark"}
          >
            <rect x="8" y="28" width="56" height="32" rx="4" fill="currentColor" opacity="0.3"/>
            <rect x="16" y="16" width="24" height="16" rx="2" fill="currentColor" opacity="0.5"/>
            <rect x="44" y="20" width="12" height="12" rx="2" fill="currentColor" opacity="0.4"/>
            <circle cx="20" cy="64" r="5" fill="currentColor" opacity="0.6"/>
            <circle cx="52" cy="64" r="5" fill="currentColor" opacity="0.6"/>
            <rect x="28" y="44" width="16" height="12" rx="2" fill="currentColor" opacity="0.7"/>
          </svg>
          <span className={`text-xs font-body ${isDark ? "text-white/50" : "text-brand-dark/50"}`}>
            Product image coming soon
          </span>
        </div>

        {/* Badge overlay */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full font-body">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className={`font-heading text-lg mb-2 ${isDark ? "text-white" : "text-brand-dark"}`}>
          {title}
        </h4>
        <p className={`text-sm leading-relaxed mb-4 font-body line-clamp-3
          ${isDark ? "text-white/60" : "text-brand-dark/60"}`}>
          {description}
        </p>
        <Link
          href={ctaHref}
          className={`inline-flex items-center gap-2 text-sm font-semibold font-body
            transition-colors duration-200
            ${isDark
              ? "text-brand-red hover:text-white"
              : "text-brand-red hover:text-brand-redDark"
            }`}
        >
          Learn more
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
