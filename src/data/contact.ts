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
  | "orientacion"
  | "donacion"
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
  // ADR-0004 §D1 lists `orientacion` as a Class A category — orientation
  // requests are routed by mailbox, not served by a separate page.
  { id: "orientacion", label: "Centro de Orientación" },
  // An enquiry about how to support an area of the project. It is a contact
  // category, not a payment path: an online donation goes through the PayPal
  // hosted button in the donation section, never through this form.
  { id: "donacion", label: "Apoyo al proyecto" },
  { id: "general", label: "Consulta general" },
  { id: "prensa", label: "Prensa" },
  { id: "juridico", label: "Asunto jurídico" },
];

export const DEFAULT_CATEGORY: InquiryCategoryId = "general";

/* -------------------------------------------------------------------------- */
/* Topics                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The subject a visitor arrived with, one level below the category.
 *
 * A topic exists so a card can say *what* the visitor clicked, not merely
 * which desk it belongs to: "orientación" is the category, "finanzas
 * personales" is why they wrote. It travels in the URL as `tema`, so these
 * slugs are public and must not change casually — an old shared link would
 * silently lose its subject.
 *
 * Every topic declares the category it belongs to, so a link cannot pair a
 * topic with a desk that does not handle it.
 */
export type InquiryTopicId =
  // Centro de Orientación
  | "finanzas-personales"
  | "habitos-y-disciplina"
  | "emprendimiento"
  | "proyecto-de-vida"
  | "educacion-y-tecnologia"
  // Áreas donde se necesita apoyo
  | "becas-y-estudio"
  | "biblioteca"
  | "aula-de-tecnologia"
  | "residencia-y-cuidado"
  | "huerta-y-granja";

export interface InquiryTopic {
  id: InquiryTopicId;
  /** Shown to the visitor; prefilled as the subject of the enquiry. */
  label: string;
  category: InquiryCategoryId;
}

export const inquiryTopics: InquiryTopic[] = [
  {
    id: "finanzas-personales",
    label: "Finanzas personales",
    category: "orientacion",
  },
  {
    id: "habitos-y-disciplina",
    label: "Hábitos y disciplina",
    category: "orientacion",
  },
  { id: "emprendimiento", label: "Emprendimiento", category: "orientacion" },
  {
    id: "proyecto-de-vida",
    label: "Proyecto de vida",
    category: "orientacion",
  },
  {
    id: "educacion-y-tecnologia",
    label: "Educación y tecnología",
    category: "orientacion",
  },
  { id: "becas-y-estudio", label: "Becas y estudio", category: "donacion" },
  { id: "biblioteca", label: "Biblioteca", category: "donacion" },
  {
    id: "aula-de-tecnologia",
    label: "Aula de tecnología",
    category: "donacion",
  },
  {
    id: "residencia-y-cuidado",
    label: "Residencia y cuidado",
    category: "donacion",
  },
  { id: "huerta-y-granja", label: "Huerta y granja", category: "donacion" },
];

export function topicById(id: InquiryTopicId): InquiryTopic {
  const found = inquiryTopics.find((topic) => topic.id === id);
  // The id is a member of the union, so the registry is missing an entry.
  if (!found) throw new Error(`Unknown inquiry topic: ${id}`);
  return found;
}

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

/* Destinations live in `./routes`, which owns every cross-page path. */

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
