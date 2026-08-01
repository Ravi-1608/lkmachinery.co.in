import Image from "next/image";
import Link from "next/link";
import type { ProductModel } from "@/lib/products";
import { firstSentence } from "@/lib/products";
import "./ProductCard.css";

interface ProductCardProps {
  model: ProductModel;
  categorySlug: string;
  /** Optional badge override — defaults to chamberType ?? machineType ?? family */
  badge?: string;
}

export default function ProductCard({ model, categorySlug, badge }: ProductCardProps) {
  const href = `/products/${categorySlug}/${model.slug}`;
  const typeBadge = badge ?? model.chamberType ?? model.machineType ?? model.family;
  const teaser = firstSentence(model.description);
  const altText = `${model.name} ${model.chamberType || model.machineType || model.family || ""} ${categorySlug.toUpperCase()} machine`.replace(/\s+/g, " ").trim();

  return (
    <Link href={href} className="product-card">
      {/* Image */}
      <div className="product-card__image-wrap">
        <Image
          src={model.image}
          alt={altText}
          fill
          className="product-card__image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Type badge */}
        {typeBadge && (
          <span className="product-card__badge-type">
            {typeBadge}
          </span>
        )}
        {/* Tonnage badge */}
        {model.tonnage && (
          <span className="product-card__badge-tonnage">
            {model.tonnage}T
          </span>
        )}
      </div>

      {/* Content */}
      <div className="product-card__body">
        <h3 className="product-card__title">
          {model.name}
        </h3>
        <p className="product-card__teaser">
          {teaser}
        </p>
        <div className="product-card__link">
          Learn more
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
