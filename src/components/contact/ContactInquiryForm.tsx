import React, { useRef, useState } from "react";
import { Paperclip, X } from "lucide-react";
import {
  ATTACHMENTS,
  CONSENT_LABEL,
  inquiryCategories,
  MAX_FILE_MB,
  MAX_TOTAL_MB,
  PRIVACY_ANCHOR,
  type InquiryCategoryId,
} from "../../data/contact";
import {
  checkAttachments,
  emptyInquiry,
  submitInquiry,
  validateInquiry,
  type AttachmentRejection,
  type ContactInquiry,
  type InquiryErrors,
  type SubmitOutcome,
} from "../../lib/contactInquiry";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d4af37]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]";

const labelClass = "block text-xs uppercase tracking-[0.18em] text-white/50";

const errorClass = "mt-2 text-xs leading-5 text-[#f0a8a8]";

const formatBytes = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

interface FieldProps {
  id: keyof ContactInquiry;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  required,
  type = "text",
  value,
  error,
  onChange,
  autoComplete,
}) => (
  <div>
    <label className={labelClass} htmlFor={id}>
      {label}
      {required && (
        <span className="ml-1 text-[#d4af37]" aria-hidden="true">
          *
        </span>
      )}
      {required && <span className="sr-only"> (obligatorio)</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      required={required}
      autoComplete={autoComplete}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      onChange={(event) => onChange(event.target.value)}
      className={`mt-2 ${inputClass}`}
    />
    {error && (
      <p id={`${id}-error`} className={errorClass}>
        {error}
      </p>
    )}
  </div>
);

export const ContactInquiryForm: React.FC<{
  initialCategory: InquiryCategoryId;
}> = ({ initialCategory }) => {
  const [inquiry, setInquiry] = useState<ContactInquiry>({
    ...emptyInquiry,
    category: initialCategory,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [rejections, setRejections] = useState<AttachmentRejection[]>([]);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null);
  const [sending, setSending] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof ContactInquiry>(
    key: K,
    value: ContactInquiry[K],
  ) => setInquiry((previous) => ({ ...previous, [key]: value }));

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const result = checkAttachments(files, Array.from(incoming));
    setFiles(result.accepted);
    setRejections(result.rejected);
    if (fileInput.current) fileInput.current.value = "";
  };

  const removeFile = (index: number) =>
    setFiles((current) => current.filter((_, i) => i !== index));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setOutcome(null);

    const found = validateInquiry(inquiry);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document
        .querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus({ preventScroll: false });
      return;
    }

    setSending(true);
    // Fields and files are intentionally left untouched, so nothing the
    // visitor typed is lost if the submission fails.
    const result = await submitInquiry(inquiry, files);
    setSending(false);
    setOutcome(result);
  };

  if (outcome?.status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-[#d4af37]/25 bg-[#d4af37]/5 p-8"
      >
        <h2 className="font-serif text-2xl">Recibimos tu mensaje</h2>
        <p className="mt-4 text-sm leading-7 text-white/70">
          Una persona del equipo de Fundación Alborada revisará la información y
          responderá por el medio de contacto indicado.
        </p>
        {outcome.inquiryId && (
          <p className="mt-5 text-xs text-white/50">
            Número de referencia:{" "}
            <span className="font-mono text-[#d4af37]">
              {outcome.inquiryId}
            </span>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* The success branch returned above, so any outcome here is a failure. */}
      {outcome && (
        <div
          role="alert"
          className="rounded-2xl border border-[#f0a8a8]/30 bg-[#f0a8a8]/[0.07] p-6 text-sm leading-7 text-white/80"
        >
          {outcome.status === "not-configured" && (
            <>
              <strong className="text-white">Tu mensaje no fue enviado.</strong>{" "}
              El servicio de recepción de formularios todavía no está conectado,
              así que preferimos decírtelo en lugar de mostrarte una
              confirmación falsa. Mientras tanto podés escribirnos a{" "}
              <a
                href="mailto:contacto@alboradafoundation.org"
                className="font-mono text-[13px] text-[#d4af37] underline underline-offset-4"
              >
                contacto@alboradafoundation.org
              </a>
              . Los datos que completaste siguen aquí.
            </>
          )}
          {outcome.status === "rejected" && (
            <>
              <strong className="text-white">No pudimos procesarlo.</strong>{" "}
              {outcome.message}
            </>
          )}
          {outcome.status === "rate-limited" && (
            <>
              <strong className="text-white">Demasiados envíos.</strong> Se
              recibieron muchas solicitudes desde esta conexión. Espere unos
              minutos e intente de nuevo.
            </>
          )}
          {outcome.status === "server-error" && (
            <>
              <strong className="text-white">
                El servidor no pudo procesar el envío.
              </strong>{" "}
              No es un problema de tus datos. Intentá de nuevo en unos minutos.
            </>
          )}
          {outcome.status === "network-error" && (
            <>
              <strong className="text-white">No hubo conexión.</strong> No
              pudimos comunicarnos con el servidor. Revisá tu conexión e intentá
              de nuevo; lo que escribiste no se perdió.
            </>
          )}
        </div>
      )}

      <fieldset className="flex flex-col gap-5">
        <legend className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          Sus datos
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="firstName"
            label="Nombre"
            required
            autoComplete="given-name"
            value={inquiry.firstName}
            error={errors.firstName}
            onChange={(v) => set("firstName", v)}
          />
          <Field
            id="lastName"
            label="Apellido"
            required
            autoComplete="family-name"
            value={inquiry.lastName}
            error={errors.lastName}
            onChange={(v) => set("lastName", v)}
          />
          <Field
            id="email"
            label="Correo electrónico"
            required
            type="email"
            autoComplete="email"
            value={inquiry.email}
            error={errors.email}
            onChange={(v) => set("email", v)}
          />
          <Field
            id="phone"
            label="Teléfono (opcional)"
            type="tel"
            autoComplete="tel"
            value={inquiry.phone}
            error={errors.phone}
            onChange={(v) => set("phone", v)}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          Ubicación
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="country"
            label="País"
            required
            autoComplete="country-name"
            value={inquiry.country}
            error={errors.country}
            onChange={(v) => set("country", v)}
          />
          <Field
            id="city"
            label="Ciudad"
            required
            autoComplete="address-level2"
            value={inquiry.city}
            error={errors.city}
            onChange={(v) => set("city", v)}
          />
          <Field
            id="region"
            label="Departamento o provincia (opcional)"
            autoComplete="address-level1"
            value={inquiry.region}
            error={errors.region}
            onChange={(v) => set("region", v)}
          />
          <Field
            id="address"
            label="Dirección (opcional)"
            value={inquiry.address}
            error={errors.address}
            onChange={(v) => set("address", v)}
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          Su consulta
        </legend>

        <div>
          <label className={labelClass} htmlFor="category">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            value={inquiry.category}
            onChange={(event) =>
              set("category", event.target.value as InquiryCategoryId)
            }
            className={`mt-2 ${inputClass}`}
          >
            {inquiryCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="organization"
            label="Organización o institución (opcional)"
            autoComplete="organization"
            value={inquiry.organization}
            error={errors.organization}
            onChange={(v) => set("organization", v)}
          />
          <Field
            id="role"
            label="Cargo o función (opcional)"
            autoComplete="organization-title"
            value={inquiry.role}
            error={errors.role}
            onChange={(v) => set("role", v)}
          />
        </div>

        <Field
          id="subject"
          label="Asunto"
          required
          value={inquiry.subject}
          error={errors.subject}
          onChange={(v) => set("subject", v)}
        />

        <div>
          <label className={labelClass} htmlFor="message">
            Mensaje
            <span className="ml-1 text-[#d4af37]" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (obligatorio)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={7}
            required
            value={inquiry.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            onChange={(event) => set("message", event.target.value)}
            className={`mt-2 resize-none ${inputClass}`}
          />
          {errors.message && (
            <p id="message-error" className={errorClass}>
              {errors.message}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[10px] uppercase tracking-[0.28em] text-[#d4af37]/80">
          Adjuntar archivos
        </legend>

        <p
          id="attachments-help"
          className="mt-4 text-xs leading-6 text-white/50"
        >
          Podés adjuntar documentos o imágenes que ayuden a comprender tu
          consulta. Formatos admitidos: PDF, DOC, DOCX, JPG y PNG. Hasta{" "}
          {ATTACHMENTS.maxFiles} archivos, {MAX_FILE_MB} MB cada uno y{" "}
          {MAX_TOTAL_MB} MB en total.
        </p>

        <label
          htmlFor="attachments"
          className="mt-4 inline-flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-xs uppercase tracking-[0.18em] text-white/70 transition hover:border-[#d4af37]/50 hover:text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#d4af37]"
        >
          <Paperclip className="h-4 w-4 text-[#d4af37]" aria-hidden="true" />
          Seleccionar archivos
        </label>
        <input
          ref={fileInput}
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept={ATTACHMENTS.accept}
          aria-describedby="attachments-help"
          onChange={(event) => addFiles(event.target.files)}
          className="sr-only"
        />

        {files.length > 0 && (
          <ul className="mt-5 flex flex-col gap-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
              >
                <span className="truncate text-xs text-white/70">
                  {file.name}{" "}
                  <span className="text-white/40">
                    ({formatBytes(file.size)})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="shrink-0 rounded-lg p-1 text-white/50 transition hover:text-[#f0a8a8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Quitar {file.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {rejections.length > 0 && (
          <ul role="alert" className="mt-4 flex flex-col gap-2">
            {rejections.map((rejection) => (
              <li key={rejection.fileName} className={errorClass}>
                {rejection.fileName}: {rejection.reason}
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={inquiry.consent}
            onChange={(event) => set("consent", event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[#d4af37] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
          />
          <label htmlFor="consent" className="text-xs leading-6 text-white/60">
            {CONSENT_LABEL}{" "}
            <a
              href={PRIVACY_ANCHOR}
              className="text-[#d4af37] underline underline-offset-4"
            >
              Ver el tratamiento de datos
            </a>
            .
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className={errorClass}>
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-[#d4af37] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#07101f] transition hover:scale-[1.005] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-60"
      >
        {sending ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
};
