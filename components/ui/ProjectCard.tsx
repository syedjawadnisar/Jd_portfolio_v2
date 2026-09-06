import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

import { Badge } from "./Badge";

export type ProjectCardVariant = "default" | "featured" | "compact";

export type ProjectCardProps = {
  project: Project;
  /**
   * `featured` is the tall home-page treatment (summary + more stack items),
   * `default` the standard grid card, `compact` a denser index row.
   */
  variant?: ProjectCardVariant;
  /** Match the surrounding outline. The card title is a heading, always. */
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

const STACK_LIMIT: Record<ProjectCardVariant, number> = {
  featured: 5,
  default: 4,
  compact: 3,
};

/**
 * The one project card, shared by the home page and the projects index.
 *
 * The whole card is a single link: the anchor wraps only the title (so that is
 * the accessible name a screen reader announces) and a stretched pseudo-element
 * expands its hit area to the card. Nothing else inside is interactive, which
 * is what keeps that trick legitimate rather than a nested-link trap. The focus
 * ring is hoisted onto the card via :has(), so keyboard focus outlines the whole
 * surface instead of a few words of text.
 */
export function ProjectCard({
  project,
  variant = "default",
  headingLevel: Heading = "h3",
  className,
}: ProjectCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const limit = STACK_LIMIT[variant];
  const shown = project.stack.slice(0, limit);
  const overflow = project.stack.length - shown.length;

  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface-raised",
        "transition-[transform,border-color,box-shadow] duration-300 ease-out-expo",
        "hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg",
        "motion-reduce:hover:translate-y-0",
        "has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring",
        isFeatured ? "p-7 sm:p-8" : isCompact ? "p-5" : "p-6",
        className,
      )}
    >
      {/* Accent wash that fades in on hover. Decorative, behind the content. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-40 bg-[radial-gradient(60%_100%_at_50%_100%,var(--accent-soft),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent" size="sm" mono>
          {project.category}
        </Badge>
        {project.period ? (
          <span className="font-mono text-[11px] text-muted">{project.period}</span>
        ) : null}
      </div>

      <Heading
        className={cn(
          "mt-4 font-semibold tracking-tight",
          isFeatured ? "text-2xl sm:text-3xl" : isCompact ? "text-lg" : "text-xl",
        )}
      >
        <Link
          href={`/projects/${project.slug}/`}
          className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {project.name}
        </Link>
      </Heading>

      <p
        className={cn(
          "mt-2 text-muted",
          isFeatured ? "text-base" : "text-sm",
        )}
      >
        {project.tagline}
      </p>

      {isFeatured ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>
      ) : null}

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
        {shown.map((item) => (
          <li key={item}>
            <Badge size="sm" mono>
              {item}
            </Badge>
          </li>
        ))}
        {overflow > 0 ? (
          <li>
            <Badge variant="outline" size="sm" mono>
              {`+${overflow}`}
            </Badge>
          </li>
        ) : null}
      </ul>

      <span
        aria-hidden="true"
        className="mt-6 inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent"
      >
        View project
        <ArrowUpRight
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
          strokeWidth={2}
        />
      </span>
    </article>
  );
}
