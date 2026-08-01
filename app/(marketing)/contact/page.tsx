import type { Metadata } from "next";
import Image from "next/image";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { getBreadcrumbSchema } from "@/lib/seo";
import "../marketing-hero.css";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with LK Machinery India. Visit us at Chakan MIDC, Pune, call +91 8888718587, or submit an enquiry and our team will respond within one business day.",
  openGraph: { url: "/contact" },
  alternates: { canonical: "/contact" },
};

const jsonLd = getBreadcrumbSchema([
  { name: "Home", item: "/" },
  { name: "Contact Us", item: "/contact" },
]);

// ─── Contact detail cards ──────────────────────────────────────────────────
const DETAILS = [
  {
    label: "Office Address",
    lines: [
      "L.K. Machinery India Pvt. Ltd.",
      "Plot No. PAP K-5 & K-6, Chakan MIDC, Phase II",
      "Village-Khalumbre, Tal-Khed",
      "Pune – 410501, Maharashtra, India",
    ],
    href: "https://maps.google.com/?q=LK+Machinery+India+Chakan+MIDC+Pune",
    hrefLabel: "Open in Maps",
    external: true,
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
              fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Phone",
    lines: ["+91 8888718587"],
    href: "tel:+918888718587",
    hrefLabel: "Call now",
    external: false,
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02L6.62 10.79Z"
              fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Email",
    lines: ["avinash@lkmachinery.co.in"],
    href: "mailto:avinash@lkmachinery.co.in",
    hrefLabel: "Send email",
    external: false,
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
              fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Working Hours",
    lines: [
      "Mon – Fri: 9:00 AM – 6:00 PM",
      "Saturday: 9:00 AM – 1:00 PM",
      "Sunday: Closed",
    ],
    href: null,
    hrefLabel: null,
    external: false,
    Icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
] as const;

export default function ContactPage() {
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
          <p className="marketing-hero__eyebrow">
            Get in Touch
          </p>
          <h1 className="marketing-hero__title">
            Contact Us
          </h1>
          <p className="marketing-hero__subtitle contact-hero__subtitle">
            Our team in Pune is ready to help — whether you need a machine quote, technical
            support, or general information. We respond to all enquiries within one business day.
          </p>
        </div>
      </section>

      {/* ── Contact details + form ───────────────────────────────────────── */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-main__grid">

            {/* Left: contact cards */}
            <div className="contact-main__details">
              <h2 className="contact-main__details-heading">
                Our Details
              </h2>
              {DETAILS.map(({ label, lines, href, hrefLabel, external, Icon }) => (
                <div key={label} className="contact-card">
                  <div className="contact-card__icon">
                    <Icon />
                  </div>
                  <div>
                    <p className="contact-card__label">
                      {label}
                    </p>
                    {lines.map((l) => (
                      <p key={l} className="contact-card__line">{l}</p>
                    ))}
                    {href && hrefLabel && (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="contact-card__link"
                      >
                        {hrefLabel}
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: enquiry form */}
            <div className="contact-main__form-col">
              <h2 className="contact-main__form-heading">
                Send us an Enquiry
              </h2>
              <div className="contact-main__form-wrap">
                {/*
                  productInterested is intentionally left as default ("Website General Enquiry")
                  — no product context on the contact page.
                */}
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
