import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { campusNodes } from "../../data/homepage";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const CampusSection: React.FC = () => {
  const [activeId, setActiveId] = useState("school");

  const activeCampus =
    campusNodes.find((item) => item.id === activeId) ?? campusNodes[0];

  return (
    <section
      id="campus"
      className="relative overflow-hidden bg-[#050a16] px-6 py-28 md:px-12"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.035)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Campus Alborada</SectionEyebrow>

          <h2 className="mt-7 font-serif text-4xl font-light md:text-5xl">
            Un ecosistema para vivir, aprender y crear
          </h2>

          <p className="mt-6 text-sm leading-7 text-white/50">
            Educación, residencia, tecnología, sostenibilidad, producción,
            deporte y bienestar dentro de un mismo proyecto.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {campusNodes.map((node) => {
              const Icon = node.icon;
              const active = activeId === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveId(node.id)}
                  className={`min-h-36 rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-[#d4af37]/55 bg-[#d4af37]/10"
                      : "border-white/7 bg-black/20 hover:border-white/16"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      active ? "text-[#d4af37]" : "text-white/30"
                    }`}
                  />
                  <h3 className="mt-6 font-serif text-base">{node.title}</h3>
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border border-white/8 bg-black/30 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCampus.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]">
                  Plan maestro
                </span>

                <h3 className="mt-5 font-serif text-3xl">
                  {activeCampus.title}
                </h3>

                <p className="mt-6 text-sm leading-8 text-white/60">
                  {activeCampus.text}
                </p>

                <div className="mt-10 rounded-2xl border border-white/7 bg-white/[0.02] p-5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/35">
                    Estado del proyecto
                  </span>
                  <p className="mt-3 text-xs leading-6 text-white/55">
                    Desarrollo conceptual, planificación técnica y búsqueda de
                    alianzas estratégicas.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
