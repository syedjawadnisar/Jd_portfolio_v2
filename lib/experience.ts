/**
 * Years of experience, computed rather than written down.
 *
 * Career start: June 2021. Never hardcode the resulting number anywhere —
 * a portfolio that quietly goes stale is worse than one with no number on it.
 *
 * This module is intentionally free of React so server components can call it
 * directly. The post-mount hook lives in `lib/experience-client.ts`, because a
 * statically exported page freezes its build-time value until hydration.
 */

/** June 2021, in UTC so the result never depends on the viewer's timezone. */
export const CAREER_START = new Date(Date.UTC(2021, 5, 1));

/** Whole years elapsed since the career start. Floors — never rounds up. */
export function yearsOfExperience(now: Date = new Date()): number {
  const start = CAREER_START;
  let years = now.getUTCFullYear() - start.getUTCFullYear();

  const monthDelta = now.getUTCMonth() - start.getUTCMonth();
  const dayDelta = now.getUTCDate() - start.getUTCDate();
  if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) {
    years -= 1;
  }

  return Math.max(0, years);
}

/**
 * Display form, e.g. "5+". The plus is what lets a floored integer stay
 * truthful for the eleven months after each anniversary.
 */
export function experienceLabel(now: Date = new Date()): string {
  return `${yearsOfExperience(now)}+`;
}
