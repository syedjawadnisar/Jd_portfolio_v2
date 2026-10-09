import { Reveal } from "@/components/ui";

/**
 * The stack as a legible list rather than a wall of chips: one row per tool in
 * the mono face, so a recruiter scanning for a keyword finds it in a straight
 * vertical line. Sticks to the viewport alongside the article on large screens.
 */
export function ProjectStack({
  stack,
  headingId,
}: {
  stack: string[];
  headingId: string;
}) {
  return (
    <section aria-labelledby={headingId} className="lg:sticky lg:top-24">
      <Reveal delay={0.1} className="rounded-xl border border-border bg-surface p-6">
        <h2
          id={headingId}
          className="font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase"
        >
          Stack
        </h2>

        <ul className="mt-5 flex flex-col">
          {stack.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full bg-accent/70"
              />
              <span className="font-mono text-sm tracking-tight text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
