"use client";

import { useEffect, useState } from "react";

/**
 * The copyright year, corrected after mount.
 *
 * The site is statically exported, so a server-rendered `getFullYear()` freezes
 * at build time and quietly goes stale in January. The build value is still the
 * SSR output (correct for crawlers and for JS-disabled visitors); hydration
 * replaces it with the visitor's actual year.
 */
export function FooterYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span suppressHydrationWarning>{year}</span>;
}
