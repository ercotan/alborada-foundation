import React from "react";
import { allianceCategories } from "../../data/homepage";
import { ScrollButton } from "../shared/ScrollButton";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const AlliancesSection: React.FC = () => (
  <section
    id="alliances"
    className="relative overflow-hidden bg-black px-6 py-28 md:px-12"
  >
    <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/5 blur-[120px]" />

    <div className="relative mx-auto max-w-5xl text-center">
      <SectionEyebrow>Alianzas</SectionEyebrow>

      <h2 className="mx-auto mt-7 max-w-4xl font-serif text-4xl font-light leading-tight md:text-5xl">
        Invitamos a empresas, universidades, gobiernos y organizaciones a
        construir Alborada
      </h2>

      <p className="mx-auto mt-7 max-w-3xl text-sm leading-8 text-white/58">
        Buscamos aliados académicos, tecnológicos, productivos, institucionales
        y financieros que compartan una visión de largo plazo.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {allianceCategories.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/7 bg-[#050a16] p-6"
          >
            <span className="font-serif text-base">{item}</span>
          </div>
        ))}
      </div>

      <ScrollButton
        targetId="contact"
        className="mt-12 rounded-full bg-[#d4af37] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37] motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        Proponer una alianza
      </ScrollButton>
    </div>
  </section>
);
