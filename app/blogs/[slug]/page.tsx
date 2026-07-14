import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getContent,
  getAllContentSlugs,
  getRelatedContent,
  type ContentItem,
} from "@/lib/content";

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
  };
}

export default async function ContentDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getContent(slug);
  if (!item) notFound();

  const related = getRelatedContent(slug, 3);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex flex-col justify-end overflow-hidden bg-brand-dark pt-32 pb-16">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/20"
             aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/50 text-sm font-body mb-6"
               aria-label="Breadcrumb">
            <Link href="/blogs" className="hover:text-white transition-colors">News &amp; Insights</Link>
            <span>/</span>
            <span className="text-white capitalize">{item.type}s</span>
          </nav>

          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-4">
            {item.type}
          </p>
          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm font-body">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {item.date}
            </span>
            {item.location && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {item.location}
                </span>
              </>
            )}
            {item.readTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {item.readTime}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <article className="py-16 lg:py-20 bg-brand-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-brand-dark/80 font-body leading-relaxed mb-12 italic border-l-4 border-brand-red pl-6 py-2">
            {item.excerpt}
          </p>

          <div className="space-y-12">
            {item.body.map((section, idx) => (
              <section key={idx}>
                {section.heading && (
                  <h2 className="font-heading text-brand-dark text-2xl sm:text-3xl mb-6">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-6">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-brand-dark/70 text-lg leading-relaxed font-body">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* If it's a launch, link to the product */}
          {item.type === "launch" && item.relatedProductSlug && (
            <div className="mt-16 p-8 rounded-2xl bg-white border border-brand-dark/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-2">
                  Featured Product
                </p>
                <h3 className="font-heading text-brand-dark text-2xl">
                  Explore the Machine
                </h3>
              </div>
              <Link
                href={`/products/${item.relatedProductSlug}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-brand-red text-white
                           font-semibold rounded-full hover:bg-brand-redDark active:scale-95
                           transition-all duration-200 font-body shadow-lg shadow-brand-red/20"
              >
                View Specifications
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* ── Related Content ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 bg-brand-dark" aria-labelledby="related-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="font-heading text-white text-3xl mb-10 capitalize">
              More {item.type}s
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((relItem) => (
                <Link
                  key={relItem.slug}
                  href={`/blogs/${relItem.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-white/5 border border-white/10
                             hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={relItem.image}
                      alt={relItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-white/50 text-xs font-body mb-2 flex items-center gap-2">
                      <span>{relItem.date}</span>
                      {relItem.readTime && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>{relItem.readTime}</span>
                        </>
                      )}
                    </p>
                    <h3 className="font-heading text-white text-lg mb-3 group-hover:text-brand-red transition-colors duration-200 line-clamp-2">
                      {relItem.title}
                    </h3>
                    <p className="mt-auto inline-flex items-center gap-1.5 text-brand-red text-sm font-semibold font-body">
                      Read more
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
