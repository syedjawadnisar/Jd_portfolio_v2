import type { Metadata } from "next";

import { ProjectsIndex } from "@/components/projects/ProjectsIndex";
import {
  Container,
  CountUp,
  RevealEager,
  SectionHeading,
  Spotlight,
} from "@/components/ui";
import { allCategories, allStackItems, projects } from "@/data/projects";
import { OG_IMAGE } from "@/lib/og-image";

const description = `Every project in one place — ${projects.length} builds, grouped into ${allCategories.length} domains, from multi-currency billing to battery telemetry at scale. Search and filter by domain or technology.`;

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

/** Header stats. Counted from the data, never typed by hand. */
const STATS = [
  { value: projects.length, label: "Projects" },
  { value: allCategories.length, label: "Domains" },
  { value: allStackItems.length, label: "Technologies" },
];

/**
 * The header is above the fold on every viewport, so it animates in CSS rather
 * than waiting on hydration. See components/ui/RevealEager.tsx.
 */

/**
 * The projects index. This shell stays a server component so its metadata is
 * static and the page header is plain HTML; everything interactive lives
 * inside ProjectsIndex.
 */
export default function ProjectsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
        />
        <Spotlight size={620} />

        <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
          <RevealEager>
            <SectionHeading
              as="h1"
              eyebrow="Work"
              title="Projects"
              description={
                <>
                  Every project in one place — {projects.length} builds, grouped
                  into {allCategories.length} domains, from multi-currency
                  billing to battery telemetry at scale. Filter by domain or
                  technology, then open a card for what was actually built.
                </>
              }
            />
          </RevealEager>

          <RevealEager index={1}>
            <ul className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-8">
              {STATS.map((stat) => (
                <li key={stat.label}>
                  <p className="font-mono text-3xl font-medium tracking-tight sm:text-4xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1.5 font-mono text-xs tracking-[0.18em] text-muted uppercase">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </RevealEager>
        </Container>
      </section>

      <div className="pt-12 sm:pt-16">
        <ProjectsIndex />
      </div>
    </>
  );
}
