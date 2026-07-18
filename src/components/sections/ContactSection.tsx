import React from "react";
import { CheckCircle2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { contactInterests } from "../../data/homepage";
import { useContactForm } from "../../hooks/useContactForm";
import { SectionEyebrow } from "../ui/SectionEyebrow";

/** Shared styling for the free-text fields of the form. */
const fieldClassName =
  "rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d4af37]/50";

export const ContactSection: React.FC = () => {
  const { data, updateField, submitted, handleSubmit, resetSubmission } =
    useContactForm();

  return (
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
        </div>

        <div className="mt-14 rounded-3xl border border-white/8 bg-black/25 p-8">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    placeholder="Nombre completo"
                    className={fieldClassName}
                  />

                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="Correo electrónico"
                    className={fieldClassName}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    value={data.organization}
                    onChange={(event) =>
                      updateField("organization", event.target.value)
                    }
                    placeholder="Organización"
                    className={fieldClassName}
                  />

                  <select
                    value={data.interest}
                    onChange={(event) =>
                      updateField("interest", event.target.value)
                    }
                    className="rounded-xl border border-white/10 bg-[#07101f] px-4 py-3 text-sm text-white outline-none focus:border-[#d4af37]/50"
                  >
                    {contactInterests.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  required
                  rows={5}
                  value={data.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  placeholder="Mensaje"
                  className={`w-full resize-none ${fieldClassName}`}
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f]"
                >
                  Enviar mensaje
                  <Send className="h-4 w-4" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-[#d4af37]" />

                <h3 className="mt-6 font-serif text-2xl">Mensaje recibido</h3>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/52">
                  Gracias por ponerse en contacto con Fundación Alborada.
                  Revisaremos su mensaje y responderemos a la mayor brevedad.
                </p>

                <button
                  onClick={resetSubmission}
                  className="mt-7 text-[10px] uppercase tracking-[0.2em] text-[#d4af37]"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
