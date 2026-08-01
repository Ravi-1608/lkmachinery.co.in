import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getAllApplications,
  getApplication,
  getApplicationSlugs,
} from "@/lib/applications";
import { getBreadcrumbSchema } from "@/lib/seo";
import EnquiryForm from "@/components/forms/EnquiryForm";
import PartsExplorer from "@/components/application/PartsExplorer";
import "./application.css";

// ─── Static generation ─────────────────────────────────────────────────────
export function generateStaticParams() {
  return getApplicationSlugs();
}

// ─── Per-page metadata ─────────────────────────────────────────────────────
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getApplication(slug);
  if (!app) return {};
  return {
    title: `${app.name} Applications`,
    description: app.description.slice(0, 155) + "…",
    openGraph: { url: `/applications/${slug}` },
    alternates: {
      canonical: `/applications/${slug}`,
    },
  };
}

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  const app = getApplication(slug);
  if (!app) notFound();

  // Fixed cross-nav order across all 6 application pages, per Figma's sidebar.
  // Link labels use each entry's own `name` field (the single source of
  // truth already used for headings/metadata) rather than re-typing Figma's
  // sidebar text verbatim — Figma's sidebar reads "Industries Supplies" for
  // that page (a typo vs. the page's own "INDUSTRIAL SUPPLIES" heading) and
  // "Household Appliance" vs. the page heading's "HOUSEHOLD APPLIANCES";
  // using `name` everywhere keeps the site internally consistent.
  const allApps = getAllApplications();

  const jsonLd = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Applications", item: "/applications" },
    { name: app.name, item: `/applications/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="app-hero">
        <Image
          src={app.image}
          alt={`${app.name} application`}
          fill
          priority
          className="app-hero__image"
          sizes="100vw"
        />

        {/* Decorative carousel arrow — Figma shows a prev-arrow chip, implying
            a multi-image hero carousel. Only one verified real photo exists
            per application in public/images/applications/, so there is
            nothing real to carousel through yet; rendered inert/disabled
            rather than wired to fake slides. */}
        <button
          type="button"
          className="app-hero__arrow"
          aria-label="Previous image (no additional images available yet)"
          disabled
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Torn-corner ribbon graphic — approximated with clip-path since no
            ribbon image asset exists; matches Figma's white ribbon + point. */}
        <div className="app-hero__ribbon">
          <h1 className="app-hero__ribbon-text">{app.name}</h1>
        </div>
      </section>

      {/* ── Filter bar + sidebar + parts grid ────────────────────────────── */}
      <section className="app-explorer" aria-labelledby="parts-heading">
        <h2 id="parts-heading" className="sr-only">{app.name} parts catalog</h2>

        <div className="container app-explorer__layout">
          {/* Sidebar cross-nav */}
          <nav className="app-explorer__sidebar" aria-label="Other applications">
            {allApps.map((a) => (
              <Link
                key={a.slug}
                href={`/applications/${a.slug}`}
                className={`app-explorer__sidebar-link${a.slug === slug ? " app-explorer__sidebar-link--active" : ""}`}
                aria-current={a.slug === slug ? "page" : undefined}
              >
                {a.name}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Filter tabs, search, and parts grid (client-interactive) */}
          <div className="app-explorer__main">
            <PartsExplorer parts={app.parts} filterTabs={app.filterTabs} />
          </div>
        </div>
      </section>

      {/* ── Enquiry / Contact ────────────────────────────────────────────── */}
      {/* Figma's photo background here (a hiker on a mountain) is an unrelated
          stock placeholder reused identically across all 6 application
          exports — not real LK content, so it is intentionally not
          reproduced. The floating "Contact US" card is kept, backed by this
          project's real EnquiryForm/vtiger wiring instead of a new form. */}
      <section className="app-contact" aria-labelledby="app-contact-heading">
        <div className="container app-contact__inner">
          <div className="app-contact__card">
            <h2 id="app-contact-heading" className="app-contact__heading">Contact US</h2>
            <EnquiryForm productInterested={`${app.name} Application`} />
          </div>
        </div>
      </section>
    </>
  );
}
