import { projects, type Project } from "@/data/projects";

/**
 * A shared category is a stronger signal than a shared library, so it outweighs
 * any single stack overlap but can still be beaten by a project that shares
 * three or four tools.
 */
const CATEGORY_WEIGHT = 3;
const RELATED_LIMIT = 3;

export type RelatedProjectsResult = {
  projects: Project[];
  /**
   * True only when every project shown was actually scored as related. When it
   * is false the list was topped up from the rest of the work and the section
   * must not claim a relationship that is not there.
   */
  matched: boolean;
};

/**
 * Pick the work to show under a project detail page.
 *
 * Not every project has neighbours — Moemate shares neither its category nor a
 * single stack item with anything else here — so a scoring-only implementation
 * would leave those pages ending on a dead stop. Below two genuine matches the
 * list falls back to the rest of the work in authored order (featured first)
 * and the caller relabels the section.
 */
export function getRelatedProjects(
  current: Project,
  limit: number = RELATED_LIMIT,
): RelatedProjectsResult {
  const currentStack = new Set(current.stack);
  const others = projects.filter((p) => p.slug !== current.slug);

  const scored = others
    .map((project, order) => {
      const shared = project.stack.filter((item) => currentStack.has(item)).length;
      const category = project.category === current.category ? CATEGORY_WEIGHT : 0;
      return { project, order, score: shared + category };
    })
    .filter((entry) => entry.score > 0)
    // Authored order breaks ties, which keeps featured work ahead of the rest.
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((entry) => entry.project);

  if (scored.length >= 2) {
    return { projects: scored, matched: true };
  }

  const seen = new Set(scored.map((p) => p.slug));
  const filler = others.filter((p) => !seen.has(p.slug)).slice(0, limit - scored.length);

  return { projects: [...scored, ...filler], matched: false };
}

/** Wrap-around neighbours, so every detail page offers a way onward. */
export function getAdjacentProjects(current: Project): {
  previous: Project;
  next: Project;
} {
  const index = projects.findIndex((p) => p.slug === current.slug);
  const count = projects.length;

  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
