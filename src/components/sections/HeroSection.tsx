import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { CinematicCanvas } from "../CinematicCanvas";
import { Header } from "../layout/Header";
import { ScrollButton } from "../shared/ScrollButton";

export const HeroSection: React.FC = () => (
  <section
    id="hero"
    className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
  >
    <CinematicCanvas
      progress={0.73}
      isPlaying={true}
      speed={0.35}
      cameraDolly={true}
    />

    <div className="absolute inset-0 bg-gradient-to-b from-[#020712]/30 via-transparent to-[#020712]/75" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.10),transparent_48%)]" />

    <Header />

    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
    >
      <span className="mb-5 text-[10px] uppercase tracking-[0.55em] text-[#d4af37]">
        Educación · Liderazgo · Futuro
      </span>

      <h1 className="font-serif text-6xl font-light uppercase tracking-[0.22em] text-white sm:text-7xl lg:text-9xl">
        Alborada
      </h1>

      <div className="my-7 h-px w-20 bg-[#d4af37]/55" />

      <p className="max-w-2xl font-serif text-xl italic leading-relaxed text-white/90 sm:text-2xl">
        El futuro comienza al amanecer.
      </p>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
        Un ecosistema educativo y residencial para formar una nueva generación
        de mujeres líderes.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <ScrollButton
          targetId="mission"
          className="flex items-center justify-center gap-2 rounded-full bg-[#d4af37] px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:scale-[1.03]"
        >
          Descubrir la misión
          <ArrowRight className="h-4 w-4" />
        </ScrollButton>

        <ScrollButton
          targetId="contact"
          className="rounded-full border border-white/20 bg-black/15 px-7 py-3 text-[10px] uppercase tracking-[0.22em] text-white transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
        >
          Unirse al proyecto
        </ScrollButton>
      </div>
    </motion.div>

    <ScrollButton
      targetId="mission"
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[9px] uppercase tracking-[0.28em] text-white/45 transition hover:text-[#d4af37]"
    >
      Explorar
    </ScrollButton>
  </section>
);
