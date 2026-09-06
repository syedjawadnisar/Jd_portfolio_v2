"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ui";
import { DURATION, EASE_OUT } from "@/lib/motion";

const ITEM_TRANSITION = { duration: DURATION.fast, ease: EASE_OUT } as const;

export type ProjectsGridProps = {
  projects: Project[];
};

/**
 * The result grid.
 *
 * `initial={false}` means the six cards present on first paint do not animate —
 * they are already in the statically exported HTML and fading them in would be
 * a flash of nothing for no gain. Cards added or removed by a later filter,
 * search or page change do animate, and `layout` slides the survivors into
 * their new cells instead of teleporting them.
 *
 * Every item carries `data-reveal` so the global reduced-motion rule can pin it
 * to its final state — that rule uses `!important`, which is the only thing
 * that outranks the inline styles Framer writes.
 */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    // `relative` matters: popLayout pulls an exiting card out of flow and
    // positions it against its offset parent, which should be this grid.
    <ul className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {projects.map((project) => (
          <motion.li
            key={project.slug}
            data-reveal=""
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={ITEM_TRANSITION}
            className="h-full"
          >
            <ProjectCard project={project} headingLevel="h3" />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
