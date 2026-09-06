import { SearchX } from "lucide-react";

import { Button } from "@/components/ui";

export type ProjectsEmptyStateProps = {
  /** The search term that produced nothing, if there was one. */
  query: string;
  /** Number of active category + technology filters. */
  filterCount: number;
  onReset: () => void;
};

/**
 * Shown instead of the grid when nothing matches. It names the reason — the
 * search term, the filter count, or both — so the fix is obvious without
 * scrolling back up to read the controls.
 */
export function ProjectsEmptyState({
  query,
  filterCount,
  onReset,
}: ProjectsEmptyStateProps) {
  const trimmed = query.trim();

  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-strong/50 bg-surface px-6 py-16 text-center">
      <span
        aria-hidden="true"
        className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-surface-raised text-muted"
      >
        <SearchX className="size-5" strokeWidth={2} />
      </span>

      <h3 className="mt-5 text-xl">No projects match</h3>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        {trimmed ? (
          <>
            Nothing here matches{" "}
            <span className="font-mono text-foreground">
              &ldquo;{trimmed}&rdquo;
            </span>
            {filterCount > 0
              ? ` with ${filterCount} ${filterCount === 1 ? "filter" : "filters"} applied.`
              : "."}
          </>
        ) : (
          <>
            No project uses that combination of{" "}
            {filterCount === 1 ? "filter" : "filters"}. Domains and technologies
            narrow each other, so a wider selection will bring results back.
          </>
        )}
      </p>

      <Button variant="secondary" size="sm" onClick={onReset} className="mt-7">
        Reset search and filters
      </Button>
    </div>
  );
}
