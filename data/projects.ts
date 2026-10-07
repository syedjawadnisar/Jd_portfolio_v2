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
    slug: "public-safety-workforce-platform",
    name: "Public-safety workforce platform",
    tagline: "Multi-tenant AWS SaaS, with an isolated GovCloud deployment.",
    category: "SaaS Platforms",
    focus: "Public safety / AWS GovCloud",
    period: "2026, ongoing",
    role: "Full-stack engineer at Codlinx (formerly Igknight Tech), across backend, frontend, infrastructure and release engineering",
    summary:
      "Overtime and shift management for law-enforcement agencies: officers claim shifts, check in and out, and are paid from the records. I work across the whole monorepo, a GraphQL API on Lambda, roughly 35 functions in all, two React apps and Terraform-managed infrastructure over 28 AWS services. Most of 2026 went into an isolated GovCloud deployment for a compliance-bound tenant.",
    highlights: [
      "Delivered an isolated AWS GovCloud environment end to end, then made the app run where services it relied on do not exist",
      "Designed a machine-to-machine integration API with a custom Lambda authorizer, scopes, token revocation and per-route rate limits",
      "Built production observability from zero, with CloudWatch alarms and a severity-classifying alert processor that routes to Slack",
      "Introduced patch-aware drift audits and a pre-deploy checklist after proving fixes were being stranded between releases",
      "Generated regulator-formatted PDF and Word forms entirely in the browser",
    ],
    stack: [
      "TypeScript",
      "GraphQL",
      "AWS Lambda",
      "Terraform",
      "MongoDB",
      "React",
      "Node.js",
      "AWS GovCloud",
    ],
    featured: true,
  },
  {
    slug: "kscope",
    name: "KScope",
    tagline: "Subscriptions, credit metering and a tenant control plane in Go.",
    category: "FinTech & Billing",
    focus: "Knowledge platform / billing and entitlements",
    role: "Lead developer at Codlinx (formerly Igknight Tech), across more than ten repositories",
    summary:
      "A multi-tenant knowledge and insight platform built from Go microservices over PostgreSQL and a Neptune knowledge graph. My latest work there was the commercial layer: subscriptions, tiers, a credit ledger and self-serve upgrades. I also contributed to a control-plane and data-plane split that keeps entitlement checks fast.",
    highlights: [
      "Built subscription, tier and credit-management features across the Go backend and the React front end",
      "Contributed to the control-plane and data-plane re-architecture, syncing over FIFO SQS with idempotent, fail-closed handlers",
      "Built admin-console tooling for tenants, subscriptions and the tier catalog, with server-side USD to credit conversion",
      "Integrated Stripe for self-serve tier upgrades, with Cognito auth inside a row-level-security tenant model",
      "Earlier on the platform: Cognito-based search, dependent filters, pagination and custom email verification that cut page processing time",
    ],
    stack: [
      "Go",
      "GraphQL",
      "PostgreSQL",
      "AWS SQS",
      "Stripe",
      "React",
      "TypeScript",
      "AWS Cognito",
      "AWS CDK",
    ],
    featured: true,
    links: [{ label: "kscope.ai", href: "https://kscope.ai" }],
  },
  {
    slug: "intelligencex",
    name: "IntelligenceX",
    tagline: "Call recordings in, LLM-scored compliance scorecards out.",
    category: "AI & Automation",
    focus: "LLM compliance scoring / insurance call centers",
    role: "Full-stack engineer at Codlinx (formerly Igknight Tech)",
    summary:
      "A multi-tenant platform for insurance call centers. Recordings arrive from SFTP, S3 and partner APIs, get transcribed, then scored by configurable LLM scorecards for required disclaimers and agent performance. I worked across the ingestion pipeline, the background job stack and the React front end.",
    highlights: [
      "Shipped features and production fixes across ingestion from SFTP, S3 and partner APIs",
      "Hardened concurrent ingestion with race-safe writes backed by unique indexes",
      "Added per-item isolation to scheduled job loops, so one bad record cannot stall the rest",
      "Improved the prompt runner behind the LLM scorecards",
      "Tightened the protocol for destructive production scripts, with read-only pre-flights that print the blast radius",
    ],
    stack: [
      "Ruby on Rails",
      "React",
      "PostgreSQL",
      "LLM APIs",
      "Solid Queue",
      "TypeScript",
      "Deepgram",
      "AWS",
    ],
    featured: true,
  },
  {
    slug: "global-talent-marketplace",
    name: "Global talent marketplace",
    tagline: "Worker discounts and multi-currency billing, end to end.",
    category: "FinTech & Billing",
    focus: "FinTech / HR-SaaS",
    role: "Full-stack engineer at Codlinx (formerly Igknight Tech), owning features from schema to UI",
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
    role: "Architect and lead engineer at Codlinx (formerly Igknight Tech)",
    summary:
      "Architected a battery-data visualization platform on Python and Flask, built to explore datasets far past the point where a naive query plan gives up. The work was equally about the query layer and the live layer: analysts needed both history and a view that updates while they watch it.",
    highlights: [
      "Architected the Python/Flask visualization platform",
      "Implemented real-time data streaming over WebSockets",
      "Optimized AWS Athena queries across massive datasets",
      "Brought load times under 30 seconds on the heaviest views",
    ],
    stack: ["Python", "Flask", "AWS Athena", "WebSockets", "PostgreSQL"],
    featured: false,
  },
  {
    slug: "chiirp",
    name: "CHIIRP",
    tagline: "Legacy AJAX to Rails Turbo, with the server bill cut on the way.",
    category: "AI & Automation",
    focus: "Marketing automation",
    period: "2025",
    role: "Remote development lead, on contract with a US client",
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
    featured: false,
    links: [{ label: "chiirp.com", href: "https://chiirp.com" }],
  },
  {
    slug: "docuseal",
    name: "Docuseal",
    tagline: "Permanent PDF redaction at the coordinate level.",
    category: "SaaS Platforms",
    focus: "Open source / document security",
    role: "Feature engineer at Cybros.Dev, on an open-source contribution",
    summary:
      "Engineered a permanent text-redaction feature for a major open-source document platform. Redaction that only hides pixels is not redaction, so the implementation works at the PDF coordinate level and removes the underlying text rather than covering it.",
    highlights: [
      "Built permanent text redaction operating on PDF coordinates",
      "Removed underlying text rather than masking it visually",
      "Shipped further features and UI changes into a major open-source codebase",
      "Built DocWizard, a new Rails application on Fabric.js and PostgreSQL",
    ],
    stack: [
      "Ruby on Rails",
      "Vue.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Fabric.js",
      "PDF tooling",
    ],
    featured: false,
    links: [
      { label: "docuseal.com", href: "https://www.docuseal.com" },
      { label: "Repository", href: "https://github.com/docusealco/docuseal" },
    ],
  },
  {
    slug: "moemate",
    name: "Moemate",
    tagline: "AI agent platforms with real personalities behind them.",
    category: "AI & Automation",
    focus: "AI agents",
    role: "Lead developer at Codlinx (formerly Igknight Tech)",
    summary:
      "Built and managed AI-agent platforms wired directly into LLM APIs. The agents generated virtual personalities and ran social media operations, which meant the system had to hold character state as reliably as it held data.",
    highlights: [
      "Built AI-agent platforms on top of LLM APIs",
      "Implemented virtual personality generation",
      "Ran social media operations through the agent layer",
      "Worked across sub-products for AI memes, comics, art and character-driven social accounts",
      "Owned the Node.js and MongoDB services end to end",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "AWS OpenSearch",
      "Next.js",
      "React",
      "LLM APIs",
    ],
    featured: false,
  },
  {
    slug: "eliza-agent",
    name: "Eliza Agent",
    tagline: "A social media AI agent that can take on any character.",
    category: "AI & Automation",
    focus: "AI agents",
    role: "Engineer at Codlinx (formerly Igknight Tech)",
    summary:
      "A Node.js social media agent that adopts whatever character it is given. Search across its NoSQL JSON data was slow and awkward, so I proposed syncing common user data under a single unique key, which made it far easier to query for users and developers alike.",
    highlights: [
      "Built a character-driven social media agent in Node.js",
      "Proposed syncing common user data under one unique key to fix search across NoSQL JSON stores",
      "Made lookups simpler for users and for the developers building on the agent",
    ],
    stack: ["Node.js", "LLM APIs", "NoSQL"],
    featured: false,
  },
  {
    slug: "labweb",
    name: "Labweb",
    tagline: "A lab SaaS portal, with PDFs precise enough for a test vial.",
    category: "SaaS Platforms",
    focus: "SaaS portal / lab software",
    role: "Full-stack engineer at Cybros.Dev",
    summary:
      "Built and deployed a custom SaaS portal on a Rails and Next.js stack. Lab results print as pixel-accurate PDFs sized for testing vials, and when the original PDF engine hit its limits I proposed a replacement and migrated to it.",
    highlights: [
      "Found and fixed critical bugs in the user impersonation logic",
      "Built pixel-accurate PDFs for lab results, sized for testing vials",
      "Proposed moving from wkhtmltopdf to Prawn after its outdated rendering engine hit style limits, then migrated",
      "Rebuilt the new-user invitation emails, tested with letter_opener",
      "Rails API with a Next.js front end on PostgreSQL",
    ],
    stack: ["Ruby on Rails", "Next.js", "PostgreSQL", "Prawn"],
    featured: false,
  },
  {
    slug: "case-manager",
    name: "Case Manager",
    tagline: "Dynamic dashboards, N+1 bottlenecks removed, payments wired in.",
    category: "FinTech & Billing",
    focus: "SaaS / dashboards",
    role: "Full-stack engineer at Cybros.Dev, on schema design and integrations",
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
  {
    slug: "job-portal-platform",
    name: "Job portal platform",
    tagline: "A job portal with real-time chat, payments and notifications.",
    category: "SaaS Platforms",
    focus: "Payments, chat and notifications",
    role: "Full-stack engineer",
    summary:
      "A job portal built on Rails. I designed the schema behind its job-portal features, then built the payments, real-time chat and notification layers, and deployed it to Heroku.",
    highlights: [
      "Designed the schema behind the job-portal features",
      "Integrated Stripe payments",
      "Built real-time chat with ActionCable",
      "Added notifications with the Noticed gem",
      "Built a responsive Bootstrap UI and deployed to Heroku",
    ],
    stack: ["Ruby on Rails", "Stripe", "ActionCable", "Bootstrap", "Heroku"],
    featured: false,
  },
  {
    slug: "everybooking",
    name: "Everybooking",
    tagline: "Slow Turbo interactions rebuilt as fast React components.",
    category: "SaaS Platforms",
    focus: "Booking platform",
    role: "Full-stack engineer",
    summary:
      "A booking platform on Rails with a React front end. I built its drag-and-drop feature and moved slow Turbo and Stimulus interactions into React components that render faster.",
    highlights: [
      "Built the drag-and-drop feature in React with DnD Kit",
      "Converted slow Turbo and Stimulus interactions into React components",
      "Managed shared state with the Context API, tuned with useMemo and useContext",
    ],
    stack: ["React", "Ruby on Rails", "DnD Kit"],
    featured: false,
    links: [{ label: "everybooking.com", href: "https://everybooking.com" }],
  },
  {
    slug: "commercial-truck-quotes",
    name: "Commercial Truck Quotes",
    tagline: "Real-time insurance quote matching for truckers and agencies.",
    category: "FinTech & Billing",
    focus: "Insurance marketplace",
    role: "Full-stack engineer",
    summary:
      "An insurance quote-matching platform that connects truckers with agencies in real time. I built agency dashboards and reporting tools, integrated third-party data validation, and worked on performance and deployment.",
    highlights: [
      "Built agency dashboards and reporting tools",
      "Integrated third-party data-validation services",
      "Worked on performance and deployment",
      "Partnered with QA on testing and reliability",
    ],
    stack: ["Ruby on Rails", "Vue.js", "Vuex", "Vuetify", "Bootstrap"],
    featured: false,
    links: [
      {
        label: "commercialtruckquotes.com",
        href: "https://www.commercialtruckquotes.com",
      },
    ],
  },
  {
    slug: "wellx",
    name: "Wellx",
    tagline: "Custom APIs and new portal pages on a Rails and React stack.",
    category: "SaaS Platforms",
    focus: "Customer portal",
    role: "Full-stack engineer",
    summary:
      "A customer portal on a Rails and React stack. I built custom APIs on top of generic Rails controllers, designed new pages against them, and wrote the backend API test cases.",
    highlights: [
      "Built custom APIs using generic Rails controllers",
      "Designed and built new portal pages in React with Ant Design and MUI",
      "Wrote the backend API test cases",
    ],
    stack: ["React", "Ruby on Rails", "Ant Design", "MUI"],
    featured: false,
    links: [{ label: "wellxai.com", href: "https://wellxai.com" }],
  },
  {
    slug: "store-management",
    name: "Store Management",
    tagline: "Inventory kept in sync across Shopify stores, QuickBooks and a POS.",
    category: "Data & Infrastructure",
    focus: "Multi-store inventory sync",
    role: "Full-stack engineer",
    summary:
      "Multi-store inventory kept in sync between a central database, several Shopify stores and QuickBooks. I worked on the sync, moved the point-of-sale integration to a new provider's API, and built admin-site features.",
    highlights: [
      "Worked on inventory sync between a central Heroku database, multiple Shopify stores and QuickBooks",
      "Replaced the Lighthouse POS APIs with Korona POS APIs",
      "Built admin-site features and data tables",
    ],
    stack: ["Shopify API", "QuickBooks API", "Korona POS API", "Heroku"],
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
