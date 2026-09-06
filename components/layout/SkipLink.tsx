/**
 * First tab stop on every page. Visually hidden until it takes focus, so
 * keyboard users can jump the header without a single extra keystroke of cost
 * to anyone else.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:inline-flex focus:h-11 focus:items-center focus:rounded-lg focus:bg-accent focus:px-4 focus:text-sm focus:font-medium focus:text-accent-foreground"
    >
      Skip to content
    </a>
  );
}
