import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { modelPillars } from "../../data/homepage";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const ModelSection: React.FC = () => {
  const [activeId, setActiveId] = useState("education");

  const activeModel =
    modelPillars.find((item) => item.id === activeId) ?? modelPillars[0];

  return (
    <section id="model" className="bg-[#050a16] px-6 py-28 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>El modelo Alborada</SectionEyebrow>

          <h2 className="mt-7 font-serif text-4xl font-light md:text-5xl">
            Una formación diseñada para el mundo que viene
          </h2>

          <p className="mt-6 text-sm leading-7 text-white/50">
            El programa integra seis pilares que se desarrollan de manera
            simultánea durante toda la formación.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="flex flex-col gap-3">
            {modelPillars.map((tab) => {
              const Icon = tab.icon;
              const active = activeId === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveId(tab.id)}
                  className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37]"
                      : "border-white/6 bg-black/15 text-white/50 hover:border-white/15 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="font-serif text-base">{tab.title}</span>
                </button>
              );
            })}
          </div>

          <div className="min-h-[420px] rounded-3xl border border-white/8 bg-black/25 p-8 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]">
                  Formación integral
                </span>

                <h3 className="mt-4 font-serif text-3xl">
                  {activeModel.title}
                </h3>

                <p className="mt-6 max-w-2xl text-sm leading-8 text-white/62">
                  {activeModel.text}
                </p>

                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  {activeModel.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.02] p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
                      <span className="text-xs leading-6 text-white/55">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
