import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { Button, Container, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. The work is still here.",
  robots: { index: false, follow: true },
};

/**
 * Rendered by Next for any unmatched route, and emitted as 404.html by the
 * static export. Deliberately dependency-light, no client component, because
 * this page loads when something has already gone wrong.
 */
export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 sm:py-32">
      <p className="text-sm text-muted">404</p>

      <h1 className="mt-3 text-4xl tracking-tight sm:text-5xl">Page not found</h1>

      <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
        This address does not point at anything. The link may be out of date, or
        the page may have been renamed.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
        <Button href="/" iconRight={<ArrowRight className="size-4" strokeWidth={2} />}>
          Back to home
        </Button>
        <TextLink href="/projects/">Browse the projects</TextLink>
      </div>
    </Container>
  );
}
