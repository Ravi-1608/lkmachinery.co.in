import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investor Relations",
  description:
    "LK Machinery India is a subsidiary of LK Technology Holdings Ltd (HK: 00558), a Hong Kong-listed precision machinery group. Contact us for investor and corporate relations enquiries.",
  openGraph: { url: "/investor-relations" },
  alternates: { canonical: "/investor-relations" },
};

// ─── No financial data is shown on this page. ─────────────────────────────
// LK Technology Holdings (HK: 00558) is a real listed entity, but this is
// the India subsidiary site. All investor/financial reporting lives on
// lk.world and the HKEx disclosure portal — we link out rather than
// reproduce or risk mis-stating figures.

export default function InvestorRelationsPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark2 to-black"
             aria-hidden="true" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full
                        bg-brand-red/8 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            Corporate
          </p>
          <h1 className="font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl mb-5">
            Investor Relations
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl font-body">
            LK Machinery India Pvt. Ltd. is a wholly owned subsidiary of{" "}
            <strong className="text-white">LK Technology Holdings Ltd</strong>, a
            precision machinery group listed on the Hong Kong Stock Exchange.
          </p>
        </div>
      </section>

      {/* ── About the parent entity ──────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-brand-offwhite">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl mb-8">
            About LK Technology Holdings
          </h2>

          <div className="prose prose-lg max-w-none text-brand-dark/70 font-body space-y-5">
            <p>
              LK Technology Holdings Ltd (stock code:{" "}
              <strong className="text-brand-dark">HK: 00558</strong>) is the parent
              company of the LK Group — a global precision machinery manufacturer with
              operations spanning die casting, injection moulding, CNC machining, and
              industrial automation.
            </p>
            <p>
              Founded in 1979 and headquartered in Hong Kong, LK Technology has grown
              into one of the world&apos;s largest die casting machine manufacturers,
              with production plants in mainland China, Taiwan, and India, and a
              distribution and service network covering more than 30 countries.
            </p>
            <p>
              <strong className="text-brand-dark">LK Machinery India Pvt. Ltd.</strong>{" "}
              is the group&apos;s wholly owned subsidiary responsible for sales,
              application support, installation, and after-sales service across the
              Indian subcontinent. The India entity does not have separately listed
              securities.
            </p>
          </div>

          {/* External links to official investor resources */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: "HKEx Disclosure Portal",
                desc: "Official financial filings, annual reports, and regulatory announcements for LK Technology Holdings (HK: 00558).",
                href: "https://www.hkexnews.hk/listedco/listconews/SEHK/companycode/00558",
                label: "View on HKEx →",
              },
              {
                title: "LK Group Global Website",
                desc: "Corporate profile, sustainability reports, and investor communications from the LK Group parent entity.",
                href: "https://www.lk.world/en/investor",
                label: "Visit lk.world →",
              },
            ].map(({ title, desc, href, label }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-2xl bg-white border border-brand-dark/10
                           hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-brand-dark text-lg mb-2
                               group-hover:text-brand-red transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-brand-dark/60 font-body leading-relaxed mb-3">{desc}</p>
                <span className="text-brand-red text-sm font-semibold font-body">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact for investor queries ─────────────────────────────────── */}
      <section className="py-14 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl mb-4">
            Investor &amp; Corporate Enquiries (India)
          </h2>
          <p className="text-white/60 font-body text-base leading-relaxed mb-8 max-w-lg">
            For queries specific to LK Machinery India&apos;s operations, partnerships,
            or business development, please contact our office directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:avinash@lkmachinery.co.in"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white
                         font-semibold rounded-full hover:bg-brand-redDark transition-all
                         duration-200 font-body active:scale-95"
            >
              Email Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white
                         font-semibold rounded-full border border-white/20 hover:bg-white/20
                         transition-all duration-200 font-body active:scale-95"
            >
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
