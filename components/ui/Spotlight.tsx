"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type SpotlightProps = {
  /** Diameter of the glow in px. */
  size?: number;
  /** Peak opacity, 0-1. Keep it low; this should be felt, not seen. */
  intensity?: number;
  className?: string;
};

/**
 * Cursor-follow radial glow.
 *
 * Constraints it respects, all of them deliberate:
 *  - absolutely positioned and pointer-events-none, so it cannot change layout
 *    or intercept a single click;
 *  - fine pointers only — it never runs on touch, where there is no cursor to
 *    follow and the listener would just cost battery;
 *  - reduced motion turns it off entirely;
 *  - updates are written to CSS custom properties inside a rAF, so a fast
 *    mouse cannot outrun the frame budget.
 *
 * The nearest positioned ancestor is the tracking surface — put this inside a
 * `relative` element.
 */
export function Spotlight({
  size = 560,
  intensity = 0.16,
  className,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(fine.matches && !reduced.matches);
    sync();

    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;
    const surface = node?.parentElement;
    if (!node || !surface) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      node.style.setProperty("--spot-x", `${pending.x}px`);
      node.style.setProperty("--spot-y", `${pending.y}px`);
      node.style.opacity = "1";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = surface.getBoundingClientRect();
      pending = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      node.style.opacity = "0";
    };

    surface.addEventListener("pointermove", onMove);
    surface.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500",
        className,
      )}
      style={{
        background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, var(--accent) ${Math.round(intensity * 100)}%, transparent), transparent 68%)`,
      }}
    />
  );
}
