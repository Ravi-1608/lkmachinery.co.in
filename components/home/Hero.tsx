import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark"
      aria-label="Hero"
    >
      {/* ── Background image ────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero.png"
          alt="LK Machinery Facility"
          fill
          className="object-cover object-center opacity-40"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" aria-hidden="true" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl pt-24 pb-16 lg:pt-32 lg:pb-24">

          {/* Headline */}
          <h1 className="animate-fade-up animate-fade-up-d1 font-heading text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6">
            LK, strives for <br />
            <span className="text-brand-red">your success</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up animate-fade-up-d2 text-white/80 text-xl leading-relaxed max-w-xl font-body mb-10">
            Global Top One-stop Intelligent Solution Supplier for Material Forming Equipment
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animate-fade-up-d3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-white font-semibold
                         rounded-full border-2 border-white hover:bg-white hover:text-brand-dark 
                         active:scale-95 transition-all duration-300 font-body text-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
