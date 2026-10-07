"use client";

import { ChevronDown, RotateCcw } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

/** How many technology chips stay visible before the list collapses. */
const STACK_PREVIEW = 10;

export type ProjectFiltersProps = {
  categories: string[];
  stackItems: string[];
  selectedCategories: string[];
  selectedStack: string[];
  onToggleCategory: (value: string) => void;
  onToggleStack: (value: string) => void;
  onClearAll: () => void;
  /** Enables the reset control — search counts towards this too. */
  canClear: boolean;
};

/**
 * Two multi-select chip groups, sourced from the data so they can never list a
 * value no project has. Selections are `aria-pressed` toggle buttons rather
 * than checkboxes: the control is a filter, not a form field, and nothing here
 * is submitted.
 */
export function ProjectFilters({
  categories,
  stackItems,
  selectedCategories,
  selectedStack,
  onToggleCategory,
  onToggleStack,
  onClearAll,
  canClear,
}: ProjectFiltersProps) {
  const [showAllStack, setShowAllStack] = useState(false);

  // Collapsed still has to show every active chip, or a filter could be on
  // with no way to see or switch it off.
  const visibleStack = useMemo(() => {
    if (showAllStack) return stackItems;
    const preview = stackItems.slice(0, STACK_PREVIEW);
    const hidden = stackItems
      .slice(STACK_PREVIEW)
      .filter((item) => selectedStack.includes(item));
    return [...preview, ...hidden];
  }, [showAllStack, stackItems, selectedStack]);

  const hiddenCount = stackItems.length - visibleStack.length;

  return (
    <div className="mt-6 border-t border-border pt-6">
      <FilterGroup label="Domain" id="filter-domain">
        {categories.map((category) => (
          <FilterChip
            key={category}
            label={category}
            pressed={selectedCategories.includes(category)}
            onClick={() => onToggleCategory(category)}
          />
        ))}
      </FilterGroup>

      <FilterGroup label="Technology" id="filter-stack" className="mt-5">
        {visibleStack.map((item) => (
          <FilterChip
            key={item}
            label={item}
            mono
            pressed={selectedStack.includes(item)}
            onClick={() => onToggleStack(item)}
          />
        ))}

        {hiddenCount > 0 || showAllStack ? (
          <li>
            <button
              type="button"
              onClick={() => setShowAllStack((open) => !open)}
              aria-expanded={showAllStack}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent-soft"
            >
              {showAllStack ? "Show fewer" : `Show all ${stackItems.length}`}
              <ChevronDown
                aria-hidden="true"
                strokeWidth={2}
                className={cn(
                  "size-4 transition-transform duration-300 ease-out-expo",
                  showAllStack && "rotate-180",
                )}
              />
            </button>
          </li>
        ) : null}
      </FilterGroup>

      {canClear ? (
        <div className="mt-4 flex items-center">
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-surface-raised hover:text-foreground"
          >
            <RotateCcw aria-hidden="true" strokeWidth={2} className="size-4" />
            Clear all
          </button>
        </div>
      ) : null}
    </div>
  );
}

function FilterGroup({
  label,
  id,
  className,
  children,
}: {
  label: string;
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h3
        id={id}
        className="text-sm font-medium"
      >
        {label}
      </h3>
      <ul aria-labelledby={id} className="mt-3 flex flex-wrap gap-2">
        {children}
      </ul>
    </div>
  );
}

function FilterChip({
  label,
  pressed,
  mono,
  onClick,
}: {
  label: string;
  pressed: boolean;
  mono?: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={pressed}
        onClick={onClick}
        className={cn(
          "inline-flex min-h-11 items-center rounded-lg border px-3.5 py-2 text-sm transition-[background-color,border-color,color] duration-200",
          mono && "font-mono text-[13px] tracking-tight",
          pressed
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border bg-surface-raised text-muted hover:border-border-strong hover:text-foreground",
        )}
      >
        {label}
      </button>
    </li>
  );
}
