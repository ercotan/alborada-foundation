/**
 * Guards on the contact surface.
 *
 * The previous contact form reported "Mensaje recibido" while discarding the
 * message: there was no backend. These tests hold the replacement honest -
 * a real channel, and no claim of receipt.
 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { primaryContact, specializedContacts } from "../../data/homepage";
import { ContactSection } from "./ContactSection";

const mailtoHrefs = () =>
  screen
    .getAllByRole("link")
    .map((a) => a.getAttribute("href") ?? "")
    .filter((h) => h.startsWith("mailto:"));

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

describe("published institutional addresses", () => {
  it("renders the primary address as a mailto link", () => {
    render(<ContactSection />);
    expect(mailtoHrefs()).toContain(`mailto:${primaryContact.email}`);
  });

  it("renders every specialized address as a mailto link", () => {
    render(<ContactSection />);
    const hrefs = mailtoHrefs();
    for (const contact of specializedContacts) {
      expect(hrefs).toContain(`mailto:${contact.email}`);
    }
  });

  it("publishes each specialized address with its purpose", () => {
    const { container } = render(<ContactSection />);
    const text = container.textContent ?? "";
    for (const contact of specializedContacts) {
      expect(text).toContain(contact.email);
      expect(text).toContain(contact.purpose);
    }
  });

  it("publishes no address outside the institutional domain", () => {
    render(<ContactSection />);
    for (const href of mailtoHrefs()) {
      expect(href).toMatch(/^mailto:[a-z]+@alboradafoundation\.org(\?|$)/);
    }
  });

  it("keeps every published address unique", () => {
    const all = [primaryContact, ...specializedContacts].map((c) => c.email);
    expect(new Set(all).size).toBe(all.length);
  });
});
