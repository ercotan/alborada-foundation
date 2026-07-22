/**
 * Guards on the child protection intake.
 *
 * The highest risk on this page is not a bug. It is telling a frightened
 * person that their report was received when it was not. These tests hold the
 * contract that prevents that.
 */

import { describe, expect, it } from "vitest";
import {
  emptyReport,
  formatReportForSending,
  prepareReport,
  validateReport,
  type ChildProtectionReport,
} from "./childProtection";

const valid: ChildProtectionReport = {
  ...emptyReport,
  country: "Colombia",
  immediateDanger: "no",
  description: "Un niño del barrio no asiste a la escuela desde hace meses.",
};

describe("validation", () => {
  it("accepts a fully anonymous report", () => {
    expect(validateReport(valid)).toEqual({});
    expect(valid.name).toBe("");
    expect(valid.email).toBe("");
    expect(valid.phone).toBe("");
  });

  it("requires country, danger assessment and a description", () => {
    const errors = validateReport(emptyReport);
    expect(errors.country).toBeDefined();
    expect(errors.immediateDanger).toBeDefined();
    expect(errors.description).toBeDefined();
  });

  it("never requires identifying information", () => {
    const errors = validateReport(valid);
    expect(errors.name).toBeUndefined();
    expect(errors.email).toBeUndefined();
    expect(errors.phone).toBeUndefined();
  });

  it("rejects a malformed email only when one was given", () => {
    expect(validateReport({ ...valid, email: "" }).email).toBeUndefined();
    expect(validateReport({ ...valid, email: "nope" }).email).toBeDefined();
  });
});

describe("preparation", () => {
  it("never reports the submission as transmitted", () => {
    // If this assertion is ever changed to true without a real endpoint
    // behind it, the page starts lying to people reporting a child at risk.
    expect(prepareReport(valid).transmitted).toBe(false);
  });

  it("assigns no case identifier, because no case exists yet", () => {
    const prepared = prepareReport(valid);
    expect(prepared).not.toHaveProperty("caseId");
    expect(prepared.text).not.toMatch(/caso\s*(n[°º]|#|id)/i);
  });

  it("includes the substance of the report in the formatted text", () => {
    const text = formatReportForSending(valid);
    expect(text).toContain("Colombia");
    expect(text).toContain(valid.description);
    expect(text).toContain("No corre peligro inmediato");
  });

  it("marks omitted personal fields as not provided rather than inventing them", () => {
    const text = formatReportForSending(valid);
    expect(text).toContain("Nombre: (no indicado)");
    expect(text).toContain("Correo: (no indicado)");
  });
});
