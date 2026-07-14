// ─── Product data types ───────────────────────────────────────────────────────
// Mirrors the shape of data/products.json exactly.
// `note` and `sourceVerified` are internal fields — never render them on pages.

export interface ProductModel {
  slug: string;
  name: string;
  /** DCM only */
  chamberType?: string;
  /** IMM only */
  machineType?: string;
  /** Automation only */
  family?: string;
  /** Present on DCM + IMM; absent on CNC + Automation */
  tonnage?: string;
  /** Lena only (extra display field) */
  clampingForce?: string;
  description: string;
  /** May be empty [] — don't render section when empty */
  highlights?: string[];
  applicableIndustries: string[];
  image: string;
  /** Internal only — never render */
  sourceVerified?: string;
  /** Internal only — never render */
  note?: string;
}

export interface ProductCategory {
  categoryLabel: string;
  categoryName: string;
  categoryDescription: string;
  /** Internal only — never render */
  note?: string;
  models: ProductModel[];
}

export type ProductsData = Record<string, ProductCategory>;

// ─── Data access ──────────────────────────────────────────────────────────────
import productsData from "@/data/products.json";

const data = productsData as ProductsData;

/** Return all category slugs */
export function getCategorySlugs(): string[] {
  return Object.keys(data);
}

/** Return a category by slug, or undefined */
export function getCategory(slug: string): ProductCategory | undefined {
  return data[slug];
}

/** Return all {category, model} slug pairs — used in generateStaticParams */
export function getAllModelParams(): { category: string; model: string }[] {
  return Object.entries(data).flatMap(([category, cat]) =>
    cat.models.map((m) => ({ category, model: m.slug }))
  );
}

/** Return a single model by category + model slug */
export function getModel(
  categorySlug: string,
  modelSlug: string
): ProductModel | undefined {
  return data[categorySlug]?.models.find((m) => m.slug === modelSlug);
}

/** Return the first sentence of a string (for card teasers) */
export function firstSentence(text: string): string {
  const dot = text.indexOf(".");
  if (dot === -1) return text.slice(0, 120) + "…";
  return text.slice(0, dot + 1);
}

/** Capitalise a category slug for display */
export function categoryDisplayLabel(slug: string): string {
  return data[slug]?.categoryLabel ?? slug.toUpperCase();
}
