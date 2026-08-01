import Link from "next/link";
import Image from "next/image";
import "./SpotlightCard.css";

interface SpotlightCardProps {
  title: string;
  description: string;
  ctaHref: string;
  /** Pass an image path to show the product image inside the card. Omit for text-only (e.g. homepage CategoryBand). */
  image?: string;
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
  const variantClass = isDark ? "spotlight-card--dark" : "spotlight-card--light";

  return (
    <div className={`spotlight-card ${variantClass}`}>
      {/* Product image — only rendered when image prop is provided */}
      {image && (
        <div className="spotlight-card__image-wrap">
          <Image
            src={image}
            alt={title}
            fill
            className="spotlight-card__image"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Badge overlay */}
          {badge && (
            <div className="spotlight-card__badge-overlay">
              <span className="spotlight-card__badge">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="spotlight-card__body">
        {/* Badge — shown in text block when no image (text-only card) or always */}
        {badge && !image && (
          <div className="spotlight-card__badge-standalone">
            <span className="spotlight-card__badge">
              {badge}
            </span>
          </div>
        )}
        <h3 className="spotlight-card__title">
          {title}
        </h3>
        <p className="spotlight-card__description">
          {description}
        </p>
        <Link href={ctaHref} className="spotlight-card__link">
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
