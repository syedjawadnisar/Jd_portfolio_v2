import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container, TextLink } from "@/components/ui";
import type { Project } from "@/data/projects";

/** The article is labelled by the project name; the page reuses this id. */
export const PROJECT_TITLE_ID = "project-title";

/**
 * The first screen of a detail page: what it is, what was owned, and where to
 * go next. Everything above the fold comes verbatim from data/projects.ts and
 * paints in its final state, because the h1 is the LCP element.
 */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <Container className="pt-8 sm:pt-12">
      <Link
        href="/projects/"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2} />
        All projects
      </Link>

      <div className="mt-6 border-b border-border pb-10 sm:pb-14">
        <p className="text-sm text-muted">
          {project.category}
          {/* The category is a filter axis and stays coarse; `focus` carries the
              precision that would be useless as a filter. */}
          {project.focus ? ` · ${project.focus}` : null}
          {project.period ? ` · ${project.period}` : null}
        </p>

        <h1
          id={PROJECT_TITLE_ID}
          className="mt-4 text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {project.name}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {project.tagline}
        </p>

        <dl className="mt-8">
          <dt className="text-sm font-medium">Role</dt>
          <dd className="mt-1 max-w-2xl text-base text-muted">{project.role}</dd>
        </dl>

        {project.links?.length ? (
          <div className="mt-6 flex flex-wrap gap-x-7">
            {project.links.map((link) => (
              <TextLink key={link.href} href={link.href}>
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
              </TextLink>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
