import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "LK Machinery India Pvt. Ltd. — part of LK Group, a global precision machinery leader founded in 1979 with 300+ patents, 60+ service centres, and 50%+ die-casting market share across Asia.",
  openGraph: { url: "/about" },
};

// ─── Data ─────────────────────────────────────────────────────────────────
// These stats describe the LK Group (parent), NOT LK India specifically.
// Copy is written to be honest about this distinction.
const STATS = [
  { value: "1979",  label: "LK Group Founded" },
  { value: "300+",  label: "Patents" },
  { value: "30+",   label: "Countries Served" },
  { value: "60+",   label: "Service Centres" },
  { value: "15",    label: "Production Plants" },
  { value: "50%+",  label: "Die-Casting Market Share (Asia)" },
] as const;

const TIMELINE = [
  { year: "1979", event: "LK Group established in Hong Kong, begins manufacturing die casting machines." },
  { year: "1994", event: "Launch of the AVIS hot-chamber series — now a global benchmark for quality." },
  { year: "2006", event: "LK Group joins China's Top 500 Machinery Enterprises list (retained every year since)." },
  { year: "2007", event: "LK die casting machines account for 50% of market sales in China, Brazil, and Southeast Asia." },
  { year: "2015", event: "CNC division established in Taiwan; Apple supply-chain certification achieved." },
  { year: "2012", event: "LK Machinery India Pvt. Ltd. incorporated — dedicated operations for the Indian subcontinent." },
  { year: "Today", event: "27 machine models, 3 automation product lines, and a Chakan MIDC base serving customers across India." },
] as const;

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Project Consultation",
    desc: "We start with a structured conversation about your production goals, part geometry, material, and cycle-time targets — not a brochure.",
  },
  {
    step: "02",
    title: "Research & Feasibility",
    desc: "Our application engineers analyse your requirements against our machine portfolio and prior case studies, identifying the optimal configuration.",
  },
  {
    step: "03",
    title: "Solution Design",
    desc: "A detailed proposal: machine model, clamping force, automation layout, tooling considerations, and ROI estimate — presented for your review.",
  },
  {
    step: "04",
    title: "Delivery & Implementation",
    desc: "Factory acceptance test, installation, commissioning, and operator training — followed by scheduled preventive maintenance from our Pune team.",
  },
] as const;

export default function AboutPage() {
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
            Company Profile
          </p>
          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl mb-5 max-w-3xl">
            Engineering precision since 1979
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl font-body">
            LK Machinery India Pvt. Ltd. is the Indian subsidiary of{" "}
            <strong className="text-white">LK Technology Holdings Ltd</strong> — a
            Hong Kong-listed global machinery group with more than four decades of
            precision manufacturing heritage.
          </p>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────── */}
      <section className="bg-brand-red py-10" aria-label="LK Group at a glance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest font-body mb-6">
            LK Group — Global Figures
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-heading text-white text-3xl lg:text-4xl">{value}</p>
                <p className="text-white/70 text-xs font-body mt-1 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-heading text-brand-dark text-3xl sm:text-4xl mb-6">
                Our Mission
              </h2>
              <p className="text-brand-dark/65 text-lg leading-relaxed font-body">
                To provide Indian manufacturers with world-class precision machinery and
                end-to-end application support — enabling them to compete globally through
                superior part quality, faster cycle times, and lower total cost of ownership.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-brand-dark text-3xl sm:text-4xl mb-6">
                Our Vision
              </h2>
              <p className="text-brand-dark/65 text-lg leading-relaxed font-body">
                To be the most trusted name in industrial machinery across the Indian
                subcontinent — a partner that customers call first, not a vendor they
                evaluate last. We grow when our customers grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Global Journey timeline ──────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-dark" aria-labelledby="timeline-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="timeline-heading" className="font-heading text-white text-3xl sm:text-4xl mb-12">
            Our Global Journey
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-white/10"
                 aria-hidden="true" />

            <ol className="space-y-10">
              {TIMELINE.map(({ year, event }, i) => (
                <li key={year} className="relative flex gap-6 pl-12">
                  {/* Node */}
                  <div className={`absolute left-0 top-1 w-[46px] h-[46px] rounded-full flex
                                  items-center justify-center flex-shrink-0 border-2
                                  ${i === TIMELINE.length - 1
                                    ? "bg-brand-red border-brand-red"
                                    : "bg-brand-dark2 border-white/20"
                                  }`}>
                    <span className="text-white text-[9px] font-bold font-body">{year.slice(-2)}</span>
                  </div>

                  <div className="pt-2">
                    <p className={`font-heading text-sm tracking-widest mb-1
                      ${i === TIMELINE.length - 1 ? "text-brand-red" : "text-white/40"}`}>
                      {year}
                    </p>
                    <p className="text-white/75 font-body text-base leading-relaxed">{event}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── India Presence ───────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
                India Operations
              </p>
              <h2 className="font-heading text-brand-dark text-3xl sm:text-4xl mb-6">
                Rooted in Pune,<br />Serving All of India
              </h2>
              <p className="text-brand-dark/65 leading-relaxed font-body text-base mb-5">
                Our Chakan MIDC facility in Pune houses sales, application engineering,
                spare-parts inventory, and a trained service team — covering installation,
                commissioning, and preventive maintenance across the country.
              </p>
              <address className="not-italic text-brand-dark/60 font-body text-sm leading-relaxed mb-6">
                L.K. Machinery India Pvt. Ltd.<br />
                Plot No. PAP K-5 &amp; K-6, Chakan MIDC, Phase II<br />
                Village-Khalumbre, Tal-Khed, Pune – 410501
              </address>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white
                           font-semibold rounded-full hover:bg-brand-redDark active:scale-95
                           transition-all duration-200 font-body text-sm"
              >
                Contact our Pune team
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Stylised presence block */}
            <div className="rounded-2xl bg-brand-dark p-10 flex flex-col gap-5">
              {[
                ["Headquarters", "Pune, Maharashtra"],
                ["Coverage", "Pan-India sales & service"],
                ["Parent Company", "LK Technology Holdings (HK: 00558)"],
                ["Incorporated", "2012"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                  <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-1">{k}</p>
                  <p className="text-white font-heading text-lg">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work Process ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-dark2" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
              How We Work
            </p>
            <h2 id="process-heading" className="font-heading text-white text-3xl sm:text-4xl">
              From first call to full commissioning
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map(({ step, title, desc }) => (
              <div key={step}
                   className="p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10
                              transition-colors duration-300">
                <p className="font-heading text-brand-red text-4xl mb-4 opacity-60">{step}</p>
                <h3 className="font-heading text-white text-xl mb-3">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
