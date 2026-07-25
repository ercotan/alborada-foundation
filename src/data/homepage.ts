/**
 * Editorial content of the homepage.
 *
 * Kept apart from the components so copy can be revised (or later sourced from
 * a CMS) without touching layout or styling.
 */

import {
  Award,
  BookOpen,
  Cpu,
  DollarSign,
  FileText,
  Globe,
  Heart,
  Landmark,
  Layers,
  Shield,
  Sprout,
  TrendingUp,
  Zap,
} from "lucide-react";

import type { InquiryCategoryId } from "./contact";
import { CHILD_PROTECTION_PATH } from "./routes";

import type {
  CampusNode,
  ContactInterest,
  DonationTier,
  InstitutionalContact,
  IconFeature,
  ImpactStat,
  ModelPillar,
  NavLink,
  StatHighlight,
  TimelineMilestone,
  TopicCard,
} from "../types";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const headerNavLinks: NavLink[] = [
  { targetId: "mission", label: "Misión" },
  { targetId: "model", label: "Modelo" },
  { targetId: "campus", label: "Campus" },
  { targetId: "alliances", label: "Alianzas" },
  { targetId: "contact", label: "Contacto" },
];

export const footerNavLinks: NavLink[] = [
  { targetId: "mission", label: "Misión" },
  { targetId: "model", label: "Modelo" },
  { targetId: "campus", label: "Campus" },
  { targetId: "contact", label: "Contacto" },
];

/* -------------------------------------------------------------------------- */
/* Mission                                                                     */
/* -------------------------------------------------------------------------- */

export const missionPillars: IconFeature[] = [
  {
    icon: Shield,
    title: "Protección integral",
    text: "Un entorno seguro, estable y organizado para crecer con dignidad.",
  },
  {
    icon: BookOpen,
    title: "Educación de excelencia",
    text: "Ciencia, humanidades, idiomas, tecnología, arte y pensamiento crítico.",
  },
  {
    icon: Award,
    title: "Liderazgo con propósito",
    text: "Disciplina, responsabilidad, servicio y capacidad para transformar.",
  },
];

/* -------------------------------------------------------------------------- */
/* Vision                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Planned characteristics of the programme. Presented under an explicit
 * "compromisos del programa" heading so none of it reads as a result already
 * achieved. Every value is either a commitment or a verifiable plan.
 */
export const visionStats: StatHighlight[] = [
  { value: "6", label: "Áreas de formación" },
  { value: "1:1", label: "Mentoría personalizada" },
  { value: "10-12", label: "Años de edad al ingresar" },
  { value: "2026", label: "Inicio previsto" },
];

/* -------------------------------------------------------------------------- */
/* Model                                                                       */
/* -------------------------------------------------------------------------- */

