import type { MetadataRoute } from "next";

import { allProjectSlugs } from "@/data/projects";
import { siteUrl } from "@/lib/site-url";

/**
 * Emitted as a static sitemap.xml by the export. URLs carry the trailing slash
 * because next.config.ts sets trailingSlash — a sitemap that lists the
 * unslashed form advertises a redirect on every entry.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...allProjectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
