import type { Metadata } from "next";
import Link from "next/link";
import EnquiryForm from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with LK Machinery India. Visit us at Chakan MIDC, Pune, call +91 8888718587, or submit an enquiry and our team will respond within one business day.",
  openGraph: { url: "/contact" },
};

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
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark2 to-black"
             aria-hidden="true" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
                        bg-brand-red/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <p className="text-brand-red font-semibold text-sm tracking-[0.2em] uppercase font-body mb-3">
            Get in Touch
          </p>
          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl mb-5">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl font-body">
            Our team in Pune is ready to help — whether you need a machine quote, technical
            support, or general information. We respond to all enquiries within one business day.
          </p>
        </div>
      </section>

      {/* ── Contact details + form ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-brand-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Left: contact cards */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h2 className="font-heading text-brand-dark text-2xl sm:text-3xl mb-2">
                Our Details
              </h2>
              {DETAILS.map(({ label, lines, href, hrefLabel, external, Icon }) => (
                <div key={label}
                     className="flex gap-4 p-5 rounded-2xl bg-white border border-brand-dark/10 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-red/10
                                  text-brand-red flex items-center justify-center">
                    <Icon />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-grey uppercase tracking-widest
                                  font-body mb-1.5">
                      {label}
                    </p>
                    {lines.map((l) => (
                      <p key={l} className="text-brand-dark text-sm font-body leading-relaxed">{l}</p>
                    ))}
                    {href && hrefLabel && (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 mt-2 text-brand-red text-xs
                                   font-semibold font-body hover:text-brand-redDark transition-colors"
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
            <div className="lg:col-span-3">
              <h2 className="font-heading text-brand-dark text-2xl sm:text-3xl mb-8">
                Send us an Enquiry
              </h2>
              <div className="bg-white rounded-2xl p-8 shadow-md border border-brand-dark/8">
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
