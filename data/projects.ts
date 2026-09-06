/**
 * Single source of truth for project content.
 *
 * Everything the home page, the projects index and the project detail pages
 * render comes from here. Nothing in this file is generated or inferred —
 * if a fact is not stated here, it should not appear in the UI.
 */

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  /** URL segment — routes resolve to /projects/{slug}/ */
  slug: string;
  name: string;
  /** One punchy line. Used on cards and as the detail-page subtitle. */
  tagline: string;
  /**
   * The domain axis, and the only thing the filter uses. Deliberately coarse:
   * a filter where every option returns one card teaches the visitor that the
   * filter does nothing, so every value here covers at least two projects.
   * Adding a ninth project means placing it in an existing domain, not minting
   * a ninth label.
   */
  category: string;
  /**
   * The precise label, where "FinTech & Billing" loses something worth keeping.
   * Detail pages only — it is not a filter axis.
   */
  focus?: string;
  /** Year or period, only where it is actually known. */
  period?: string;
  /** What Jawad personally owned on this project. */
  role: string;
  /** Two to three sentences of context. */
  summary: string;
  /** Three to five bullets — what was actually built. */
  highlights: string[];
  stack: string[];
  featured: boolean;
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "toptal",
    name: "Toptal",
    tagline: "Worker discounts and multi-currency billing, end to end.",
    category: "FinTech & Billing",
    focus: "FinTech / HR-SaaS",
    role: "Full-stack engineer — feature ownership from schema to UI",
    summary:
      "Built an end-to-end worker discounts system for a global talent marketplace, covering the data model, the service layer and the interface. Also delivered a multi-currency billing approval flow, where money moves across currencies and every state transition has to be auditable.",
    highlights: [
      "Designed and shipped the worker discounts system end to end",
      "Built a multi-currency billing approval flow",
      "Typed React front end backed by a GraphQL API",
      "Rails service and data layer behind both features",
    ],
    stack: ["React", "TypeScript", "Ruby on Rails", "GraphQL"],
    featured: true,
  },
  {
    slug: "cellcloud",
    name: "CellCloud",
    tagline: "Battery telemetry at scale, queried in under 30 seconds.",
    category: "Data & Infrastructure",
    focus: "Battery telemetry",
    role: "Architect and lead engineer",
    summary:
      "Architected a battery-data visualization platform on Python and Flask, built to explore datasets far past the point where a naive query plan gives up. The work was equally about the query layer and the live layer: analysts needed both history and a view that updates while they watch it.",
    highlights: [
      "Architected the Python/Flask visualization platform",
      "Implemented real-time data streaming over WebSockets",
      "Optimized AWS Athena queries across massive datasets",
      "Brought load times under 30 seconds on the heaviest views",
    ],
    stack: ["Python", "Flask", "AWS Athena", "WebSockets", "PostgreSQL"],
    featured: true,
  },
  {
    slug: "chiirp",
    name: "CHIIRP",
    tagline: "Legacy AJAX to Rails Turbo, with the server bill cut on the way.",
    category: "AI & Automation",
    focus: "Marketing automation",
    role: "Remote development lead for a US client",
    summary:
      "Led remote development on a marketing automation platform for a US client. The mandate ran from modernizing a legacy front end to reshaping the back end into services that could grow, while keeping the running cost of the system going down rather than up.",
    highlights: [
      "Migrated a legacy AJAX codebase to Rails Turbo",
      "Architected scalable microservices for the platform",
      "Built a real-time campaign chat module",
      "Integrated Simpro Field Service Management",
      "Optimized Sidekiq background jobs and database queries to reduce server cost",
    ],
    stack: ["Ruby on Rails", "React", "Sidekiq", "PostgreSQL", "Turbo"],
    featured: true,
  },
  {
    slug: "docuseal",
    name: "Docuseal",
    tagline: "Permanent PDF redaction at the coordinate level.",
    category: "SaaS Platforms",
    focus: "Open source / document security",
    role: "Feature engineer — open-source contribution",
    summary:
      "Engineered a permanent text-redaction feature for a major open-source document platform. Redaction that only hides pixels is not redaction, so the implementation works at the PDF coordinate level and removes the underlying text rather than covering it.",
    highlights: [
      "Built permanent text redaction operating on PDF coordinates",
      "Removed underlying text rather than masking it visually",
      "Shipped into a major open-source codebase",
    ],
    stack: ["Ruby on Rails", "PDF tooling"],
    featured: true,
    links: [
      { label: "Repository", href: "https://github.com/docusealco/docuseal" },
    ],
  },
  {
    slug: "moemate",
    name: "Moemate",
    tagline: "AI agent platforms with real personalities behind them.",
    category: "AI & Automation",
    focus: "AI agents",
    role: "Engineer and platform owner",
    summary:
      "Built and managed AI-agent platforms wired directly into LLM APIs. The agents generated virtual personalities and ran social media operations, which meant the system had to hold character state as reliably as it held data.",
    highlights: [
      "Built AI-agent platforms on top of LLM APIs",
      "Implemented virtual personality generation",
      "Ran social media operations through the agent layer",
      "Owned the Node.js and MongoDB services end to end",
    ],
    stack: ["Node.js", "MongoDB", "LLM APIs"],
    featured: false,
  },
  {
    slug: "kscope",
    name: "KScope",
    tagline: "Search, pagination and secure verification on a Go backend.",
    category: "Data & Infrastructure",
    focus: "Search / platform",
    role: "Lead developer",
    summary:
      "Contributed as a lead developer on a Go and GraphQL platform. The work centred on search built around AWS Cognito, the pagination that makes large result sets usable, and custom verification paths that had to be secure without slowing pages down.",
    highlights: [
      "Implemented AWS Cognito-based search",
      "Built pagination for large result sets",
      "Added custom secure verifications",
      "Improved page processing times",
    ],
    stack: ["Go", "GraphQL", "React", "AWS Cognito"],
    featured: false,
  },
  {
    slug: "labweb",
    name: "Labweb",
    tagline: "A custom SaaS portal, built and deployed.",
    category: "SaaS Platforms",
    focus: "SaaS portal",
    role: "Full-stack engineer",
    summary:
      "Built and deployed a custom SaaS portal on a Rails and Next.js stack. Full ownership from the data layer through to the interface and the deployment that put it in front of users.",
    highlights: [
      "Built the SaaS portal end to end",
      "Rails API with a Next.js front end",
      "PostgreSQL data layer",
      "Handled deployment through to production",
    ],
    stack: ["Ruby on Rails", "Next.js", "PostgreSQL"],
    featured: false,
  },
  {
    slug: "case-manager",
    name: "Case Manager",
    tagline: "Dynamic dashboards, N+1 bottlenecks removed, payments wired in.",
    category: "FinTech & Billing",
    focus: "SaaS / dashboards",
    role: "Full-stack engineer — schema design and integrations",
    summary:
      "Built dynamic management dashboards backed by a database schema designed from scratch. Dashboards surface the query problems a schema is hiding, so a large part of the work was finding and resolving the N+1 bottlenecks behind the slow views, then integrating the third-party services the product billed through.",
    highlights: [
      "Built dynamic management dashboards",
      "Designed the database schema end to end",
      "Resolved complex N+1 query bottlenecks",
      "Integrated Stripe and the QuickBooks API",
    ],
    stack: ["Ruby on Rails", "PostgreSQL", "Stripe", "QuickBooks API"],
    featured: false,
  },
];

/** Projects flagged for the home page, in authored order. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Every domain, deduped and sorted — this is what the filter chips render.
 * Shorter than `projects` by design: see the note on `Project["category"]`.
 */
export const allCategories: string[] = Array.from(
  new Set(projects.map((p) => p.category)),
).sort((a, b) => a.localeCompare(b));

/** Every stack item across all projects, deduped and sorted. */
export const allStackItems: string[] = Array.from(
  new Set(projects.flatMap((p) => p.stack)),
).sort((a, b) => a.localeCompare(b));

/** All slugs — feed this straight into generateStaticParams. */
export const allProjectSlugs: string[] = projects.map((p) => p.slug);
