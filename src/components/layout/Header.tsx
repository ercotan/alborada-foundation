import React from "react";
import { headerNavLinks } from "../../data/homepage";
import { DonationNavLink } from "../shared/DonationNavLink";
import { ScrollButton } from "../shared/ScrollButton";

/**
 * Fixed brand bar overlaying the hero.
 * Rendered inside HeroSection because it is absolutely positioned against it.
 */
export const Header: React.FC = () => (
  <header className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-6 py-7 md:px-12">
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
