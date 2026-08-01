export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "L.K. Machinery India Pvt. Ltd.",
    url: "https://www.lkmachinery.co.in",
    logo: "https://www.lkmachinery.co.in/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8888718587",
      contactType: "customer service",
      email: "avinash@lkmachinery.co.in",
      areaServed: "IN",
      availableLanguage: "en",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. PAP K-5 & K-6, Chakan MIDC, Phase II, Village-Khalumbre, Tal-Khed",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "410501",
      addressCountry: "IN",
    },
  };
}

// India-specific LocalBusiness markup -- distinct from getOrganizationSchema
// above (which is brand-level). Uses only verified data already published on
// this site (address, phone, email, working hours from the Contact page); no
// geo-coordinates included since none have been verified. areaServed is
// explicitly "IN" to keep this from reading as a global-business listing.
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "L.K. Machinery India Pvt. Ltd.",
    image: "https://www.lkmachinery.co.in/images/logo.png",
    url: "https://www.lkmachinery.co.in",
    telephone: "+91-8888718587",
    email: "avinash@lkmachinery.co.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. PAP K-5 & K-6, Chakan MIDC, Phase II, Village-Khalumbre, Tal-Khed",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "410501",
      addressCountry: "IN",
    },
    areaServed: "IN",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
  };
}

export function getProductSchema(product: {
  name: string;
  description: string;
  image: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://www.lkmachinery.co.in${product.image}`,
    brand: {
      "@type": "Brand",
      name: "LK Machinery",
    },
    category: product.category,
  };
}

export function getBreadcrumbSchema(
  items: { name: string; item: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: `https://www.lkmachinery.co.in${breadcrumb.item}`,
    })),
  };
}
