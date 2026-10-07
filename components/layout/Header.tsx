"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { navItems, primaryCta, site } from "@/data/site";
import { cn } from "@/lib/utils";

import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/** Section match — drives the underline and the tint, not aria-current. */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

/**
 * `aria-current="page"` means this exact page. On /projects/toptal/ the
 * Projects link is an ancestor-section link, not the current page, and the
 * correct value there is "true" — announcing "current page" would tell a
 * screen-reader user they are somewhere they are not.
 */
function currentValue(
  pathname: string,
  href: string,
): "page" | "true" | undefined {
  if (pathname === href) return "page";
  return isActive(pathname, href) ? "true" : undefined;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close the menu on navigation — the panel outlives the click otherwise.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <Link
          href="/"
          aria-label={`${site.shortName}, home`}
          className="inline-flex min-h-11 items-center rounded-md text-base font-semibold tracking-tight"
        >
          {site.shortName}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={currentValue(pathname, item.href)}
                className={cn(
                  "relative inline-flex h-11 items-center rounded-lg px-3.5 text-sm font-medium transition-colors duration-200",
                  active
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3.5 bottom-2 h-px origin-left bg-accent transition-transform duration-300 ease-out-expo",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
          <a
            href={primaryCta.href}
            className="inline-flex h-11 items-center rounded-lg px-3.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
          >
            {primaryCta.label}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-surface-raised text-muted transition-colors hover:text-foreground md:hidden"
          >
            {open ? (
              <X className="size-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="size-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <div
        id={panelId}
        hidden={!open}
        className="border-t border-border bg-background md:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={currentValue(pathname, item.href)}
                  className={cn(
                    "flex h-12 items-center rounded-lg px-3 text-base font-medium transition-colors",
                    active
                      ? "bg-accent-soft text-accent-soft-foreground"
                      : "text-muted hover:bg-surface hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={primaryCta.href}
              className="flex h-12 items-center rounded-lg px-3 text-base font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {primaryCta.label}
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}
