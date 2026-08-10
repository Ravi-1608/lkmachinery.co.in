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
      {
        source: "/industries.html",
        destination: "/applications",
        permanent: true,
      },
      {
        source: "/about-us.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/crankcase.html",
        destination: "/applications/transportation",
        permanent: true,
      },
      {
        source: "/heat-radiator.html",
        destination: "/applications/transportation",
        permanent: true,
      },
      {
        source: "/telecom-infrastructure.html",
        destination: "/applications/smart-3c",
        permanent: true,
      },
      {
        source: "/interior.html",
        destination: "/applications/transportation",
        permanent: true,
      },
      {
        source: "/aluminum-pressure-die-casting-machine.html",
        destination: "/products/dcm",
        permanent: true,
      },
      {
        source: "/houseware.html",
        destination: "/applications/household-appliance",
        permanent: true,
      },
      {
        source: "/door-and-windows-components.html",
        destination: "/applications/industrial-supplies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
