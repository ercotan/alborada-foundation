/**
 * Guards on published content.
 *
 * These are not tests of behaviour. They are regression guards on
 * institutional commitments: the public site must not publish financial
 * figures that are not officially verified, and must not claim continuous
 * service the foundation does not yet operate.
 *
 * If one of these fails, the correct response is almost never to change the
 * test.
 */

import { describe, expect, it } from "vitest";
import {
  donationTiers,
  impactStats,
  visionStats,
  contactInterests,
  modelPillars,
} from "./homepage";

const FORBIDDEN_CLAIMS = [
  /\bfinanciado\b/i,
  /\bcompletado\b/i,
  /\btransacci[oó]n\b/i,
  /24\s*\/\s*7/,
];

describe("published copy: unverifiable figures", () => {
  it("donation areas carry no amount, goal or progress field", () => {
    for (const area of donationTiers) {
      expect(Object.keys(area).sort()).toEqual(
        expect.arrayContaining(["category", "id", "text", "title"]),
      );
      expect(area).not.toHaveProperty("progressLabel");
      expect(area).not.toHaveProperty("progressClass");
      expect(area).not.toHaveProperty("goalLabel");
      expect(area).not.toHaveProperty("defaultAmount");
      expect(area).not.toHaveProperty("amountUnit");
    }
  });

  it("donation copy states no funding percentage", () => {
    for (const area of donationTiers) {
      expect(`${area.title} ${area.text} ${area.category}`).not.toMatch(
        /\d+\s*%/,
      );
    }
  });
});

describe("published copy: forbidden claims", () => {
  const surfaces = [
    ...donationTiers.flatMap((a) => [a.title, a.text, a.category]),
    ...impactStats.flatMap((s) => [s.label, s.text, s.value]),
    ...visionStats.flatMap((s) => [s.label, s.value]),
    ...modelPillars.flatMap((p) => [p.title, p.text, ...p.points]),
  ];

  for (const pattern of FORBIDDEN_CLAIMS) {
    it(`no surface matches ${pattern}`, () => {
      const offenders = surfaces.filter((s) => pattern.test(s));
      expect(offenders).toEqual([]);
    });
  }
});

describe("published copy: commitments are framed as commitments", () => {
  it("impact figures describe the programme, not achieved results", () => {
    // The programme has not started. Every entry must read as an undertaking.
    expect(impactStats.length).toBeGreaterThan(0);
    const cohort = impactStats.find((s) => s.value === "15");
    expect(cohort, "the 15-student entry must exist").toBeDefined();
    expect(cohort!.label).not.toMatch(/fundadoras/i);
  });

  it("contact interests remain the single source of collaboration channels", () => {
    expect(contactInterests.map((i) => i.value)).toContain("donation");
    expect(contactInterests.length).toBeGreaterThanOrEqual(3);
  });
});
