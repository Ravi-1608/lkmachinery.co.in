import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/seo";
import "../marketing-hero.css";
import "./investor-relations.css";

export const metadata: Metadata = {
  title: "Investor Relations",
  description:
    "LK Machinery India is a subsidiary of LK Technology Holdings Ltd (HK: 00558), a Hong Kong-listed precision machinery group. Contact us for investor and corporate relations enquiries.",
  openGraph: { url: "/investor-relations" },
  alternates: { canonical: "/investor-relations" },
};

const jsonLd = getBreadcrumbSchema([
  { name: "Home", item: "/" },
  { name: "Investor Relations", item: "/investor-relations" },
]);

// ─── No financial data is shown on this page. ─────────────────────────────
// LK Technology Holdings (HK: 00558) is a real listed entity, but this is
// the India subsidiary site. All investor/financial reporting lives on
// lk.world and the HKEx disclosure portal — we link out rather than
// reproduce or risk mis-stating figures.

export default function InvestorRelationsPage() {
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
        <div className="marketing-hero__glow marketing-hero__glow--sm" aria-hidden="true" />
        <div className="container marketing-hero__inner">
          <p className="marketing-hero__eyebrow">
            Corporate
          </p>
          <h1 className="marketing-hero__title">
            Investor Relations
          </h1>
          <p className="marketing-hero__subtitle ir-hero__subtitle">
            LK Machinery India Pvt. Ltd. is a wholly owned subsidiary of{" "}
            <strong>LK Technology Holdings Ltd</strong>, a
            precision machinery group listed on the Hong Kong Stock Exchange.
          </p>
        </div>
      </section>

      {/* ── About the parent entity ──────────────────────────────────────── */}
      <section className="ir-about">
        <div className="container ir-about__container">
          <h2 className="ir-about__heading">
            About LK Technology Holdings
          </h2>

          <div className="ir-about__prose">
            <p>
              LK Technology Holdings Ltd (stock code:{" "}
              <strong>HK: 00558</strong>) is the parent
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
              <strong>LK Machinery India Pvt. Ltd.</strong>{" "}
              is the group&apos;s wholly owned subsidiary responsible for sales,
              application support, installation, and after-sales service across the
              Indian subcontinent. The India entity does not have separately listed
              securities.
            </p>
          </div>

          {/* External links to official investor resources */}
          <div className="ir-about__links">
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
                className="ir-about__link-card"
              >
                <h3 className="ir-about__link-title">
                  {title}
                </h3>
                <p className="ir-about__link-desc">{desc}</p>
                <span className="ir-about__link-label">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact for investor queries ─────────────────────────────────── */}
      <section className="ir-contact">
        <div className="container ir-contact__container">
          <h2 className="ir-contact__heading">
            Investor &amp; Corporate Enquiries (India)
          </h2>
          <p className="ir-contact__text">
            For queries specific to LK Machinery India&apos;s operations, partnerships,
            or business development, please contact our office directly.
          </p>
          <div className="ir-contact__actions">
            <a href="mailto:avinash@lkmachinery.co.in" className="ir-contact__cta">
              Email Us
            </a>
            <Link href="/contact" className="ir-contact__cta ir-contact__cta--outline">
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
