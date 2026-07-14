import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: [
        "*",
        "GPTBot",
        "ClaudeBot",
        "PerplexityBot",
        "Google-Extended",
        "anthropic-ai",
      ],
      allow: "/",
    },
    sitemap: "https://www.lkmachinery.co.in/sitemap.xml",
  };
}
