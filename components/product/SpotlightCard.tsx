import Link from "next/link";
import Image from "next/image";

interface SpotlightCardProps {
  title: string;
  description: string;
  ctaHref: string;
  image: string;
  /** "dark" = card sits on a dark band; "light" = card on light band */
  variant?: "dark" | "light";
  /** Optional stat badge e.g. "Up to 6,000T clamping force" */
  badge?: string;
}

export default function SpotlightCard({
  title,
  description,
  ctaHref,
  image,
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
      {/* Product image */}
      <div className={`relative w-full aspect-[4/3] ${isDark ? "bg-white/5" : "bg-brand-offwhite"}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Badge overlay */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-brand-red text-white text-xs font-semibold px-3 py-1 rounded-full font-body">
              {badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h4 className={`font-body font-normal text-[24px] tracking-[14%] mb-2 ${isDark ? "text-white" : "text-brand-dark"}`}>
          {title}
        </h4>
        <p className={`font-body font-normal text-[16px] tracking-[0%] leading-relaxed mb-4 line-clamp-3
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
