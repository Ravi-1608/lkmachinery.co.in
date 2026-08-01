import Link from "next/link";
import Image from "next/image";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      {/* ── Background image ────────────────────────────────────────────── */}
      <div className="hero__bg">
        <Image
          src="/images/hero/hero.png"
          alt="LK Machinery Facility"
          fill
          className="hero__bg-image"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="hero__overlay" aria-hidden="true" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="container hero__content">
        <div className="hero__inner">

          {/* Headline */}
          <h1 className="animate-fade-up animate-fade-up-d1 hero__headline">
            LK, strives for <br />
            <span className="hero__highlight">your success</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up animate-fade-up-d2 hero__subtext">
            Global Top One-stop Intelligent Solution Supplier for Material Forming Equipment
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animate-fade-up-d3">
            <Link href="/about" className="hero__cta">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
