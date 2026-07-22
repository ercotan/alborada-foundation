/**
 * Child protection intake — data contract and submission seam.
 *
 * THERE IS NO BACKEND YET. `prepareReport` formats what the person typed and
 * returns it. It transmits nothing, stores nothing, and assigns no case
 * number, because a case number would imply a case exists in a system.
 *
 * This module exists so that adding the backend later changes one function and
 * nothing else. The fields the server will attach are declared in
 * `ServerAttachedFields` so the shape is agreed now rather than improvised
 * under pressure.
 */

/** Who is reporting, relative to the child. */
export type ReporterRelationship =
  "familiar" | "vecino" | "docente" | "salud" | "el-propio-nino" | "otro";

/** Whether the child is in immediate danger, as understood by the reporter. */
export type ImmediateDanger = "si" | "no" | "no-lo-se";

/**
 * Everything the browser collects. Every identifying field is optional:
 * anonymous reports are accepted deliberately.
 */
export interface ChildProtectionReport {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  relationship: ReporterRelationship | "";
  immediateDanger: ImmediateDanger | "";
  description: string;
}

/**
 * Fields the server will attach on receipt. Declared, not implemented.
 *
 * None of these can be produced honestly in the browser: a client-generated
 * case identifier would be a fiction, and a client-reported IP or country is
 * unverifiable. They are listed here so the eventual endpoint has an agreed
 * contract rather than an invented one.
 */
export interface ServerAttachedFields {
  /** ISO 8601, set by the server clock, never the browser clock. */
  receivedAt: string;
  /** Case identifier assigned on persistence. */
  caseId: string;
  /** Origin IP, as observed by the server. */
  sourceIp: string;
  /** Raw User-Agent header. */
  userAgent: string;
  /** Country inferred from the request, distinct from the declared country. */
  inferredCountry: string;
  /** Append-only audit entry written at the moment of receipt. */
  auditEntryId: string;
}

/** What a completed submission will look like once the backend exists. */
export type StoredChildProtectionReport = ChildProtectionReport &
  ServerAttachedFields;

export const emptyReport: ChildProtectionReport = {
  name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  relationship: "",
  immediateDanger: "",
  description: "",
};

export type ReportFieldError = Partial<
  Record<keyof ChildProtectionReport, string>
>;

/**
 * Only three fields are required. Identity is never required, so that a child
 * or a frightened neighbour can report without giving their name.
 */
export function validateReport(
  report: ChildProtectionReport,
): ReportFieldError {
  const errors: ReportFieldError = {};

  if (!report.country.trim()) {
    errors.country = "Indique el país para poder orientarle correctamente.";
  }
  if (!report.immediateDanger) {
    errors.immediateDanger =
      "Indique si el niño o la niña corre peligro ahora.";
  }
  if (report.description.trim().length < 20) {
    errors.description =
      "Describa la situación con algo más de detalle. Cualquier dato ayuda.";
  }
  if (report.email.trim() && !report.email.includes("@")) {
    errors.email = "Revise la dirección de correo.";
  }

  return errors;
}

const RELATIONSHIP_LABEL: Record<ReporterRelationship, string> = {
  familiar: "Familiar",
  vecino: "Vecino o conocido",
  docente: "Docente o personal educativo",
  salud: "Profesional de salud",
  "el-propio-nino": "Es el propio niño, niña o adolescente",
  otro: "Otro",
};

const DANGER_LABEL: Record<ImmediateDanger, string> = {
  si: "Sí, corre peligro ahora",
  no: "No corre peligro inmediato",
  "no-lo-se": "No lo sé",
};

/**
 * Formats the report as plain text the person can send themselves.
 *
 * This is the honest substitute for transmission while no endpoint exists: the
 * reporter keeps a complete, structured account and controls where it goes.
 */
export function formatReportForSending(report: ChildProtectionReport): string {
  const line = (label: string, value: string) =>
    value.trim() ? `${label}: ${value.trim()}` : null;

  return [
    "REPORTE DE PROTECCIÓN INFANTIL — FUNDACIÓN ALBORADA",
    "",
    line("Nombre", report.name) ?? "Nombre: (no indicado)",
    line("Correo", report.email) ?? "Correo: (no indicado)",
    line("Teléfono", report.phone) ?? "Teléfono: (no indicado)",
    line("País", report.country),
    line("Ciudad", report.city),
    report.relationship
      ? `Relación con el niño o la niña: ${RELATIONSHIP_LABEL[report.relationship]}`
      : null,
    report.immediateDanger
      ? `Peligro inmediato: ${DANGER_LABEL[report.immediateDanger]}`
      : null,
    "",
    "Descripción de la situación:",
    report.description.trim(),
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

export interface PreparedReport {
  /** The formatted text, ready to be sent by the reporter. */
  text: string;
  /**
   * Always false in this version. The report has not reached the foundation
   * by the act of pressing the button, and the interface must say so.
   */
  transmitted: false;
}

/**
 * Prepares the report. Deliberately synchronous and side-effect free.
 *
 * When the intake endpoint exists this becomes an async call returning the
 * server-assigned case identifier, and `transmitted` becomes true. Nothing
 * else in the page needs to change.
 */
export function prepareReport(report: ChildProtectionReport): PreparedReport {
  return { text: formatReportForSending(report), transmitted: false };
}
