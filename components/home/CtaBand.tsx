import Link from "next/link";
import "./CtaBand.css";

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-heading">

      <div className="container cta-band__inner">
        <div className="cta-band__content">
          {/* Eyebrow */}
          <p className="cta-band__eyebrow">
            Let&apos;s Work Together
          </p>

          {/* Headline */}
          <h2 id="cta-heading" className="cta-band__heading">
            Incredible stock. Flexible pricing
          </h2>

          {/* Supporting copy — JUDGMENT CALL: kept over Figma's literal line
              ("Buy credits or subscribe today.") because that text is
              unedited SaaS-template boilerplate with no meaning for an
              industrial machinery manufacturer (no credits/subscription
              product exists) -- founder should confirm/revise. */}
          <p className="cta-band__supporting">
            Reliable machines, transparent pricing, and a team that's with you from enquiry to installation.
          </p>

          {/* CTAs */}
          <div className="cta-band__actions">
            <Link href="/contact" className="cta-band__cta">
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
