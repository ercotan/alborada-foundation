import React from "react";
import { timelineMilestones } from "../../data/homepage";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const TimelineSection: React.FC = () => (
  <section id="timeline" className="bg-[#050a16] px-6 py-28 md:px-12">
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <SectionEyebrow>Hoja de ruta</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light md:text-5xl">
          Una visión de largo plazo
        </h2>
      </div>

      <div className="relative mt-16 border-l border-[#d4af37]/20 pl-8">
        {timelineMilestones.map((item) => (
          <div key={item.year} className="relative pb-12">
            <div className="absolute -left-[39px] top-1 h-4 w-4 rounded-full border-4 border-[#050a16] bg-[#d4af37]" />

            <span className="font-serif text-xl text-[#d4af37]">
              {item.year}
            </span>

            <h3 className="mt-2 font-serif text-xl">{item.title}</h3>

            <p className="mt-3 max-w-2xl text-xs leading-7 text-white/52">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
