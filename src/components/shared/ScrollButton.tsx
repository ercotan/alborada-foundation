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
 */
export const ScrollButton: React.FC<ScrollButtonProps> = ({
  targetId,
  className,
  children,
}) => (
  <button onClick={() => scrollToSection(targetId)} className={className}>
    {children}
  </button>
);
