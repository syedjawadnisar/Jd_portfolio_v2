"use client";

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Fragment, type CSSProperties } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Spotlight } from "@/components/ui/Spotlight";
import { hero, site } from "@/data/site";
import { useYearsOfExperience } from "@/lib/experience-client";
import { cn } from "@/lib/utils";

/**
 * The headline is revealed word by word rather than as a block: it is the first
 * thing a recruiter reads, and the stagger buys about half a second of held
 * attention for free.
 *
 * The animation is CSS (`.reveal-eager` in globals.css), not JavaScript. This
 * is the LCP element of the whole site; shipping it at `opacity: 0` and waiting
 * for a motion library to hydrate means the browser records no paint at all
 * until that bundle lands. Every animated element still carries `data-reveal`
 * so the reduced-motion and no-JS rules can pin it to its final state.
 */
const WORDS = hero.headline.split(" ");

const HEAD_START = 0.08;
const WORD_STAGGER = 0.05;
const HEADLINE_END = HEAD_START + WORDS.length * WORD_STAGGER;

/** Two words carry the accent. Matched loosely so copy edits degrade quietly. */
const ACCENT_WORDS = new Set(["stay", "fast"]);

const normalize = (word: string) => word.replace(/[^a-z]/gi, "").toLowerCase();

/** Fades the decorative grid out before it reaches the section edges. */
const GRID_MASK: CSSProperties = {
  maskImage:
    "radial-gradient(90% 70% at 50% 0%, #000 20%, rgba(0,0,0,0.35) 55%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(90% 70% at 50% 0%, #000 20%, rgba(0,0,0,0.35) 55%, transparent 100%)",
};

/** Only the delay varies; distance and duration come from the class defaults. */
const fadeUp = (delay: number): CSSProperties =>
  ({ "--reveal-delay": `${delay}s` }) as CSSProperties;

export function Hero() {
  const years = useYearsOfExperience();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        style={GRID_MASK}
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-70"
      />
      <Spotlight />

      <Container className="relative z-10 py-20 sm:py-28 lg:py-36">
        <p
          data-reveal=""
          style={fadeUp(0)}
          className="reveal-eager inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-raised px-3.5 py-1.5 text-xs font-medium text-muted shadow-sm sm:text-sm"
        >
          <span aria-hidden="true" className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {site.availability}
        </p>

        <h1
          id="hero-title"
          className="mt-7 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {/* One clean string for assistive tech; the split version is purely visual. */}
          <span className="sr-only">{hero.headline}</span>
          <span aria-hidden="true">
            {WORDS.map((word, index) => (
              <Fragment key={`${word}-${index}`}>
                <span
                  data-reveal=""
                  className={cn(
                    "reveal-eager inline-block",
                    ACCENT_WORDS.has(normalize(word)) && "text-accent",
                  )}
                  style={fadeUp(HEAD_START + index * WORD_STAGGER)}
                >
                  {word}
                </span>{" "}
              </Fragment>
            ))}
          </span>
        </h1>

        <p
          data-reveal=""
          style={fadeUp(HEADLINE_END)}
          className="reveal-eager mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {hero.subheadline}
        </p>

        <div
          data-reveal=""
          style={fadeUp(HEADLINE_END + 0.08)}
          className="reveal-eager mt-10 flex flex-wrap items-center gap-3"
        >
          <Button
            href="/projects/"
            size="lg"
            iconRight={<ArrowRight className="size-4" strokeWidth={2} />}
          >
            View projects
          </Button>
          <Button
            href={`mailto:${site.email}`}
            variant="secondary"
            size="lg"
            iconLeft={<Mail className="size-4" strokeWidth={2} />}
          >
            Email me
          </Button>
          <Button
            href={site.linkedin}
            variant="ghost"
            size="lg"
            iconLeft={<Linkedin className="size-4" strokeWidth={2} />}
          >
            LinkedIn
          </Button>
          <Button
            href={site.github}
            variant="ghost"
            size="lg"
            iconLeft={<Github className="size-4" strokeWidth={2} />}
          >
            GitHub
          </Button>
        </div>

        <p
          data-reveal=""
          style={fadeUp(HEADLINE_END + 0.16)}
          className="reveal-eager mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted sm:text-[13px]"
        >
          {/* Recomputed after mount, so a long-lived build never goes stale. */}
          <span suppressHydrationWarning>
            {years}+ years of professional experience
          </span>
          <span aria-hidden="true" className="text-border-strong">
            /
          </span>
          <span>{hero.note}</span>
        </p>
      </Container>
    </section>
  );
}
