import { Github, Linkedin, Mail } from "lucide-react";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

/** Keeps the decorative grid from colliding with the card border. */
const GRID_MASK: CSSProperties = {
  maskImage: "radial-gradient(80% 80% at 50% 0%, #000, transparent 100%)",
  WebkitMaskImage: "radial-gradient(80% 80% at 50% 0%, #000, transparent 100%)",
};

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <Container className="pb-4 sm:pb-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-surface-raised px-6 py-14 shadow-sm sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              style={GRID_MASK}
              className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-32 -z-10 h-64 bg-[radial-gradient(55%_100%_at_50%_100%,var(--accent-soft),transparent)]"
            />

            <SectionHeading
              id="contact-title"
              align="center"
              eyebrow="Contact"
              title={
                <span className="text-gradient-accent">
                  Tell me what you are building.
                </span>
              }
              description={`${site.availability}. Email is the fastest way to reach me.`}
            />

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                href={`mailto:${site.email}`}
                size="lg"
                fullWidth
                className="sm:w-auto"
                iconLeft={<Mail className="size-4" strokeWidth={2} />}
              >
                <span className="font-mono text-sm">{site.email}</span>
              </Button>
              <Button
                href={site.linkedin}
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto"
                iconLeft={<Linkedin className="size-4" strokeWidth={2} />}
              >
                LinkedIn
              </Button>
              <Button
                href={site.github}
                variant="secondary"
                size="lg"
                fullWidth
                className="sm:w-auto"
                iconLeft={<Github className="size-4" strokeWidth={2} />}
              >
                GitHub
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
