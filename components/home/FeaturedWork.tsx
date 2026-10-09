import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProjects, projects } from "@/data/projects";

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24">
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Different domains, the same job: make it work, then make it hold."
            description="A GovCloud build-out, subscription metering, AI in production and marketplace billing. Open a card for what was built and what it runs on."
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} as="li" index={index} className="h-full">
              <ProjectCard project={project} variant="featured" headingLevel="h3" />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-center gap-3">
          <Button
            href="/projects/"
            size="lg"
            iconRight={<ArrowRight className="size-4" strokeWidth={2} />}
          >
            View all projects
          </Button>
          <p className="font-mono text-xs text-muted">
            {`${projects.length} projects, searchable and filterable`}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
