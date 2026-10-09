"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { DURATION, REVEAL_DISTANCE, REVEAL_VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type RevealProps = {
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
};

/**
 * Scroll-triggered entrance. Fires once, never replays on scroll-back.
 *
 * The whole thing is one IntersectionObserver and one attribute: the animation
 * itself is `.reveal-scroll` in globals.css. That is the entire reason this
 * component exists in this shape — a motion library for a fade-up is 44KB
 * gzipped on a site whose pitch is that it is fast.
 *
 * `data-reveal` is not decoration. Two CSS rules key off it:
 *
 *  1. Under `prefers-reduced-motion: reduce`, globals.css forces the final
 *     state with `!important`, which outranks the running animation.
 *  2. Inside `<noscript>`, layout.tsx does the same, so a visitor without JS
 *     sees the content instead of a page of `opacity: 0`.
 *
 * Both are CSS, so the server and the hydrating client render byte-identical
 * markup. Branching on a media query during render would not: it resolves on
 * the client and not on the server, which is a hydration mismatch on every
 * revealed element on the page.
 *
 * Above the fold, use `RevealEager` instead — it costs no JavaScript and does
 * not hide the LCP element.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  index = 0,
  y = REVEAL_DISTANCE,
  duration = DURATION.base,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer available: show the content rather than hide it forever.
    if (typeof IntersectionObserver === "undefined") {
      node.setAttribute("data-revealed", "");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          node.setAttribute("data-revealed", "");
          observer.disconnect();
        }
      },
      { rootMargin: REVEAL_VIEWPORT.margin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn("reveal-scroll", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          "--reveal-duration": `${duration}s`,
          "--reveal-delay": `${delay + index * 0.06}s`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
