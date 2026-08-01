import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContentByType, type ContentItem } from "@/lib/content";
import { getBreadcrumbSchema } from "@/lib/seo";
import "../(marketing)/marketing-hero.css";
import "./blogs.css";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "Stay up to date with the latest machine launches, company news, and learning articles from LK Machinery India.",
  openGraph: { url: "/blogs" },
  alternates: { canonical: "/blogs" },
};

const jsonLd = getBreadcrumbSchema([
  { name: "Home", item: "/" },
  { name: "News & Insights", item: "/blogs" },
]);

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Link href={`/blogs/${item.slug}`} className="content-card">
      {/* Image */}
      <div className="content-card__image-wrap">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="content-card__image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Type badge */}
        <span className="content-card__badge">
          {item.type}
        </span>
      </div>

      {/* Content */}
      <div className="content-card__body">
        <div className="content-card__meta">
          <span>{item.date}</span>
          {item.location && (
            <>
              <span className="content-card__dot" />
              <span>{item.location}</span>
            </>
          )}
          {item.readTime && (
            <>
              <span className="content-card__dot" />
              <span>{item.readTime}</span>
            </>
          )}
        </div>
        <h3 className="content-card__title">
          {item.title}
        </h3>
        <p className="content-card__excerpt">
          {item.excerpt}
        </p>
        <div className="content-card__link">
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

function Section({ title, items }: { title: string; items: ContentItem[] }) {
  if (items.length === 0) return null;
  const headingId = `heading-${title.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <section className="blogs-section" aria-labelledby={headingId}>
      <div className="container">
        <div className="blogs-section__header">
          <h2 id={headingId} className="blogs-section__heading">
            {title}
          </h2>
        </div>
        <div className="blogs-section__grid">
          {items.map((item) => (
            <ContentCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BlogsHubPage() {
  const launches = getContentByType("launch");
  const news = getContentByType("news");
  const articles = getContentByType("article");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="marketing-hero">
        <Image src="/images/hero/hero.png" alt="" fill priority className="marketing-hero__bg-image" sizes="100vw" aria-hidden="true" />
        <div className="marketing-hero__bg-gradient" aria-hidden="true" />
        <div className="marketing-hero__glow" aria-hidden="true" />
        <div className="container marketing-hero__inner">
          <p className="marketing-hero__eyebrow">
            Content Hub
          </p>
          <h1 className="marketing-hero__title">
            News &amp; Insights
          </h1>
          <p className="marketing-hero__subtitle blogs-hero__subtitle">
            Stay up to date with the latest machine launches, company news, and deep dives
            into precision manufacturing processes from the LK Machinery team.
          </p>
        </div>
      </section>

      {/* ── Sections ───────────────────────────────────────────────────── */}
      <div className="blogs-sections-wrap">
        <Section title="Latest Machine Launches" items={launches} />
        <Section title="Latest News" items={news} />
        <Section title="Learning Articles" items={articles} />
      </div>
    </>
  );
}
