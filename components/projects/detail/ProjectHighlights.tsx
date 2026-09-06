import { Reveal } from "@/components/ui";

/**
 * Highlights as a numbered ledger rather than a bullet list: a mono index in a
 * boxed marker, a hairline between rows, and a hover tint that makes the whole
 * row feel like one unit. Ordered markup, because the list is authored in
 * priority order.
 */
export function ProjectHighlights({
  highlights,
  headingId,
}: {
  highlights: string[];
  headingId: string;
}) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-2xl sm:text-3xl">
        What I built
      </h2>

      <ol className="mt-8 border-t border-border">
        {highlights.map((highlight, i) => (
          <Reveal
            key={highlight}
            as="li"
            index={i}
            y={12}
            className="group flex items-start gap-4 border-b border-border py-5 transition-colors duration-300 sm:gap-6"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface font-mono text-xs tabular-nums text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent-soft-foreground"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-base leading-relaxed text-foreground sm:text-lg">
              {highlight}
            </span>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
