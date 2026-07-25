import React from "react";
import { FooterSection } from "./layout/FooterSection";
import { Header } from "./layout/Header";
import { HashScrollOnLoad } from "./shared/HashScrollOnLoad";
import {
  AlliancesSection,
  CampusSection,
  CohortSection,
  ContactSection,
  DonationSection,
  HeraSection,
  HeroSection,
  ImpactSection,
  MissionSection,
  ModelSection,
  OrientationSection,
  PurposeSection,
  SustainabilitySection,
  TimelineSection,
  TransparencySection,
  VisionSection,
} from "./sections";

export const Homepage: React.FC = () => (
  // No `overflow-x-hidden` here: it would make this a scroll container and the
  // sticky header would stop sticking. The guard lives on `html` in index.css.
  <div className="min-h-screen bg-[#020712] text-white selection:bg-[#d4af37]/30">
    <HashScrollOnLoad />
    <Header />
    <HeroSection />
    <PurposeSection />
    <MissionSection />
    <VisionSection />
    <ModelSection />
    <CohortSection />
    <CampusSection />
    <HeraSection />
    <SustainabilitySection />
    <ImpactSection />
    <TimelineSection />
    <TransparencySection />
    <DonationSection />
    <AlliancesSection />
    <ContactSection />
    <OrientationSection />
    <FooterSection />
  </div>
);
