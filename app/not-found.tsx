import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { Button, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. The work is still here.",
  robots: { index: false, follow: true },
};

/**
 * Rendered by Next for any unmatched route, and emitted as 404.html by the
 * static export. Deliberately dependency-light — no motion, no client
 * component — because this page loads when something has already gone wrong.
 */
export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 sm:py-32">
      <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-surface-raised px-6 py-14 text-center sm:px-12 sm:py-20">
        <span
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(100%_70%_at_50%_0%,black,transparent_75%)]"
        />

        <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
          Error 404
        </p>

        <h1 className="mt-6 text-4xl tracking-tight sm:text-5xl">Page not found</h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          This address does not point at anything. The link may be out of date, or
          the page may have been renamed. Everything else is still where it was.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            href="/"
            iconRight={<ArrowRight className="size-4" strokeWidth={2} />}
          >
            Back to home
          </Button>
          <Button
            href="/projects/"
            variant="secondary"
            iconRight={<ArrowUpRight className="size-4" strokeWidth={2} />}
          >
            Browse the work
          </Button>
        </div>
      </div>
    </Container>
  );
}
