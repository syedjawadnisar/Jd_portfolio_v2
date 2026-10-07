/** Authored in priority order, so the list is ordered markup. */
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

      <ol className="mt-6 list-decimal space-y-3 pl-5 marker:text-muted">
        {highlights.map((highlight) => (
          <li key={highlight} className="pl-2 text-base leading-relaxed sm:text-lg">
            {highlight}
          </li>
        ))}
      </ol>
    </section>
  );
}
