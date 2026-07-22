/**
 * Contact enquiry content: categories, the collaboration entry points shown on
 * the homepage, and the attachment policy.
 */

/** Stable slugs. These appear in URLs, so they must not change casually. */
export type InquiryCategoryId =
  | "institucion"
  | "empresa"
  | "profesional"
  | "persona"
  | "general"
  | "prensa"
  | "juridico";

export interface InquiryCategory {
  id: InquiryCategoryId;
  label: string;
}

export const inquiryCategories: InquiryCategory[] = [
  { id: "institucion", label: "Institución o programa público" },
  { id: "empresa", label: "Empresa o fundación" },
  { id: "profesional", label: "Profesional o voluntariado" },
  { id: "persona", label: "Persona o familia" },
  { id: "general", label: "Consulta general" },
  { id: "prensa", label: "Prensa" },
  { id: "juridico", label: "Asunto jurídico" },
];

export const DEFAULT_CATEGORY: InquiryCategoryId = "general";

/**
 * The four collaboration options in the Contact section. Each one is an entry
 * point to the enquiry form with its category already selected.
 */
export interface CollaborationPath {
  audience: string;
  text: string;
  category: InquiryCategoryId;
}

export const collaborationPaths: CollaborationPath[] = [
  {
    audience: "Instituciones y programas públicos",
    text: "Convenios, cooperación y apoyo institucional.",
    category: "institucion",
  },
  {
    audience: "Empresas y fundaciones",
    text: "Colaboración, responsabilidad social y aportes en especie.",
    category: "empresa",
  },
  {
    audience: "Profesionales y voluntarios",
    text: "Docencia, mentoría, oficios y acompañamiento.",
    category: "profesional",
  },
  {
    audience: "Personas y familias",
    text: "Consultas sobre el proyecto y formas de participar.",
    category: "persona",
  },
];

/** Path of the enquiry page. A real HTML entry point, not a client route. */
export const CONTACT_PAGE_PATH = "/contacto.html";

export function contactPageHref(category: InquiryCategoryId): string {
  return `${CONTACT_PAGE_PATH}?categoria=${category}`;
}

/* -------------------------------------------------------------------------- */
/* Attachments                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Frontend limits. These improve the experience; they are not a security
 * control. The backend MUST re-validate extension, real MIME type and size,
 * and MUST serve uploads from a location where they cannot execute.
 */
export const ATTACHMENTS = {
  maxFiles: 5,
  maxFileBytes: 10 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
  extensions: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"] as const,
  /** Passed to the file input's `accept`, and re-checked on selection. */
  accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
} as const;

export const MAX_FILE_MB = ATTACHMENTS.maxFileBytes / (1024 * 1024);
export const MAX_TOTAL_MB = ATTACHMENTS.maxTotalBytes / (1024 * 1024);

/* -------------------------------------------------------------------------- */
/* Data treatment                                                              */
/* -------------------------------------------------------------------------- */

export const CONSENT_LABEL =
  "He leído y acepto el tratamiento de mis datos para que Fundación Alborada pueda responder esta solicitud.";

/** Anchor of the data-treatment notice rendered on the enquiry page. */
export const PRIVACY_ANCHOR = "#tratamiento-de-datos";

export const dataTreatmentNotice: string[] = [
  "Los datos que usted envía se utilizan únicamente para responder a su solicitud.",
  "No se comparten con terceros con fines comerciales y no se utilizan para publicidad.",
  "Los archivos adjuntos se conservan solo mientras sean necesarios para atender la consulta.",
  "Puede solicitar la corrección o eliminación de sus datos escribiendo a contacto@alboradafoundation.org.",
  "La política formal de tratamiento de datos se publicará una vez definido el régimen legal aplicable a la fundación.",
];
