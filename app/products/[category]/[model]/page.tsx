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
import "./model.css";

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
  const title = `${model.name} — ${typeLabel}`;
  const description =
    model.description.length > 155
      ? model.description.slice(0, model.description.lastIndexOf(" ", 155)) + "…"
      : model.description;

  return {
    title,
    description,
    openGraph: {
      // root layout's title.template only applies to the plain `title` field
      // above, not openGraph.title -- set explicitly so both match.
      title: `${title} | LK Machinery`,
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
    <h2 className="model-section-heading">{children}</h2>
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

  // Figma highlights the last word of the model name in red (e.g. "MV
  // SERIES", "AVISS II", "POTENZA V") -- for single-word names (FORZA,
  // ELETTRICA, LENA) there's no clear split point, so render those plain.
  const nameParts = model.name.split(" ");
  const nameMain = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : model.name;
  const nameHighlight = nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;

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
      <section className="model-hero">
        {/* Subtle background gradient accent */}
        <div className="model-hero__gradient" aria-hidden="true" />
        <div className="model-hero__glow" aria-hidden="true" />

        <div className="container">
          <div className="model-hero__grid">

            {/* Left: text */}
            <div>
              {/* Breadcrumb */}
              <nav className="model-hero__breadcrumb" aria-label="Breadcrumb">
                <Link href="/products">Products</Link>
                <span>/</span>
                <Link href={`/products/${category}`}>
                  {cat.categoryLabel}
                </Link>
                <span>/</span>
                <span className="model-hero__breadcrumb-current">{model.name}</span>
              </nav>

              {/* Type badge */}
              {typeLabel && (
                <span className="model-hero__badge">
                  {typeLabel}
                </span>
              )}

              <h1 className="model-hero__title">
                {nameMain}{nameHighlight && <> <span className="model-hero__highlight">{nameHighlight}</span></>}
              </h1>

              {/* Tonnage — only if present (absent for CNC & Automation) */}
              {model.tonnage && (
                <p className="model-hero__tonnage">
                  Tonnage:{" "}
                  <span className="model-hero__tonnage-value">{model.tonnage}T</span>
                </p>
              )}

              {/* Primary CTA — Figma shows "Inquire Now" directly in the hero */}
              <Link href="#enquiry-model-heading" className="model-hero__cta">
                Inquire Now
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Back to category */}
              <Link href={`/products/${category}`} className="model-hero__back-link">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to {cat.categoryName}
              </Link>
            </div>

            {/* Right: product image */}
            <div className="model-hero__image-wrap">
              <Image
                src={model.image}
                alt={`${model.name} ${model.chamberType || model.machineType || model.family || ""} ${cat.categoryName}`.replace(/\s+/g, " ").trim()}
                fill
                priority
                className="model-hero__image"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Description ──────────────────────────────────────────────────── */}
      <section className="model-description">
        <div className="container model-description__container">
          <SectionHeading>About the {model.name}</SectionHeading>
          <p className="model-description__text">
            {model.description}
          </p>
        </div>
      </section>

      {/* ── Highlights — only rendered when array is non-empty ───────────── */}
      {hasHighlights && (
        <section className="model-highlights" aria-labelledby="highlights-heading">
          <div className="container model-highlights__container">
            <h2 id="highlights-heading" className="model-highlights__heading">
              Product <span className="model-highlights__highlight">Highlights</span>
            </h2>
            <ul className="model-highlights__grid">
              {model.highlights!.map((h) => (
                <li key={h} className="model-highlights__item">
                  <span className="model-highlights__check" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="model-highlights__text">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Applicable Industries — fixed per-category tile set, matches the
          category listing page (Figma shows the same tiles on every model
          page in a category, not per-model industries) ─────────────────── */}
      {cat.industryTiles && (
        <section className="model-industries" aria-labelledby="industries-model-heading">
          <div className="container model-industries__container">
            <h2 id="industries-model-heading" className="model-industries__heading">
              Applicable <span className="model-industries__highlight">Industries</span>
            </h2>
            <div className="model-industries__grid">
              {cat.industryTiles.map((tile, i) => (
                <div key={i} className="model-industries__tile">
                  <div className="model-industries__tile-image-wrap">
                    <Image
                      src={tile.image}
                      alt={`${tile.industry} — ${tile.caption}`}
                      fill
                      className="model-industries__tile-image"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <p className="model-industries__tile-caption">
                    {tile.industry}-{tile.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Explore other models in this category ─────────────────────────── */}
      <section className="model-explore">
        <div className="container model-explore__container model-explore__inner">
          <div>
            <p className="model-explore__prompt">Looking for something else?</p>
            <p className="model-explore__category">
              Explore all {cat.categoryName} models
            </p>
          </div>
          <Link href={`/products/${category}`} className="model-explore__cta">
            View all {cat.categoryLabel} models
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Enquiry form ─────────────────────────────────────────────────── */}
      <section className="model-enquiry" aria-labelledby="enquiry-model-heading">
        <div className="container model-enquiry__container">
          <div className="model-enquiry__header">
            <p className="model-enquiry__eyebrow">
              Request a Quote
            </p>
            <h2 id="enquiry-model-heading" className="model-enquiry__heading">
              Enquire about the {model.name}
            </h2>
          </div>
          <div className="model-enquiry__form-wrap">
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
