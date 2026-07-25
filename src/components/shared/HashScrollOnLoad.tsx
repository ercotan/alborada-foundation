import React, { useEffect } from "react";
import { scrollToSection } from "../../utils/scroll";

/**
 * Scrolls to the section named by the URL fragment, once the page has mounted.
 *
 * This is what completes a cross-page jump such as `/#donations`: the browser
 * loads the homepage, and this brings the visitor to the section.
 *
 * It can scroll *smoothly* rather than land abruptly because the page is
 * client-rendered. When the browser parses `index.html` the sections do not
 * exist yet, so its native fragment jump finds nothing and the page stays at
 * the top. By the time the sections are in the DOM, this effect owns the
 * movement — and it honours `prefers-reduced-motion` through `scrollToSection`.
 *
 * Two frames are waited for so the scroll measures a settled layout rather
 * than a half-painted one.
 *
 * Renders nothing. It is mounted as a sibling of the sections so `Homepage`
 * stays a composition layer with no effects of its own.
 */
export const HashScrollOnLoad: React.FC = () => {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;

    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => scrollToSection(id));
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
};
