import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/site";

/**
 * Grouped rather than listed: five cards with a line of context each are read
 * in seconds, where the same thirty badges in one block are read by nobody.
 */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="scroll-mt-24 border-y border-border bg-surface"
    >
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow="Capabilities"
            title="What I work with, and what I use it for."
            description="Grouped by where it sits in the system rather than by how long the list can be made."
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} as="li" index={index} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface-raised p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-md motion-reduce:hover:translate-y-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  <span aria-hidden="true" className="font-mono text-xs text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {group.note}
                </p>

                <ul
                  aria-label={`${group.title} technologies`}
                  className="mt-5 flex flex-wrap gap-1.5"
                >
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge size="sm" mono>
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
