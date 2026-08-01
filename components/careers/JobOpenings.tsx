"use client";

import { useState } from "react";
import "./JobOpenings.css";

interface JobListing {
  title: string;
  location: string;
  experience: string;
  /** Verbatim from Figma's collapsed job card body copy — not paraphrased. */
  description: string;
  responsibilities: string[];
  /** Only the Social Media Marketing Manager listing has a separate
   *  "Qualification Skills" list in Figma (see "Final-join us -1.png") — the
   *  Sales Manager/Engineer expanded state ("Final-join us -3.png") shows
   *  Job Responsibilities only. Not adding a fabricated skills list for the
   *  second role. */
  qualifications?: string[];
}

// Content transcribed directly from the Figma exports:
//  - Final- join us.png            (collapsed card copy)
//  - Final-join us -1.png          (Social Media Marketing Manager expanded)
//  - Final-join us -3.png          (Sales Manager/Engineer expanded)
// Nothing here is invented — see CLAUDE.md's real-content-only rule.
const JOB_LISTINGS: JobListing[] = [
  {
    title: "Social Media Marketing Manager",
    location: "Across India",
    experience: "1-2 years",
    description:
      "LK Machinery is a leading manufacturer of Die casting and Plastic Injection moulding machines with Head Quarters in Hong Kong, Manufacturing plants in Italy, China and Taiwan. We are looking for tech savvy candidate who can make our online presence lively and informative for prospective customers to experience our product as a globally acclaimed and locally inclusive.",
    responsibilities: [
      "Contributes to marketing strategy by leveraging social media to identify and acquire customers.",
      "Obtains market share by developing social media marketing plans and programs for each product and directing promotional support.",
      "Maintains online relations with customers by organizing and developing specific customer-relations programs.",
      "Provides short- and long-term market forecasts and reports by directing market research collection, analysis, and interpretation of market data.",
      "Develops new approaches for market development, acquiring and analyzing data, and consulting with internal and external sources.",
      "Maintains research database by identifying and assembling marketing information.",
    ],
    qualifications: [
      "Social media skills",
      "Creating and maintaining client relationships",
      "Evaluate customers skills, needs and build long-lasting relationships",
      "Coaching and subordinate involvement",
      "Self-motivated yet customer-focused",
      "Familiar with financial planning and strategy",
      "Proficient in marketing research and statistical analysis",
      "Enter the activity/communication details in the Customer Relationship Management (CRM) or report to the team.",
    ],
  },
  {
    title: "Sales Manager/Engineer",
    location: "Across India",
    experience: "3-5 years",
    description:
      "We are looking for a Sales Engineer/ Manager to develop sales strategies and attract new clients. The sales person will source new sales opportunities and close sales to achieve targets. The sales executive will play a key role in increasing income and revenue by acquiring more and more clients, generating leads and managing sales of products and services.",
    responsibilities: [
      "Sell the products/services using various customer sales methods (Foot on street, cold calling, presentations etc)",
      'Forecast sales, develop "out of the box" sales strategies/models and evaluate their effectiveness',
      "Evaluate customers skills, needs and build long-lasting relationships",
      "Meet personal and team sales targets",
      "Research accounts and generate or follow through sales leads",
      "Attend meetings, sales events, and trainings to keep abreast of the latest developments",
      "Report and provide feedback to management using financial statistical data",
      "Maintain and expand client database.",
      "Enter the activity/communication details in the Customer Relationship Management (CRM) or report to the team.",
    ],
  },
];

// Shared arrow glyph — JUDGMENT CALL: Figma's own buttons use a ">>" double
// chevron here, but every other CTA sitewide (careers-apply__cta,
// about-presence__cta, contact-card__link, category-industries__cta, etc.)
// uses this single-chevron arrow. Keeping the established sitewide glyph for
// visual consistency rather than introducing a one-off icon for this section.
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13 8H3M7 4 3 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function JobOpenings() {
  // JUDGMENT CALL: Figma's two screenshots each show exactly one card
  // expanded at a time (the other stays collapsed alongside it) — modeling
  // this as a single shared "which one is open" accordion index rather than
  // independent per-card state, since Figma never shows both expanded
  // simultaneously.
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="job-openings__grid">
      {JOB_LISTINGS.map((job, i) =>
        expanded === i ? (
          <div key={job.title} className="job-openings__card job-openings__card--expanded">
            <button
              type="button"
              onClick={() => setExpanded(null)}
              className="job-openings__back"
              aria-label="Back to job listing"
            >
              <BackIcon />
            </button>

            <h4 className="job-openings__section-label">[ Job Responsibilities ]</h4>
            <ul className="job-openings__list">
              {job.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            {job.qualifications && (
              <>
                <h4 className="job-openings__section-label">[ Qualification Skills ]</h4>
                <ul className="job-openings__list">
                  {job.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Scrolls to the Apply Now form below — see judgment-call note
                on CareersApplyForm about why the position field isn't
                auto-filled from here. */}
            <a href="#apply-now" className="job-openings__cta">
              Submit Resume
              <ArrowIcon />
            </a>
          </div>
        ) : (
          <div key={job.title} className="job-openings__card">
            <h3 className="job-openings__title">{job.title}</h3>
            <div className="job-openings__meta">
              <span className="job-openings__meta-item">
                <span className="job-openings__dot" aria-hidden="true" />
                {job.location}
              </span>
              <span className="job-openings__meta-item">
                <span className="job-openings__dot" aria-hidden="true" />
                {job.experience}
              </span>
            </div>
            <p className="job-openings__desc">{job.description}</p>
            <button
              type="button"
              onClick={() => setExpanded(i)}
              className="job-openings__cta"
            >
              Learn More
              <ArrowIcon />
            </button>
          </div>
        )
      )}
    </div>
  );
}
