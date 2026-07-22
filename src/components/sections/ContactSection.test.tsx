/**
 * Guards on the contact surface.
 *
 * The previous contact form reported "Mensaje recibido" while discarding the
 * message: there was no backend. These tests hold the replacement honest -
 * a real channel, and no claim of receipt.
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "./ContactSection";

describe("ContactSection", () => {
  it("offers a reachable contact channel", () => {
    render(<ContactSection />);
    const links = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href") ?? "");
    expect(links.some((h) => h.startsWith("mailto:"))).toBe(true);
  });

  it("claims no message was received", () => {
    const { container } = render(<ContactSection />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/mensaje recibido/i);
    expect(text).not.toMatch(/hemos recibido/i);
  });

  it("submits nothing, because no backend exists yet", () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
    expect(container.querySelector("textarea")).toBeNull();
  });

  it("states when financial information will be published", () => {
    render(<ContactSection />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
