"use client";

import { useState } from "react";
import type { ProductModel } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

interface DcmFilterGridProps {
  models: ProductModel[];
  categorySlug: string;
}

const FILTERS = ["All", "Cold Chamber", "Hot Chamber"] as const;
type Filter = (typeof FILTERS)[number];

export default function DcmFilterGrid({ models, categorySlug }: DcmFilterGridProps) {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All" ? models : models.filter((m) => m.chamberType === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter by chamber type">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={`px-5 py-2 rounded-full text-sm font-semibold font-body transition-all duration-200
              ${active === f
                ? "bg-brand-red text-white"
                : "bg-brand-dark/10 text-brand-dark hover:bg-brand-dark/20"
              }`}
          >
            {f}
            <span className="ml-2 text-xs opacity-70">
              ({f === "All"
                ? models.length
                : models.filter((m) => m.chamberType === f).length})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((model) => (
          <ProductCard key={model.slug} model={model} categorySlug={categorySlug} />
        ))}
      </div>
    </div>
  );
}
