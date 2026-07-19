import React from "react";
import { FooterSection } from "./layout/FooterSection";
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
  SustainabilitySection,
  TimelineSection,
  TransparencySection,
  VisionSection,
} from "./sections";

export const Homepage: React.FC = () => (
  <div className="min-h-screen overflow-x-hidden bg-[#020712] text-white selection:bg-[#d4af37]/30">
    <HeroSection />
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
