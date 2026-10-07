/**
 * One tool per line, so a recruiter scanning for a keyword finds it in a
 * straight vertical line. Sticks beside the article on large screens.
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
      <h2 id={headingId} className="text-sm font-medium">
        Stack
      </h2>

      <ul className="mt-3 space-y-1.5 text-muted">
        {stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
