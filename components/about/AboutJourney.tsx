"use client";

import { useState } from "react";
import "./AboutJourney.css";

interface JourneyPeriod {
  range: string;
  title?: string;
  body?: string;
  highlights: string[];
}

// Only 1979-1990 has a full title + narrative body — that's the one period
// Figma's static export actually showed expanded. The other five periods use
// the same real, already-verified facts from this site's company history
// (not invented narrative) rather than fabricate the depth Figma never showed.
const PERIODS: JourneyPeriod[] = [
  {
    range: "1979-1990",
    title: "Foundation and Early Innovation",
    body: "LK was founded in Hong Kong in 1979 by Liu Siong Song, who laid the foundation for the innovative products and services to come with his own spirit of innovation and craftsmanship. Despite financial strain and fierce market competition, LK's high-quality products and services gradually won out, impressing users early on, establishing a strong reputation in the industry, and laying a firm foundation for subsequent development.",
    highlights: [
      "Company founded in Hong Kong",
      "First die-casting machine produced in 1980",
      "First injection molding machine produced in 1989",
      "Regional market expansion across Asia",
    ],
  },
  {
    range: "1991-2000",
    highlights: [
      "Launch of the AVIS hot-chamber series (1994) — now a global benchmark for quality",
    ],
  },
  {
    range: "2001-2007",
    highlights: [
      "LK Group joins China's Top 500 Machinery Enterprises list, retained every year since (2006)",
      "LK die casting machines account for 50% of market sales in China, Brazil, and Southeast Asia (2007)",
    ],
  },
  {
    range: "2008-2013",
    highlights: [
      "LK Machinery India Pvt. Ltd. incorporated — dedicated operations for the Indian subcontinent (2012)",
    ],
  },
  {
    range: "2014-2018",
    highlights: [
      "CNC division established in Taiwan; Apple supply-chain certification achieved (2015)",
    ],
  },
  {
    range: "2019-2024",
    highlights: [
      "27 machine models and 3 automation product lines now offered, from a Chakan MIDC base serving customers across India",
    ],
  },
];

export default function AboutJourney() {
  const [active, setActive] = useState(0);
  const period = PERIODS[active];

  return (
    <div className="about-journey">
      {/* Period tabs */}
      <div className="about-journey__tabs" role="tablist" aria-label="Company history by period">
        {PERIODS.map((p, i) => (
          <button
            key={p.range}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className="about-journey__tab"
          >
            {p.range}
          </button>
        ))}
      </div>

      {/* Active period panel */}
      <div className="about-journey__panel">
        <span className="about-journey__panel-range">{period.range}</span>
        {period.title && (
          <h3 className="about-journey__panel-title">{period.title}</h3>
        )}
        {period.body && (
          <p className="about-journey__panel-body">{period.body}</p>
        )}
        <ul className="about-journey__highlights">
          {period.highlights.map((h) => (
            <li key={h} className="about-journey__highlight">
              <span className="about-journey__highlight-check" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="about-journey__nav">
          <button
            type="button"
            className="about-journey__nav-btn"
            disabled={active === 0}
            onClick={() => setActive((a) => Math.max(0, a - 1))}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Prev
          </button>
          <button
            type="button"
            className="about-journey__nav-btn"
            disabled={active === PERIODS.length - 1}
            onClick={() => setActive((a) => Math.min(PERIODS.length - 1, a + 1))}
          >
            Next
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
