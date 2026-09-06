import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const WIDTHS = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Horizontal measure. `narrow` is for prose, `wide` for full-bleed grids. */
  size?: keyof typeof WIDTHS;
  /** Render as a different element, e.g. "section" or "header". */
  as?: ElementType;
};

/** The single horizontal rhythm for the site. Never re-implement the gutters. */
export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8", WIDTHS[size], className)}>
      {children}
    </Tag>
  );
}
