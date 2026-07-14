import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getCategory,
  getCategorySlugs,
  getAllModelParams,
} from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";
import DcmFilterGrid from "@/components/product/DcmFilterGrid";
import EnquiryForm from "@/components/forms/EnquiryForm";

// ─── Static generation ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getCategorySlugs().map((category) => ({ category }));
}

// ─── Per-page metadata ────────────────────────────────────────────────────────
interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.categoryName} (${cat.categoryLabel})`,
    description: cat.categoryDescription,
    openGraph: { url: `/products/${category}` },
  };
}

// ─── Category hero image map ──────────────────────────────────────────────────
const HERO_IMAGES: Record<string, string> = {
  dcm:        "/images/products/dcm/impress-iii.png",
  imm:        "/images/products/imm/potenza-a.png",
  cnc:        "/images/products/cnc/mcg5.png",
  automation: "/images/products/automation/lr-100-dp.png",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const heroImage = HERO_IMAGES[category];
  const isDcm = category === "dcm";

  return (
    <>
      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-brand-dark">
        {/* Background image */}
        {heroImage && (
          <Image
            src={heroImage}
            alt={cat.categoryName}
            fill
            className="object-contain object-center opacity-20"
            priority
            sizes="100vw"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/20"
             aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-sm font-body mb-4" aria-label="Breadcrumb">
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white">{cat.categoryLabel}</span>
          </nav>

          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            {cat.categoryLabel}
          </p>
          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl mb-4">
            {cat.categoryName}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl font-body">
            {cat.categoryDescription}
          </p>
        </div>
      </section>

      {/* ── Products grid ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-offwhite" aria-labelledby="products-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="products-heading" className="font-heading text-brand-dark text-3xl sm:text-4xl mb-10">
            {isDcm ? "Die Casting Machine Models" : `${cat.categoryName} Models`}
          </h2>

          {/* DCM: filterable by chamber type */}
          {isDcm ? (
            <DcmFilterGrid models={cat.models} categorySlug={category} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cat.models.map((model) => (
                <ProductCard key={model.slug} model={model} categorySlug={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Industries strip ─────────────────────────────────────────────── */}
      {(() => {
        // Collect unique industries across all models in this category
        const industries = Array.from(
          new Set(cat.models.flatMap((m) => m.applicableIndustries))
        );
        if (!industries.length) return null;
        return (
          <section className="py-14 bg-brand-dark" aria-labelledby="industries-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 id="industries-heading" className="font-heading text-white text-2xl mb-8">
                Applicable Industries
              </h2>
              <div className="flex flex-wrap gap-3">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-4 py-2 rounded-full text-sm font-body font-medium
                               bg-white/10 text-white/80 border border-white/15"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── Enquiry form ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-brand-offwhite" aria-labelledby="enquiry-cat-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-2">
              Get in Touch
            </p>
            <h2 id="enquiry-cat-heading" className="font-heading text-brand-dark text-3xl sm:text-4xl">
              Enquire about {cat.categoryName}
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md border border-brand-dark/8">
            <EnquiryForm productInterested={`${cat.categoryName} (${cat.categoryLabel})`} />
          </div>
        </div>
      </section>
    </>
  );
}
