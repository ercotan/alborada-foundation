/**
 * Cross-page destinations.
 *
 * Every navigation target that leaves the current document is declared here,
 * so a link can never drift from the entry points declared in
 * `vite.config.ts`. Adding a page means adding a constant here and an input
 * there; a test asserts the two stay in step.
 *
 * All paths are root-absolute, deliberately. A relative href would resolve
 * against the document it is rendered from, so the same component would point
 * to a different place on `/` than on `/contacto.html`. Root-absolute resolves
 * identically in `vite dev`, in `vite preview`, and on a static host — the
 * three environments this project actually ships to.
 *
 * If the site is ever served from a sub-path, this file is the only place
 * that changes.
 *
 * See `engineering/ADR-0003` for why these are real HTML entry points rather
 * than client-side routes.
 */

import type { InquiryCategoryId, InquiryTopicId } from "./contact";

export const HOME_PATH = "/";

/** The institutional enquiry form. Entry point `contacto` in `vite.config.ts`. */
export const CONTACT_PAGE_PATH = "/contacto.html";

/** The child protection page. Entry point `proteccionInfantil`. */
export const CHILD_PROTECTION_PATH = "/proteccion-infantil.html";

/**
 * DOM id of the donation section, which holds the PayPal button.
 *
 * Declared here because it is a navigation target reached from outside the
 * component that renders it — including, potentially, from another document.
 */
export const DONATION_SECTION_ID = "donations";

/**
 * A section of the homepage, addressable from anywhere.
 *
 * On the homepage the link is intercepted and scrolled smoothly. From another
 * document the browser simply follows it, and `HashScrollOnLoad` performs the
 * scroll once the homepage has mounted — so one href covers both cases and no
 * second route is introduced.
 */
export function homeSectionHref(sectionId: string): string {
  return `${HOME_PATH}#${sectionId}`;
}

/**
 * The enquiry form with a category preselected, and optionally the topic the
 * visitor arrived from.
 *
 * The parameter names are Spanish because they are visitor-facing and appear
 * in shared URLs. Both are read back by `readCategory()` and `readTopic()`,
 * which validate against the known sets rather than trusting the value.
 *
 * Values are not escaped here because both unions are constrained to
 * URL-safe slugs; `routes.test.ts` asserts that, so the constraint fails the
 * suite rather than production if a slug ever gains a space or an accent.
 */
export function contactPageHref(
  category: InquiryCategoryId,
  topic?: InquiryTopicId,
): string {
  const base = `${CONTACT_PAGE_PATH}?categoria=${category}`;
  return topic ? `${base}&tema=${topic}` : base;
}
