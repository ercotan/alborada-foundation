import React from "react";
import { contactInterests, donationTiers } from "../../data/homepage";

const CARD_CLASS =
  "bg-black/40 border border-white/5 hover:border-gold-500/25 p-6 rounded-2xl flex flex-col gap-4 relative overflow-hidden group transition-all duration-300";

export const DonationSection: React.FC = () => {
  return (
    <section
      id="donations"
      className="py-24 px-6 md:px-12 bg-[#050a1a] relative"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
            Cómo apoyar
          </span>
          <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide">
            Acompañar el proyecto Alborada
          </h2>
          <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
          <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
            Cada aporte se destina a la educación, la protección y el desarrollo
            de las estudiantes.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold-500/70 uppercase text-center">
            Áreas donde se necesita apoyo
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationTiers.map((area) => (
              <div
                key={area.id}
                className={
                  area.cardClassName
                    ? `${CARD_CLASS} ${area.cardClassName}`
                    : CARD_CLASS
                }
              >
                <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">
                  {area.category}
                </span>
                <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-400 transition-colors">
                  {area.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {area.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/5 bg-black/30 rounded-2xl p-8 md:p-10 flex flex-col gap-8">
          <div className="flex flex-col gap-3 text-center max-w-xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold-500 uppercase">
              Formas de colaborar
            </span>
            <p className="text-xs md:text-sm text-white/50 leading-relaxed font-light">
              La Fundación Alborada recibe acompañamiento por distintas vías.
              Escríbanos indicando su interés y le responderemos con los pasos
              concretos.
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-2">
            {contactInterests.map((interest) => (
              <li
                key={interest.value}
                className="font-mono text-[10px] tracking-widest text-white/50 uppercase border border-white/10 rounded-full px-4 py-2"
              >
                {interest.label}
              </li>
            ))}
          </ul>

          <div className="flex justify-center">
            <a
              href="#contact"
              className="inline-block px-8 py-3 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 rounded text-[10px] font-mono tracking-widest uppercase transition-colors"
            >
              Contactar a la fundación
            </a>
          </div>

          <p className="text-[11px] text-white/35 leading-relaxed font-light text-center max-w-2xl mx-auto border-t border-white/5 pt-6">
            La Fundación Alborada no publica cifras de financiación, montos
            recaudados ni porcentajes de avance mientras no estén oficialmente
            verificados. La información financiera y el progreso de cada
            proyecto se publicarán cuando cuenten con verificación oficial.
          </p>
        </div>
      </div>
    </section>
  );
};
