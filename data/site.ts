/**
 * Profile, copy and navigation. The other single source of truth.
 *
 * Nothing here should be duplicated inside a component — if a page needs a
 * name, a link or a line of copy, it reads it from this file.
 */

export type NavItem = {
  label: string;
  /** Keep the trailing slash — next.config.ts sets trailingSlash: true. */
  href: string;
};

export type ContactLink = {
  label: string;
  /** Handle or address shown in the UI. */
  value: string;
  href: string;
  /** lucide-react icon name the consuming component maps to. */
  icon: "mail" | "linkedin" | "github";
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const site = {
  name: "Syed Jawad Nisar",
  /**
   * Production origin, and the last-resort fallback for canonicals, OG tags,
   * JSON-LD and the sitemap. Point this at the custom domain the day one is
   * attached. Since 2026-09 that is jawadnisar.com.
   * Never a localhost value — see lib/site-url.ts for why.
   */
  url: "https://jawadnisar.com",
  shortName: "Jawad Nisar",
  /** Monogram for the header logo. */
  initials: "JN",
  role: "Senior Full-Stack Engineer / AI & Cloud Architect",
  location: "Lahore, Pakistan",
  /** Where he can work from, stated plainly for recruiters scanning fast. */
  availability: "Open to senior and lead remote roles, and to consulting work",
  email: "jawadnisar77@gmail.com",
  linkedin: "https://linkedin.com/in/jawadnisar",
  github: "https://github.com/syedjawadnisar",
  description:
    "Senior full-stack engineer and cloud architect. React and TypeScript on the front, Rails, Node, Python and Go behind it, on AWS.",
} as const;

export const hero = {
  /** Rendered as the single h1, in one colour. */
  headline: "I build systems that stay fast when they get big.",
  subheadline:
    "Senior full-stack engineer and cloud architect, currently leading a small team. Most of my work is multi-tenant SaaS on AWS, in Ruby on Rails and TypeScript, from the database schema to the interface.",
} as const;

export const about = {
  heading: "About",
  paragraphs: [
    "I'm a senior full-stack engineer in Lahore, Pakistan. I work across the whole system: database schemas, APIs, AWS infrastructure and the interface on top of it.",
    "I work at lead level. Juniors report to me and I own delivery planning, and I still take the difficult production problems myself.",
    "My recent work is mostly multi-tenant SaaS on AWS, including an isolated GovCloud deployment, plus LLM features running in production.",
  ],
} as const;

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: "mail",
  },
  {
    label: "LinkedIn",
    value: "in/jawadnisar",
    href: site.linkedin,
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "syedjawadnisar",
    href: site.github,
    icon: "github",
  },
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects/" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Ruby on Rails", "Python", "Go", "GraphQL", "REST"],
  },
  {
    title: "Data",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS DynamoDB",
      "AWS Athena",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS Lambda",
      "Step Functions",
      "EventBridge",
      "SQS",
      "AWS Cognito",
      "Terraform",
      "AWS CDK",
      "Docker",
      "CI/CD with GitHub Actions",
    ],
  },
  {
    title: "Practice",
    items: [
      "Multi-tenant SaaS",
      "Event-driven systems",
      "Microservices",
      "Real-time systems",
      "LLM integration",
      "Performance optimization",
      "Release engineering",
      "Mentoring",
    ],
  },
];

/** The email link in the header, desktop and mobile. */
export const primaryCta = {
  label: "Email",
  href: `mailto:${site.email}`,
} as const;
