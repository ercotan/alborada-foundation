import React from "react";
import { Heart } from "lucide-react";
import { donationNavItem } from "../../data/homepage";
import { DONATION_SECTION_ID, homeSectionHref } from "../../data/routes";
import { scrollToSection } from "../../utils/scroll";

const NAV_FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37]";

/**
 * Header shortcut to the donation section.
 *
 * A real anchor to `/#donations`, not a scroll button, because it has to work
 * from two places. On the homepage the click is intercepted and the section is
 * scrolled to smoothly. From any other document the browser is left alone: it
 * navigates to the homepage, and `HashScrollOnLoad` performs the scroll once
 * the page has mounted. One href, one destination, no second route.
 *
 * Which of the two happens is decided by asking whether the section is present
 * in this document, rather than by comparing pathnames — the element either
 * exists to be scrolled to or it does not, and that is the actual question.
 */
export const DonationNavLink: React.FC<{ className?: string }> = ({
  className,
}) => (
  <a
    href={homeSectionHref(DONATION_SECTION_ID)}
    aria-label={donationNavItem.ariaLabel}
    onClick={(event) => {
      if (event.defaultPrevented) return;
      // Leave new-tab, new-window and download clicks to the browser.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (event.button !== 0) return;
      if (!document.getElementById(DONATION_SECTION_ID)) return;

      event.preventDefault();
      scrollToSection(DONATION_SECTION_ID);
    }}
    // Typography, spacing and hover come from the surrounding <nav>, so this
    // matches the other items rather than restating their styling.
    // The focus ring matches ScrollButton's, so the whole nav row focuses
    // identically whether an item is a scroll button or this link.
    className={
      className
        ? `${NAV_FOCUS_RING} inline-flex items-center gap-2 ${className}`
        : `${NAV_FOCUS_RING} inline-flex items-center gap-2`
    }
  >
    {/* Decorative: the accessible name is on the anchor. */}
    <Heart aria-hidden="true" className="h-3 w-3 shrink-0 text-[#d4af37]" />
    <span>{donationNavItem.label}</span>
  </a>
);
