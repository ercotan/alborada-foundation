import React from "react";
import { sustainabilityPillars } from "../../data/homepage";
import { GoldDivider } from "../ui/GoldDivider";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const SustainabilitySection: React.FC = () => (
  <section id="sustainability" className="bg-[#050a16] px-6 py-28 md:px-12">
    <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
      <div className="grid grid-cols-2 gap-4">
        {sustainabilityPillars.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/7 bg-black/20 p-6"
            >
              <Icon className="h-5 w-5 text-[#d4af37]" />
              <h3 className="mt-5 font-serif text-lg">{item.title}</h3>
              <p className="mt-3 text-xs leading-6 text-white/48">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <div>
        <SectionEyebrow>Sostenibilidad</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light leading-tight md:text-5xl">
          Aprender a producir, cuidar y administrar los recursos
        </h2>

        <GoldDivider />

        <p className="text-sm leading-8 text-white/62 md:text-base">
          La Granja de Alborada será una parte central del modelo educativo. El
          trabajo con la tierra, la producción de alimentos, la energía y el
          agua permitirá integrar ciencia, empresa, sostenibilidad y
          responsabilidad.
        </p>
      </div>
    </div>
  </section>
);
