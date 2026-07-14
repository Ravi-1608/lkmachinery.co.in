import Link from "next/link";

export default function CtaBand() {
  return (
    <section
      className="relative py-20 lg:py-28 bg-brand-red overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Subtle background geometry */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                   bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full
                   bg-black/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-white/70 font-semibold text-sm tracking-[0.2em] uppercase font-body mb-4">
            Let&apos;s Work Together
          </p>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="font-heading text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5"
          >
            Tell us what you&apos;re building.
          </h2>

          {/* Supporting copy */}
          <p className="text-white/75 text-lg leading-relaxed font-body mb-10">
            Whether you need a single machine or a full turnkey production line, our
            engineering team is ready to scope the right solution — starting with a
            conversation.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-red
                         font-semibold rounded-full hover:bg-brand-offwhite active:scale-95
                         transition-all duration-200 font-body"
            >
              Submit Enquiry
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <a
              href="tel:+918888718587"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 text-white
                         font-semibold rounded-full border border-white/30 hover:bg-white/25
                         active:scale-95 transition-all duration-200 font-body backdrop-blur-sm"
            >
              {/* Phone icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M5.3 2a1 1 0 0 1 .95.68l.74 2.22a1 1 0 0 1-.23 1.02L5.5 7.2a8.01 8.01 0 0 0 3.3 3.3l1.28-1.27a1 1 0 0 1 1.02-.23l2.22.74a1 1 0 0 1 .68.95V13a1 1 0 0 1-1 1C6.16 14 2 9.84 2 4.7a1 1 0 0 1 1-1h2.3Z"
                  fill="currentColor"
                />
              </svg>
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
