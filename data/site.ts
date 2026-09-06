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
  /** One line explaining how the group is actually used. */
  note: string;
  items: string[];
};

export const site = {
  name: "Syed Jawad Nisar",
  /**
   * Production origin, and the last-resort fallback for canonicals, OG tags,
   * JSON-LD and the sitemap. Point this at the custom domain the day one is
   * attached; until then it is the Cloudflare Pages origin for this project.
   * Never a localhost value — see lib/site-url.ts for why.
   */
  url: "https://jd-portfolio-v2.pages.dev",
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
  /** Rendered as the single h1. Split on words for a staggered reveal. */
  headline: "I build systems that stay fast when they get big.",
  subheadline:
    "Senior full-stack engineer and cloud architect. I take products from schema design through to the interface people actually use — and I stay for the part where the queries get slow, the bill gets loud and someone has to fix it.",
  /** Short line under the CTAs. Keep it to one clause. */
  note: "Lahore, Pakistan · working remote with teams worldwide",
} as const;

export const about = {
  heading: "About",
  paragraphs: [
    "I am a senior full-stack engineer and cloud architect based in Lahore. I work where product decisions and infrastructure decisions meet: designing schemas, cutting query times, standing up real-time systems, and shipping the features that pay for all of it.",
    "I operate at lead level. I have juniors reporting to me, I own ticket flow and delivery planning, and the complex or urgent production work is mine to handle. That last part is deliberate — the fastest way to keep a system honest is to be the one who gets paged by it.",
    "Recent work sits at the intersection of AI and cloud: LLM integration and agent platforms on one side, and the AWS plumbing that keeps them fast and affordable on the other.",
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
    note: "Typed, accessible interfaces that stay maintainable past the first release.",
    items: ["TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    note: "Service and API design across four runtimes, chosen to fit the problem.",
    items: ["Node.js", "Ruby on Rails", "Python", "Go", "GraphQL", "REST"],
  },
  {
    title: "Data",
    note: "Schema design, indexing and query work — relational, document and analytical.",
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
    note: "Serverless building blocks, containers and pipelines that ship without ceremony.",
    items: [
      "AWS Lambda",
      "AWS S3",
      "AWS Cognito",
      "Docker",
      "CI/CD with GitHub Actions",
    ],
  },
  {
    title: "Practice",
    note: "How the work gets done, and how it holds up once other people depend on it.",
    items: [
      "Microservices",
      "Real-time systems",
      "LLM integration",
      "Performance optimization",
      "Mentoring",
    ],
  },
];

/** Reused by the header CTA and the contact section. */
export const primaryCta = {
  label: "Get in touch",
  href: `mailto:${site.email}`,
} as const;
