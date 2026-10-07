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
  title: "Senior Full-Stack Engineer & Cloud Architect",
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
