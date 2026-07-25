import React from "react";
import { headerNavLinks } from "../../data/homepage";
import { useHasScrolled } from "../../hooks/useHasScrolled";
import { DonationNavLink } from "../shared/DonationNavLink";
import { ScrollButton } from "../shared/ScrollButton";

/**
 * Sticky brand bar.
 *
 * Rendered at page level in `Homepage`, not inside `HeroSection`. It used to
 * be absolutely positioned against the hero, which is documented in
 * `CLAUDE.md`; that arrangement cannot stick, because `HeroSection` clips its
 * overflow and a sticky element only sticks within its scrolling ancestor.
 * The hero is pulled up under the bar instead, so the sunrise still runs
 * behind it and the top of the page looks as it did.
 *
 * Its height comes from `--header-height`, the same value the hero offsets by
 * and that anchor targets reserve as scroll margin.
 */
export const Header: React.FC = () => {
  const hasScrolled = useHasScrolled();

  return (
    <header
      className={`sticky top-0 z-50 flex h-[var(--header-height)] w-full items-center justify-between border-b px-6 transition-colors duration-300 motion-reduce:transition-none md:px-12 ${
        hasScrolled
          ? // Translucent midnight navy, not a panel: the content behind it
            // should still read through.
            "border-white/5 bg-navy-950/80 backdrop-blur-md"
          : // The border stays in the box while transparent, so nothing shifts
            // by a pixel when it appears.
            "border-transparent bg-transparent"
      }`}
    >
      <ScrollButton targetId="hero" className="flex flex-col text-left">
        <span className="font-serif text-xl tracking-[0.38em] text-white">
          ALBORADA
        </span>
        <span className="mt-1 text-[8px] uppercase tracking-[0.42em] text-[#d4af37]">
          Fundación
        </span>
      </ScrollButton>

      <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.26em] text-white/55 lg:flex">
        {headerNavLinks.map((link) => (
          <ScrollButton
            key={link.targetId}
            targetId={link.targetId}
            className="transition hover:text-[#d4af37]"
          >
            {link.label}
          </ScrollButton>
        ))}

        {/* Immediately after "Contacto", the last of the scroll links above. */}
        <DonationNavLink className="transition hover:text-[#d4af37]" />
      </nav>

      <ScrollButton
        targetId="contact"
        className="rounded-full border border-white/15 bg-black/20 px-5 py-2 text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
      >
        Unirse
      </ScrollButton>
    </header>
  );
};
