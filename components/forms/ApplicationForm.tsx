"use client";

// ─── IMPORTANT — Application form backend gap ──────────────────────────────
// This form currently has NO backend handler. It does NOT post to vtiger
// (that is the sales enquiry system — wrong endpoint for job applications).
// The form onSubmit logs to console as a PLACEHOLDER only.
// Before this page goes live, a backend decision is required:
//   Option A: app/api/careers/route.ts → emails submission to HR inbox
//   Option B: Third-party form service (Formspree, Notion API, Google Forms)
//   Option C: Redirect applicants to external ATS (LinkedIn, Naukri, Workable)
// Flagged in the M4 completion report. DO NOT deploy without resolving.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    console.info("[Careers form — placeholder] Submission:", Object.fromEntries(data));
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="#DB0A2A" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-heading text-brand-dark text-2xl mb-3">Application received</h3>
        <p className="text-brand-dark/60 font-body">
          Thank you — we&apos;ll be in touch if your profile matches an open requirement.
          In the meantime, reach us at{" "}
          <a href="mailto:avinash@lkmachinery.co.in" className="text-brand-red hover:underline">
            avinash@lkmachinery.co.in
          </a>.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-brand-dark/15 rounded-xl px-4 py-3 text-sm font-body text-brand-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors";
  const labelCls =
    "block text-xs font-semibold text-brand-dark/50 uppercase tracking-widest font-body mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="careers-name" className={labelCls}>Full Name *</label>
          <input id="careers-name" name="name" type="text" required autoComplete="name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="careers-email" className={labelCls}>Email *</label>
          <input id="careers-email" name="email" type="email" required autoComplete="email" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="careers-phone" className={labelCls}>Phone *</label>
          <input id="careers-phone" name="phone" type="tel" required autoComplete="tel" className={inputCls} />
        </div>
        <div>
          <label htmlFor="careers-role" className={labelCls}>Role / Area of Interest *</label>
          <select id="careers-role" name="role" required className={inputCls}>
            <option value="">— Select —</option>
            <option value="Sales & Business Development">Sales &amp; Business Development</option>
            <option value="Application Engineering">Application Engineering</option>
            <option value="Service & Maintenance">Service &amp; Maintenance</option>
            <option value="Operations">Operations</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="careers-experience" className={labelCls}>Years of Experience *</label>
        <select id="careers-experience" name="experience" required className={inputCls}>
          <option value="">— Select —</option>
          <option value="0-2">0 – 2 years</option>
          <option value="3-5">3 – 5 years</option>
          <option value="6-10">6 – 10 years</option>
          <option value="10+">10+ years</option>
        </select>
      </div>
      <div>
        <label htmlFor="careers-message" className={labelCls}>Brief introduction *</label>
        <textarea id="careers-message" name="message" required rows={4}
                  placeholder="Tell us a bit about yourself and what draws you to LK Machinery…"
                  className={inputCls} />
      </div>

      {/* Visible placeholder warning — remove once real backend is wired */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 font-body">
        <strong>Note:</strong> This form currently logs to console only. A real submission handler
        must be configured before this page goes live.{" "}
        <a href="mailto:avinash@lkmachinery.co.in" className="underline">Email us directly</a>{" "}
        in the meantime.
      </div>

      <button type="submit" disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-red text-white font-semibold
                         rounded-full hover:bg-brand-redDark active:scale-95 transition-all
                         duration-200 font-body disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
