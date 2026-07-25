/**
 * Types and interfaces for the Alborada Cinematic Experience
 */

import type { LucideIcon } from "lucide-react";
import type { InquiryTopicId } from "./data/contact";

export type AppView = "cinema" | "homepage";

export interface CinematicState {
  progress: number; // 0 to 1
  isPlaying: boolean;
  speed: number; // 0.5, 1, 2
  isMuted: boolean;
  cameraDolly: boolean;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  angle: number;
}

export interface MistCloud {
  x: number;
  y: number;
  radius: number;
  vx: number;
  alpha: number;
  color: string;
}

export interface FoundationPillar {
  id: string;
  title: string;
  description: string;
  quote: string;
  details: string[];
}

export interface Initiative {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  stats: string;
}

/* -------------------------------------------------------------------------- */
/* Homepage content                                                            */
/* -------------------------------------------------------------------------- */

/** One of the six pillars of the Alborada education model. */
export interface ModelPillar {
  id: string;
  title: string;
  icon: LucideIcon;
  text: string;
  points: string[];
}

/** A selectable area of the campus master plan. */
export interface CampusNode {
  id: string;
  title: string;
  icon: LucideIcon;
  text: string;
}

/** Icon + title + copy card, reused across several sections. */
export interface IconFeature {
  icon: LucideIcon;
  title: string;
  text: string;
}

/** Large figure with a caption (impact grid). */
export interface ImpactStat {
  value: string;
  label: string;
  text: string;
}

/** Compact figure + caption pair (vision grid). */
export interface StatHighlight {
  value: string;
  label: string;
}

/** A dated milestone on the roadmap. */
export interface TimelineMilestone {
  year: string;
  title: string;
  text: string;
}

/**
 * Title + copy card (guidance topics).
 *
 * `topic` makes the card a destination rather than decoration: it is the
 * subject the enquiry form opens with when the card is clicked.
 */
export interface TopicCard {
  title: string;
  text: string;
  topic: InquiryTopicId;
}

/** Entry of the header / footer in-page navigation. */
export interface NavLink {
  targetId: string;
  label: string;
}

/** Option of the contact form's interest selector. */
export interface ContactInterest {
  value: string;
  label: string;
}

/**
 * A published institutional mailbox.
 *
 * Every address the foundation publishes is declared here, so the set can be
 * verified in one place rather than discovered across components.
 */
export interface InstitutionalContact {
  /** Full address, without the `mailto:` scheme. */
  email: string;
  /** What this mailbox is for, in one line. */
  purpose: string;
}

/**
 * A support area card in the Donations section.
 *
 * Describes *where* support is needed. It deliberately carries no amount,
 * goal, progress or funding figure: the foundation publishes no financial
 * metric until it has been officially verified.
 */
export interface DonationTier {
  id: string;
  /** Small uppercase category label above the title. */
  category: string;
  title: string;
  text: string;
  /**
   * Subject the enquiry form opens with. The card asks how to help with this
   * area; it starts no payment, because the site processes none.
   */
  topic: InquiryTopicId;
  /** Extra grid-span utilities applied to this card only. */
  cardClassName?: string;
}
