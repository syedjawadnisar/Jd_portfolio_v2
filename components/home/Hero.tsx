"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { hero, site } from "@/data/site";
import { useYearsOfExperience } from "@/lib/experience-client";

/**
 * Static on purpose. The headline is the LCP element of the site, so it paints
 * in its final state, with no entrance animation.
 */
export function Hero() {
  const years = useYearsOfExperience();

  return (
    <section aria-labelledby="hero-title">
      <Container className="py-20 sm:py-28 lg:py-32">
        <h1
          id="hero-title"
          className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {hero.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {hero.subheadline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Button
            href="/projects/"
            size="lg"
            iconRight={<ArrowRight className="size-4" strokeWidth={2} />}
          >
            View projects
          </Button>
          <TextLink href={`mailto:${site.email}`}>Email</TextLink>
          <TextLink href={site.linkedin}>LinkedIn</TextLink>
          <TextLink href={site.github}>GitHub</TextLink>
        </div>

        <p className="mt-10 text-sm leading-relaxed text-muted">
          {/* Recomputed after mount, so a long-lived build never goes stale. */}
          <span suppressHydrationWarning>{years}+ years of experience.</span>{" "}
          Based in {site.location}. {site.availability}.
        </p>
      </Container>
    </section>
  );
}
