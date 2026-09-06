"use client";

import { useEffect, useState } from "react";

import { yearsOfExperience } from "@/lib/experience";

/**
 * Years of experience, corrected after mount.
 *
 * The site is statically exported, so the server-rendered number is frozen at
 * build time. This recomputes against the visitor's actual clock once hydrated,
 * which keeps a long-lived deployment honest without a rebuild.
 */
export function useYearsOfExperience(): number {
  const [years, setYears] = useState(() => yearsOfExperience());

  useEffect(() => {
    setYears(yearsOfExperience());
  }, []);

  return years;
}
