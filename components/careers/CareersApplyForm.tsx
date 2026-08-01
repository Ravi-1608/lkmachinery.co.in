"use client";

import { useState, type FormEvent } from "react";
import "./CareersApplyForm.css";

// TODO: Confirm submission endpoint with founder before launch.
//
// Figma's "Apply Now" form has no backend wired into the export. The site's
// other form (components/forms/EnquiryForm.tsx) posts straight to vtiger
// CRM's Web-to-Lead endpoint, and the task brief asked us to check whether
// that same setup could be reused here with a different "Inquiry Type."
// It doesn't fit cleanly: EnquiryForm's cf_leads_enquirytype field only has
// three options (Sales Inquiry / Service or Support Inquiry / General
// Inquiry) -- none of which is a job application -- and there's no
// "cf_leads_jobapplication" or equivalent field confirmed to exist on the
// vtiger side. Force-fitting a candidate into the sales-lead pipeline as a
// generic "Lead" would misrepresent what they are, and could silently drop
// or mis-route real candidates if the mapping is wrong (per CLAUDE.md's
// vtiger field-name gotcha).
//
// Per ground rule 3, this is a genuine gap to flag, not paper over: the form
// below is fully built to match Figma's fields (minus Upload Resume, see
// note on that field), but submission is a client-side no-op until the
// founder decides the destination (vtiger with a new field, a dedicated
// recruiting inbox, a third-party ATS, etc).
export default function CareersApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="careers-apply-form__success" role="status">
        <p>Thank you — your application details have been recorded.</p>
        <p className="careers-apply-form__success-note">
          Our team will reach out if your profile is a match for the role.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="careers-apply-form">
      <div className="careers-apply-form__field">
        <label htmlFor="apply-name" className="careers-apply-form__label">Full Name*</label>
        <input
          id="apply-name"
          type="text"
          name="fullName"
          required
          autoComplete="name"
          placeholder="Enter your Full Name"
          className="careers-apply-form__input"
        />
      </div>

      <div className="careers-apply-form__row">
        <div className="careers-apply-form__field">
          <label htmlFor="apply-email" className="careers-apply-form__label">Email Address*</label>
          <input
            id="apply-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="yours.email@example.com"
            className="careers-apply-form__input"
          />
        </div>
        <div className="careers-apply-form__field">
          <label htmlFor="apply-phone" className="careers-apply-form__label">Phone Number*</label>
          <input
            id="apply-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder="+91 XXXXX XXXXX"
            className="careers-apply-form__input"
          />
        </div>
      </div>

      <div className="careers-apply-form__field">
        <label htmlFor="apply-position" className="careers-apply-form__label">Position Applying for*</label>
        <input
          id="apply-position"
          type="text"
          name="position"
          required
          placeholder="Enter the Position you want to apply for"
          className="careers-apply-form__input"
        />
      </div>

      {/* JUDGMENT CALL: Figma shows an "Upload Resume*" file field here. The
          founder has already established elsewhere in this project (see
          CLAUDE.md) that native vtiger Web-to-Lead handles file attachments
          poorly, which is why EnquiryForm.tsx omits the file upload Figma
          shows there too. Applying the same logic here: no file input.
          Candidates are asked to mention emailing their resume in the
          message field instead. */}
      {/* JUDGMENT CALL: Figma's label literally reads "Message(Optional)*" —
          an asterisk on a field explicitly marked optional. Treating this as
          a Figma authoring slip rather than intent: the field is genuinely
          optional here (no `required`, no asterisk shown), not a fabricated
          content change. */}
      <div className="careers-apply-form__field">
        <label htmlFor="apply-message" className="careers-apply-form__label">
          Message <span className="careers-apply-form__optional">(Optional)</span>
        </label>
        <textarea
          id="apply-message"
          name="message"
          rows={4}
          placeholder="Tell us about your experience and interest in this role. You can also mention that you're emailing your resume separately to avinash@lkmachinery.co.in"
          className="careers-apply-form__input"
        />
      </div>

      <button type="submit" className="careers-apply-form__submit">
        Submit Application
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}
