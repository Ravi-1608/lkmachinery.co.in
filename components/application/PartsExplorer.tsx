"use client";

import { useMemo, useState } from "react";
import "./PartsExplorer.css";

interface PartsExplorerProps {
  /** Real manufactured-part names for this industry, verified from the Figma
   *  export screenshot for this application page (see data/applications.json). */
  parts: string[];
  /** Filter-tab labels in Figma's exact per-page order, first is "All". */
  filterTabs: string[];
}

// Figma's per-page grid shows 3 columns × 4 rows = 12 tiles per screen — used
// here as the page size for pagination.
const PAGE_SIZE = 12;

export default function PartsExplorer({ parts, filterTabs }: PartsExplorerProps) {
  const [activeTab, setActiveTab] = useState(filterTabs[0]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // JUDGMENT CALL: Figma's grid tiles carry no visible label indicating which
  // machine category (IMM/CNC/DCM/AUTOMATION) produced each part — there is no
  // real per-part category data to filter against without inventing it, which
  // would violate the no-fabrication rule. The tabs are therefore fully wired
  // up (active state, keyboard/aria semantics) but only the "All" tab changes
  // the visible set today; switching category tabs keeps the same real list.
  // Wire real per-part category filtering once the founder supplies it.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return parts;
    return parts.filter((p) => p.toLowerCase().includes(q));
  }, [parts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function handleTab(tab: string) {
    setActiveTab(tab);
  }

  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <div className="parts-explorer">
      {/* ── Filter tabs + search ─────────────────────────────────────────── */}
      <div className="parts-explorer__toolbar">
        <div className="parts-explorer__tabs" role="tablist" aria-label="Filter by machine category">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`parts-explorer__tab${activeTab === tab ? " parts-explorer__tab--active" : ""}`}
              onClick={() => handleTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="parts-explorer__search">
          <input
            type="search"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Keyword"
            aria-label="Search parts"
            className="parts-explorer__search-input"
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="parts-explorer__search-icon">
            <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* ── Parts grid ───────────────────────────────────────────────────── */}
      <div className="parts-explorer__card">
        {pageItems.length > 0 ? (
          <div className="parts-explorer__grid">
            {pageItems.map((name, i) => (
              <div className="parts-explorer__tile" key={`${name}-${i}`}>
                {/* Plain neutral placeholder — no real part photography exists
                    yet in public/images/; do not replace with a stock photo. */}
                <div className="parts-explorer__tile-placeholder" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8" cy="9" r="1.75" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M3.5 17l5-5 3.5 3.5L16.5 11l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="parts-explorer__tile-name">{name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="parts-explorer__empty">No parts match &ldquo;{query}&rdquo;.</p>
        )}
      </div>

      {/* ── Pagination ───────────────────────────────────────────────────── */}
      {/* Figma's own pagination implies a larger full parts catalog than what
          was captured/verified from the export screenshot (e.g. 9 pages for
          Transportation) — only real, screenshot-verified part names are
          paginated here. No placeholder pages are rendered beyond real data;
          ask the founder for the complete per-industry parts list to extend
          this further. */}
      {totalPages > 1 && (
        <nav className="parts-explorer__pagination" aria-label="Parts pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`parts-explorer__page-btn${safePage === n ? " parts-explorer__page-btn--active" : ""}`}
              aria-current={safePage === n ? "page" : undefined}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
