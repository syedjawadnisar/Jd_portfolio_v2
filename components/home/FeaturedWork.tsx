import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { featuredProjects, projects } from "@/data/projects";

export function FeaturedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-24 border-t border-border"
    >
      <Container className="py-20 sm:py-24">
        <SectionHeading
          id="work-title"
          title="Selected work"
          description={`A few recent projects. All ${projects.length} are on the projects page.`}
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard project={project} variant="featured" headingLevel="h3" />
            </li>
          ))}
        </ul>

        <TextLink href="/projects/" className="mt-10 text-base">
          All {projects.length} projects
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2} />
        </TextLink>
      </Container>
    </section>
  );
}
