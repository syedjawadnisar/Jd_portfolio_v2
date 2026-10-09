import { ProjectCard, Reveal, SectionHeading } from "@/components/ui";
import type { Project } from "@/data/projects";

/**
 * Two or three neighbouring projects. `matched` decides the copy: when the list
 * had to be topped up from the rest of the work, the heading says so instead of
 * claiming a relationship the data does not support.
 */
export function RelatedProjects({
  projects,
  matched,
  headingId,
}: {
  projects: Project[];
  matched: boolean;
  headingId: string;
}) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby={headingId}>
      <Reveal>
        <SectionHeading
          id={headingId}
          eyebrow={matched ? "Related" : "Keep reading"}
          title={matched ? "Similar work" : "More work"}
          description={
            matched
              ? "Other projects that share this one's domain or its stack."
              : "Other things worth a look while you are here."
          }
        />
      </Reveal>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug} index={i} className="h-full">
            <ProjectCard project={project} headingLevel="h3" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
