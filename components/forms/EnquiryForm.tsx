"use client";

import Script from "next/script";
import "./EnquiryForm.css";

interface EnquiryFormProps {
  productInterested?: string; // defaults to "Website General Enquiry"
}

const RECAPTCHA_SITE_KEY = "6LcmdSATAAAAAGWw734vGo0AXQwuxJS7RmDZA_Fe";
const VTIGER_ENDPOINT =
  "https://lkmachineryindiapvt.od2.vtiger.com/modules/Webforms/capture.php";

export default function EnquiryForm({
  productInterested = "Website General Enquiry",
}: EnquiryFormProps) {
  return (
    <>
      {/* Google reCAPTCHA v2 script */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />

      <form
        action={VTIGER_ENDPOINT}
        method="POST"
        encType="multipart/form-data"
        className="enquiry-form"
      >
        {/* ── Hidden fields ───────────────────────────────────────────── */}
        <input type="hidden" name="leadsource" value="Web Site" />
        <input
          type="hidden"
          name="publicid"
          value="3f25ec62ad5b74506788853045fddd20"
        />
        {/* This field name must not be renamed — used by vtiger CRM */}
        <input
          type="hidden"
          name="cf_leads_cfleadsproductinterested"
          value={productInterested}
        />

        {/* ── Visible fields ──────────────────────────────────────────── */}

        {/* Full Name */}
        <div className="enquiry-form__field">
          <label htmlFor="enquiry-lastname" className="enquiry-form__label">Full Name</label>
          <input
            id="enquiry-lastname"
            type="text"
            name="lastname"
            required
            autoComplete="name"
            className="enquiry-form__input"
          />
        </div>

        {/* Email */}
        <div className="enquiry-form__field">
          <label htmlFor="enquiry-email" className="enquiry-form__label">Email</label>
          <input
            id="enquiry-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            className="enquiry-form__input"
          />
        </div>

        {/* Phone Number */}
        <div className="enquiry-form__field">
          <label htmlFor="enquiry-phone" className="enquiry-form__label">Phone Number</label>
          <input
            id="enquiry-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            className="enquiry-form__input"
          />
        </div>

        {/* Company Name */}
        <div className="enquiry-form__field">
          <label htmlFor="enquiry-company" className="enquiry-form__label">Company Name</label>
          <input
            id="enquiry-company"
            type="text"
            name="company"
            required
            autoComplete="organization"
            className="enquiry-form__input"
          />
        </div>

        {/* Inquiry Type */}
        <div className="enquiry-form__field">
          <label htmlFor="enquiry-enquirytype" className="enquiry-form__label">Inquiry Type</label>
          <select
            id="enquiry-enquirytype"
            name="cf_leads_enquirytype"
            required
            className="enquiry-form__input"
          >
            <option value="">— Select —</option>
            <option value="Sales Inquiry">Sales Inquiry</option>
            <option value="Service or Support Inquiry">
              Service or Support Inquiry
            </option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        {/* City */}
        <div className="enquiry-form__field">
          <label htmlFor="enquiry-city" className="enquiry-form__label">City</label>
          <input
            id="enquiry-city"
            type="text"
            name="city"
            required
            autoComplete="address-level2"
            className="enquiry-form__input"
          />
        </div>

        {/* Message */}
        <div className="enquiry-form__field">
          <label htmlFor="enquiry-description" className="enquiry-form__label">Message</label>
          <textarea
            id="enquiry-description"
            name="description"
            required
            rows={4}
            className="enquiry-form__input"
          />
        </div>

        {/* Google reCAPTCHA widget */}
        <div
          className="g-recaptcha enquiry-form__recaptcha"
          data-sitekey={RECAPTCHA_SITE_KEY}
        />

        <button type="submit" className="enquiry-form__submit">Submit Enquiry</button>
      </form>
    </>
  );
}
