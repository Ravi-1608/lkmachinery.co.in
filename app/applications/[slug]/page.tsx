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

// ─── Category label map ────────────────────────────────────────────────────
const CAT_LABELS: Record<string, { label: string; name: string }> = {
  dcm:        { label: "DCM",        name: "Die Casting Machines" },
  imm:        { label: "IMM",        name: "Injection Moulding Machines" },
  cnc:        { label: "CNC",        name: "CNC Machining Centres" },
  automation: { label: "Automation", name: "Robot Automation" },
};

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  const app = getApplication(slug);
  if (!app) notFound();

  const allApps = getAllApplications();
  const relatedApps = allApps.filter((a) => a.slug !== slug).slice(0, 3);

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
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-brand-dark">
        <Image
          src={app.image}
          alt={app.name}
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent"
             aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-white/50 text-sm font-body mb-4"
               aria-label="Breadcrumb">
            <Link href="/applications" className="hover:text-white transition-colors">Applications</Link>
            <span>/</span>
            <span className="text-white">{app.name}</span>
          </nav>
          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            Application
          </p>
          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl mb-5">
            {app.name}
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl font-body">
            {app.description}
          </p>
        </div>
      </section>

      {/* ── Relevant product categories ──────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-brand-offwhite" aria-labelledby="relevant-cats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="relevant-cats" className="font-heading text-brand-dark text-3xl sm:text-4xl mb-10">
            Recommended Machine Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.relevantCategories.map((catSlug) => {
              const cat = CAT_LABELS[catSlug];
              if (!cat) return null;
              return (
                <Link
                  key={catSlug}
                  href={`/products/${catSlug}`}
                  className="group flex flex-col gap-3 p-7 rounded-2xl bg-white border border-brand-dark/10
                             hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-brand-red text-white
                                   text-xs font-semibold font-body">
                    {cat.label}
                  </span>
                  <h3 className="font-heading text-brand-dark text-xl group-hover:text-brand-red
                                 transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <span className="mt-auto flex items-center gap-1.5 text-brand-red text-sm
                                   font-semibold font-body">
                    View machines
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Other applications ───────────────────────────────────────────── */}
      <section className="py-14 bg-brand-dark" aria-labelledby="other-apps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="other-apps" className="font-heading text-white text-2xl mb-8">
            Other Applications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedApps.map((a) => (
              <Link
                key={a.slug}
                href={`/applications/${a.slug}`}
                className="group relative rounded-xl overflow-hidden aspect-[3/2]"
              >
                <Image src={a.image} alt={a.name} fill
                       className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                <span className="absolute bottom-4 left-4 font-heading text-white text-lg">
                  {a.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry form ────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-brand-offwhite" aria-labelledby="enquiry-app-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-2">
              Get in Touch
            </p>
            <h2 id="enquiry-app-heading" className="font-heading text-brand-dark text-3xl sm:text-4xl">
              Enquire about {app.name} solutions
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-md border border-brand-dark/8">
            <EnquiryForm productInterested={`${app.name} Application`} />
          </div>
        </div>
      </section>
    </>
  );
}
