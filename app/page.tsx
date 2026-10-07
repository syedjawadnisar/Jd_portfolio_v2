import type { Metadata } from "next";

import {
  About,
  ContactCta,
  FeaturedWork,
  Hero,
  Skills,
} from "@/components/home";
import { site } from "@/data/site";

export const metadata: Metadata = {
  // `absolute` skips the layout template. The home page sits in the same
  // segment as that template, so without it the tab title carried no name.
  title: { absolute: `${site.name}, Senior Full-Stack Engineer & Cloud Architect` },
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Reading order: what he does, the work itself, the tools, who he is, then the
 * one action worth taking.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Skills />
      <About />
      <ContactCta />
    </>
  );
}
