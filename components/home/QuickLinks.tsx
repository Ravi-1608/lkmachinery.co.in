import Link from "next/link";
import "./QuickLinks.css";

function FactoryIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M4 32h32M8 32V16l12-8v24M20 22l6-4v14M26 16l6-4v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="12" y="22" width="4" height="4" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

function HexagonIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 4l14 8v16l-14 8-14-8V12l14-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 4v16m0 0l14-8m-14 8l-14-8m14 8v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M6 34h28M12 34V18m8 16V10m8 24V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="10" r="2" fill="currentColor"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M12 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 28h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M16 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const LINKS = [
  { label: "APPLICATIONS", href: "/applications", icon: <FactoryIcon /> },
  { label: "PRODUCTS", href: "/products", icon: <HexagonIcon /> },
  { label: "ABOUT US", href: "/about", icon: <BarChartIcon /> },
  { label: "CONTACT US", href: "/contact", icon: <PhoneIcon /> },
];

export default function QuickLinks() {
  return (
    <section className="quicklinks" aria-labelledby="quicklinks-heading">
      <div className="container">

        {/* Visually hidden heading for screen readers */}
        <h2 id="quicklinks-heading" className="sr-only">Quick Links</h2>

        <div className="quicklinks__grid">
          {LINKS.map(({ label, href, icon }) => (
            <Link key={label} href={href} className="quicklinks__card">
              {/* Icon Container — color inherits via currentColor from this wrapper */}
              <div className="quicklinks__icon">
                {icon}
              </div>

              {/* Label */}
              <h3 className="quicklinks__label">
                {label}
              </h3>

              {/* Circular Arrow Button */}
              <div className="quicklinks__arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
