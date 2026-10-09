import type { Metadata } from "next";

import {
  About,
  ContactCta,
  FeaturedWork,
  Hero,
  Skills,
  Stats,
} from "@/components/home";
import { site } from "@/data/site";

// No `title` here on purpose. This page shares a segment with the root layout,
// so the layout's template never wraps it. Leaving it unset lets the layout's
// default, name then role, become the home tab title.
export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Reading order is the argument: what he does, proof it is real, the work
 * itself, the tools, who he is, then the one action worth taking.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedWork />
      <Skills />
      <About />
      <ContactCta />
    </>
  );
}
