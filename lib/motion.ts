import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary. One easing curve and one distance across the whole
 * site — the animation should read as a single system, not as ten opinions.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
} as const;

/** Vertical travel for entrance animations, in pixels. */
export const REVEAL_DISTANCE = 16;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT,
};

/** Parent wrapper for staggered children (hero words, card grids). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: { opacity: 1, y: 0, transition },
};

/** Flattened equivalents, for when reduced motion is requested. */
export const staticContainer: Variants = { hidden: {}, visible: {} };
export const staticItem: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

/** Viewport config for whileInView — fires once, slightly before full entry. */
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
