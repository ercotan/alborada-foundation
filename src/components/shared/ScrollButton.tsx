import React from "react";
import { scrollToSection } from "../../utils/scroll";

interface ScrollButtonProps {
  /** DOM id of the section to scroll to. */
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Button that smooth-scrolls to an in-page section.
 * Styling stays with the caller so each usage keeps its own look.
 *
 * `cursor-pointer` is applied here rather than left to the browser: Tailwind
 * v4's Preflight does not restore the pointer cursor on `<button>`, so without
 * it every navigation control in the header, the footer and the hero reads as
 * inert text under the mouse. It is set once, in this component, so no caller
 * can forget it.
 *
 * `type="button"` because the element's default type is `submit`; these
 * controls sit outside a form today, and this keeps that true if one is ever
 * placed inside one.
 */
export const ScrollButton: React.FC<ScrollButtonProps> = ({
  targetId,
  className,
  children,
}) => (
  <button
    type="button"
    onClick={() => scrollToSection(targetId)}
    className={className ? `cursor-pointer ${className}` : "cursor-pointer"}
  >
    {children}
  </button>
);
