/**
 * Editorial content of the child protection page.
 *
 * Kept apart from the components, like the homepage copy, so wording can be
 * revised without touching layout. The wording here is deliberate: it must
 * reduce panic, describe what the foundation actually does, and promise
 * nothing it cannot deliver.
 */

export const PROTECTION_CONTACT_EMAIL = "contacto@alboradafoundation.org";

/** Situations a person can report. Written plainly, without euphemism. */
export const reportableSituations: string[] = [
  "Violencia física, psicológica o sexual",
  "Abandono o falta de cuidado",
  "Negligencia en alimentación, salud o educación",
  "Explotación laboral o económica",
  "Situación de calle o desprotección",
  "Cualquier otra condición de vulnerabilidad que preocupe",
];

/** What helps, if the person has it. None of it is required. */
export const usefulInformation: string[] = [
  "Dónde se encuentra el niño, la niña o el adolescente",
  "Su edad aproximada",
  "Qué está ocurriendo y desde cuándo",
  "Si hay una persona adulta responsable presente",
  "Si existe riesgo inmediato para su vida o integridad",
];

/**
 * The scope statement. This is the most important copy on the page and the
 * easiest to get wrong: it must not promise rescue, intervention or legal
 * representation.
 */
export const whatWeDo: string[] = [
  "Revisamos con atención la información que usted comparte.",
  "Evaluamos la situación descrita.",
  "Cuando corresponde, orientamos sobre cómo actuar y qué pasos seguir.",
  "Cuando corresponde, coordinamos con las autoridades y organizaciones competentes.",
];

export const whatWeDoNot: string[] = [
  "No somos un servicio de emergencia y no sustituimos a la policía ni a las líneas de protección.",
  "No realizamos rescates ni intervenciones directas.",
  "No ofrecemos representación legal.",
  "No garantizamos un resultado determinado.",
];

export const confidentialityPolicy: string[] = [
  "Puede escribir de forma anónima. No es necesario dar su nombre.",
  "La información se trata de manera reservada y con el cuidado que exige un caso que involucra a un menor de edad.",
  "Se comparte únicamente con las autoridades u organizaciones competentes cuando la situación lo requiere.",
  "No publicamos ni difundimos datos de un niño, una niña o un adolescente.",
];

export const responseProcess: { step: string; text: string }[] = [
  {
    step: "Recepción",
    text: "Su reporte llega al equipo de la fundación.",
  },
  {
    step: "Revisión",
    text: "Una persona lo lee y valora la situación descrita.",
  },
  {
    step: "Orientación",
    text: "Le respondemos con orientación sobre cómo actuar, si dejó un medio de contacto.",
  },
  {
    step: "Derivación",
    text: "Cuando corresponde, coordinamos con las autoridades u organizaciones competentes.",
  },
];
