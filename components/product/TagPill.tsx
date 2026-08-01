import Link from "next/link";
import "./TagPill.css";

interface TagPillProps {
  label: string;
  /** Optionally link the tag to a page (e.g. /products/dcm/aviss-ii) */
  href?: string;
  /** "dark" variant = white text on dark bg; "light" = dark text on offwhite bg */
  variant?: "dark" | "light";
}

export default function TagPill({ label, href, variant = "dark" }: TagPillProps) {
  const cls = `tag-pill ${variant === "dark" ? "tag-pill--dark" : "tag-pill--light"}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {label}
      </Link>
    );
  }

  return <span className={cls}>{label}</span>;
}
