interface TagPillProps {
  label: string;
  /** "dark" variant = white text on dark bg; "light" = dark text on offwhite bg */
  variant?: "dark" | "light";
}

export default function TagPill({ label, variant = "dark" }: TagPillProps) {
  const base = "inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide font-body border";

  const styles =
    variant === "dark"
      ? "bg-white/10 text-white/80 border-white/20"
      : "bg-brand-dark/10 text-brand-dark border-brand-dark/20";

  return <span className={`${base} ${styles}`}>{label}</span>;
}
