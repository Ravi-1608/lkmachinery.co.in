import type { Metadata } from "next";

const siteName = "LK Machinery";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lkmachinery.com";

/**
 * Generate a Metadata object for a given page.
 * All arguments are optional — sensible defaults are applied.
 */
export function generateMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription =
    description ?? "LK Machinery – Industrial Equipment & Solutions";
  const canonical = `${siteUrl}${path}`;
  const ogImage = image ?? `${siteUrl}/og-default.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(siteUrl),
    alternates: { canonical },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName,
      images: [{ url: ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
  };
}
