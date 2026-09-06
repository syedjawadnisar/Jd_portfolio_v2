"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { getPageTokens } from "./query-state";

export type ProjectsPaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

/**
 * Page controls.
 *
 * Buttons rather than links: the URL is kept in sync by the index itself, and
 * a static export has no server route per page anyway. Disabled ends stay in
 * the DOM so the control never changes width mid-navigation.
 */
export function ProjectsPagination({
  page,
  pageCount,
  onPageChange,
}: ProjectsPaginationProps) {
  if (pageCount <= 1) return null;

  const tokens = getPageTokens(page, pageCount);

  return (
    <nav aria-label="Projects pagination" className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-1.5">
        <li>
          <StepButton
            direction="previous"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          />
        </li>

        {tokens.map((token, index) =>
          token === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden="true"
              className="px-1 font-mono text-sm text-muted"
            >
              &hellip;
            </li>
          ) : (
            <li key={token}>
              <button
                type="button"
                onClick={() => onPageChange(token)}
                aria-current={token === page ? "page" : undefined}
                aria-label={`Page ${token}`}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-lg border font-mono text-sm transition-[background-color,border-color,color] duration-200",
                  token === page
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface-raised text-muted hover:border-border-strong hover:text-foreground",
                )}
              >
                {token}
              </button>
            </li>
          ),
        )}

        <li>
          <StepButton
            direction="next"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          />
        </li>
      </ul>
    </nav>
  );
}

function StepButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "previous" ? "Previous page" : "Next page"}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-lg border border-border bg-surface-raised text-muted transition-[background-color,border-color,color] duration-200",
        "hover:border-border-strong hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-40",
      )}
    >
      <Icon aria-hidden="true" className="size-4" strokeWidth={2} />
    </button>
  );
}
