import React from "react";
import { impactStats } from "../../data/homepage";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const ImpactSection: React.FC = () => (
  <section
    id="impact"
    className="border-y border-white/5 bg-black px-6 py-28 md:px-12"
  >
    <div className="mx-auto max-w-6xl">
      <div className="text-center">
        <SectionEyebrow>Impacto</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light md:text-5xl">
          Una inversión para generaciones
        </h2>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {impactStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/7 bg-[#050a16] p-7"
          >
            <span className="font-serif text-5xl text-[#d4af37]">
              {stat.value}
            </span>
            <h3 className="mt-5 font-serif text-lg">{stat.label}</h3>
            <p className="mt-3 text-xs leading-6 text-white/48">{stat.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
