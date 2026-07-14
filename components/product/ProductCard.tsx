import Image from "next/image";
import Link from "next/link";
import type { ProductModel } from "@/lib/products";
import { firstSentence } from "@/lib/products";

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

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl overflow-hidden border border-brand-dark/10
                 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-brand-offwhite overflow-hidden">
        <Image
          src={model.image}
          alt={model.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Type badge */}
        {typeBadge && (
          <span className="absolute top-3 left-3 bg-brand-red text-white text-xs font-semibold
                           px-2.5 py-1 rounded-full font-body">
            {typeBadge}
          </span>
        )}
        {/* Tonnage badge */}
        {model.tonnage && (
          <span className="absolute bottom-3 right-3 bg-brand-dark/80 text-white text-xs
                           font-semibold px-2.5 py-1 rounded-full font-body backdrop-blur-sm">
            {model.tonnage}T
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-brand-dark text-lg mb-2 group-hover:text-brand-red
                       transition-colors duration-200">
          {model.name}
        </h3>
        <p className="text-sm text-brand-dark/60 leading-relaxed font-body flex-1 line-clamp-3">
          {teaser}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-brand-red text-sm font-semibold font-body">
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
