"use client";

import { useState } from "react";
import type { ProductModel } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import "./FilterGrid.css";

interface FilterGridProps {
  models: ProductModel[];
  categorySlug: string;
  /** Which model field the filter tabs key off of */
  filterField: "chamberType" | "machineType";
  /** Tab labels in Figma's display order — no "All" tab, first tab is the default-active one */
  filters: string[];
}

export default function FilterGrid({ models, categorySlug, filterField, filters }: FilterGridProps) {
  const [active, setActive] = useState<string>(filters[0]);

  const filtered = models.filter((m) => m[filterField] === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="filter-grid__tabs" role="tablist" aria-label={`Filter by ${filterField === "chamberType" ? "chamber type" : "machine type"}`}>
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className="filter-grid__tab"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="filter-grid__grid">
        {filtered.map((model) => (
          <ProductCard key={model.slug} model={model} categorySlug={categorySlug} />
        ))}
      </div>
    </div>
  );
}
