import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join LK Machinery India — a growing team of engineers and sales professionals building the machines that power Indian manufacturing. Express your interest today.",
  openGraph: { url: "/careers" },
  alternates: { canonical: "/careers" },
};

const CULTURE_PILLARS = [
  {
    title: "Engineering First",
    desc: "We hire people who are curious about how machines work — and passionate about making them work better for our customers.",
  },
  {
    title: "Customer Proximity",
    desc: "Our team spends time on the shop floor, not just the conference room. Understanding the production environment is core to the job.",
  },
  {
    title: "Long-Term Thinking",
    desc: "We invest in people's development over years, not quarters. If you grow, we grow.",
  },
  {
    title: "Pan-India Reach",
    desc: "Based in Pune, our team works with manufacturers across the country — we value people comfortable engaging across geographies and industries.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      {/* ── Section 1: Hero / Intro ──────────────────────────────────────── */}
      <section className="relative bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark2 to-black"
             aria-hidden="true" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
                        bg-brand-red/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            Join Our Team
          </p>
          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl mb-5 max-w-2xl">
            Build the machines that build India
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl font-body mb-8">
            LK Machinery India is a small, focused team with a big product portfolio and
            an even bigger addressable market. We&apos;re looking for people who want to
            grow alongside us.
          </p>

        </div>
      </section>

      {/* ── Section 2: Culture ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-offwhite" aria-labelledby="culture-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
              Our Culture
            </p>
            <h2 id="culture-heading" className="font-heading text-brand-dark text-3xl sm:text-4xl">
              What it&apos;s like to work here
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_PILLARS.map(({ title, desc }) => (
              <div key={title}
                   className="p-7 rounded-2xl bg-white border border-brand-dark/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center
                                justify-center mb-5" aria-hidden="true">
                  <div className="w-3 h-3 rounded-full bg-brand-red" />
                </div>
                <h3 className="font-heading text-brand-dark text-lg mb-3">{title}</h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed font-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Open Roles (ATS Redirect) ─────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-dark" aria-labelledby="apply-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            Open Roles
          </p>
          <h2 id="apply-heading" className="font-heading text-white text-3xl sm:text-4xl mb-6">
            Ready to join us?
          </h2>
          <p className="text-white/60 font-body text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            We manage all our job postings and applications through LinkedIn. View our current openings and apply directly via our company page.
          </p>
          
          {/* TODO: Confirm final LinkedIn URL with founder */}
          <a
            href="https://www.linkedin.com/company/lk-machinery-india-pvt-ltd/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-red text-white
                       font-semibold rounded-full hover:bg-brand-redDark active:scale-95
                       transition-all duration-200 font-body text-lg shadow-lg shadow-brand-red/20"
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
