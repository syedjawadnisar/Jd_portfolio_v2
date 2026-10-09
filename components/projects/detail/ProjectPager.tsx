import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Direction = "previous" | "next";

function PagerLink({
  project,
  direction,
}: {
  project: Project;
  direction: Direction;
}) {
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={`/projects/${project.slug}/`}
      className={cn(
        "group flex flex-col gap-2 rounded-xl border border-border bg-surface-raised p-5 sm:p-6",
        "transition-[border-color,background-color,transform] duration-300 ease-out-expo",
        "hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface motion-reduce:hover:translate-y-0",
        isNext && "sm:items-end sm:text-right",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
          isNext && "sm:flex-row-reverse",
        )}
      >
        <Icon
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-300 ease-out-expo motion-reduce:transform-none",
            isNext ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5",
          )}
          strokeWidth={2}
        />
        {isNext ? "Next project" : "Previous project"}
      </span>

      <span className="text-lg font-semibold tracking-tight text-foreground">
        {project.name}
      </span>
      <span className="text-sm text-muted">{project.tagline}</span>
    </Link>
  );
}

/** Move through the work without bouncing back to the index each time. */
export function ProjectPager({
  previous,
  next,
}: {
  previous: Project;
  next: Project;
}) {
  return (
    <nav aria-label="Project navigation" className="grid gap-4 sm:grid-cols-2">
      <PagerLink project={previous} direction="previous" />
      <PagerLink project={next} direction="next" />
    </nav>
  );
}
