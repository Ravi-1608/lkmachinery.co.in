"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Application", href: "/applications" },
  { label: "Products", href: "/products" },
  { label: "Investor Relations", href: "/investor-relations" },
  { label: "Blogs", href: "/blogs" },
] as const;

const CTA_LINK = { label: "Contact Us", href: "/contact" };

// ─── Logo ──────────────────────────────────────────────────────────────────
function LKLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="LK Group — home">
      <Image
        src="/images/logo.png"
        alt="LK Machinery India Private Limited"
        width={130}
        height={130}
        className="object-contain w-14 sm:w-16 md:w-20 lg:w-[130px] h-auto"
      />
    </Link>
  );
}

// ─── Desktop Nav ────────────────────────────────────────────────────────────
function DesktopNav() {
  const allLinks = [...NAV_LINKS, CTA_LINK];

  return (
    <nav aria-label="Primary navigation" className="hidden lg:flex items-center">
      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/5">
        {allLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="px-4 py-2 text-[13px] text-white/80 hover:text-white rounded-full
                       hover:bg-white/10 transition-all duration-200 font-body uppercase tracking-wider font-medium"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// ─── Hamburger button ────────────────────────────────────────────────────────
function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5
                 rounded-lg hover:bg-white/10 transition-colors duration-200"
    >
      {/* Three bars — top & bottom rotate to × when open */}
      <span
        className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center
                    ${open ? "rotate-45 translate-y-2" : ""}`}
      />
      <span
        className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300
                    ${open ? "opacity-0 scale-x-0" : ""}`}
      />
      <span
        className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center
                    ${open ? "-rotate-45 -translate-y-2" : ""}`}
      />
    </button>
  );
}

// ─── Mobile Drawer ───────────────────────────────────────────────────────────
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-brand-dark flex flex-col pt-20 pb-8 px-6
                    transform transition-transform duration-300 ease-in-out lg:hidden
                    ${open ? "translate-x-0" : "translate-x-full hidden"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col gap-1">
          {[...NAV_LINKS, CTA_LINK].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="px-4 py-3 text-base text-white/80 hover:text-white hover:bg-white/10
                         rounded-lg transition-all duration-200 font-body uppercase tracking-wider"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case the page is already scrolled (e.g. browser restores position)
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close drawer when viewport widens past mobile breakpoint
  useEffect(() => {
    if (!mobileOpen) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false); };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-300
          ${scrolled
            ? "bg-brand-dark/[0.92] backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <LKLogo />
            <DesktopNav />
            <HamburgerButton
              open={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            />
          </div>
        </div>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
