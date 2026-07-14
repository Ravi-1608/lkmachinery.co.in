import Link from "next/link";

// ─── Social icon SVGs (inline, no external dependency) ───────────────────────
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.31C14.22 13.5 13.78 14.06 13.62 14.22C13.46 14.39 13.3 14.41 13.05 14.3C12.8 14.19 11.99 13.92 11.03 13.07C10.28 12.41 9.77 11.58 9.61 11.33C9.46 11.08 9.6 10.94 9.71 10.83C9.82 10.72 9.96 10.54 10.07 10.38C10.19 10.23 10.23 10.12 10.31 9.95C10.39 9.79 10.35 9.63 10.29 9.52C10.23 9.41 9.73 8.19 9.53 7.69C9.32 7.2 9.12 7.26 8.96 7.25C8.81 7.24 8.64 7.23 8.53 7.33Z" />
    </svg>
  );
}

// ─── Footer data ─────────────────────────────────────────────────────────────
const ABOUT_LINKS = [
  { label: "Our Story",         href: "/about" },
  { label: "Investor Relations",href: "/investor-relations" },
  { label: "Careers",           href: "/careers" },
  { label: "Blog",              href: "/blogs" },
];

const APPLICATION_LINKS = [
  { label: "All Applications",  href: "/applications" },
];

const PRODUCT_LINKS = [
  { label: "All Products",      href: "/products" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/lk-group",
    Icon: LinkedInIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/lkgroup",
    Icon: FacebookIcon,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/lkgroup",
    Icon: XIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918888718587",
    Icon: WhatsAppIcon,
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-heading text-white text-sm uppercase tracking-widest mb-5">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "block text-sm text-brand-grey hover:text-white transition-colors duration-200 mb-2.5 font-body";

  if (external || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://")) {
    return (
      <a href={href} className={cls} rel="noopener noreferrer" target={external ? "_blank" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white mt-auto" aria-label="Site footer">

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Col 1 — Brand blurb */}
          <div className="lg:col-span-1">
            {/* Logo mark */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-red font-heading text-white text-base select-none">
                LK
              </span>
              <span className="font-heading text-white text-lg tracking-wide">LK GROUP</span>
            </div>
            <p className="text-sm text-brand-grey leading-relaxed font-body">
              LK Machinery India Pvt. Ltd. — precision industrial equipment and
              end-to-end engineering solutions trusted across industries.
            </p>
          </div>

          {/* Col 2 — About Us */}
          <div>
            <FooterHeading>About Us</FooterHeading>
            {ABOUT_LINKS.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </div>

          {/* Col 3 — Applications */}
          <div>
            <FooterHeading>Applications</FooterHeading>
            {APPLICATION_LINKS.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </div>

          {/* Col 4 — Products */}
          <div>
            <FooterHeading>Products</FooterHeading>
            {PRODUCT_LINKS.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </div>

          {/* Col 5 — Contact + Join */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <FooterLink href="mailto:avinash@lkmachinery.co.in">
              avinash@lkmachinery.co.in
            </FooterLink>
            <FooterLink href="tel:+918888718587">
              +91 8888718587
            </FooterLink>

            <div className="mt-6">
              <FooterHeading>Join Our Team</FooterHeading>
              <FooterLink href="/careers">View Open Positions</FooterLink>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-grey font-body">
            &copy; {year} LK Machinery India Pvt. Ltd. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-brand-grey hover:text-white hover:bg-white/10
                           transition-all duration-200"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
