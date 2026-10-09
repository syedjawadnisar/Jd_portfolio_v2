import type { CSSProperties, ReactNode } from "react";

import { DURATION, REVEAL_DISTANCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type RevealEagerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use for hand-tuned sequencing; prefer `index` for lists. */
  delay?: number;
  /** Position in a group — multiplies into a 60ms stagger. */
  index?: number;
  /** Travel distance in px. 0 gives a pure fade. */
  y?: number;
  duration?: number;
  /** Element to render. Matters for semantics inside lists and landmarks. */
  as?: "div" | "section" | "article" | "li" | "span";
  style?: CSSProperties;
};

/**
 * Entrance animation for content that is already on screen at first paint.
 *
 * Unlike `Reveal`, this ships no JavaScript and renders no `opacity: 0` in the
 * exported HTML: the element is in its final state and the `.reveal-eager`
 * class in globals.css animates it in as soon as the stylesheet is parsed. That
 * matters because the largest element on every page lives above the fold —
 * hiding it until a bundle hydrates is what pushes LCP out by seconds.
 *
 * Use this above the fold. Use `Reveal` for anything the visitor has to scroll
 * to, where an IntersectionObserver is worth its weight.
 *
 * `data-reveal` is load-bearing: the reduced-motion and `<noscript>` rules key
 * off it to force the final state.
 */
export function RevealEager({
  children,
  className,
  delay = 0,
  index = 0,
  y = REVEAL_DISTANCE,
  duration = DURATION.base,
  as = "div",
  style,
}: RevealEagerProps) {
  const Tag = as as "div";

  return (
    <Tag
      data-reveal=""
      className={cn("reveal-eager", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-duration": `${duration}s`,
          "--reveal-delay": `${delay + index * 0.06}s`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
