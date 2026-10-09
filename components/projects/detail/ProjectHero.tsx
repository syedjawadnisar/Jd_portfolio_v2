import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Badge, Button, Container, RevealEager, Spotlight } from "@/components/ui";
import type { Project } from "@/data/projects";

/** The article is labelled by the project name; the page reuses this id. */
export const PROJECT_TITLE_ID = "project-title";

/**
 * The first screen of a detail page: who it was for, what it is, what was
 * owned, and where to go next. Everything above the fold comes verbatim from
 * data/projects.ts.
 *
 * `RevealEager` rather than `Reveal`: this block holds the h1 and is therefore
 * the LCP element, so its entrance is CSS and ships no JavaScript at all.
 */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <Container className="pt-8 sm:pt-12">
      <RevealEager y={8} duration={0.35}>
        <Button
          href="/projects/"
          variant="ghost"
          size="sm"
          className="-ml-4"
          iconLeft={<ArrowLeft className="size-4" strokeWidth={2} />}
        >
          All projects
        </Button>
      </RevealEager>

      <RevealEager delay={0.05}>
        {/* `relative` here is deliberate: it is the surface Spotlight tracks. */}
        <div className="relative isolate mt-4 overflow-hidden rounded-2xl border border-border bg-surface-raised px-6 py-10 sm:px-10 sm:py-14">
          <span
            aria-hidden="true"
            className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(120%_80%_at_15%_0%,black,transparent_70%)]"
          />
          <Spotlight size={620} intensity={0.14} />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent" mono>
                {project.category}
              </Badge>
              {/* The domain badge is a filter axis and stays coarse; `focus` is
                  where the precision that would be useless as a filter goes. */}
              {project.focus ? (
                <span className="font-mono text-xs text-muted">{project.focus}</span>
              ) : null}
              {project.period ? (
                <span className="font-mono text-xs text-muted">{project.period}</span>
              ) : null}
            </div>

            <h1 id={PROJECT_TITLE_ID} className="mt-6 text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              {project.name}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {project.tagline}
            </p>

            <dl className="mt-8 border-t border-border pt-6">
              <dt className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                Role
              </dt>
              <dd className="mt-2 max-w-2xl text-base text-foreground">{project.role}</dd>
            </dl>

            {project.links?.length ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Button
                    key={link.href}
                    href={link.href}
                    variant="secondary"
                    size="sm"
                    iconRight={<ArrowUpRight className="size-4" strokeWidth={2} />}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </RevealEager>
    </Container>
  );
}
