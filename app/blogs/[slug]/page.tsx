import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getContent,
  getAllContentSlugs,
  getRelatedContent,
  type ContentItem,
  type ContentBodySection,
} from "@/lib/content";
import { getCategory, getModel } from "@/lib/products";
import { getBreadcrumbSchema } from "@/lib/seo";
import "./blog-detail.css";

// ─── Static generation ─────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllContentSlugs();
}

// ─── Per-page metadata ─────────────────────────────────────────────────────
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getContent(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      url: `/blogs/${slug}`,
      images: [{ url: item.image, alt: item.title }],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

// ─── Text-splitting helpers ─────────────────────────────────────────────────
// Figma manually recolors a trailing portion of certain headings in red. There's
// no data field that encodes which words should be red, so we approximate it
// with a word-count heuristic verified directly against all 3 Figma references:
//   - Page titles: last 3 words red ("...Launched in India", "...at PlastIndia
//     2026", "Understanding High-Pressure Die | Casting Process Fundamentals" —
//     this last one is one of our REAL article titles and matches exactly).
//   - Section H2s: last 2 words red ("What is High-Pressure Die Casting?" →
//     red "Die Casting?", "Material Selection and Properties" → red "and
//     Properties", "Quality Control and Defect Prevention" → red "Defect
//     Prevention").
// If a string is too short to split meaningfully, render it plain rather than
// guessing — same "no clear split point" precedent already used in the product
// model page for single-word names.
function splitHighlight(text: string, wordCount: number): { main: string; highlight: string | null } {
  const words = text.split(" ");
  if (words.length <= wordCount) return { main: text, highlight: null };
  return {
    main: words.slice(0, -wordCount).join(" "),
    highlight: words.slice(-wordCount).join(" "),
  };
}

// Some body paragraphs are authored as bullet strings ("• Title: description.")
// -- see aviss-ii-launch-2026's "Key Highlights" section in content.json. We
// detect and parse these into real checklist/list items instead of rendering
// the raw "• " prefix as plain text.
const BULLET_PREFIX = "• ";
function isBullet(p: string): boolean {
  return p.startsWith(BULLET_PREFIX);
}
function parseBullet(p: string): { title: string | null; description: string } {
  const text = p.slice(BULLET_PREFIX.length);
  const colonIdx = text.indexOf(": ");
  if (colonIdx === -1) return { title: null, description: text };
  return { title: text.slice(0, colonIdx), description: text.slice(colonIdx + 2) };
}

// ─── Small shared icon components ───────────────────────────────────────────
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  );
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Maps a content type to the anchor id rendered on /blogs' section headings
// (see app/blogs/page.tsx `Section` -- id is `heading-${title-slug}`), so the
// launch template's "Explore Other Launches" link can jump straight to the
// right hub section instead of just the top of /blogs.
const HUB_SECTION_ANCHOR: Record<ContentItem["type"], string> = {
  launch: "/blogs#heading-latest-machine-launches",
  news: "/blogs#heading-latest-news",
  article: "/blogs#heading-learning-articles",
};

