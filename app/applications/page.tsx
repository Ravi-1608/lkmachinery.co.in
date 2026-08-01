import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllApplications } from "@/lib/applications";
import { getBreadcrumbSchema } from "@/lib/seo";
import "../(marketing)/marketing-hero.css";
import "./applications-hub.css";

// No Figma design exists for an applications LISTING page -- the 6
// "Application N.png" exports are each a detail page for one industry, not
// a hub. This page exists because the main nav's "Application" link (every
// page, Header.tsx) and QuickLinks both point to /applications, and until
// now nothing was built there -- a real 404 on a primary nav link, found
// during the Phase 2 sitemap/link audit. Built plain, consistent with the
// /products and /blogs hub pages, rather than inventing a Figma-style design
// that was never provided for this specific page.
export const metadata: Metadata = {
  title: "Applications",
  description:
    "Industries served by LK Machinery India — die casting, injection molding, CNC machining, and automation solutions for transportation, electronics, appliances, and more, across India.",
  openGraph: { url: "/applications" },
  alternates: { canonical: "/applications" },
};

const jsonLd = getBreadcrumbSchema([
  { name: "Home", item: "/" },
  { name: "Applications", item: "/applications" },
]);

export default function ApplicationsHubPage() {
  const apps = getAllApplications();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="marketing-hero">
        <div className="marketing-hero__bg-gradient" aria-hidden="true" />
        <div className="marketing-hero__glow" aria-hidden="true" />
        <div className="container marketing-hero__inner">
          <p className="marketing-hero__eyebrow">Industries We Serve</p>
          <h1 className="marketing-hero__title">Applications</h1>
          <p className="marketing-hero__subtitle">
            LK Machinery India equipment supports precision manufacturing across a wide
            range of industries — explore how our machines are used in each.
          </p>
        </div>
      </section>

      {/* ── Applications grid ─────────────────────────────────────────────── */}
      <section className="applications-hub">
        <div className="container">
          <div className="applications-hub__grid">
            {apps.map((app) => (
              <Link key={app.slug} href={`/applications/${app.slug}`} className="applications-hub__card">
                <div className="applications-hub__image-wrap">
                  <Image
                    src={app.image}
                    alt={app.name}
                    fill
                    className="applications-hub__image"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="applications-hub__gradient" aria-hidden="true" />
                  <h2 className="applications-hub__card-title">{app.name}</h2>
                </div>
                <p className="applications-hub__card-desc">{app.description}</p>
                <span className="applications-hub__card-link">
                  Explore {app.name}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
