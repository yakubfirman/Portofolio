type TechBadgeProps = {
  label: string;
  /** "sm" (default) = smaller pill used in cards; "md" = larger pill used on detail page */
  size?: "sm" | "md";
};

export default function TechBadge({ label, size = "sm" }: TechBadgeProps) {
  return (
    <span
      className={
        size === "md"
          ? "rounded-lg border border-red-100 bg-red-50/60 px-3 py-1 font-mono text-xs text-red-700/80 backdrop-blur-sm"
          : "rounded-md border border-red-100/80 bg-red-50/50 px-2 py-0.5 font-mono text-[10px] text-red-600/80 backdrop-blur-sm"
      }
    >
      {label}
    </span>
  );
}
