"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

import {
  isDefaultQueryState,
  parseProjectQuery,
  serializeProjectQuery,
  type ProjectQueryState,
} from "./query-state";

export type ProjectsUrlStateProps = {
  state: ProjectQueryState;
  /** Called once on mount when the URL carries a non-default view. */
  onRestore: (state: ProjectQueryState) => void;
};

/**
 * Keeps the search params and the index state in step. Renders nothing.
 *
 * It is a component rather than a hook inside the index for one reason:
 * `useSearchParams` forces client-side rendering of everything above it, and
 * under `output: "export"` the build fails outright unless that bailout is
 * contained by a Suspense boundary. Isolating it here means the boundary wraps
 * an empty component instead of the results, so the grid, the filters and every
 * project card still ship inside the statically exported HTML — which is what
 * crawlers and a cold first paint actually read.
 */
export function ProjectsUrlState(props: ProjectsUrlStateProps) {
  return (
    <Suspense fallback={null}>
      <UrlStateSync {...props} />
    </Suspense>
  );
}

function UrlStateSync({ state, onRestore }: ProjectsUrlStateProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /** Serialized form of the view the URL is known to hold. */
  const lastWritten = useRef("");
  const restoreDone = useRef(false);
  /**
   * Set while a restored view is in flight: the URL said one thing on mount,
   * the parent state has not caught up yet, and the writer below must not
   * mistake that gap for the reader clearing their filters.
   */
  const awaitingRestore = useRef<string | null>(null);

  useEffect(() => {
    if (restoreDone.current) return;
    restoreDone.current = true;

    const parsed = parseProjectQuery(searchParams);
    const serialized = serializeProjectQuery(parsed);
    lastWritten.current = serialized;

    if (!isDefaultQueryState(parsed)) {
      awaitingRestore.current = serialized;
      onRestore(parsed);
    }
    // Read once, on mount. After that the state owns the URL, not the reverse —
    // re-reading on every param change would fight the writer below.
  }, [searchParams, onRestore]);

  useEffect(() => {
    const next = serializeProjectQuery(state);

    if (awaitingRestore.current !== null) {
      // Still the pre-restore default? Wait. Anything else means the state has
      // either landed or the reader got there first, and the writer resumes.
      if (isDefaultQueryState(state) && next !== awaitingRestore.current) return;
      awaitingRestore.current = null;
    }

    if (next === lastWritten.current) return;
    lastWritten.current = next;

    /**
     * `history.replaceState`, not `router.replace`.
     *
     * This is a static export, so there is no RSC payload sitting at
     * `/projects/?q=rails`; asking the App Router to navigate there makes it
     * request a document the host answers with plain HTML, and it falls back to
     * a full page load. The native History API is what Next documents for
     * exactly this case — filter and sort params that change the URL without
     * changing the route. It also cannot scroll the page, which is what you
     * want while someone is still typing.
     */
    const url = next ? `${pathname}?${next}` : pathname;
    window.history.replaceState(window.history.state, "", url);
  }, [state, pathname]);

  return null;
}
