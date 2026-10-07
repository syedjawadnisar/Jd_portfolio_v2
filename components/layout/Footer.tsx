import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import { contactLinks, navItems, site } from "@/data/site";

import { Container } from "@/components/ui/Container";

import { FooterYear } from "./FooterYear";

const ICONS: Record<
  (typeof contactLinks)[number]["icon"],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
};

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="py-14">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {site.role}
              <span className="block">{site.location}</span>
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="text-sm font-medium">
                Site
              </h2>
              <ul className="mt-4 space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex h-11 items-center text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-medium">
                Contact
              </h2>
              <ul className="mt-4 space-y-1">
                {contactLinks.map((link) => {
                  const Icon = ICONS[link.icon];
                  const external = link.href.startsWith("http");

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="inline-flex h-11 items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        <span className="sr-only">{link.label}: </span>
                        {link.value}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted">
            &copy; <FooterYear /> {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