// ─── Page ───────────────────────────────────────────────────────────────────
export default async function ContentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContent(slug);
  if (!item) notFound();

  const related = getRelatedContent(slug, 3);

  // Launch entries link to a real product via "category/model-slug" -- reuse
  // that product's own data (never fabricated) for the Highlights/Industries
  // galleries below, per the founder's explicit instruction.
  const [relCategorySlug, relModelSlug] = item.relatedProductSlug?.split("/") ?? [];
  const relatedProduct = relCategorySlug && relModelSlug ? getModel(relCategorySlug, relModelSlug) : undefined;
  const relatedCategory = relCategorySlug ? getCategory(relCategorySlug) : undefined;

  const { main: titleMain, highlight: titleHighlight } = splitHighlight(item.title, 3);

  const jsonLd = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "News & Insights", item: "/blogs" },
    { name: item.title, item: `/blogs/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Banner header — shared shape across all 3 templates: light
          background, dark text, trailing-words-in-red title. Figma doesn't
          show a visible breadcrumb row on any of the 3 references (unlike the
          old all-dark generic template), so it's dropped here; the JSON-LD
          breadcrumb schema above still covers SEO. ─────────────────────── */}
      <section className="blog-banner">
        <div className="container blog-banner__inner">
          <h1 className="blog-banner__title">
            {titleMain}
            {titleHighlight && <> <span className="blog-banner__highlight">{titleHighlight}</span></>}
          </h1>
          <p className="blog-banner__subtitle">{item.excerpt}</p>

          {/* Launch meta is plain text with a "|" separator (no icons); news
              and article meta use icon rows -- both verified per-reference. */}
          {item.type === "launch" ? (
            <div className="blog-banner__meta blog-banner__meta--plain">
              <span className="blog-banner__meta-date">{item.date}</span>
              {item.location && (
                <>
                  <span className="blog-banner__meta-sep">|</span>
                  <span>{item.location}</span>
                </>
              )}
            </div>
          ) : (
            <div className="blog-banner__meta">
              <span className="blog-banner__meta-item">
                <CalendarIcon />
                {item.date}
              </span>
              {item.location && (
                <>
                  <span className="blog-banner__dot" />
                  <span className="blog-banner__meta-item">
                    <PinIcon />
                    {item.location}
                  </span>
                </>
              )}
              {item.readTime && (
                <>
                  <span className="blog-banner__dot" />
                  <span className="blog-banner__meta-item">
                    <ClockIcon />
                    {item.readTime}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Type-specific body ──────────────────────────────────────────── */}
      {item.type === "launch" && (
        <LaunchTemplate item={item} relatedProduct={relatedProduct} relatedCategory={relatedCategory} />
      )}
      {item.type === "news" && <NewsTemplate item={item} />}
      {item.type === "article" && <ArticleTemplate item={item} />}

      {/* ── Next-content navigation — launches get a single link (Figma
          shows "EXPLORE OTHER LAUNCHES »" as a link, not a card grid; with
          only 2 real launch entries a 3-card "related" grid doesn't make
          sense anyway). News/articles get the full related-cards grid. ── */}
      {item.type === "launch" ? (
        <section className="launch-explore">
          <div className="container launch-explore__inner">
            <Link href={HUB_SECTION_ANCHOR.launch} className="launch-explore__cta">
              Explore Other Launches
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h8M6 4l4 4-4 4M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      ) : (
        related.length > 0 && (
          <section className="blog-related" aria-labelledby="related-heading">
            <div className="container">
              <h2 id="related-heading" className="blog-related__heading">
                {item.type === "news" ? (
                  <>Related <span className="blog-related__highlight">News</span></>
                ) : (
                  <>Related <span className="blog-related__highlight">Learning Articles</span></>
                )}
              </h2>
              <div className="blog-related__grid">
                {related.map((relItem) => (
                  <Link key={relItem.slug} href={`/blogs/${relItem.slug}`} className="blog-related__card">
                    <div className="blog-related__image-wrap">
                      <Image
                        src={relItem.image}
                        alt={relItem.title}
                        fill
                        className="blog-related__image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="blog-related__body">
                      <p className="blog-related__meta">
                        <span>{relItem.date}</span>
                        {relItem.readTime && (
                          <>
                            <span className="blog-related__dot" />
                            <span>{relItem.readTime}</span>
                          </>
                        )}
                      </p>
                      <h3 className="blog-related__title">
                        {relItem.title}
                      </h3>
                      <p className="blog-related__link">
                        Read more
                        <ArrowIcon />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
}

// ─── Launch template ────────────────────────────────────────────────────────
// Figma ("machine launches.png"): OVERVIEW (2-col image + text/checklist),
// PRODUCT HIGHLIGHTS (image grid), APPLICABLE INDUSTRIES (image grid).
function LaunchTemplate({
  item,
  relatedProduct,
  relatedCategory,
}: {
  item: ContentItem;
  relatedProduct: ReturnType<typeof getModel>;
  relatedCategory: ReturnType<typeof getCategory>;
}) {
  // Overview text: render each body section's paragraphs. The "Overview"
  // heading itself is suppressed since it would duplicate the section title
  // below; any other real heading (e.g. mcg5's "Meeting the EV Challenge")
  // is kept as a sub-heading so real authored content isn't dropped.
  // Bullet-formatted paragraphs ("• Title: description") become checklist
  // items with a checkmark, matching Figma's Overview checklist -- this is
  // real body content (content.json), not the product's `highlights` array.
  const checklistItems: { title: string | null; description: string }[] = [];
  const textSections: { heading?: string; paragraphs: string[] }[] = [];
  for (const section of item.body) {
    const plain = section.paragraphs.filter((p) => !isBullet(p));
    const bullets = section.paragraphs.filter(isBullet);
    bullets.forEach((b) => checklistItems.push(parseBullet(b)));
    if (plain.length > 0) {
      const heading = section.heading && section.heading.trim().toLowerCase() !== "overview" ? section.heading : undefined;
      textSections.push({ heading, paragraphs: plain });
    }
  }

  const hasHighlightsGallery = !!relatedProduct?.highlights && relatedProduct.highlights.length > 0;

  return (
    <>
      {/* Overview */}
      <section className="launch-overview">
        <div className="container">
          <h2 className="launch-section-heading">OVERVIEW</h2>
          <div className="launch-overview__grid">
            <div className="launch-overview__image-wrap">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                className="launch-overview__image"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="launch-overview__content">
              {textSections.map((section, idx) => (
                <div key={idx}>
                  {section.heading && <h3 className="launch-overview__subheading">{section.heading}</h3>}
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="launch-overview__paragraph">{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {checklistItems.length > 0 && (
            <ul className="launch-overview__checklist">
              {checklistItems.map((c, i) => (
                <li key={i} className="launch-overview__checklist-item">
                  <span className="launch-overview__check" aria-hidden="true"><CheckIcon /></span>
                  <span>
                    {c.title && <strong>{c.title}</strong>}
                    {c.title && <br />}
                    {c.description}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Figma's Overview screenshot has no explicit CTA, but every launch
              is already tied to a real product page via relatedProductSlug --
              keeping a lightweight link here is a UX affordance, not
              fabricated content. */}
          {relatedProduct && (
            <Link href={`/products/${item.relatedProductSlug}`} className="launch-overview__cta">
              View Full Specifications
              <ArrowIcon />
            </Link>
          )}
        </div>
      </section>

      {/* Product Highlights — reuses the linked product's own highlights[]
          (data/products.json), paired with that product's own image since
          there's no distinct per-highlight photography, same honest pattern
          documented in app/products/[category]/[model]/page.tsx. */}
      {hasHighlightsGallery && relatedProduct && (
        <section className="launch-highlights">
          <div className="container">
            <h2 className="launch-section-heading">
              PRODUCT <span className="launch-section-heading__accent">HIGHLIGHTS</span>
            </h2>
            <div className="launch-highlights__grid">
              {relatedProduct.highlights!.map((h, i) => (
                <div key={i} className="launch-highlights__tile">
                  <div className="launch-highlights__image-wrap">
                    <Image
                      src={relatedProduct.image}
                      alt={h}
                      fill
                      className="launch-highlights__image"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <p className="launch-highlights__caption">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applicable Industries — reuses the linked product's category-wide
          industryTiles[] (data/products.json), same tiles shown on the
          category listing and model pages. */}
      {relatedCategory?.industryTiles && (
        <section className="launch-industries">
          <div className="container">
            <h2 className="launch-section-heading">
              APPLICABLE <span className="launch-section-heading__accent">INDUSTRIES</span>
            </h2>
            <div className="launch-industries__grid">
              {relatedCategory.industryTiles.map((tile, i) => (
                <div key={i} className="launch-industries__tile">
                  <div className="launch-industries__image-wrap">
                    <Image
                      src={tile.image}
                      alt={`${tile.industry} — ${tile.caption}`}
                      fill
                      className="launch-industries__image"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  <p className="launch-industries__caption">{tile.industry}-{tile.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

// ─── News template ──────────────────────────────────────────────────────────
// Figma ("latest news.png"): banner, then full hero photo, then boxed grey
// callout sections with partial-red headings + bullet lists, then related
// news cards (the related-cards grid is rendered by the parent above).
function NewsTemplate({ item }: { item: ContentItem }) {
  return (
    <>
      <section className="news-hero">
        <div className="container">
          <div className="news-hero__image-wrap">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              className="news-hero__image"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <p className="news-hero__intro">{item.excerpt}</p>
        </div>
      </section>

      <section className="news-callouts">
        <div className="container news-callouts__container">
          {item.body.map((section, idx) => {
            const { main, highlight } = section.heading ? splitHighlight(section.heading, 2) : { main: "", highlight: null };
            const plain = section.paragraphs.filter((p) => !isBullet(p));
            const bullets = section.paragraphs.filter(isBullet);
            return (
              <div key={idx} className="news-callout">
                {section.heading && (
                  <h2 className="news-callout__heading">
                    {main}{highlight && <> <span className="news-callout__accent">{highlight}</span></>}
                  </h2>
                )}
                {plain.map((p, pIdx) => (
                  <p key={pIdx} className="news-callout__paragraph">{p}</p>
                ))}
                {bullets.length > 0 && (
                  <ul className="news-callout__list">
                    {bullets.map((b, bIdx) => {
                      const { title, description } = parseBullet(b);
                      return (
                        <li key={bIdx}>
                          {title && <strong>{title}: </strong>}
                          {description}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ─── Article template ───────────────────────────────────────────────────────
// Figma ("learning articles.png"): long-form flowing text, red-highlighted
// H2s, embedded images mid-body, ending in a CONCLUSION section.
function ArticleTemplate({ item }: { item: ContentItem }) {
  return (
    <section className="article-body">
      <div className="container article-body__container">
        <p className="article-body__intro">{item.excerpt}</p>

        {item.body.map((section: ContentBodySection, idx) => {
          const { main, highlight } = section.heading ? splitHighlight(section.heading, 2) : { main: "", highlight: null };
          const plain = section.paragraphs.filter((p) => !isBullet(p));
          const bullets = section.paragraphs.filter(isBullet);
          // "Conclusion" only renders as a distinct closing section when the
          // real data actually names a section that -- see
          // optimizing-injection-molding-cycle-times, which has no conclusion
          // section in content.json and simply ends without one, rather than
          // us relabeling its last section to fabricate one.
          const isConclusion = section.heading?.trim().toLowerCase() === "conclusion";
          return (
            <div key={idx} className={isConclusion ? "article-section article-section--conclusion" : "article-section"}>
              {section.heading && (
                <h2 className="article-section__heading">
                  {main}{highlight && <> <span className="article-section__accent">{highlight}</span></>}
                </h2>
              )}
              {plain.map((p, pIdx) => (
                <p key={pIdx} className="article-section__paragraph">{p}</p>
              ))}
              {bullets.length > 0 && (
                <ul className="article-section__list">
                  {bullets.map((b, bIdx) => {
                    const { title, description } = parseBullet(b);
                    return (
                      <li key={bIdx}>
                        {title && <strong>{title}: </strong>}
                        {description}
                      </li>
                    );
                  })}
                </ul>
              )}
              {/* Figma embeds two distinct mid-body photos; our real articles
                  only have one real image each (the hero photo) and no
                  relatedProductSlug to borrow a second real photo from.
                  Duplicating the same file twice would read as a content bug
                  (the exact incident this project got burned by before), so
                  it's embedded exactly once, after the first section. */}
              {idx === 0 && (
                <div className="article-section__image-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="article-section__image"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
