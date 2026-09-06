"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef } from "react";

import { THEME_COLOR, THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * Deliberately stateless: the current theme lives on `<html class="dark">`,
 * which the blocking script in the document head has already set before first
 * paint. Both icons are rendered and one is hidden by the `dark:` variant, so
 * there is nothing to hydrate, nothing to mismatch, and no icon flicker on load.
 *
 * The one thing that design costs is `aria-pressed`, because the server has no
 * idea which theme this visitor chose. So it is written to the DOM after mount
 * instead of rendered: the server still emits no attribute, there is still no
 * mismatch, and a screen-reader user gets the state rather than a bare toggle.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);

  const syncState = (dark: boolean) => {
    ref.current?.setAttribute("aria-pressed", String(dark));
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? THEME_COLOR.dark : THEME_COLOR.light);
  };

  useEffect(() => {
    syncState(document.documentElement.classList.contains("dark"));
    // syncState only touches refs and the document
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    const dark = next === "dark";

    root.classList.toggle("dark", dark);
    root.style.colorScheme = next;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the toggle still works for this visit.
    }

    syncState(dark);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label="Dark mode"
      title="Toggle dark mode"
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-lg border border-border",
        "bg-surface-raised text-muted transition-colors duration-200",
        "hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      <Sun
        className="size-[18px] transition-transform duration-300 ease-out-expo dark:hidden motion-reduce:transform-none"
        aria-hidden="true"
      />
      <Moon
        className="hidden size-[18px] transition-transform duration-300 ease-out-expo dark:block motion-reduce:transform-none"
        aria-hidden="true"
      />
    </button>
  );
}
