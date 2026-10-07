import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Buttons or links pinned to the right on wide screens. */
  actions?: ReactNode;
  /** Match the page outline. There is exactly one h1 per page, in the hero. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** Set this and pass the same value to aria-labelledby on the section. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  title,
  description,
  actions,
  as: Tag = "h2",
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "text-center")}>
        <Tag
          id={id}
          className={cn(
            "text-balance",
            Tag === "h1"
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </Tag>

        {description ? (
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
