import Link from "next/link";

function FactoryIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-brand-dark group-hover:text-white transition-colors duration-300">
      <path d="M4 32h32M8 32V16l12-8v24M20 22l6-4v14M26 16l6-4v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="12" y="22" width="4" height="4" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

function HexagonIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-brand-dark group-hover:text-white transition-colors duration-300">
      <path d="M20 4l14 8v16l-14 8-14-8V12l14-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 4v16m0 0l14-8m-14 8l-14-8m14 8v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-brand-dark group-hover:text-white transition-colors duration-300">
      <path d="M6 34h28M12 34V18m8 16V10m8 24V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="10" r="2" fill="currentColor"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-brand-dark group-hover:text-white transition-colors duration-300">
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
    <section className="py-16 bg-brand-offwhite" aria-labelledby="quicklinks-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Visually hidden heading for screen readers */}
        <h2 id="quicklinks-heading" className="sr-only">Quick Links</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 -mt-24 lg:-mt-32">
          {LINKS.map(({ label, href, icon }) => (
            <Link 
              key={label}
              href={href}
              className="group flex flex-col items-center justify-between p-8 pt-10 pb-6 bg-white rounded-t-[60px] rounded-b-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-brand-dark/5 hover:bg-brand-dark transition-all duration-300 h-64"
            >
              {/* Icon Container */}
              <div className="mb-auto">
                {icon}
              </div>
              
              {/* Label */}
              <h3 className="font-heading font-bold text-brand-dark text-lg sm:text-xl uppercase tracking-widest text-center mt-4 mb-8 group-hover:text-white transition-colors duration-300">
                {label}
              </h3>
              
              {/* Circular Arrow Button */}
              <div className="w-10 h-10 rounded-full bg-brand-offwhite flex items-center justify-center text-brand-dark group-hover:bg-brand-red group-hover:text-white transition-colors duration-300 shrink-0 shadow-sm">
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
