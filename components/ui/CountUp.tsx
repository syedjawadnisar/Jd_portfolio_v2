"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { DURATION } from "@/lib/motion";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Visual match for --ease-out-expo. Exact at both ends, so the value lands. */
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type CountUpProps = {
  /** The number to land on. */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
};

/**
 * Number that counts up when it scrolls into view.
 *
 * Three things make this safe rather than decorative noise: the DOM text is
 * written imperatively so the tween costs zero React renders, the accessible
 * name is the final value so a screen reader announces "5+" once instead of
 * narrating every frame, and the whole thing is a requestAnimationFrame loop
 * plus an IntersectionObserver — no animation library on the critical path.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = DURATION.slow,
  className,
}: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const format = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const finalLabel = `${prefix}${format(value)}${suffix}`;

  // Server output is the final number, so the page is correct with JS disabled
  // and correct for crawlers. Reset to zero before the first painted frame
  // only when we are actually going to animate.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const node = numberRef.current;
    if (node) node.textContent = format(0);
    // format is stable for a given decimals value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decimals]);

  useEffect(() => {
    const root = rootRef.current;
    const node = numberRef.current;
    if (!root || !node) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      node.textContent = format(value);
      return;
    }

    let frame = 0;

    const run = () => {
      const total = duration * 1000;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / total);
        node.textContent = format(value * easeOutExpo(progress));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, decimals]);

  return (
    <span ref={rootRef} className={cn("tabular-nums", className)} aria-label={finalLabel}>
      <span aria-hidden="true">
        {prefix}
        <span ref={numberRef}>{format(value)}</span>
        {suffix}
      </span>
    </span>
  );
}
