/**
 * Guards on the public contact and collaboration entry points.
 *
 * The defect these replace: several controls were styled as calls to action
 * but went nowhere useful. Two were `mailto:` links, which do nothing at all —
 * no navigation, no error, no feedback — on a machine with no mail client
 * registered, so the page appeared frozen. One had a malformed query string.
 * The footer's contact column was plain text under a "Contacto" heading.
 *
 * Each test below names a destination from the entry-point map. If one fails,
 * a visitor cannot reach that surface.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { collaborationPaths } from "../data/contact";
import {
  childProtectionEntry,
  footerContact,
  orientationRequest,
  primaryContact,
  specializedContacts,
} from "../data/homepage";
import { CHILD_PROTECTION_PATH, contactPageHref } from "../data/routes";
import { FooterSection } from "./layout/FooterSection";
import { ContactSection } from "./sections/ContactSection";
import { OrientationSection } from "./sections/OrientationSection";

beforeAll(() => {
  // jsdom implements no scrolling. The in-page navigation is exercised for
  // behaviour, not for the scroll itself.
  Element.prototype.scrollIntoView = vi.fn();
});

const linkHrefs = () =>
  screen.getAllByRole("link").map((a) => a.getAttribute("href") ?? "");

describe("collaboration cards reach the form with their category", () => {
  for (const path of collaborationPaths) {
    it(`"${path.audience}" opens the form as ${path.category}`, () => {
      render(<ContactSection />);
      expect(
        screen.getByRole("link", { name: new RegExp(path.audience, "i") }),
      ).toHaveAttribute("href", contactPageHref(path.category));
    });
  }

  it("the whole card is the link, not only its icon or heading", () => {
    render(<ContactSection />);
    for (const path of collaborationPaths) {
      const link = screen.getByRole("link", {
        name: new RegExp(path.audience, "i"),
      });
      // Heading and description both live inside the anchor.
      expect(link.textContent).toContain(path.audience);
      expect(link.textContent).toContain(path.text);
    }
  });

  it("uses no mailto for any collaboration card", () => {
    render(<ContactSection />);
    for (const path of collaborationPaths) {
      const href = screen
        .getByRole("link", { name: new RegExp(path.audience, "i") })
        .getAttribute("href");
      expect(href).not.toMatch(/^mailto:/);
    }
  });
});

describe("general institutional contact", () => {
  it("opens the enquiry form rather than a mail client", () => {
    render(<ContactSection />);
    const cta = screen.getByRole("link", { name: /escribir a la fundación/i });
    expect(cta).toHaveAttribute("href", contactPageHref("general"));
  });

  it("still publishes the address as a direct channel", () => {
    render(<ContactSection />);
    expect(linkHrefs()).toContain(`mailto:${primaryContact.email}`);
  });
});

describe("guidance centre", () => {
  it("opens the enquiry form with the orientation category", () => {
    render(<OrientationSection />);
    expect(
      screen.getByRole("link", {
        name: new RegExp(orientationRequest.action, "i"),
      }),
    ).toHaveAttribute("href", contactPageHref("orientacion"));
  });

  it("writes a destination that is a valid URL", () => {
    render(<OrientationSection />);
    for (const href of linkHrefs()) {
      // The previous href contained a raw space and an unescaped "ó".
      expect(href).not.toMatch(/\s/);
      expect(
        () => new URL(href, "https://alboradafoundation.org"),
      ).not.toThrow();
    }
  });
});

describe("child protection", () => {
  it("opens the dedicated protection page", () => {
    render(<OrientationSection />);
    expect(
      screen.getByRole("link", {
        name: new RegExp(childProtectionEntry.action, "i"),
      }),
    ).toHaveAttribute("href", CHILD_PROTECTION_PATH);
  });

  it("does not route the protection entry through the enquiry form", () => {
    // The two intakes are separate processing classes (ADR-0004 §D1/§D6).
    render(<OrientationSection />);
    expect(
      screen
        .getByRole("link", {
          name: new RegExp(childProtectionEntry.action, "i"),
        })
        .getAttribute("href"),
    ).not.toContain("categoria");
  });
});

describe("press and legal correspondence", () => {
  it("publishes a reachable press destination", () => {
    render(<ContactSection />);
    const press = specializedContacts.find((c) => c.email.startsWith("prensa"));
    expect(press, "a press mailbox must be published").toBeDefined();
    expect(linkHrefs()).toContain(`mailto:${press!.email}`);
  });

  it("publishes a reachable legal destination", () => {
    render(<ContactSection />);
    const legal = specializedContacts.find((c) =>
      c.email.startsWith("judiciales"),
    );
    expect(legal, "a legal mailbox must be published").toBeDefined();
    expect(linkHrefs()).toContain(`mailto:${legal!.email}`);
  });
});

describe("footer contact column", () => {
  it("links the published address instead of printing it as text", () => {
    render(<FooterSection />);
    expect(
      screen.getByRole("link", { name: primaryContact.email }),
    ).toHaveAttribute("href", `mailto:${primaryContact.email}`);
  });

  it("offers a route into the enquiry form", () => {
    render(<FooterSection />);
    expect(
      screen.getByRole("link", { name: footerContact.formLabel }),
    ).toHaveAttribute("href", contactPageHref("general"));
  });
});

describe("no entry point is inert", () => {
  const surfaces = [
    ["ContactSection", <ContactSection key="c" />],
    ["OrientationSection", <OrientationSection key="o" />],
    ["FooterSection", <FooterSection key="f" />],
  ] as const;

  for (const [name, element] of surfaces) {
    it(`${name}: every link has a real destination`, () => {
      render(element);
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);

      for (const link of links) {
        const href = link.getAttribute("href");
        expect(href, `${name}: a link is missing its href`).toBeTruthy();
        expect(href).not.toBe("#");
        expect(href).not.toMatch(/^javascript:/i);
      }
    });

    it(`${name}: every link has an accessible name`, () => {
      render(element);
      for (const link of screen.getAllByRole("link")) {
        expect(
          link.textContent?.trim() || link.getAttribute("aria-label"),
        ).toBeTruthy();
      }
    });
  }

  it("in-page navigation buttons actually move the visitor", async () => {
    const user = userEvent.setup();
    render(
      <>
        <FooterSection />
        <div id="contact">Contacto</div>
      </>,
    );

    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    scrollIntoView.mockClear();

    await user.click(screen.getByRole("button", { name: /^contacto$/i }));
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it("in-page navigation buttons read as clickable and cannot submit a form", () => {
    // Tailwind v4's Preflight does not restore `cursor: pointer` on <button>,
    // so without the utility these controls give no click affordance at all.
    render(<FooterSection />);
    for (const button of screen.getAllByRole("button")) {
      expect(button.className).toContain("cursor-pointer");
      expect(button).toHaveAttribute("type", "button");
    }
  });
});
