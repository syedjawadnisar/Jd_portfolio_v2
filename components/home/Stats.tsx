"use client";

import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { allCategories, allStackItems, projects } from "@/data/projects";
import { useYearsOfExperience } from "@/lib/experience-client";

/**
 * Every figure here is counted from the content files or computed from the
 * career start date. Nothing is asserted that the site cannot show you.
 */
export function Stats() {
  const years = useYearsOfExperience();

  const stats = [
    { value: years, suffix: "+", label: "Years of professional experience" },
    // Not "shipped end to end": two of the eight are a scoped open-source
    // contribution and a lead-developer stint, and the label has to be true of
    // all of them. The four that were owned end to end say so on their cards.
    { value: projects.length, suffix: "", label: "Projects delivered" },
    {
      value: allStackItems.length,
      suffix: "",
      label: "Technologies across that work",
    },
    {
      value: allCategories.length,
      suffix: "",
      label: "Product domains delivered in",
    },
  ];

  return (
    <section aria-label="By the numbers" className="border-b border-border bg-surface">
      <Container className="py-12 sm:py-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              index={index}
              className="flex flex-col-reverse gap-1.5"
            >
              <dt className="text-sm leading-snug text-muted text-pretty">
                {stat.label}
              </dt>
              <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
