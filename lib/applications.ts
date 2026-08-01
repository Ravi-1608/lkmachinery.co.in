import applicationsData from "@/data/applications.json";

export interface ApplicationEntry {
  slug: string;
  name: string;
  description: string;
  /** Data-accurate cross-reference against each model's own applicableIndustries
   *  in data/products.json — may differ from `filterTabs` below, see its doc. */
  relevantCategories: string[];
  /** Filter-bar tab labels in Figma's exact per-page order, first is "All".
   *  Sourced directly from each Figma export screenshot; intentionally NOT
   *  always identical to `relevantCategories` — see the per-entry `note` field
   *  where the two diverge (Figma's own filter bar doesn't always match the
   *  full product-data cross-reference). Design is authoritative for the UI. */
  filterTabs: string[];
  /** Real manufactured-part names for this industry, verified against the
   *  Figma export screenshot for this page. No photography exists yet for
   *  these — see PartsExplorer's placeholder tile handling. */
  parts: string[];
  /** Internal only — never render. Flags known Figma/data-cross-reference
   *  discrepancies for founder follow-up. */
  note?: string;
  image: string;
}

const data = applicationsData as ApplicationEntry[];

export function getAllApplications(): ApplicationEntry[] {
  return data;
}

export function getApplication(slug: string): ApplicationEntry | undefined {
  return data.find((a) => a.slug === slug);
}

export function getApplicationSlugs(): { slug: string }[] {
  return data.map((a) => ({ slug: a.slug }));
}
