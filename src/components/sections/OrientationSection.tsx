import React from "react";
import { orientationTopics } from "../../data/homepage";

export const OrientationSection: React.FC = () => (
  <section
    id="orientation"
    className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white"
  >
    <div className="mx-auto max-w-6xl">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          Centro de Orientación Alborada
        </span>

        <h2 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
          ¿Qué necesitás cambiar hoy para construir una vida mejor?
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Alborada también existe para acompañar a personas que buscan ordenar
          sus finanzas, cambiar hábitos, emprender, encontrar dirección y
          transformar su realidad mediante conocimiento y acción.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orientationTopics.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <a
          href="mailto:contacto@alboradafoundation.org?subject=Solicitud de orientación"
          className="inline-flex rounded-full bg-amber-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          Solicitar orientación
        </a>
      </div>
    </div>
  </section>
);
