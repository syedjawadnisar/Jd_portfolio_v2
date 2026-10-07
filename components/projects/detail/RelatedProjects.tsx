import { ProjectCard, SectionHeading } from "@/components/ui";
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
      <SectionHeading
        id={headingId}
        title={matched ? "Similar work" : "More work"}
        description={
          matched ? "Projects that share this one's domain or stack." : undefined
        }
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug} className="h-full">
            <ProjectCard project={project} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </section>
  );
}
