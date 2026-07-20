import Link from "next/link";

interface TagPillProps {
  label: string;
  /** Optionally link the tag to a page (e.g. /products/dcm/aviss-ii) */
  href?: string;
  /** "dark" variant = white text on dark bg; "light" = dark text on offwhite bg */
  variant?: "dark" | "light";
}

export default function TagPill({ label, href, variant = "dark" }: TagPillProps) {
  const base = "inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide font-body border transition-colors duration-200";

  const styles =
    variant === "dark"
      ? "bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white"
      : "bg-brand-dark/10 text-brand-dark border-brand-dark/20 hover:bg-brand-dark/20";

  if (href) {
    return (
      <Link href={href} className={`${base} ${styles}`}>
        {label}
      </Link>
    );
  }

  return <span className={`${base} ${styles}`}>{label}</span>;
}
