import React from "react";
import {
  childProtectionEntry,
  orientationRequest,
  orientationTopics,
} from "../../data/homepage";
import { contactPageHref } from "../../data/routes";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const OrientationSection: React.FC = () => (
  <section
    id="orientation"
    className="relative overflow-hidden bg-[#020712] px-6 py-28 text-white md:px-12"
  >
    <div className="mx-auto max-w-6xl">
      <div className="max-w-3xl">
        <SectionEyebrow>Centro de Orientación Alborada</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light leading-tight md:text-5xl">
          ¿Qué necesita cambiar hoy para construir una vida mejor?
        </h2>

        <p className="mt-7 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
          Alborada también existe para acompañar a personas que buscan ordenar
          sus finanzas, cambiar hábitos, emprender, encontrar dirección y
          transformar su realidad mediante conocimiento y acción.
        </p>
      </div>

      <article className="mt-14 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/[0.06] p-8 md:p-10">
        <SectionEyebrow>{childProtectionEntry.eyebrow}</SectionEyebrow>

        <h3 className="mt-5 font-serif text-2xl font-light leading-tight md:text-3xl">
          {childProtectionEntry.title}
        </h3>

        <p className="mt-5 max-w-3xl text-sm leading-8 text-white/60 md:text-base">
          {childProtectionEntry.text}
        </p>

        <a
          href={childProtectionEntry.href}
          className="mt-8 inline-flex rounded-full bg-[#d4af37] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37] motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          {childProtectionEntry.action}
        </a>
      </article>

      {/*
        Each card lifts on hover, so each card must go somewhere. They open
        the enquiry form with the orientation category and their own subject.
        The anchor wraps the whole card, so the click target is the visible
        box rather than the heading alone.
      */}
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orientationTopics.map((item) => (
          <a
            key={item.topic}
            href={contactPageHref(orientationRequest.category, item.topic)}
            aria-label={`Escribir al Centro de Orientación sobre ${item.title}`}
            className="block cursor-pointer rounded-3xl border border-white/8 bg-white/[0.025] p-8 transition hover:-translate-y-1 hover:border-[#d4af37]/25 hover:bg-white/[0.045] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <h3 className="font-serif text-xl">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/50">{item.text}</p>
          </a>
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
          className="inline-flex rounded-full bg-[#d4af37] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37] motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          {orientationRequest.action}
        </a>
      </div>
    </div>
  </section>
);
