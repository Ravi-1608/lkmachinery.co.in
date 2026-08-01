import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutJourney from "@/components/about/AboutJourney";
import { getBreadcrumbSchema } from "@/lib/seo";
import "../marketing-hero.css";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us",
  // Deliberately India-specific for search relevance -- distinct from the
  // visible hero copy above (Figma's global LK Group heritage line, kept
  // as-is per that page's own design).
  description:
    "About LK Machinery India Pvt. Ltd. — Pune-based manufacturer and supplier of die casting, injection molding, and CNC machining equipment, part of the LK Group.",
  openGraph: { url: "/about" },
  alternates: { canonical: "/about" },
};

const jsonLd = getBreadcrumbSchema([
  { name: "Home", item: "/" },
  { name: "About Us", item: "/about" },
]);

// ─── Data ─────────────────────────────────────────────────────────────────
// These stats describe the LK Group (parent), NOT LK India specifically —
// matches Figma's exact 7-stat "Company Overview" set and wording.
const STATS = [
  { value: "1979",  label: "Founded" },
  { value: "300+",  label: "Patent Certificates obtained" },
  { value: "30+",   label: "Countries where LK made machines that are in use" },
  { value: "60+",   label: "Sales and Service Centers worldwide" },
  { value: "15",    label: "Production Plants Worldwide" },
  { value: "45",    label: "Years of experience in Die Casting Industry" },
  { value: "50%+",  label: "Die-Casting industry market share" },
] as const;

// Figma shows icon + title only (lightbulb / megaphone / chat / document),
// no description text -- JUDGMENT CALL: switched to matching icons for visual
// fidelity, but kept the description copy since it's real, useful content
// and dropping it purely for a pixel-match would be a net loss, not a fix.
const PROCESS_STEPS = [
  {
    title: "Project Consultation",
    desc: "We start with a structured conversation about your production goals, part geometry, material, and cycle-time targets — not a brochure.",
    icon: "lightbulb",
  },
  {
    title: "Research & Feasibility",
    desc: "Our application engineers analyse your requirements against our machine portfolio and prior case studies, identifying the optimal configuration.",
    icon: "megaphone",
  },
  {
    title: "Solution Design",
    desc: "A detailed proposal: machine model, clamping force, automation layout, tooling considerations, and ROI estimate — presented for your review.",
    icon: "chat",
  },
  {
    title: "Delivery & Implementation",
    desc: "Factory acceptance test, installation, commissioning, and operator training — followed by scheduled preventive maintenance from our Pune team.",
    icon: "document",
  },
] as const;

const PROCESS_ICONS: Record<string, React.ReactNode> = {
  lightbulb: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.6.5 1 1.3 1 2.1V16h6v-1.4c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 2Z"/>
    </svg>
  ),
  megaphone: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11v2a2 2 0 0 0 2 2h1l3 5V4l-3 5H5a2 2 0 0 0-2 2Z"/>
      <path d="M14 9a3 3 0 0 1 0 6M17 6a7 7 0 0 1 0 12"/>
    </svg>
  ),
  chat: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/>
    </svg>
  ),
  document: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/>
      <path d="M14 2v6h6M9 15l2 2 4-4"/>
    </svg>
  ),
};

