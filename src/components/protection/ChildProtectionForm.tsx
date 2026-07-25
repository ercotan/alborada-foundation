import React, { useState } from "react";
import {
  emergencyLines,
  PROTECTION_CONTACT_EMAIL,
} from "../../data/childProtection";
import {
  emptyReport,
  prepareReport,
  validateReport,
  type ChildProtectionReport,
  type PreparedReport,
  type ReportFieldError,
} from "../../lib/childProtection";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d4af37]/50";

const label = "block text-xs uppercase tracking-[0.18em] text-white/45";

const RELATIONSHIPS: { value: string; label: string }[] = [
  { value: "", label: "Prefiero no indicarlo" },
  { value: "familiar", label: "Familiar" },
  { value: "vecino", label: "Vecino o conocido" },
  { value: "docente", label: "Docente o personal educativo" },
  { value: "salud", label: "Profesional de salud" },
  { value: "el-propio-nino", label: "Soy el niño, la niña o el adolescente" },
  { value: "otro", label: "Otro" },
];

const DANGER_OPTIONS: { value: string; label: string }[] = [
  { value: "si", label: "Sí, corre peligro ahora" },
  { value: "no", label: "No corre peligro inmediato" },
  { value: "no-lo-se", label: "No lo sé" },
];

export const ChildProtectionForm: React.FC = () => {
  const [report, setReport] = useState<ChildProtectionReport>(emptyReport);
  const [errors, setErrors] = useState<ReportFieldError>({});
  const [prepared, setPrepared] = useState<PreparedReport | null>(null);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof ChildProtectionReport>(
    key: K,
    value: ChildProtectionReport[K],
  ) => {
    setReport((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validateReport(report);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setPrepared(prepareReport(report));
  };

  const copy = async () => {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (prepared) {
    return (
      <div className="rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/5 p-8">
        <h3 className="font-serif text-2xl">Su reporte está preparado</h3>

        <p className="mt-4 text-sm leading-7 text-white/70">
          <strong className="text-white">
            Todavía no ha llegado a la fundación.
          </strong>{" "}
          El canal de recepción automática aún se está construyendo, y
          preferimos decírselo con claridad antes que dejarle creer que su
          mensaje ya fue recibido.
        </p>

        <p className="mt-4 text-sm leading-7 text-white/70">
          Copie el texto y envíelo a{" "}
          <a
            href={`mailto:${PROTECTION_CONTACT_EMAIL}?subject=Reporte%20de%20protecci%C3%B3n%20infantil`}
            className="font-mono text-[13px] text-[#d4af37] underline underline-offset-4"
          >
            {PROTECTION_CONTACT_EMAIL}
          </a>
          . Una persona del equipo lo leerá.
        </p>

        <pre className="mt-6 max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/40 p-5 text-xs leading-6 text-white/70">
          {prepared.text}
        </pre>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={copy}
            className="rounded-xl bg-[#d4af37] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            {copied ? "Texto copiado" : "Copiar el reporte"}
          </button>

          <button
            type="button"
            onClick={() => {
              setPrepared(null);
              setCopied(false);
            }}
            className="rounded text-[10px] uppercase tracking-[0.2em] text-white/50 transition hover:text-[#d4af37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37]"
          >
            Volver a editar
          </button>
        </div>

        <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-white/45">
          Si la situación es urgente, no espere una respuesta: comuníquese
          primero con la línea de emergencias de su país.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <p className="text-sm leading-7 text-white/60">
        Puede completar solo lo que sepa. Los datos personales son opcionales:
        <strong className="text-white/80">
          {" "}
          puede reportar de forma anónima.
        </strong>
      </p>

      <fieldset className="flex flex-col gap-5">
        <legend className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          Sus datos (opcionales)
        </legend>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={label} htmlFor="cp-name">
              Nombre
            </label>
            <input
              id="cp-name"
              type="text"
              autoComplete="name"
              value={report.name}
              onChange={(e) => update("name", e.target.value)}
              className={`mt-2 ${field}`}
            />
          </div>

          <div>
            <label className={label} htmlFor="cp-email">
              Correo
            </label>
            <input
              id="cp-email"
              type="email"
              autoComplete="email"
              value={report.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "cp-email-error" : undefined}
              className={`mt-2 ${field}`}
            />
            {errors.email && (
              <p id="cp-email-error" className="mt-2 text-xs text-[#e0a0a0]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className={label} htmlFor="cp-phone">
              Teléfono
            </label>
            <input
              id="cp-phone"
              type="tel"
              autoComplete="tel"
              value={report.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={`mt-2 ${field}`}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          Dónde ocurre
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="cp-country">
              País <span className="text-[#d4af37]">·</span> necesario
            </label>
            <input
              id="cp-country"
              type="text"
              autoComplete="country-name"
              value={report.country}
              onChange={(e) => update("country", e.target.value)}
              aria-invalid={Boolean(errors.country)}
              aria-describedby={errors.country ? "cp-country-error" : undefined}
              className={`mt-2 ${field}`}
            />
            {errors.country && (
              <p id="cp-country-error" className="mt-2 text-xs text-[#e0a0a0]">
                {errors.country}
              </p>
            )}
          </div>

          <div>
            <label className={label} htmlFor="cp-city">
              Ciudad
            </label>
            <input
              id="cp-city"
              type="text"
              value={report.city}
              onChange={(e) => update("city", e.target.value)}
              className={`mt-2 ${field}`}
            />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="cp-relationship">
            Su relación con el niño o la niña
          </label>
          <select
            id="cp-relationship"
            value={report.relationship}
            onChange={(e) =>
              update(
                "relationship",
                e.target.value as ChildProtectionReport["relationship"],
              )
            }
            className={`mt-2 ${field}`}
          >
            {RELATIONSHIPS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          ¿Corre peligro ahora? <span className="text-[#d4af37]">·</span>{" "}
          necesario
        </legend>

        <div
          role="radiogroup"
          aria-invalid={Boolean(errors.immediateDanger)}
          aria-describedby={
            errors.immediateDanger ? "cp-danger-error" : undefined
          }
          className="mt-4 flex flex-col gap-3"
        >
          {DANGER_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-white/70"
            >
              <input
                type="radio"
                name="immediateDanger"
                value={option.value}
                checked={report.immediateDanger === option.value}
                onChange={(e) =>
                  update(
                    "immediateDanger",
                    e.target.value as ChildProtectionReport["immediateDanger"],
                  )
                }
                className="h-4 w-4 accent-[#d4af37]"
              />
              {option.label}
            </label>
          ))}
        </div>

        {errors.immediateDanger && (
          <p id="cp-danger-error" className="mt-3 text-xs text-[#e0a0a0]">
            {errors.immediateDanger}
          </p>
        )}

        {report.immediateDanger === "si" && (
          <p
            role="alert"
            className="mt-4 rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/8 p-5 text-sm leading-7 text-white/80"
          >
            Si hay peligro en este momento, <strong>llame primero</strong> a la
            línea de emergencias de su país. En {emergencyLines.country}, el{" "}
            <strong>{emergencyLines.general.number}</strong> y la línea de
            protección de la niñez{" "}
            <strong>{emergencyLines.childProtection.number}</strong>. Puede
            completar este formulario después.
          </p>
        )}
      </fieldset>

      <div>
        <label className={label} htmlFor="cp-description">
          Qué está ocurriendo <span className="text-[#d4af37]">·</span>{" "}
          necesario
        </label>
        <textarea
          id="cp-description"
          rows={7}
          value={report.description}
          onChange={(e) => update("description", e.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "cp-description-error" : "cp-description-help"
          }
          className={`mt-2 resize-none ${field}`}
        />
        <p id="cp-description-help" className="mt-2 text-xs text-white/40">
          Cuente lo que sabe, con sus palabras. No necesita tener certeza de
          todo.
        </p>
        {errors.description && (
          <p id="cp-description-error" className="mt-2 text-xs text-[#e0a0a0]">
            {errors.description}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#d4af37] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
      >
        Preparar el reporte
      </button>
    </form>
  );
};