export const modelPillars: ModelPillar[] = [
  {
    id: "education",
    title: "Educación de excelencia",
    icon: BookOpen,
    text: "Formación académica rigurosa en ciencias, humanidades, idiomas, filosofía, historia, arte y pensamiento crítico.",
    points: [
      "Español, inglés y formación internacional",
      "Lógica, retórica y pensamiento crítico",
      "Ciencias, tecnología y humanidades",
      "Aprendizaje personalizado de largo plazo",
    ],
  },
  {
    id: "ai",
    title: "Inteligencia artificial",
    icon: Cpu,
    text: "La inteligencia artificial será una herramienta permanente para personalizar el aprendizaje, investigar, crear y acceder al conocimiento global.",
    points: [
      "Programación y pensamiento lógico",
      "Uso responsable de la inteligencia artificial",
      "Investigación y manejo de información",
      "Creación de proyectos con tecnología",
    ],
  },
  {
    id: "leadership",
    title: "Liderazgo y disciplina",
    icon: Shield,
    text: "El liderazgo se construye mediante el carácter, la responsabilidad, la disciplina, la comunicación y el servicio a los demás.",
    points: [
      "Oratoria y comunicación",
      "Disciplina personal",
      "Toma de decisiones",
      "Resolución de conflictos",
    ],
  },
  {
    id: "finance",
    title: "Finanzas y emprendimiento",
    icon: TrendingUp,
    text: "Las estudiantes aprenderán a comprender el dinero, crear empresas, administrar recursos y desarrollar proyectos sostenibles.",
    points: [
      "Educación financiera",
      "Emprendimiento",
      "Administración y organización de recursos",
      "Herramientas financieras digitales",
    ],
  },
  {
    id: "sustainability",
    title: "Sostenibilidad y producción",
    icon: Sprout,
    text: "La formación se conecta con la tierra, la producción de alimentos, la energía, el agua y la autosuficiencia del campus.",
    points: [
      "Agricultura y cultivos",
      "Granja avícola y apicultura",
      "Energía solar",
      "Gestión sostenible del agua",
    ],
  },
  {
    id: "character",
    title: "Desarrollo integral",
    icon: Award,
    text: "La educación de Alborada incluye salud, deporte, bienestar emocional, hábitos, cultura y construcción de una identidad sólida.",
    points: [
      "Acondicionamiento físico",
      "Salud emocional",
      "Nutrición y bienestar",
      "Arte, cultura y convivencia",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Cohort                                                                      */
/* -------------------------------------------------------------------------- */

export const cohortSafeguards: string[] = [
  "Privacidad absoluta de datos personales",
  "Entorno residencial seguro y supervisado",
  "Comunicación institucional responsable",
];

/* -------------------------------------------------------------------------- */
/* Campus                                                                      */
/* -------------------------------------------------------------------------- */

export const campusNodes: CampusNode[] = [
  {
    id: "school",
    title: "Escuela central",
    icon: BookOpen,
    text: "Aulas flexibles, salas de estudio, espacios de debate y ambientes diseñados para la concentración.",
  },
  {
    id: "ailab",
    title: "Laboratorio de IA",
    icon: Cpu,
    text: "Infraestructura tecnológica para programación, inteligencia artificial, investigación y creación digital.",
  },
  {
    id: "library",
    title: "Biblioteca",
    icon: Landmark,
    text: "Un centro de conocimiento con literatura, filosofía, historia, ciencia y recursos internacionales.",
  },
  {
    id: "residence",
    title: "Residencia",
    icon: Shield,
    text: "Un hogar seguro, digno y organizado para la convivencia, el descanso y la formación cotidiana.",
  },
  {
    id: "farm",
    title: "Granja Alborada",
    icon: Sprout,
    text: "Producción agrícola, aves, abejas, cacao, moringa, vainilla y formación práctica en sostenibilidad.",
  },
  {
    id: "energy",
    title: "Energía y agua",
    icon: Zap,
    text: "Sistemas solares, almacenamiento, captación y gestión responsable de los recursos naturales.",
  },
];

/* -------------------------------------------------------------------------- */
/* HERA                                                                        */
/* -------------------------------------------------------------------------- */

export const heraCapabilities: string[] = [
  "Apoyo personalizado a cada estudiante",
  "Ayuda en la investigación escolar",
  "Seguimiento del progreso académico",
  "Acceso a recursos educativos",
];

/* -------------------------------------------------------------------------- */
/* Sustainability                                                              */
/* -------------------------------------------------------------------------- */

export const sustainabilityPillars: IconFeature[] = [
  {
    icon: Sprout,
    title: "Agricultura",
    text: "Cacao, moringa, vainilla y cultivos.",
  },
  {
    icon: Heart,
    title: "Granja",
    text: "Aves, abejas y producción responsable.",
  },
  {
    icon: Zap,
    title: "Energía",
    text: "Sistemas solares y autonomía energética.",
  },
  {
    icon: Layers,
    title: "Agua",
    text: "Reservas, tratamiento y uso eficiente.",
  },
];

/* -------------------------------------------------------------------------- */
/* Impact                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Commitments of the programme, not results. The programme has not started,
 * so every entry is written as something the foundation undertakes to do.
 */
export const impactStats: ImpactStat[] = [
  {
    value: "15",
    label: "Niñas en la primera cohorte",
    text: "Grupo inicial previsto para comenzar el programa.",
  },
  {
    value: "100%",
    label: "Becas integrales",
    text: "Compromiso del modelo: educación, residencia, alimentación, bienestar y tecnología, sin costo para las familias.",
  },
  {
    value: "10+",
    label: "Años de acompañamiento",
    text: "Un proceso sostenido y continuo hasta la formación profesional.",
  },
];

/* -------------------------------------------------------------------------- */
/* Timeline                                                                    */
/* -------------------------------------------------------------------------- */

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2026",
    title: "Fundación y primera cohorte",
    text: "Consolidación institucional, selección inicial y puesta en marcha del programa.",
  },
  {
    year: "2027",
    title: "Campus inicial",
    text: "Inicio de la infraestructura educativa, residencial y productiva.",
  },
  {
    year: "2028",
    title: "Laboratorio de inteligencia artificial",
    text: "Desarrollo de herramientas de aprendizaje personalizado y formación tecnológica.",
  },
  {
    year: "2030",
    title: "Expansión sostenible",
    text: "Ampliación del campus, energía solar, producción agrícola y nuevos espacios académicos.",
  },
  {
    year: "2035",
    title: "Primera generación de líderes",
    text: "Las primeras estudiantes avanzan hacia universidades, empresas y proyectos propios.",
  },
  {
    year: "2040+",
    title: "Modelo internacional",
    text: "Replicación de la experiencia Alborada en nuevos territorios y alianzas globales.",
  },
];

/* -------------------------------------------------------------------------- */
/* Transparency                                                                */
/* -------------------------------------------------------------------------- */

export const transparencyPillars: IconFeature[] = [
  {
    icon: Landmark,
    title: "Gobernanza",
    text: "Estructura institucional, responsabilidades y toma de decisiones.",
  },
  {
    icon: DollarSign,
    title: "Uso de recursos",
    text: "Seguimiento de donaciones, presupuestos y ejecución de proyectos.",
  },
  {
    icon: Layers,
    title: "Avance del campus",
    text: "Informes, etapas de construcción y evolución de la infraestructura.",
  },
  {
    icon: BookOpen,
    title: "Resultados educativos",
    text: "Indicadores institucionales sin exponer información privada de las niñas.",
  },
  {
    icon: Globe,
    title: "Alianzas",
    text: "Convenios, cooperación, apoyo académico y tecnológico.",
  },
  {
    icon: FileText,
    title: "Informes",
    text: "Documentos institucionales, balances y reportes públicos.",
  },
];

/* -------------------------------------------------------------------------- */
/* Donations                                                                   */
/* -------------------------------------------------------------------------- */

export const donationTiers: DonationTier[] = [
  {
    id: "education",
    topic: "becas-y-estudio",
    category: "Educación",
    title: "Becas y estudio",
    text: "Contribuye al fondo de becas: materiales, tutorías y acompañamiento académico de las estudiantes.",
  },
  {
    id: "library",
    topic: "biblioteca",
    category: "Campus",
    title: "Biblioteca",
    text: "Contribuye a los libros y al espacio de lectura y estudio del campus.",
  },
  {
    id: "ailab",
    topic: "aula-de-tecnologia",
    category: "Tecnología",
    title: "Aula de tecnología",
    text: "Contribuye a los equipos con los que las estudiantes aprenderán programación y uso responsable de la tecnología.",
  },
  {
    id: "residence",
    topic: "residencia-y-cuidado",
    category: "Bienestar",
    title: "Residencia y cuidado",
    text: "Contribuye a la alimentación, el alojamiento y el acompañamiento diario de las estudiantes.",
  },
  {
    id: "sustainability",
    topic: "huerta-y-granja",
    category: "Sostenibilidad",
    title: "Huerta y granja",
    text: "Contribuye a los cultivos, la producción de alimentos y el aprendizaje práctico en sostenibilidad.",
    cardClassName: "col-span-1 md:col-span-2 lg:col-span-1",
  },
];

/**
 * Copy around the PayPal hosted button.
 *
 * Every line here is a claim the foundation can stand behind. It states who
 * receives the money, who processes it, and what the donation is *not*: it is
 * not earmarked, not recurring, not a sponsorship, and carries no statement
 * about tax treatment, because none of those exist.
 */
export const paypalDonation = {
  eyebrow: "Donar en línea",
  title: "Donación a través de PayPal",
  /** Amount and payment methods are PayPal's to decide, not the site's. */
  intro:
    "El monto lo elige usted, en dólares estadounidenses (USD). PayPal muestra los métodos de pago disponibles para su dispositivo y su región.",
  disclosure:
    "Las donaciones son procesadas de forma segura por PayPal y recibidas por la Fundación Unidos por un Acuerdo Social — FUNUDOS, entidad que administra el Proyecto Fundación Alborada.",
  /** Keeps the donate-now control distinct from the thematic enquiry cards. */
  earmarkNote:
    "La donación en línea es un aporte general al proyecto y no se asigna automáticamente a un área determinada. Si desea orientar su aporte a un área concreta, escríbanos desde la tarjeta correspondiente.",
  privacyNote:
    "Al abrir esta sección, su navegador se comunica con PayPal para mostrar el botón. Fundación Alborada no recibe ni conserva los datos de su medio de pago.",
  loading: "Cargando el botón de donación de PayPal…",
  unavailable:
    "No fue posible cargar el botón de PayPal en esta página. Puede abrir la página segura de donación directamente.",
  fallbackLabel: "Abrir la página segura de donación en PayPal",
} as const;

/* -------------------------------------------------------------------------- */
/* Alliances                                                                   */
/* -------------------------------------------------------------------------- */

export const allianceCategories: string[] = [
  "Universidades",
  "Tecnología",
  "Gobiernos",
  "Fundaciones",
];

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contactInterests: ContactInterest[] = [
  { value: "alliance", label: "Alianza institucional" },
  { value: "donation", label: "Donación" },
  { value: "academic", label: "Cooperación académica" },
  { value: "technology", label: "Tecnología" },
  { value: "press", label: "Prensa" },
];

/**
 * Primary institutional mailbox. Anyone unsure where to write should use this
 * one, so it carries the strongest emphasis in the Contact section.
 */
export const primaryContact: InstitutionalContact = {
  email: "contacto@alboradafoundation.org",
  purpose: "Contacto general con la fundación.",
};

/**
 * Direct mailboxes for correspondence that should reach a specific desk.
 * Secondary to `primaryContact` — they route faster, they do not replace it.
 */
export const specializedContacts: InstitutionalContact[] = [
  {
    email: "alianzas@alboradafoundation.org",
    purpose:
      "Alianzas institucionales, universidades, empresas y entidades públicas.",
  },
  {
    email: "prensa@alboradafoundation.org",
    purpose: "Medios de comunicación, entrevistas y prensa.",
  },
  {
    email: "judiciales@alboradafoundation.org",
    purpose: "Correspondencia legal y notificaciones oficiales.",
  },
  {
    email: "info@alboradafoundation.org",
    purpose: "Información general y consultas.",
  },
];

/* -------------------------------------------------------------------------- */
/* Guidance centre                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The call to action that closes the guidance section.
 *
 * It opens the institutional enquiry form with the orientation category
 * preselected. There is no separate orientation service or page:
 * `engineering/ADR-0004` §D1 treats orientation as a Class A category of the
 * general intake, routed by mailbox.
 */
export const orientationRequest: {
  action: string;
  category: InquiryCategoryId;
} = {
  action: "Solicitar orientación",
  category: "orientacion",
};

export const orientationTopics: TopicCard[] = [
  {
    title: "Finanzas personales",
    topic: "finanzas-personales",
    text: "Organizá tus ingresos, deudas, ahorro y decisiones económicas.",
  },
  {
    title: "Hábitos y disciplina",
    topic: "habitos-y-disciplina",
    text: "Construí rutinas sostenibles para mejorar tu vida cotidiana.",
  },
  {
    title: "Emprendimiento",
    topic: "emprendimiento",
    text: "Convertí una idea en un proyecto con dirección y estrategia.",
  },
  {
    title: "Proyecto de vida",
    topic: "proyecto-de-vida",
    text: "Definí prioridades, objetivos y un camino posible para avanzar.",
  },
  {
    title: "Educación y tecnología",
    topic: "educacion-y-tecnologia",
    text: "Encontrá herramientas para aprender, capacitarte y crecer.",
  },
];

/* -------------------------------------------------------------------------- */
/* Child protection entry point                                               */
/* -------------------------------------------------------------------------- */

/**
 * The foundation's primary mission is the protection and education of
 * children, so this is not one card among others: it is a distinct entry
 * point, presented above the guidance topics and linking to its own page.
 */
export const childProtectionEntry = {
  eyebrow: "Protección infantil",
  title: "¿Un niño o una niña necesita ayuda?",
  text: "Si un niño, niña o adolescente está atravesando una situación de violencia, abandono, abuso, explotación, negligencia o cualquier otra condición de vulnerabilidad, podés comunicarte con Fundación Alborada para recibir orientación sobre cómo actuar y cómo iniciar el proceso de ayuda.",
  action: "Necesito ayuda para un niño",
  href: CHILD_PROTECTION_PATH,
} as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The footer's contact column. The address itself comes from
 * `primaryContact`, so it is published in one place only.
 */
export const footerContact = {
  /** Opens the enquiry form; the mailbox below is the fallback channel. */
  formLabel: "Escribir a la fundación",
  site: "alboradafoundation.org",
  location: "Colombia",
} as const;
