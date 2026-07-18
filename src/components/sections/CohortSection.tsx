import React from "react";
import { CheckCircle2, Shield, Users } from "lucide-react";
import { cohortSafeguards } from "../../data/homepage";
import { SectionEyebrow } from "../ui/SectionEyebrow";

export const CohortSection: React.FC = () => (
  <section
    id="girls"
    className="border-y border-white/5 bg-[#020712] px-6 py-28 md:px-12"
  >
    <div className="mx-auto max-w-4xl text-center">
      <Users className="mx-auto h-7 w-7 text-[#d4af37]" />

      <SectionEyebrow className="mt-6 block">Primera cohorte</SectionEyebrow>

      <h2 className="mt-7 font-serif text-4xl font-light md:text-5xl">
        15 niñas. Una visión de largo plazo.
      </h2>

      <p className="mx-auto mt-7 max-w-3xl text-sm leading-8 text-white/62 md:text-base">
        La primera cohorte estará integrada por 15 niñas de entre 10 y 12 años.
        Su identidad, privacidad y seguridad serán protegidas en todo momento.
        La web no expondrá nombres, historias personales ni imágenes que puedan
        vulnerar sus derechos.
      </p>

      <div className="mt-12 rounded-3xl border border-[#d4af37]/15 bg-[#d4af37]/5 p-8 text-left">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-[#d4af37]" />
          <h3 className="font-serif text-xl">
            Protección antes que exposición
          </h3>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {cohortSafeguards.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
              <span className="text-xs leading-6 text-white/58">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
