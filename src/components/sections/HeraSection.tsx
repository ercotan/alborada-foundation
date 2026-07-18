import React from "react";
import { Cpu, Sparkles } from "lucide-react";
import { heraCapabilities } from "../../data/homepage";
import { GoldDivider } from "../ui/GoldDivider";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const HeraSection: React.FC = () => (
  <section
    id="ai"
    className="relative overflow-hidden border-y border-white/5 bg-black px-6 py-28 md:px-12"
  >
    <div className="absolute right-1/4 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#d4af37]/5 blur-[110px]" />

    <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
      <div>
        <SectionEyebrow>Inteligencia artificial</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light leading-tight md:text-5xl">
          La tecnología como herramienta de conocimiento y libertad
        </h2>

        <GoldDivider />

        <p className="text-sm leading-8 text-white/62 md:text-base">
          La inteligencia artificial acompañará el proceso educativo para
          personalizar el aprendizaje, ampliar la capacidad de investigación,
          fortalecer la gestión institucional y conectar a las estudiantes con
          conocimiento global.
        </p>
      </div>

      <div className="rounded-3xl border border-white/8 bg-[#050a16] p-8">
        <div className="flex items-center justify-between border-b border-white/7 pb-5">
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-[#d4af37]" />
            <span className="font-serif text-lg">HERA</span>
          </div>

          <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
            En desarrollo
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {heraCapabilities.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] p-4"
            >
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              <span className="text-xs text-white/58">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
