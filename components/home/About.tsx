import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, site } from "@/data/site";

const META = [
  { term: "Based in", detail: site.location },
  { term: "Availability", detail: site.availability },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="about-title"
              eyebrow={about.heading}
              title="Lead level, hands on the hard parts."
            />

            <dl className="mt-8 space-y-5 border-t border-border pt-6">
              {META.map((item) => (
                <div key={item.term}>
                  <dt className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
                    {item.term}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} index={index}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
