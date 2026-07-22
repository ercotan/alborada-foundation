import React from "react";
import { ChildProtectionForm } from "../components/protection/ChildProtectionForm";
import {
  confidentialityPolicy,
  emergencyLines,
  reportableSituations,
  responseProcess,
  usefulInformation,
  whatWeDo,
  whatWeDoNot,
} from "../data/childProtection";

const Block: React.FC<{
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}> = ({ eyebrow, title, children }) => (
  <section className="border-t border-white/7 pt-10">
    <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
      {eyebrow}
    </span>
    <h2 className="mt-4 font-serif text-2xl font-light md:text-3xl">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="flex flex-col gap-3">
    {items.map((item) => (
      <li key={item} className="flex gap-3 text-sm leading-7 text-white/60">
        <span aria-hidden="true" className="text-[#d4af37]/60">
          ·
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const ChildProtectionPage: React.FC = () => (
  <main className="min-h-screen bg-[#020712] text-white selection:bg-[#d4af37]/30">
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-12 md:py-28">
      <a
        href="/"
        className="text-[10px] uppercase tracking-[0.28em] text-white/40 transition hover:text-[#d4af37]"
      >
        ← Fundación Alborada
      </a>

      <header className="mt-10">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]">
          Protección infantil
        </span>

        <h1 className="mt-6 font-serif text-4xl font-light leading-tight md:text-5xl">
          Está en el lugar correcto
        </h1>

        <p className="mt-7 text-base leading-8 text-white/70">
          Si un niño, una niña o un adolescente está atravesando una situación
          de violencia, abandono, abuso, explotación, negligencia o cualquier
          otra condición de vulnerabilidad, puede escribirnos. Le responderemos
          con orientación sobre cómo actuar y cómo iniciar el proceso de ayuda.
        </p>

        <p className="mt-5 text-sm leading-7 text-white/50">
          No necesita estar seguro de nada. No necesita pruebas. No necesita dar
          su nombre.
        </p>
      </header>

      <div
        role="note"
        className="mt-12 rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/8 p-8"
      >
        <h2 className="font-serif text-xl">
          Si hay peligro en este momento, llame primero
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/75">
          Esta página no es un servicio de emergencia. Si la vida o la
          integridad de un niño o una niña está en riesgo ahora, comuníquese de
          inmediato con la línea de emergencias de su país.
        </p>
        <p className="mt-4 text-sm leading-7 text-white/75">
          En {emergencyLines.country}:{" "}
          <strong className="text-white">
            {emergencyLines.general.number}
          </strong>{" "}
          para {emergencyLines.general.label}, y{" "}
          <strong className="text-white">
            {emergencyLines.childProtection.number}
          </strong>{" "}
          para la {emergencyLines.childProtection.label}. Ambas atienden a toda
          hora y son gratuitas.
        </p>
        <p className="mt-4 text-sm leading-7 text-white/60">
          Después de hacerlo, puede escribirnos igualmente.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-12">
        <Block
          eyebrow="Qué se puede reportar"
          title="Situaciones sobre las que puede escribirnos"
        >
          <List items={reportableSituations} />
        </Block>

        <Block eyebrow="Qué ayuda saber" title="Información útil, si la tiene">
          <p className="mb-6 text-sm leading-7 text-white/60">
            Nada de esto es obligatorio. Escriba lo que sepa.
          </p>
          <List items={usefulInformation} />
        </Block>

        <Block eyebrow="Alcance" title="Qué hacemos y qué no hacemos">
          <p className="text-sm leading-7 text-white/70">Qué hacemos:</p>
          <div className="mt-4">
            <List items={whatWeDo} />
          </div>

          <p className="mt-8 text-sm leading-7 text-white/70">
            Qué no hacemos:
          </p>
          <div className="mt-4">
            <List items={whatWeDoNot} />
          </div>

          <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm leading-7 text-white/60">
            La fundación revisa la información, evalúa la situación y, cuando
            corresponde, orienta a la persona o coordina con las autoridades y
            organizaciones competentes. Decirlo con precisión es parte de
            tomarse el caso en serio.
          </p>
        </Block>

        <Block eyebrow="Confidencialidad" title="Cómo tratamos su información">
          <List items={confidentialityPolicy} />
        </Block>

        <Block eyebrow="Proceso" title="Qué ocurre después de escribirnos">
          <ol className="flex flex-col gap-5">
            {responseProcess.map((phase, index) => (
              <li key={phase.step} className="flex gap-4">
                <span className="font-mono text-xs text-[#d4af37]/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-base text-white">
                    {phase.step}
                  </h3>
                  <p className="mt-1 text-sm leading-7 text-white/55">
                    {phase.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block eyebrow="Reportar" title="Cuéntenos qué está ocurriendo">
          <ChildProtectionForm />
        </Block>
      </div>
    </div>
  </main>
);
