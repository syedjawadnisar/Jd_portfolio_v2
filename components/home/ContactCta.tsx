import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { site } from "@/data/site";

/** The address itself is the call to action. */
export function ContactCta() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 border-t border-border"
    >
      <Container className="py-20 sm:py-24">
        <SectionHeading
          id="contact-title"
          title="Contact"
          description="Email is the fastest way to reach me."
        />

        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block text-2xl font-semibold tracking-tight break-words underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-foreground sm:text-3xl"
        >
          {site.email}
        </a>

        <div className="mt-4 flex flex-wrap gap-x-7">
          <TextLink href={site.linkedin}>LinkedIn</TextLink>
          <TextLink href={site.github}>GitHub</TextLink>
        </div>
      </Container>
    </section>
  );
}
