import type { NextConfig } from "next";

/**
 * Static export: `next build` emits a plain `out/` directory of HTML, CSS and
 * JS. That is what makes this deployable to Cloudflare Pages with no adapter,
 * no wrangler config and no runtime — the same artifact would work on any
 * static host.
 *
 * Constraints that follow from it, so nothing here surprises later:
 *  - next/image has no optimizer, hence `unoptimized`. Ship right-sized files.
 *  - No route handlers, server actions, middleware or redirects() config.
 *    Cloudflare-level redirects go in `public/_redirects` instead.
 *  - Every dynamic route needs generateStaticParams.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
