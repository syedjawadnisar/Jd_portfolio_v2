"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Container } from "@/components/ui";
import { allCategories, projects } from "@/data/projects";

import { ProjectFilters } from "./ProjectFilters";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectsEmptyState } from "./ProjectsEmptyState";
import { ProjectsGrid } from "./ProjectsGrid";
import { ProjectsPagination } from "./ProjectsPagination";
import { ProjectsUrlState } from "./ProjectsUrlState";
import {
  activeFilterCount,
  clampPage,
  DEFAULT_QUERY_STATE,
  filterProjects,
  getPageCount,
  hasActiveFilters,
  PAGE_SIZE,
  stackItemsByUsage,
  type ProjectQueryState,
} from "./query-state";

/** Filter vocabularies. Computed once at module load — the data is static. */
const STACK_FILTERS = stackItemsByUsage(projects);

/**
 * Search, filters and pagination for the full project list.
 *
 * All of it runs in the browser because the site is a static export: there is
 * no server to query, so the whole dataset ships with the page and the work is
 * a filter over a few dozen objects at most. State lives here and flows down; the URL is a
 * projection of it, written by ProjectsUrlState.
 */
export function ProjectsIndex() {
  const [state, setState] = useState<ProjectQueryState>(DEFAULT_QUERY_STATE);
  const resultsRef = useRef<HTMLElement>(null);
  const pendingScroll = useRef(false);

  const results = useMemo(() => filterProjects(projects, state), [state]);
  const total = results.length;
  const pageCount = getPageCount(total);
  const page = clampPage(state.page, pageCount);

  const pageItems = useMemo(
    () => results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [results, page],
  );

  // A narrowing filter can strand the reader on a page that no longer exists.
  // Rendering already uses the clamped page; this settles the state (and so
  // the URL) to match instead of leaving a stale ?page= behind.
  useEffect(() => {
    setState((current) =>
      current.page > pageCount ? { ...current, page: pageCount } : current,
    );
  }, [pageCount]);

  useEffect(() => {
    if (!pendingScroll.current) return;
    pendingScroll.current = false;

    const node = resultsRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    // Keyboard focus follows the eye: the next Tab continues inside the new
    // page of results rather than back at the top of the document.
    node.focus({ preventScroll: true });
  }, [page]);

  const handleQueryChange = useCallback((query: string) => {
    setState((current) => ({ ...current, query, page: 1 }));
  }, []);

  const handleToggleCategory = useCallback((value: string) => {
    setState((current) => ({
      ...current,
      categories: toggleValue(current.categories, value),
      page: 1,
    }));
  }, []);

  const handleToggleStack = useCallback((value: string) => {
    setState((current) => ({
      ...current,
      stack: toggleValue(current.stack, value),
      page: 1,
    }));
  }, []);

  const handleClearAll = useCallback(() => {
    setState(DEFAULT_QUERY_STATE);
  }, []);

  const handlePageChange = useCallback((next: number) => {
    pendingScroll.current = true;
    setState((current) => ({ ...current, page: next }));
  }, []);

  const handleRestore = useCallback((restored: ProjectQueryState) => {
    setState(restored);
  }, []);

  const first = (page - 1) * PAGE_SIZE + 1;
  const last = Math.min(page * PAGE_SIZE, total);
  const resultLabel =
    total === 0
      ? "No matching projects"
      : pageCount > 1
        ? `${first}–${last} of ${total} projects`
        : `${total} ${total === 1 ? "project" : "projects"}`;

  return (
    <Container className="pb-24 sm:pb-32">
      <ProjectsUrlState state={state} onRestore={handleRestore} />

      <section
        aria-labelledby="project-controls-heading"
        className="rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:p-7"
      >
        <h2 id="project-controls-heading" className="sr-only">
          Search and filter projects
        </h2>

        <ProjectSearch
          value={state.query}
          onChange={handleQueryChange}
          resultLabel={resultLabel}
        />

        <ProjectFilters
          categories={allCategories}
          stackItems={STACK_FILTERS}
          selectedCategories={state.categories}
          selectedStack={state.stack}
          onToggleCategory={handleToggleCategory}
          onToggleStack={handleToggleStack}
          onClearAll={handleClearAll}
          canClear={hasActiveFilters(state)}
        />
      </section>

      <section
        ref={resultsRef}
        tabIndex={-1}
        aria-labelledby="project-results-heading"
        className="mt-10 scroll-mt-28 focus:outline-none sm:mt-12"
      >
        <h2 id="project-results-heading" className="sr-only">
          Matching projects
        </h2>

        {total === 0 ? (
          <ProjectsEmptyState
            query={state.query}
            filterCount={activeFilterCount(state)}
            onReset={handleClearAll}
          />
        ) : (
          <ProjectsGrid projects={pageItems} />
        )}

        <ProjectsPagination
          page={page}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </section>
    </Container>
  );
}

function toggleValue(values: string[], value: string): string[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}
