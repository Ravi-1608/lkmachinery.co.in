import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getCategory,
  getModel,
  getAllModelParams,
} from "@/lib/products";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";
import EnquiryForm from "@/components/forms/EnquiryForm";

// ─── Static generation ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllModelParams();
}

// ─── Per-page metadata ────────────────────────────────────────────────────────
interface Props {
  params: Promise<{ category: string; model: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, model: modelSlug } = await params;
  const cat = getCategory(category);
  const model = getModel(category, modelSlug);
  if (!cat || !model) return {};

  const typeLabel = model.chamberType ?? model.machineType ?? model.family ?? cat.categoryLabel;
  const title = `${model.name} — ${typeLabel} | LK Machinery`;
  const description = model.description.slice(0, 155) + "…";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/products/${category}/${modelSlug}`,
      images: [{ url: model.image, alt: model.name }],
    },
    alternates: {
      canonical: `/products/${category}/${modelSlug}`,
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-brand-dark text-2xl sm:text-3xl mb-6">{children}</h2>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductModelPage({ params }: Props) {
  const { category, model: modelSlug } = await params;
  const cat = getCategory(category);
  const model = getModel(category, modelSlug);
  if (!cat || !model) notFound();

  const typeLabel = model.chamberType ?? model.machineType ?? model.family;
  const hasHighlights = model.highlights && model.highlights.length > 0;

  const jsonLd = [
    getProductSchema({
      name: model.name,
      description: model.description,
      image: model.image,
      category: cat.categoryName,
    }),
    getBreadcrumbSchema([
      { name: "Home", item: "/" },
      { name: "Products", item: "/products" },
      { name: cat.categoryName, item: `/products/${category}` },
      { name: model.name, item: `/products/${category}/${modelSlug}` },
    ]),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark overflow-hidden">
        {/* Subtle background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark2 to-black"
             aria-hidden="true" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
                        bg-brand-red/8 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24 lg:py-32">

            {/* Left: text */}
            <div>
              {/* Breadcrumb */}
              <nav className="flex flex-wrap items-center gap-2 text-white/50 text-sm font-body mb-6"
                   aria-label="Breadcrumb">
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                <span>/</span>
                <Link href={`/products/${category}`}
                      className="hover:text-white transition-colors">
                  {cat.categoryLabel}
                </Link>
                <span>/</span>
                <span className="text-white">{model.name}</span>
              </nav>

              {/* Type badge */}
              {typeLabel && (
                <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold
                                 bg-brand-red text-white font-body">
                  {typeLabel}
                </span>
              )}

              <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl mb-4">
                {model.name}
              </h1>

              {/* Tonnage — only if present (absent for CNC & Automation) */}
              {model.tonnage && (
                <p className="text-brand-grey text-lg font-body mb-6">
                  Clamping Force:{" "}
                  <span className="text-white font-semibold">{model.tonnage}T</span>
                </p>
              )}

              {/* Back to category */}
              <Link
                href={`/products/${category}`}
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white
                           transition-colors font-body"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to {cat.categoryName}
              </Link>
            </div>

            {/* Right: product image */}
            <div className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <Image
                src={model.image}
                alt={model.name}
                fill
                priority
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-brand-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading>About the {model.name}</SectionHeading>
          <p className="text-brand-dark/70 text-lg leading-relaxed font-body">
            {model.description}
          </p>
        </div>
      </section>

      {/* ── Highlights — only rendered when array is non-empty ───────────── */}
      {hasHighlights && (
        <section className="py-16 bg-brand-dark" aria-labelledby="highlights-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="highlights-heading"
                className="font-heading text-white text-2xl sm:text-3xl mb-8">
              Key Highlights
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {model.highlights!.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-brand-red
                                   flex items-center justify-center" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-white/80 text-sm font-body leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Applicable Industries ─────────────────────────────────────────── */}
      {model.applicableIndustries.length > 0 && (
        <section
          className={`py-14 ${hasHighlights ? "bg-brand-offwhite" : "bg-brand-dark"}`}
          aria-labelledby="industries-model-heading"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="industries-model-heading"
              className={`font-heading text-2xl sm:text-3xl mb-6
                ${hasHighlights ? "text-brand-dark" : "text-white"}`}
            >
              Applicable Industries
            </h2>
            <div className="flex flex-wrap gap-3">
              {model.applicableIndustries.map((ind) => (
                <span
                  key={ind}
                  className={`px-4 py-2 rounded-full text-sm font-body font-medium border
                    ${hasHighlights
                      ? "bg-brand-dark/10 text-brand-dark border-brand-dark/15"
                      : "bg-white/10 text-white/80 border-white/15"
                    }`}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Explore other models in this category ─────────────────────────── */}
      <section className="py-12 bg-brand-dark2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row
                        items-center justify-between gap-6">
          <div>
            <p className="text-white/50 text-sm font-body mb-1">Looking for something else?</p>
            <p className="text-white font-heading text-xl">
              Explore all {cat.categoryName} models
            </p>
          </div>
          <Link
            href={`/products/${category}`}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-red
                       text-white font-semibold rounded-full hover:bg-brand-redDark
                       active:scale-95 transition-all duration-200 font-body"
          >
            View all {cat.categoryLabel} models
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Enquiry form ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-brand-offwhite" aria-labelledby="enquiry-model-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-2">
              Request a Quote
            </p>
            <h2 id="enquiry-model-heading" className="font-heading text-brand-dark text-3xl sm:text-4xl">
              Enquire about the {model.name}
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md border border-brand-dark/8">
            {/*
              productInterested uses model.name (the real display name, not slug):
              e.g. "AVISS II", "Potenza A", "LT04N"
              This matches what vtiger CRM expects from the source form.
            */}
            <EnquiryForm productInterested={model.name} />
          </div>
        </div>
      </section>
    </>
  );
}
