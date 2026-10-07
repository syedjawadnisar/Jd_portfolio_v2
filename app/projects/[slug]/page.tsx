import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getAdjacentProjects,
  getRelatedProjects,
  ProjectHero,
  ProjectHighlights,
  ProjectPager,
  ProjectStack,
  PROJECT_TITLE_ID,
  RelatedProjects,
} from "@/components/projects/detail";
import { Container } from "@/components/ui";
import { allProjectSlugs, getProjectBySlug } from "@/data/projects";
import { site } from "@/data/site";
import { OG_IMAGE } from "@/lib/og-image";

type PageParams = { slug: string };
type PageProps = { params: Promise<PageParams> };

/**
 * Static export: every slug is enumerated at build time and nothing else is
 * reachable, so `dynamicParams` is off and `notFound()` below is purely a
 * guard for a hand-edited URL during development.
 */
export function generateStaticParams(): PageParams[] {
  return allProjectSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

/** Search snippets get cut around 160 characters; give them a clean cut. */
function truncate(text: string, limit = 165): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[.,;:—-]+$/, "")}…`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  const path = `/projects/${project.slug}/`;
  const title = `${project.name}: ${project.tagline}`;
  const description = truncate(`${project.tagline} ${project.summary}`);

  return {
    title: project.name,
    description,
    // The root layout canonicalises to "/", so every page must set its own.
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: site.name,
      locale: "en_US",
      title,
      description,
      // Declaring openGraph here replaces the inherited file-convention image,
      // so it has to be restated. See lib/og-image.ts.
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project);
  const related = getRelatedProjects(project);

  return (
    <div className="pb-20 sm:pb-28">
      <article aria-labelledby={PROJECT_TITLE_ID}>
        <ProjectHero project={project} />

        <Container className="mt-14 sm:mt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="min-w-0">
              <section aria-labelledby="overview-heading">
                <h2 id="overview-heading" className="text-2xl sm:text-3xl">
                  Overview
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  {project.summary}
                </p>
              </section>

              <div className="mt-14 sm:mt-16">
                <ProjectHighlights
                  highlights={project.highlights}
                  headingId="highlights-heading"
                />
              </div>
            </div>

            <ProjectStack stack={project.stack} headingId="stack-heading" />
          </div>
        </Container>
      </article>

      <Container className="mt-20 sm:mt-24">
        <ProjectPager previous={previous} next={next} />
      </Container>

      <Container className="mt-20 border-t border-border pt-16 sm:mt-28 sm:pt-20">
        <RelatedProjects
          projects={related.projects}
          matched={related.matched}
          headingId="related-heading"
        />
      </Container>
    </div>
  );
}
