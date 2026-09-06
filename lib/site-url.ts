import { site } from "@/data/site";

/**
 * The absolute origin baked into canonicals, OG tags, JSON-LD and the sitemap.
 *
 * Resolution order matters more than it looks. Cloudflare Pages sets no
 * NEXT_PUBLIC_SITE_URL by default, so a fallback of "http://localhost:3000"
 * means a normal deploy ships pages that self-canonicalise to an unreachable
 * host and shared links whose og:url points at the sharer's own machine. The
 * localhost value is therefore reachable only outside a production build:
 *
 *   1. NEXT_PUBLIC_SITE_URL — the explicit answer, custom domain included.
 *   2. CF_PAGES_URL — set by Cloudflare Pages on every build, preview included.
 *   3. site.url — the known production origin.
 *
 * A misconfigured production build degrades to the real domain, not to a
 * broken one. This module is imported only from server code, so CF_PAGES_URL
 * never has to survive into a client bundle.
 */
const configured =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.CF_PAGES_URL ??
  (process.env.NODE_ENV === "production" ? site.url : "http://localhost:3000");

export const siteUrl = configured.replace(/\/+$/, "");
