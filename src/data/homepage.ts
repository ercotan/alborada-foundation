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

import type {
  CampusNode,
  ContactInterest,
  DonationTier,
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

export const visionStats: StatHighlight[] = [
  { value: "100%", label: "Becas integrales" },
  { value: "1:1", label: "Mentoría personalizada" },
  { value: "24/7", label: "Acompañamiento" },
  { value: "∞", label: "Compromiso de largo plazo" },
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
      "Programación y pensamiento computacional",
      "Uso responsable de modelos de inteligencia artificial",
      "Investigación y análisis de datos",
      "Creación de soluciones tecnológicas",
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
      "Contabilidad y administración",
      "Tecnologías financieras y blockchain",
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
  "Mentoría educativa personalizada",
  "Memoria institucional y académica",
  "Investigación asistida",
  "Seguimiento del aprendizaje",
  "Apoyo a la gestión del campus",
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

export const impactStats: ImpactStat[] = [
  {
    value: "15",
    label: "Niñas fundadoras",
    text: "La primera generación del modelo Alborada.",
  },
  {
    value: "100%",
    label: "Becas integrales",
    text: "Educación, residencia, alimentación, bienestar y tecnología.",
  },
  {
    value: "24/7",
    label: "Ecosistema formativo",
    text: "Aprendizaje y acompañamiento dentro de un entorno residencial.",
  },
  {
    value: "10+",
    label: "Años de formación",
    text: "Un proceso de largo plazo hasta la consolidación profesional.",
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
    category: "DESARROLLO HUMANO",
    title: "Sponsor de Educación Élite",
    text: "Aporte destinado al fondo de becas completas de las niñas, cubriendo mentorías internacionales, licencias especializadas de cómputo y tutorías bilingües de alta exigencia.",
  },
  {
    id: "library",
    category: "CAMPUS ACADÉMICO",
    title: "Construir la Biblioteca",
    text: "Aporte enfocado en la adquisición de textos históricos de filosofía, astrofísica, historia universal y el mobiliario bioclimático óptimo para el puesto de lectura profunda de las líderes.",
  },
  {
    id: "ailab",
    category: "TECNOLOGÍA COGNITIVA",
    title: "Equipar Laboratorio IA",
    text: "Sustenta la compra de servidores dedicados de cómputo local de baja radiación y periféricos ergonómicos para la programación de algoritmos neuronales por parte de la cohorte.",
  },
  {
    id: "residence",
    category: "PROTECCIÓN VITAL",
    title: "Sostener la Residencia",
    text: "Aporte directo a la alimentación de alta densidad nutricional de las niñas, vestimenta institucional y el cuidado psicoterapéutico preventivo diario 24/7.",
  },
  {
    id: "sustainability",
    category: "SOBERANÍA AMBIENTAL",
    title: "Fomentar Granja Bio",
    text: "Inversión en colmenas apícolas, optimización de hidropónicos IoT, compra de semillas orgánicas para cacao y moringa, y la expansión fotovoltaica del campus de la fundación.",
    cardClassName: "col-span-1 md:col-span-2 lg:col-span-1",
  },
];

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

/* -------------------------------------------------------------------------- */
/* Guidance centre                                                             */
/* -------------------------------------------------------------------------- */

export const orientationTopics: TopicCard[] = [
  {
    title: "Finanzas personales",
    text: "Organizá tus ingresos, deudas, ahorro y decisiones económicas.",
  },
  {
    title: "Hábitos y disciplina",
    text: "Construí rutinas sostenibles para mejorar tu vida cotidiana.",
  },
  {
    title: "Emprendimiento",
    text: "Convertí una idea en un proyecto con dirección y estrategia.",
  },
  {
    title: "Proyecto de vida",
    text: "Definí prioridades, objetivos y un camino posible para avanzar.",
  },
  {
    title: "Educación y tecnología",
    text: "Encontrá herramientas para aprender, capacitarte y crecer.",
  },
  {
    title: "Otra situación",
    text: "Contanos qué estás atravesando y cómo podemos orientarte.",
  },
];
