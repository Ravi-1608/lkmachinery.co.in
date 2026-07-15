import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContentByType, type ContentItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "News & Insights",
  description: "Stay up to date with the latest machine launches, company news, and learning articles from LK Machinery India.",
  openGraph: { url: "/blogs" },
  alternates: { canonical: "/blogs" },
};

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Link
      href={`/blogs/${item.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-brand-dark/10
                 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] bg-brand-offwhite overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Type badge */}
        <span className="absolute top-3 left-3 bg-brand-red text-white text-xs font-semibold
                         px-2.5 py-1 rounded-full font-body uppercase tracking-wider shadow-md">
          {item.type}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark/50 uppercase tracking-widest font-body mb-3">
          <span>{item.date}</span>
          {item.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-brand-dark/20" />
              <span>{item.location}</span>
            </>
          )}
          {item.readTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-brand-dark/20" />
              <span>{item.readTime}</span>
            </>
          )}
        </div>
        <h3 className="font-heading font-bold text-brand-dark text-xl mb-3 group-hover:text-brand-red
                       transition-colors duration-200 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm text-brand-dark/60 leading-relaxed font-body flex-1 line-clamp-3">
          {item.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-brand-red text-sm font-semibold font-body">
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
  return (
    <section className="py-12 lg:py-16 border-b border-brand-dark/10 last:border-0" aria-labelledby={`heading-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 id={`heading-${title.replace(/\s+/g, '-').toLowerCase()}`} className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark2 to-black"
             aria-hidden="true" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
                        bg-brand-red/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            Content Hub
          </p>
          <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl mb-5">
            News &amp; Insights
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl font-body">
            Stay up to date with the latest machine launches, company news, and deep dives
            into precision manufacturing processes from the LK Machinery team.
          </p>
        </div>
      </section>

      {/* ── Sections ───────────────────────────────────────────────────── */}
      <div className="bg-brand-offwhite pb-12">
        <Section title="Latest Machine Launches" items={launches} />
        <Section title="Latest News" items={news} />
        <Section title="Learning Articles" items={articles} />
      </div>
    </>
  );
}
