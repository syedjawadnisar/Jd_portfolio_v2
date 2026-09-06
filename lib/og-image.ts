import { site } from "@/data/site";

/**
 * The generated social card, described once.
 *
 * app/opengraph-image.tsx renders it; pages reference it. Both are needed:
 * Next attaches the file convention automatically, but only to routes that do
 * not declare an `openGraph` object of their own — /projects/ and every detail
 * page do, and a page that sets `openGraph` without `images` silently ships
 * with no card at all. So anything that overrides openGraph must spread this in.
 *
 * The path is resolved against `metadataBase`, so it stays relative here.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.role}`,
} as const;
