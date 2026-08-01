import { MetadataRoute } from "next";
import { getAllModelParams } from "@/lib/products";
import { getAllApplications } from "@/lib/applications";
import { getAllContentSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.lkmachinery.co.in";

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/investor-relations",
    "/careers",
    "/applications",
    "/products",
    "/products/dcm",
    "/products/imm",
    "/products/cnc",
    "/products/automation",
    "/blogs",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const products = getAllModelParams().map((param) => ({
    url: `${baseUrl}/products/${param.category}/${param.model}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const applications = getAllApplications().map((app) => ({
    url: `${baseUrl}/applications/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogs = getAllContentSlugs().map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...products, ...applications, ...blogs];
}
