import Link from "next/link";

const STATS = [
  { value: "1979",  label: "Founded" },
  { value: "300+",  label: "Patents" },
  { value: "60+",   label: "Service Centers" },
  { value: "50%+",  label: "Market Share" },
] as const;

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark"
      aria-label="Hero"
    >
      {/* ── Background treatment: dark gradient overlay ─────────────────── */}
      {/* Real photography will go here as next/image fill in a later milestone */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark2 to-black opacity-95" aria-hidden="true" />

      {/* Subtle geometric accent — large faint red circle, top-right */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full
                   bg-brand-red/10 blur-3xl"
        aria-hidden="true"
      />
      {/* Second accent — bottom left */}
      <div
        className="absolute -bottom-60 -left-40 w-[600px] h-[600px] rounded-full
                   bg-brand-red/5 blur-3xl"
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl pt-24 pb-16 lg:pt-32 lg:pb-24">

          {/* Eyebrow */}
          <p className="animate-fade-up animate-fade-up-d1 text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-5">
            Precision Engineering Since 1979
          </p>

          {/* Headline */}
          <h1 className="animate-fade-up animate-fade-up-d2 font-heading text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6">
            Machines That<br />
            <span className="text-brand-red">Shape</span> the World
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up animate-fade-up-d3 text-white/60 text-lg leading-relaxed max-w-xl font-body mb-10">
            LK Machinery delivers die casting, injection moulding, CNC machining, and
            automation solutions trusted by industry leaders across 60+ countries.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animate-fade-up-d4 flex flex-wrap gap-4 mb-20 lg:mb-28">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-red text-white font-semibold
                         rounded-full hover:bg-brand-redDark active:scale-95 transition-all duration-200 font-body"
            >
              Explore Our Machines
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold
                         rounded-full border border-white/20 hover:bg-white/20 active:scale-95
                         transition-all duration-200 font-body backdrop-blur-sm"
            >
              Talk to Sales
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up animate-fade-up-d5 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 pt-10 border-t border-white/10">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-heading text-white text-3xl lg:text-4xl">{value}</p>
                <p className="text-white/50 text-sm font-body mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24
                   bg-gradient-to-t from-brand-dark2 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
