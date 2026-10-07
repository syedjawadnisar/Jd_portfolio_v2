import Link from "next/link";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export type ProjectCardVariant = "default" | "featured" | "compact";

export type ProjectCardProps = {
  project: Project;
  /**
   * `featured` is the home-page treatment (summary plus a longer stack line),
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
  const shown = project.stack.slice(0, STACK_LIMIT[variant]);
  const overflow = project.stack.length - shown.length;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-border bg-surface-raised",
        "transition-colors duration-200 hover:border-border-strong",
        "has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ring",
        isFeatured ? "p-7 sm:p-8" : isCompact ? "p-5" : "p-6",
        className,
      )}
    >
      <p className="text-sm text-muted">
        {project.category}
        {project.period ? ` · ${project.period}` : null}
      </p>

      <Heading
        className={cn(
          "mt-3 font-semibold tracking-tight",
          isFeatured ? "text-2xl sm:text-3xl" : isCompact ? "text-lg" : "text-xl",
        )}
      >
        <Link
          href={`/projects/${project.slug}/`}
          className="rounded-sm underline-offset-4 group-hover:underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {project.name}
        </Link>
      </Heading>

      <p className={cn("mt-2 text-muted", isFeatured ? "text-base" : "text-sm")}>
        {project.tagline}
      </p>

      {isFeatured ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>
      ) : null}

      <p className="mt-auto pt-5 text-sm">
        <span className="sr-only">Stack: </span>
        {shown.join(", ")}
        {overflow > 0 ? <span className="text-muted">{`, +${overflow} more`}</span> : null}
      </p>
    </article>
  );
}
