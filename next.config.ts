import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Dead URLs from the old lkmachinery.co.in site, still being crawled
      // by Google (found via Search Console's 404 report) -- redirected to
      // their closest real equivalent on the new site rather than left as
      // 404s, so remaining external links/search results resolve cleanly.
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hpdc-die-casting-machine.html",
        destination: "/products/dcm",
        permanent: true,
      },
      {
        source: "/solutions.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
