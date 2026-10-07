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
        "group flex flex-col gap-1 rounded-xl border border-border p-5 transition-colors duration-200 hover:border-border-strong sm:p-6",
        isNext && "sm:items-end sm:text-right",
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-sm text-muted",
          isNext && "sm:flex-row-reverse",
        )}
      >
        <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
        {isNext ? "Next" : "Previous"}
      </span>

      <span className="text-lg font-semibold tracking-tight underline-offset-4 group-hover:underline">
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
