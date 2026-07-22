/**
 * Guards on the child protection page.
 *
 * These assert the promises the foundation may and may not make, and that
 * emergency guidance is present before anything else.
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { emergencyLines } from "../data/childProtection";
import { ChildProtectionPage } from "./ChildProtectionPage";

const pageText = () => {
  const { container } = render(<ChildProtectionPage />);
  return container.textContent ?? "";
};

describe("ChildProtectionPage", () => {
  it("tells the reader they are in the right place", () => {
    render(<ChildProtectionPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /lugar correcto/i }),
    ).toBeInTheDocument();
  });

  it("directs to emergency services before anything else", () => {
    const text = pageText();
    const emergency = text.indexOf("llame primero");
    const form = text.indexOf("Preparar el reporte");
    expect(emergency).toBeGreaterThan(-1);
    expect(form).toBeGreaterThan(-1);
    expect(emergency).toBeLessThan(form);
  });

  it("states plainly that it is not an emergency service", () => {
    expect(pageText()).toMatch(/no es un servicio de emergencia/i);
  });

  it("promises no rescue, intervention or legal representation", () => {
    const text = pageText();
    expect(text).toMatch(/no realizamos rescates/i);
    expect(text).toMatch(/no ofrecemos representación legal/i);
    expect(text).toMatch(/no garantizamos un resultado/i);
    expect(text).not.toMatch(/le garantizamos/i);
    expect(text).not.toMatch(/rescataremos/i);
    expect(text).not.toMatch(/intervendremos/i);
  });

  it("states the actual scope: review, evaluate, guide, coordinate", () => {
    const text = pageText();
    expect(text).toMatch(/revisa la información/i);
    expect(text).toMatch(/evalúa la situación/i);
    expect(text).toMatch(/coordina con las autoridades/i);
  });

  it("offers anonymity explicitly", () => {
    expect(pageText()).toMatch(/an[oó]nima/i);
  });

  it("renders the intake form", () => {
    const { container } = render(<ChildProtectionPage />);
    expect(container.querySelector("form")).not.toBeNull();
    expect(container.querySelector("textarea")).not.toBeNull();
  });

  it("publishes the confirmed emergency numbers", () => {
    // Confirmed correct for Colombia by the foundation, 22 July 2026.
    // If these change, they change in src/data/childProtection.ts only.
    const text = pageText();
    expect(text).toContain(emergencyLines.general.number);
    expect(text).toContain(emergencyLines.childProtection.number);
    expect(text).toContain(emergencyLines.country);
  });

  it("links back to the main site", () => {
    render(<ChildProtectionPage />);
    const hrefs = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href") ?? "");
    expect(hrefs).toContain("/");
  });
});
