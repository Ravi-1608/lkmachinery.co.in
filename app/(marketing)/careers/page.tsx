import type { Metadata } from "next";
import Image from "next/image";
import JobOpenings from "@/components/careers/JobOpenings";
import CareersApplyForm from "@/components/careers/CareersApplyForm";
import { getBreadcrumbSchema } from "@/lib/seo";
import "../marketing-hero.css";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join LK Machinery India and be part of a growing industrial leader delivering precision die-casting and injection molding solutions.",
  openGraph: { url: "/careers" },
  alternates: { canonical: "/careers" },
};

const jsonLd = getBreadcrumbSchema([
  { name: "Home", item: "/" },
  { name: "Careers", item: "/careers" },
]);

// ─── "Why Work With" cards — copy + icon transcribed from Figma
// ("Final- join us.png"). Icons redrawn as simple stroke line-art (same
// technique as about/page.tsx's PROCESS_ICONS) rather than exported as
// images, matching this codebase's hand-coded-SVG icon convention. ────────
const WHY_WORK_CARDS = [
  {
    title: "Stable & Growing Organization",
    desc: "Be part of a trusted industrial brand with decades of expertise and established market presence.",
    icon: "factory",
  },
  {
    title: "Technical Skill Development",
    desc: "Continuous learning through hands-on training and direct exposure to advanced machinery systems.",
    icon: "book",
  },
  {
    title: "Career Progression",
    desc: "Clear pathways for engineers, technicians, and management roles with performance-based advancement.",
    icon: "trending-up",
  },
  {
    title: "Safe & Professional Work Environment",
    desc: "Structured processes and industry-compliant facilities ensuring workplace safety and operational discipline.",
    icon: "shield-check",
  },
] as const;

const WHY_WORK_ICONS: Record<string, React.ReactNode> = {
  factory: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V10l5 3v-3l5 3V6l6 4v11H3Z"/>
      <path d="M7 17h1M11 17h1M15 17h1" strokeWidth="2"/>
    </svg>
  ),
  book: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5C4 4.67 4.67 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z"/>
      <path d="M20 5.5c0-.83-.67-1.5-1.5-1.5H12v16h6.5c.83 0 1.5-.67 1.5-1.5v-13Z"/>
    </svg>
  ),
  "trending-up": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8"/>
      <path d="M15 7h6v6"/>
    </svg>
  ),
  "shield-check": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 4 5v6c0 5 3.4 8.9 8 11 4.6-2.1 8-6 8-11V5l-8-3Z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
};

// ─── "Our Work Culture" tiles — Figma shows filled red/black icon
// illustrations (person, people, clipboard, bar chart). Per the task brief,
// redrawn as simple stroke line-art matching this codebase's established
// icon style (see QuickLinks.tsx / about/page.tsx) instead of replicating
// Figma's specific icon artwork, which we have no source asset for.
// Figma's own labels read "Accountibility" / "Continous Improvement" —
// corrected obvious spelling here since these are plain UI labels, not
// data that needs to match a source verbatim. ─────────────────────────────
const WORK_CULTURE_TILES = [
  { label: "Discipline", icon: "discipline" },
  { label: "Teamwork", icon: "teamwork" },
  { label: "Accountability", icon: "accountability" },
  { label: "Continuous Improvement", icon: "improvement" },
] as const;

