"use client";

import Script from "next/script";

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
        <div>
          <label htmlFor="enquiry-lastname">Full Name</label>
          <input
            id="enquiry-lastname"
            type="text"
            name="lastname"
            required
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="enquiry-email">Email</label>
          <input
            id="enquiry-email"
            type="email"
            name="email"
            required
            autoComplete="email"
          />
        </div>

        {/* Office Phone */}
        <div>
          <label htmlFor="enquiry-phone">Office Phone</label>
          <input
            id="enquiry-phone"
            type="tel"
            name="phone"
            required
            autoComplete="tel"
          />
        </div>

        {/* Organization Name */}
        <div>
          <label htmlFor="enquiry-company">Organization Name</label>
          <input
            id="enquiry-company"
            type="text"
            name="company"
            required
            autoComplete="organization"
          />
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="enquiry-enquirytype">Inquiry Type</label>
          <select id="enquiry-enquirytype" name="cf_leads_enquirytype" required>
            <option value="">— Select —</option>
            <option value="Sales Inquiry">Sales Inquiry</option>
            <option value="Service or Support Inquiry">
              Service or Support Inquiry
            </option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label htmlFor="enquiry-city">City</label>
          <input
            id="enquiry-city"
            type="text"
            name="city"
            required
            autoComplete="address-level2"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="enquiry-description">Description</label>
          <textarea
            id="enquiry-description"
            name="description"
            required
            rows={4}
          />
        </div>

        {/* Google reCAPTCHA widget */}
        <div
          className="g-recaptcha"
          data-sitekey={RECAPTCHA_SITE_KEY}
        />

        <button type="submit">Submit Enquiry</button>
      </form>
    </>
  );
}
