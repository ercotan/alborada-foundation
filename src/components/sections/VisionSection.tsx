import React from "react";
import { visionStats } from "../../data/homepage";
import { GoldDivider } from "../ui/GoldDivider";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const VisionSection: React.FC = () => (
  <section
    id="vision"
    className="relative overflow-hidden border-y border-white/5 bg-[#020712] px-6 py-28 md:px-12"
  >
    <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/5 blur-[130px]" />

    <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
      <div>
        <SectionEyebrow>Nuestra visión</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light leading-tight md:text-5xl">
          Un lugar donde tecnología, naturaleza y formación humana convergen.
        </h2>

        <GoldDivider />

        <p className="text-sm leading-8 text-white/62 md:text-base">
          Alborada será un campus educativo, residencial, tecnológico y
          productivo. Un espacio donde cada estudiante pueda aprender,
          investigar, crear empresas, cultivar la tierra, comprender el mundo y
          construir su propio futuro.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {visionStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-6"
          >
            <span className="font-serif text-4xl text-[#d4af37]">
              {stat.value}
            </span>
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
