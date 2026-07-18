import React from "react";
import { transparencyPillars } from "../../data/homepage";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const TransparencySection: React.FC = () => (
  <section
    id="transparency"
    className="border-y border-white/5 bg-[#020712] px-6 py-28 md:px-12"
  >
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>Transparencia</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light md:text-5xl">
          Confianza construida con información verificable
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {transparencyPillars.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-white/7 bg-white/[0.02] p-7"
            >
              <Icon className="h-5 w-5 text-[#d4af37]" />
              <h3 className="mt-5 font-serif text-xl">{item.title}</h3>
              <p className="mt-4 text-xs leading-6 text-white/48">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
