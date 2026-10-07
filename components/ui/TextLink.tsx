import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const BASE =
  "inline-flex min-h-11 items-center gap-2 font-medium underline decoration-border-strong underline-offset-4 transition-colors hover:decoration-foreground";

/**
 * The site's secondary action: an underlined link, not another button. External
 * links open in a new tab, mail links stay in place, internal links route.
 */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(BASE, className);

  if (/^(https?:)?\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {children}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
