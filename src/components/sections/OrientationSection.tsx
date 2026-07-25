import React from "react";
import {
  childProtectionEntry,
  orientationRequest,
  orientationTopics,
} from "../../data/homepage";
import { contactPageHref } from "../../data/routes";

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

      <article className="mt-14 rounded-3xl border border-amber-400/35 bg-amber-400/[0.06] p-8 md:p-10">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
          {childProtectionEntry.eyebrow}
        </span>

        <h3 className="mt-5 text-2xl font-bold leading-tight md:text-3xl">
          {childProtectionEntry.title}
        </h3>

        <p className="mt-5 max-w-3xl leading-8 text-slate-300">
          {childProtectionEntry.text}
        </p>

        <a
          href={childProtectionEntry.href}
          className="mt-8 inline-flex rounded-full bg-amber-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          {childProtectionEntry.action}
        </a>
      </article>

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
        {/*
          Was a `mailto:` whose query string carried a raw space and an
          unescaped "ó", so it was not a valid URI even where a mail client
          existed. Orientation is a category of the general intake, not a
          separate service — see ADR-0004 §D1.
        */}
        <a
          href={contactPageHref(orientationRequest.category)}
          className="inline-flex rounded-full bg-amber-400 px-8 py-4 font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          {orientationRequest.action}
        </a>
      </div>
    </div>
  </section>
);
