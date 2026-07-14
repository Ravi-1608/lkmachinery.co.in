import applicationsData from "@/data/applications.json";

export interface ApplicationEntry {
  slug: string;
  name: string;
  description: string;
  relevantCategories: string[];
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
