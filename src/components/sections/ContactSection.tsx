import React from "react";
import { CheckCircle2, Send } from "lucide-react";
import { motion } from "motion/react";
import { collaborationPaths, contactPageHref } from "../../data/contact";
import { primaryContact, specializedContacts } from "../../data/homepage";
import { SectionEyebrow } from "../ui/SectionEyebrow";

const CONTACT_EMAIL = primaryContact.email;

export const ContactSection: React.FC = () => (
  <section
    id="contact"
    className="border-t border-white/5 bg-[#050a16] px-6 py-28 md:px-12"
  >
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <SectionEyebrow>Contacto</SectionEyebrow>

        <h2 className="mt-7 font-serif text-4xl font-light md:text-5xl">
          Hablemos sobre el futuro de Alborada
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-white/62 md:text-base">
          Alborada está en construcción, y muchas de las mejores ideas llegan
          desde afuera. Si quiere conocer el proyecto, aportar su experiencia o
          explorar una colaboración, nos gustaría escucharle.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-14 rounded-3xl border border-white/8 bg-black/25 p-8 md:p-10"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          Toda colaboración es bienvenida
        </span>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {collaborationPaths.map((path) => (
            <a
              key={path.audience}
              href={contactPageHref(path.category)}
              // Negative margin plus equal padding widens the click target to
              // the whole option without shifting the layout by a pixel.
              className="group -m-3 flex items-start gap-3 rounded-2xl p-3 transition hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
              <div>
                <h3 className="font-serif text-base text-white transition-colors group-hover:text-[#d4af37]">
                  {path.audience}
                </h3>
                <p className="mt-1 text-xs leading-6 text-white/50">
                  {path.text}
                </p>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 border-t border-white/7 pt-7 text-xs leading-7 text-white/50">
          No hace falta un presupuesto ni una organización detrás. El tiempo, el
          conocimiento y una buena conexión también construyen.
        </p>

        <div className="mt-8 rounded-2xl border border-white/7 bg-white/[0.02] p-6">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
            Qué ocurre después
          </span>

          <p className="mt-4 text-xs leading-7 text-white/55">
            Su mensaje llega directamente al correo de la fundación. Una persona
            del equipo lo lee y le responde. Si su propuesta necesita más
            detalle, coordinamos una conversación.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Contacto%20institucional`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:scale-[1.01]"
          >
            Escribir a la fundación
            <Send className="h-4 w-4" />
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-mono text-[11px] text-white/40 transition hover:text-[#d4af37]"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="mt-8 border-t border-white/7 pt-7">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
            Contactos especializados
          </span>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {specializedContacts.map((contact) => (
              <div key={contact.email}>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-mono text-[11px] text-white/50 transition hover:text-[#d4af37]"
                >
                  {contact.email}
                </a>
                <p className="mt-1 text-xs leading-6 text-white/40">
                  {contact.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
