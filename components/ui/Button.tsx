import type { AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

// ── Edit these to change ALL buttons across the site ──
export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg shadow-red-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:brightness-110 active:scale-[0.98]",
  outline:
    "rounded-lg border border-red-200/80 bg-white/60 backdrop-blur-sm text-slate-700 font-semibold transition-all duration-300 hover:border-red-400 hover:bg-red-50/80 hover:shadow-lg hover:shadow-red-100/50 active:scale-[0.98]",
  ghost:
    "rounded-lg bg-white/40 backdrop-blur-sm text-slate-600 font-medium transition-all duration-300 hover:bg-red-50/60 hover:text-red-700 active:scale-[0.98]",
};

export const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`group inline-flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500/70 ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
