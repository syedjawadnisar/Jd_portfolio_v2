import {
  allCategories,
  allStackItems,
  type Project,
} from "@/data/projects";

/**
 * The projects index is a static export: there is no server to ask for a page
 * of results, so every piece of query logic lives here, runs in the browser,
 * and is deliberately kept free of React. That keeps it cheap to reason about
 * and makes the URL <-> state round trip a pure function on both ends.
 */

export type ProjectQueryState = {
  query: string;
  /** Selected category labels. Empty means "no category filter". */
  categories: string[];
  /** Selected stack items. Empty means "no technology filter". */
  stack: string[];
  /** 1-based. */
  page: number;
};

/** Two rows of three on desktop — a full result set without a wall of cards. */
export const PAGE_SIZE = 6;

export const DEFAULT_QUERY_STATE: ProjectQueryState = {
  query: "",
  categories: [],
  stack: [],
  page: 1,
};

/** Search-param keys. Multi-value filters repeat their key. */
export const QUERY_PARAM = "q";
export const CATEGORY_PARAM = "category";
export const STACK_PARAM = "stack";
export const PAGE_PARAM = "page";

/** Anything with `get`/`getAll` — URLSearchParams and Next's readonly wrapper. */
type ReadableParams = Pick<URLSearchParams, "get" | "getAll">;

const CATEGORY_SET = new Set(allCategories);
const STACK_SET = new Set(allStackItems);

/**
 * Frequency-ordered stack list. Alphabetical order buries React and Rails
 * under AWS Athena; ordering by how many projects use a technology puts the
 * filters a recruiter actually reaches for first. Still derived entirely from
 * the data, so it cannot drift from `allStackItems`.
 */
export function stackItemsByUsage(source: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const project of source) {
    for (const item of project.stack) {
      counts.set(item, (counts.get(item) ?? 0) + 1);
    }
  }

  return [...allStackItems].sort((a, b) => {
    const delta = (counts.get(b) ?? 0) - (counts.get(a) ?? 0);
    return delta !== 0 ? delta : a.localeCompare(b);
  });
}

/**
 * Parse a URL into state, dropping anything that is not a real category or
 * stack item. A stale or hand-edited link then degrades to a wider result set
 * instead of a permanently empty one.
 */
export function parseProjectQuery(params: ReadableParams): ProjectQueryState {
  const rawPage = Number.parseInt(params.get(PAGE_PARAM) ?? "", 10);

  return {
    query: (params.get(QUERY_PARAM) ?? "").trim().slice(0, 120),
    categories: dedupe(params.getAll(CATEGORY_PARAM)).filter((value) =>
      CATEGORY_SET.has(value),
    ),
    stack: dedupe(params.getAll(STACK_PARAM)).filter((value) =>
      STACK_SET.has(value),
    ),
    page: Number.isFinite(rawPage) && rawPage > 1 ? rawPage : 1,
  };
}

/** Serialize state back to a query string. Defaults are omitted, so the clean
 *  view keeps a clean URL. */
export function serializeProjectQuery(state: ProjectQueryState): string {
  const params = new URLSearchParams();

  if (state.query.trim()) params.set(QUERY_PARAM, state.query.trim());
  for (const category of state.categories) params.append(CATEGORY_PARAM, category);
  for (const item of state.stack) params.append(STACK_PARAM, item);
  if (state.page > 1) params.set(PAGE_PARAM, String(state.page));

  return params.toString();
}

export function isDefaultQueryState(state: ProjectQueryState): boolean {
  return (
    state.query.trim() === "" &&
    state.categories.length === 0 &&
    state.stack.length === 0 &&
    state.page === 1
  );
}

/** Any filter or search active — drives the "Clear all" affordance. */
export function hasActiveFilters(state: ProjectQueryState): boolean {
  return (
    state.query.trim() !== "" ||
    state.categories.length > 0 ||
    state.stack.length > 0
  );
}

export function activeFilterCount(state: ProjectQueryState): number {
  return state.categories.length + state.stack.length;
}

/**
 * One lowercased haystack per project, built once at module load. Search hits
 * name, tagline, summary, highlights and stack, plus role and category since
 * they are the words people actually type ("lead", "SaaS").
 */
const HAYSTACKS = new WeakMap<Project, string>();

function haystackFor(project: Project): string {
  const cached = HAYSTACKS.get(project);
  if (cached) return cached;

  const built = [
    project.name,
    project.tagline,
    project.category,
    project.role,
    project.summary,
    ...project.highlights,
    ...project.stack,
  ]
    .join(" ")
    .toLowerCase();

  HAYSTACKS.set(project, built);
  return built;
}

/**
 * Filters compose: AND across the three filter types, OR within each one.
 * Search terms are AND-ed against each other, so "rails stripe" narrows.
 */
export function filterProjects(
  source: Project[],
  state: ProjectQueryState,
): Project[] {
  const terms = state.query.toLowerCase().split(/\s+/).filter(Boolean);

  return source.filter((project) => {
    if (
      state.categories.length > 0 &&
      !state.categories.includes(project.category)
    ) {
      return false;
    }

    if (
      state.stack.length > 0 &&
      !state.stack.some((item) => project.stack.includes(item))
    ) {
      return false;
    }

    if (terms.length === 0) return true;

    const haystack = haystackFor(project);
    return terms.every((term) => haystack.includes(term));
  });
}

export function getPageCount(total: number, pageSize = PAGE_SIZE): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

export function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(1, page), pageCount);
}

export type PageToken = number | "gap";

/**
 * Page numbers to render: first, last, and a window around the current page,
 * with gaps standing in for the rest. Eight pages or fewer render in full,
 * which is every case the current data produces — the window only matters as
 * the project list grows.
 */
export function getPageTokens(current: number, pageCount: number): PageToken[] {
  if (pageCount <= 8) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, pageCount, current]);
  if (current - 1 > 1) pages.add(current - 1);
  if (current + 1 < pageCount) pages.add(current + 1);

  const ordered = [...pages].sort((a, b) => a - b);
  const tokens: PageToken[] = [];

  for (const [index, page] of ordered.entries()) {
    const previous = ordered[index - 1];
    if (previous !== undefined && page - previous > 1) tokens.push("gap");
    tokens.push(page);
  }

  return tokens;
}

function dedupe(values: string[]): string[] {
  return [...new Set(values)];
}
