import type { Metadata } from "next";
import Link from "next/link";
import "./thank-you.css";

// vtiger's Web-to-Lead capture.php (see components/forms/EnquiryForm.tsx)
// redirects here on successful submission -- configured server-side in
// vtiger's own web-form admin panel against our publicid, not by a field
// in our form. This page must exist regardless.
export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your enquiry. Our team will contact you within 24 hours.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="thank-you">
      <div className="container thank-you__inner">
        <div className="thank-you__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="thank-you__title">Thank You</h1>
        <p className="thank-you__message">
          Thank you for your enquiry — our team will contact you within 24 hours.
        </p>
        <Link href="/" className="thank-you__cta">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
