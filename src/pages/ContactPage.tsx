import React from "react";
import { ContactInquiryForm } from "../components/contact/ContactInquiryForm";
import {
  dataTreatmentNotice,
  inquiryCategories,
  topicById,
  type InquiryCategoryId,
  type InquiryTopicId,
} from "../data/contact";
import { HOME_PATH } from "../data/routes";

export const ContactPage: React.FC<{
  initialCategory: InquiryCategoryId;
  /** Set when the visitor arrived from a card that names a subject. */
  initialTopic?: InquiryTopicId | null;
}> = ({ initialCategory, initialTopic = null }) => {
  const category = inquiryCategories.find((c) => c.id === initialCategory);
  const topic = initialTopic ? topicById(initialTopic) : null;

  return (
    <main className="min-h-screen bg-[#020712] text-white selection:bg-[#d4af37]/30">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-12 md:py-28">
        <a
          href={HOME_PATH}
          className="rounded text-[10px] uppercase tracking-[0.28em] text-white/40 transition hover:text-[#d4af37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37]"
        >
          ← Fundación Alborada
        </a>

        <header className="mt-10">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]">
            Contacto
          </span>

          <h1 className="mt-6 font-serif text-4xl font-light leading-tight md:text-5xl">
            Escríbanos
          </h1>

          <p className="mt-7 text-base leading-8 text-white/70">
            Complete el formulario y cuéntenos en qué podemos colaborar.
            {category && (
              <>
                {" "}
                La categoría{" "}
                <strong className="text-white">{category.label}</strong> ya está
                seleccionada; puede cambiarla si corresponde.
              </>
            )}
          </p>
        </header>

        <div className="mt-14">
          <ContactInquiryForm
            initialCategory={initialCategory}
            initialSubject={topic?.label}
          />
        </div>

        <section
          id="tratamiento-de-datos"
          className="mt-20 border-t border-white/7 pt-10"
        >
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
            Tratamiento de datos
          </span>
          <h2 className="mt-4 font-serif text-2xl font-light">
            Qué hacemos con lo que nos envía
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {dataTreatmentNotice.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-7 text-white/60"
              >
                <span aria-hidden="true" className="text-[#d4af37]/60">
                  ·
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};
