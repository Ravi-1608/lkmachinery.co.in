"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Header.css";

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
    <Link href="/" className="header__logo" aria-label="LK Group — home">
      <Image
        src="/images/logo.png"
        alt="LK Machinery India Private Limited"
        width={130}
        height={130}
        className="header__logo-image"
      />
    </Link>
  );
}

// ─── Desktop Nav ────────────────────────────────────────────────────────────
function DesktopNav() {
  const allLinks = [...NAV_LINKS, CTA_LINK];

  return (
    <nav aria-label="Primary navigation" className="header__nav">
      <div className="header__nav-pill">
        {allLinks.map(({ label, href }) => (
          <Link key={href} href={href} className="header__nav-link">
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
      className="header__hamburger"
    >
      {/* Three bars — top & bottom rotate to × when open */}
      <span className="header__hamburger-bar header__hamburger-bar--top" />
      <span className="header__hamburger-bar header__hamburger-bar--middle" />
      <span className="header__hamburger-bar header__hamburger-bar--bottom" />
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
        className="header__backdrop"
        data-open={open}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className="header__drawer"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="header__drawer-nav">
          {[...NAV_LINKS, CTA_LINK].map(({ label, href }) => (
            <Link key={href} href={href} onClick={onClose} className="header__drawer-link">
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
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="container">
          <div className="header__bar">
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
