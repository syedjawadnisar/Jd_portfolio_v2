import type { Metadata } from "next";

import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import { Container, SectionHeading } from "@/components/ui";
import { allCategories, projects } from "@/data/projects";
import { OG_IMAGE } from "@/lib/og-image";

const description = `${projects.length} projects across ${allCategories.length} domains, from multi-tenant cloud platforms to battery telemetry. Search by name, or filter by domain and technology.`;

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects/" },
  openGraph: {
    type: "website",
    url: "/projects/",
    title: "Projects",
    description,
    // Declaring openGraph here replaces the inherited file-convention image,
    // so it has to be restated. See lib/og-image.ts.
    images: [OG_IMAGE],
  },
  twitter: {
    // Same story as openGraph above: declaring `twitter` here drops the
    // inherited card type and image, so both are restated.
    card: "summary_large_image",
    title: "Projects",
    description,
    images: [OG_IMAGE],
  },
};

/**
 * The projects index. This shell stays a server component so its metadata is
 * static and the page header is plain HTML; everything interactive lives
 * inside ProjectsIndex.
 */
export default function ProjectsPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <SectionHeading
          as="h1"
          title="Projects"
          description={`${projects.length} projects across ${allCategories.length} domains. Search by name, or filter by domain and technology.`}
        />
      </Container>

      <ProjectsIndex />
    </>
  );
}
