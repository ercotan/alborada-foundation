/**
 * Smoothly scrolls the viewport to a section by its DOM id.
 * Shared by the header nav, the footer nav and every in-page CTA.
 */

/**
 * True when the visitor has asked their system for less motion.
 *
 * Guarded rather than called directly: `matchMedia` is absent in jsdom, and a
 * bare call would throw in every test that activates in-page navigation.
 */
const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToSection = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({
    // A long animated scroll is exactly what "reduce motion" asks not to do,
    // so those visitors are taken to the section instantly instead.
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
};