const WORK_CULTURE_ICONS: Record<string, React.ReactNode> = {
  discipline: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  teamwork: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3"/>
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
      <path d="M16 5.2a3 3 0 0 1 0 5.6M21 20c0-2.8-2-5.1-4.7-5.7"/>
    </svg>
  ),
  accountability: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"/>
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/>
      <path d="m9 13 2 2 4-4M9 9h6"/>
    </svg>
  ),
  improvement: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V13M12 20V8M20 20v-6"/>
      <path d="M4 9l4-4M12 4l4 4M17 8l4 3"/>
    </svg>
  ),
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Section 1: Hero ──────────────────────────────────────────────── */}
      <section className="marketing-hero">
        <Image
          src="/images/hero/hero.png"
          alt=""
          fill
          priority
          className="marketing-hero__bg-image"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="marketing-hero__bg-gradient" aria-hidden="true" />
        <div className="marketing-hero__glow" aria-hidden="true" />
        <div className="container marketing-hero__inner">
          <h1 className="marketing-hero__title careers-hero__title">
            Build Your Career in <span className="careers-hero__highlight">Advanced Manufacturing</span>
          </h1>
          <p className="marketing-hero__subtitle careers-hero__subtitle">
            Join <span className="careers-hero__highlight">LK Machinery India</span> and be part of a
            growing industrial leader delivering precision <span className="careers-hero__highlight">die-casting</span> and{" "}
            <span className="careers-hero__highlight">injection molding solutions.</span>
          </p>
        </div>
      </section>

      {/* ── Section 2: Why Work With LK Machinery India ──────────────────── */}
      <section className="careers-why" aria-labelledby="why-heading">
        <div className="container">
          <div className="careers-why__header">
            <h2 id="why-heading" className="careers-why__heading">
              Why Work With <span className="careers-why__highlight">LK Machinery India</span>
            </h2>
            <p className="careers-why__subtext">
              A stable industrial organization offering long-term career opportunities in precision manufacturing.
            </p>
          </div>
          <div className="careers-why__grid">
            {WHY_WORK_CARDS.map(({ title, desc, icon }) => (
              <div key={title} className="careers-why__card">
                {/* Decorative diagonal-cut shapes — see careers.css for the
                    clip-path geometry note. */}
                <span className="careers-why__shape-grey" aria-hidden="true" />
                <span className="careers-why__shape-black" aria-hidden="true">
                  <span className="careers-why__icon">{WHY_WORK_ICONS[icon]}</span>
                </span>
                <h3 className="careers-why__card-title">{title}</h3>
                <p className="careers-why__card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Job Openings ───────────────────────────────────────── */}
      <section className="careers-openings" aria-labelledby="openings-heading">
        <div className="container">
          <h2 id="openings-heading" className="careers-openings__heading">
            JOB <span className="careers-openings__highlight">OPENINGS</span>
          </h2>
          <JobOpenings />
        </div>
      </section>

      {/* ── Section 4: Our Work Culture ───────────────────────────────────── */}
      <section className="careers-culture" aria-labelledby="culture-heading">
        <div className="container">
          <h2 id="culture-heading" className="careers-culture__heading">
            OUR <span className="careers-culture__highlight">WORK CULTURE</span>
          </h2>
          <div className="careers-culture__grid">
            {WORK_CULTURE_TILES.map(({ label, icon }) => (
              <div key={label} className="careers-culture__tile">
                <div className="careers-culture__tile-icon" aria-hidden="true">
                  {WORK_CULTURE_ICONS[icon]}
                </div>
                <p className="careers-culture__tile-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Apply Now (inline application form — new, from Figma) ── */}
      <section id="apply-now" className="careers-apply-now" aria-labelledby="apply-now-heading">
        <div className="container careers-apply-now__inner">
          <h2 id="apply-now-heading" className="careers-apply-now__heading">
            APPLY <span className="careers-apply-now__highlight">NOW</span>
          </h2>
          <div className="careers-apply-now__card">
            <CareersApplyForm />
          </div>
        </div>
      </section>

      {/* ── Section 6: Open Roles (ATS Redirect) ──────────────────────────────
          KEPT AS-IS per explicit founder instruction — this LinkedIn-redirect
          approach is already approved; only the exact URL is still pending
          (see TODO below). Not present in the Figma export for this page, but
          intentionally retained as a secondary path alongside the new inline
          Apply Now form above. ─────────────────────────────────────────── */}
      <section className="careers-apply" aria-labelledby="apply-heading">
        <div className="container careers-apply__inner">
          <p className="careers-apply__eyebrow">
            Open Roles
          </p>
          <h2 id="apply-heading" className="careers-apply__heading">
            Ready to join us?
          </h2>
          <p className="careers-apply__text">
            We manage all our job postings and applications through LinkedIn. View our current openings and apply directly via our company page.
          </p>

          {/* TODO: Confirm final LinkedIn URL with founder */}
          <a
            href="https://www.linkedin.com/company/lk-machinery-india-pvt-ltd/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="careers-apply__cta"
          >
            View open roles on LinkedIn
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
