import React from "react";
import { motion, useReducedMotion, type MotionProps } from "motion/react";
import {
  purposeIntro,
  purposePillars,
  purposeQuote,
} from "../../data/homepage";
import { GoldDivider } from "../ui/GoldDivider";
import { SectionEyebrow } from "../ui/SectionEyebrow";

/**
 * The argument for the foundation's existence, placed between the hero and
 * the mission.
 *
 * Composition note: the four blocks are presentational and deliberately not
 * interactive. They carry no hover background, translate or border change —
 * that vocabulary is reserved on this site for things you can click, and a
 * card that borrows it makes a promise it cannot keep. The only hover here is
 * a typographic flourish on the gold rule, which reads as emphasis rather
 * than affordance.
 */
export const PurposeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  /**
   * Reveal-on-scroll, or nothing at all.
   *
   * When the visitor has asked for less motion the props are omitted entirely
   * rather than given a zero duration, so no transform is ever applied and the
   * content is simply present.
   */
  const reveal = (delay = 0): MotionProps =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, ease: "easeOut", delay },
        };

  return (
    <section
      id="purpose"
      aria-labelledby="purpose-title"
      // Bridges the hero's near-black to the mission's surface, so the change
      // of section reads as one continuous descent from the sunrise.
      className="relative overflow-hidden bg-gradient-to-b from-[#020712] via-[#03060f] to-[#050a16] px-6 py-28 md:px-12"
    >
      {/* Abstract light, echoing the hero. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#d4af37]/[0.06] blur-[140px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div className="text-center" {...reveal()}>
          <SectionEyebrow>{purposeIntro.eyebrow}</SectionEyebrow>

          <h2
            id="purpose-title"
            className="mx-auto mt-7 max-w-3xl font-serif text-4xl font-light leading-tight md:text-6xl"
          >
            {purposeIntro.title}
          </h2>

          <GoldDivider className="mx-auto my-9 w-16" />

          <p className="mx-auto max-w-2xl font-serif text-xl font-light italic leading-relaxed text-white/80 md:text-2xl">
            {purposeIntro.lead}
          </p>
        </motion.div>

        <div className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {purposePillars.map((pillar, index) => (
            <motion.article
              key={pillar.ordinal}
              className="group"
              {...reveal(index * 0.08)}
            >
              <span
                aria-hidden="true"
                className="font-mono text-[11px] tracking-[0.3em] text-[#d4af37]/70"
              >
                {pillar.ordinal}
              </span>

              {/* Widens on hover: emphasis, not a click affordance. */}
              <div className="mt-4 h-px w-10 bg-[#d4af37]/30 transition-all duration-500 group-hover:w-20 group-hover:bg-[#d4af37]/60 motion-reduce:transition-none" />

              <h3 className="mt-6 font-serif text-2xl font-light md:text-3xl">
                {pillar.title}
              </h3>

              <p className="mt-5 text-sm leading-8 text-white/60 md:text-base">
                {pillar.text}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.figure className="mt-24" {...reveal(0.1)}>
          <blockquote className="mx-auto max-w-3xl border-l-2 border-[#d4af37]/40 pl-8 md:pl-10">
            <p className="font-serif text-2xl font-light italic leading-relaxed text-white/85 md:text-3xl">
              {purposeQuote.text}
            </p>
          </blockquote>

          <figcaption className="mx-auto mt-6 max-w-3xl pl-8 text-[10px] uppercase tracking-[0.32em] text-[#d4af37]/70 md:pl-10">
            {purposeQuote.attribution}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};
