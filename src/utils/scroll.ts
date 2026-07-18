/**
 * Smoothly scrolls the viewport to a section by its DOM id.
 * Shared by the header nav, the footer nav and every in-page CTA.
 */
export const scrollToSection = (id: string): void => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
