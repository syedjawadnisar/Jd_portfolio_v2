import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/site";

/** One line per layer of the system, as a definition list rather than chips. */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="scroll-mt-24 border-t border-border"
    >
      <Container className="py-20 sm:py-24">
        <SectionHeading id="skills-title" title="Stack" />

        <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="border-t border-border pt-4">
              <dt className="font-medium">{group.title}</dt>
              <dd className="mt-1.5 leading-relaxed text-muted">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
