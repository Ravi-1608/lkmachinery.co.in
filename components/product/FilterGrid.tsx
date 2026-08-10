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

      {/* Grid — every model renders here always (so every model page has a
          real crawlable link in the actual HTML, not just whichever tab
          happens to be active), hidden via the `hidden` attribute rather
          than left out of the DOM. `hidden` still lets crawlers see and
          follow the underlying href; only the active tab's cards are
          visible to a visitor. */}
      <div className="filter-grid__grid">
        {models.map((model) => (
          <div key={model.slug} hidden={model[filterField] !== active}>
            <ProductCard model={model} categorySlug={categorySlug} />
          </div>
        ))}
      </div>
    </div>
  );
}
