import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const VARIANTS = {
  /** Neutral chip — stack items, meta. */
  default: "border-border bg-surface text-muted",
  /** Carries the accent. Use sparingly: category, status. */
  accent:
    "border-accent/25 bg-accent-soft text-accent-soft-foreground",
  /** Hairline only. Sits well on top of a coloured surface. */
  outline: "border-border-strong/60 bg-transparent text-muted",
} as const;

const SIZES = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
} as const;

export type BadgeProps = {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Renders in the mono face — right for technical labels like stack items. */
  mono?: boolean;
  className?: string;
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  mono = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-medium whitespace-nowrap",
        VARIANTS[variant],
        SIZES[size],
        mono && "font-mono tracking-tight",
        className,
      )}
    >
      {children}
    </span>
  );
}
