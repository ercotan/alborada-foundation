import React from "react";
import { missionPillars } from "../../data/homepage";
import { GoldDivider } from "../ui/GoldDivider";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const MissionSection: React.FC = () => (
  <section
    id="mission"
    className="border-t border-white/5 bg-[#050a16] px-6 py-28 md:px-12"
  >
    <div className="mx-auto max-w-5xl text-center">
      <SectionEyebrow>Nuestra misión</SectionEyebrow>

      <h2 className="mx-auto mt-7 max-w-4xl font-serif text-4xl font-light leading-tight md:text-6xl">
        Proteger, educar y preparar a las líderes de la próxima generación.
      </h2>

      <GoldDivider className="mx-auto my-8 w-16" />

      <p className="mx-auto max-w-3xl text-base leading-8 text-white/65 md:text-lg">
        Fundación Alborada nace para brindar protección, residencia, educación
        de excelencia y oportunidades reales a 15 niñas de entre 10 y 12 años.
        Nuestro objetivo es acompañarlas durante un proceso formativo de largo
        plazo que integre conocimiento, tecnología, carácter, liderazgo, cultura
        y capacidad productiva.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {missionPillars.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/8 bg-white/[0.025] p-8 text-left"
            >
              <Icon className="mb-6 h-6 w-6 text-[#d4af37]" />
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/50">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
