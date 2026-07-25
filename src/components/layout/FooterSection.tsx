import React from "react";
import { DEFAULT_CATEGORY } from "../../data/contact";
import {
  footerContact,
  footerNavLinks,
  primaryContact,
} from "../../data/homepage";
import { contactPageHref } from "../../data/routes";
import { ScrollButton } from "../shared/ScrollButton";

export const FooterSection: React.FC = () => (
  <footer className="border-t border-white/5 bg-[#020712] px-6 py-16 md:px-12">
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
      <div>
        <span className="font-serif text-2xl tracking-[0.3em]">ALBORADA</span>
        <p className="mt-5 max-w-sm text-xs leading-7 text-white/40">
          Educación, protección, liderazgo, inteligencia artificial,
          sostenibilidad y futuro.
        </p>
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
          Navegación
        </span>

        <div className="mt-5 flex flex-col gap-3 text-xs text-white/45">
          {footerNavLinks.map((link) => (
            <ScrollButton
              key={link.targetId}
              targetId={link.targetId}
              className="text-left hover:text-white"
            >
              {link.label}
            </ScrollButton>
          ))}
        </div>
      </div>

      <div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]">
          Contacto
        </span>

        {/*
          These were three inert paragraphs under a "Contacto" heading. The
          address and the route into the enquiry form are now real links; the
          domain and the country stay as text, because they are facts rather
          than destinations.
        */}
        <div className="mt-5 space-y-3 text-xs text-white/45">
          <p>
            <a
              href={`mailto:${primaryContact.email}`}
              className="transition hover:text-white"
            >
              {primaryContact.email}
            </a>
          </p>
          <p>
            <a
              href={contactPageHref(DEFAULT_CATEGORY)}
              className="transition hover:text-white"
            >
              {footerContact.formLabel}
            </a>
          </p>
          <p>{footerContact.site}</p>
          <p>{footerContact.location}</p>
        </div>
      </div>
    </div>

    <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t border-white/5 pt-8 text-[9px] uppercase tracking-[0.18em] text-white/25 md:flex-row md:items-center md:justify-between">
      <span>© 2026 Fundación Alborada</span>
      <span>Todos los derechos reservados</span>
    </div>
  </footer>
);
