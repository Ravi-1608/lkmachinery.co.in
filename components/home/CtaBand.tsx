import Link from "next/link";

export default function CtaBand() {
  return (
    <section
      className="relative py-20 lg:py-28 bg-brand-offwhite overflow-hidden"
      aria-labelledby="cta-heading"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Eyebrow */}
          <p className="text-brand-dark/50 font-semibold text-sm tracking-[0.2em] uppercase font-body mb-4 hidden">
            Let&apos;s Work Together
          </p>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5"
          >
            Incredible stock. Flexible pricing
          </h2>

          {/* Supporting copy */}
          <p className="text-brand-dark/75 text-lg leading-relaxed font-body mb-10">
            Reliable machines, transparent pricing, and a team that's with you from enquiry to installation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-dark
                         font-semibold rounded-full border border-brand-dark/10 shadow-sm hover:shadow-md
                         active:scale-95 transition-all duration-200 font-body"
            >
              Make Appointment
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
