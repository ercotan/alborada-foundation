/**
 * Types and interfaces for the Alborada Cinematic Experience
 */

export type AppView = "cinema" | "homepage";

export interface CinematicState {
  progress: number; // 0 to 1
  isPlaying: boolean;
  speed: number;    // 0.5, 1, 2
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
