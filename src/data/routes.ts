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

import type { InquiryCategoryId } from "./contact";

export const HOME_PATH = "/";

/** The institutional enquiry form. Entry point `contacto` in `vite.config.ts`. */
export const CONTACT_PAGE_PATH = "/contacto.html";

/** The child protection page. Entry point `proteccionInfantil`. */
export const CHILD_PROTECTION_PATH = "/proteccion-infantil.html";

/**
 * The enquiry form with a category preselected.
 *
 * The parameter name is Spanish because it is visitor-facing and appears in
 * shared URLs. It is read back by `readCategory()`, which falls back to the
 * default category rather than trusting the value.
 */
export function contactPageHref(category: InquiryCategoryId): string {
  return `${CONTACT_PAGE_PATH}?categoria=${category}`;
}
