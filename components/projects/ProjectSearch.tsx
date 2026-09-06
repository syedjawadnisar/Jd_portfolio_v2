"use client";

import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/** Long enough to swallow a burst of typing, short enough to feel immediate. */
const DEBOUNCE_MS = 180;

export type ProjectSearchProps = {
  /** Committed query — the value the results are actually filtered by. */
  value: string;
  onChange: (next: string) => void;
  /** Rendered next to the field so the effect of typing is visible, not implied. */
  resultLabel: string;
};

/**
 * Debounced search field.
 *
 * The input keeps its own draft state and pushes upstream on a timer, so a fast
 * typist never triggers a filter pass (or a URL write) per keystroke. `value`
 * still wins whenever it changes from the outside — a restored URL, or "Clear
 * all" — which is what the committed ref disambiguates: an echo of our own
 * commit is ignored, an external change replaces the draft.
 */
export function ProjectSearch({ value, onChange, resultLabel }: ProjectSearchProps) {
  const [draft, setDraft] = useState(value);
  const committed = useRef(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === committed.current) return;
    committed.current = value;
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (draft === committed.current) return;

    const timer = window.setTimeout(() => {
      committed.current = draft;
      onChange(draft);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [draft, onChange]);

  const clear = useCallback(() => {
    setDraft("");
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <label
        htmlFor="project-search"
        className="block text-sm font-medium text-foreground"
      >
        Search projects
      </label>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative flex-1">
          <Search
            aria-hidden="true"
            strokeWidth={2}
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
          />

          <input
            ref={inputRef}
            id="project-search"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && draft !== "") {
                event.preventDefault();
                clear();
              }
            }}
            placeholder="Name, technology or outcome"
            autoComplete="off"
            spellCheck={false}
            aria-describedby="project-search-hint"
            className="h-12 w-full rounded-lg border border-border bg-surface-raised pr-12 pl-11 text-base text-foreground transition-colors duration-200 placeholder:text-muted hover:border-border-strong focus-visible:border-accent sm:text-sm [&::-webkit-search-cancel-button]:appearance-none"
          />

          {draft !== "" ? (
            <button
              type="button"
              onClick={clear}
              aria-label="Clear search"
              className="absolute top-1/2 right-0.5 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:text-foreground"
            >
              <X aria-hidden="true" className="size-4" strokeWidth={2} />
            </button>
          ) : null}
        </div>

        {/* The one live region on the page. Announces the count after every
            search, filter or page change, and doubles as the visible tally. */}
        <p
          id="project-search-hint"
          aria-live="polite"
          aria-atomic="true"
          className="font-mono text-xs text-muted sm:w-44 sm:shrink-0 sm:text-right"
        >
          {resultLabel}
        </p>
      </div>
    </div>
  );
}