export default function AboutPage() {
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
          <h1 className="marketing-hero__title about-hero__title">
            Precision Engineering at Global Scale
          </h1>
          <p className="marketing-hero__subtitle about-hero__subtitle">
            Leading manufacturer of die-casting and injection molding machinery serving
            industries worldwide with cutting-edge technology and unmatched reliability
            since 1979.
          </p>
        </div>
      </section>

      {/* ── Company Profile ──────────────────────────────────────────────── */}
      <section className="about-profile" aria-labelledby="profile-heading">
        <div className="container">
          <h2 id="profile-heading" className="about-profile__heading">
            Company <span className="about-profile__highlight">Profile</span>
          </h2>
          <div className="about-profile__grid">
            <div>
              <h3 className="about-profile__subheading">
                About <span className="about-profile__highlight">LK Machinery</span>
              </h3>
              <p className="about-profile__text">
                LK Technology Holdings Limited was founded in 1979 and listed on the Main
                Board of the Hong Kong Stock Exchange in 2006. It is a major global
                manufacturer of die casting machines, one of China&apos;s top five
                manufacturers of injection molding machines, and a leading domestic
                manufacturer of CNC machining centers. With CEO Mr. Liu Zhuo Ming at the
                helm, LK has established 15 modern production plants — in Shenzhen,
                Zhongshan, Ningbo, Shanghai, Kunshan, Anhui, Fuxin and Taiwan, as well as
                Italy — and more than 60 sales and service centers worldwide.
              </p>
              <div className="about-profile__cards">
                <div className="about-profile__card">
                  <p className="about-profile__card-heading">Our Mission</p>
                  <p className="about-profile__card-text">
                    To empower manufacturers worldwide with innovative, reliable machinery
                    solutions that optimize production efficiency and quality.
                  </p>
                </div>
                <div className="about-profile__card">
                  <p className="about-profile__card-heading">Our Vision</p>
                  <p className="about-profile__card-text">
                    To be the world&apos;s most trusted partner in advanced manufacturing
                    technology, setting industry standards for innovation and
                    sustainability.
                  </p>
                </div>
              </div>
            </div>
            <div className="about-profile__image-wrap">
              <Image
                src="/images/company/welcome-building.png"
                alt="LK Machinery precision manufacturing facility"
                fill
                className="about-profile__image"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <section className="about-stats" aria-label="LK Group at a glance">
        <div className="container">
          <p className="about-stats__label">
            Company <span className="about-stats__label-highlight">Overview</span>
          </p>
          <div className="about-stats__grid">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="about-stats__value">{value}</p>
                <p className="about-stats__caption">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Journey timeline ──────────────────────────────────────── */}
      <section className="about-timeline" aria-labelledby="timeline-heading">
        <div className="container about-timeline__container">
          <h2 id="timeline-heading" className="about-timeline__heading">
            Our Global <span className="about-timeline__highlight">Journey</span>
          </h2>
          <AboutJourney />
        </div>
      </section>

      {/* ── India Presence ───────────────────────────────────────────────────
          JUDGMENT CALL: Figma shows an "LK INDIA" section with a multi-state
          India map graphic (pins across ~12 states). We have no verified data
          on which specific states LK India actually operates in beyond the
          single confirmed Chakan, Pune facility -- inventing a multi-state
          presence map would be fabrication under this project's no-invented-
          content rule. Keeping the existing honest single-location + "Pan-
          India sales & service" framing instead of a geographic map with
          made-up markers. Revisit if the founder provides real state-level
          coverage data. ───────────────────────────────────────────────────── */}
      <section className="about-presence">
        <div className="container">
          <div className="about-presence__grid">
            <div>
              <p className="about-presence__eyebrow">
                India Operations
              </p>
              <h2 className="about-presence__heading">
                Rooted in Pune,<br />Serving All of India
              </h2>
              <p className="about-presence__text">
                Our Chakan MIDC facility in Pune houses sales, application engineering,
                spare-parts inventory, and a trained service team — covering installation,
                commissioning, and preventive maintenance across the country.
              </p>
              <address className="about-presence__address">
                L.K. Machinery India Pvt. Ltd.<br />
                Plot No. PAP K-5 &amp; K-6, Chakan MIDC, Phase II<br />
                Village-Khalumbre, Tal-Khed, Pune – 410501
              </address>
              <Link href="/contact" className="about-presence__cta">
                Contact our Pune team
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Stylised presence block */}
            <div className="about-presence__card">
              {[
                ["Headquarters", "Pune, Maharashtra"],
                ["Coverage", "Pan-India sales & service"],
                ["Parent Company", "LK Technology Holdings (HK: 00558)"],
                ["Incorporated", "2012"],
              ].map(([k, v]) => (
                <div key={k} className="about-presence__row">
                  <p className="about-presence__row-label">{k}</p>
                  <p className="about-presence__row-value">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work Process ─────────────────────────────────────────────────── */}
      <section className="about-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="about-process__header">
            <p className="about-process__eyebrow">
              How We Work
            </p>
            <h2 id="process-heading" className="about-process__heading">
              From first call to full commissioning
            </h2>
          </div>
          <div className="about-process__grid">
            {PROCESS_STEPS.map(({ title, desc, icon }) => (
              <div key={title} className="about-process__card">
                <div className="about-process__icon" aria-hidden="true">
                  {PROCESS_ICONS[icon]}
                </div>
                <h3 className="about-process__title">{title}</h3>
                <p className="about-process__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
