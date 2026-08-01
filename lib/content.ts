import contentData from "@/data/content.json";

export type ContentType = "launch" | "news" | "article";

export interface ContentBodySection {
  heading?: string;
  paragraphs: string[];
}

export interface ContentItem {
  slug: string;
  type: ContentType;
  title: string;
  excerpt: string;
  date: string;
  location?: string;
  readTime?: string;
  relatedProductSlug?: string;
  image: string;
  body: ContentBodySection[];
  isExample?: boolean;
}

const allData = contentData as ContentItem[];

// isExample entries are placeholder/sample content (bracketed placeholder text,
// not real announcements) — never publicly listed, statically built, or directly
// reachable. Exclude here so every helper below inherits the gate.
const data = allData.filter((item) => !item.isExample);

export function getAllContent(): ContentItem[] {
  return data;
}

export function getContentByType(type: ContentType): ContentItem[] {
  return data.filter((item) => item.type === type);
}

export function getContent(slug: string): ContentItem | undefined {
  return data.find((item) => item.slug === slug);
}

export function getRelatedContent(slug: string, limit: number = 3): ContentItem[] {
  const item = getContent(slug);
  if (!item) return [];
  return data
    .filter((c) => c.type === item.type && c.slug !== slug)
    .slice(0, limit);
}

export function getAllContentSlugs(): { slug: string }[] {
  return data.map((item) => ({ slug: item.slug }));
}
