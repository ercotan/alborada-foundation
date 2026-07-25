/**
 * Guards on the sticky header.
 *
 * Sticky positioning is quietly fragile: an ancestor that clips its overflow,
 * or a missing z-index, turns it back into a bar that scrolls away — and it
 * still looks correct in a screenshot of the top of the page. These tests pin
 * the properties the behaviour actually depends on, including the ones that
 * live outside this component.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { headerNavLinks } from "../../data/homepage";
import { DONATION_SECTION_ID } from "../../data/routes";
import { Header } from "./Header";

const readSource = (relative: string) =>
  readFileSync(join(process.cwd(), relative), "utf8");

const headerEl = () => screen.getByRole("banner");

/** Moves the window and fires the scroll event the hook listens for. */
function scrollTo(y: number) {
  act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event("scroll"));
  });
}

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  window.scrollY = 0;
});

afterEach(() => {
  vi.restoreAllMocks();
  window.scrollY = 0;
});

describe("sticky positioning", () => {
  it("is sticky, pinned to the top", () => {
    render(<Header />);
    expect(headerEl().className).toContain("sticky");
    expect(headerEl().className).toContain("top-0");
  });

  it("sits above the page content", () => {
    render(<Header />);
    const z = headerEl().className.match(/\bz-(\d+)\b/);
    expect(z, "the header needs an explicit z-index").not.toBeNull();
    // The hero's own layers go up to z-20.
    expect(Number(z![1])).toBeGreaterThan(20);
  });

  it("takes its height from the shared variable", () => {
    render(<Header />);
    expect(headerEl().className).toContain("h-[var(--header-height)]");
  });

  it("spans the full width", () => {
    render(<Header />);
    expect(headerEl().className).toContain("w-full");
  });
});

describe("the ancestors that sticky depends on", () => {
  it("no wrapper clips horizontal overflow, which would break sticky", () => {
    // `overflow-x: hidden` on a div makes it a scroll container; the header
    // would stick to that container, which never scrolls.
    //
    // Read from the class attributes rather than the file text, so a comment
    // that merely mentions the utility does not register as using it.
    const appliedClasses = (source: string) =>
      [...source.matchAll(/className="([^"]*)"/g)]
        .map((match) => match[1])
        .join(" ");

    expect(appliedClasses(readSource("src/App.tsx"))).not.toContain(
      "overflow-x-hidden",
    );
    expect(
      appliedClasses(readSource("src/components/Homepage.tsx")),
    ).not.toContain("overflow-x-hidden");
  });

  it("horizontal overflow is still guarded, on the root element", () => {
    const css = readSource("src/index.css");
    expect(css).toMatch(/html\s*\{[^}]*overflow-x:\s*hidden/);
  });

  it("is rendered once, at page level, not inside the hero", () => {
    const homepage = readSource("src/components/Homepage.tsx");
    const hero = readSource("src/components/sections/HeroSection.tsx");

    expect(homepage).toMatch(/<Header \/>/);
    expect(hero).not.toMatch(/<Header/);
    // Exactly one occurrence, so no second bar is introduced.
    expect(homepage.match(/<Header \/>/g)).toHaveLength(1);
  });

  it("the hero is pulled up by the header's height, so it starts at the top", () => {
    expect(readSource("src/components/sections/HeroSection.tsx")).toContain(
      "-mt-[var(--header-height)]",
    );
  });
});

describe("anchor targets clear the header", () => {
  it("sections reserve scroll margin equal to the header height", () => {
    const css = readSource("src/index.css");
    expect(css).toMatch(
      /section\[id\]\s*\{[^}]*scroll-margin-top:\s*var\(--header-height\)/,
    );
  });

  it("the header height is defined once", () => {
    const css = readSource("src/index.css");
    expect(css).toMatch(/--header-height:\s*[\d.]+rem/);
  });
});

describe("scroll state", () => {
  it("is transparent at the top of the page", () => {
    render(<Header />);
    expect(headerEl().className).toContain("bg-transparent");
    expect(headerEl().className).not.toContain("backdrop-blur");
  });

  it("becomes translucent navy with a blur once scrolled", () => {
    render(<Header />);
    scrollTo(200);

    const className = headerEl().className;
    expect(className).toContain("bg-navy-950/80");
    expect(className).toContain("backdrop-blur-md");
    expect(className).toContain("border-white/5");
  });

  it("introduces no white background", () => {
    render(<Header />);
    scrollTo(200);
    expect(headerEl().className).not.toMatch(/bg-white(?![/\w-])/);
  });

  it("returns to transparent when scrolled back to the top", () => {
    render(<Header />);
    scrollTo(200);
    expect(headerEl().className).toContain("bg-navy-950/80");

    scrollTo(0);
    expect(headerEl().className).toContain("bg-transparent");
  });

  it("keeps the border in the box while transparent, so nothing shifts", () => {
    render(<Header />);
    expect(headerEl().className).toContain("border-b");
    expect(headerEl().className).toContain("border-transparent");
  });

  it("respects a reduced-motion preference", () => {
    render(<Header />);
    expect(headerEl().className).toContain("motion-reduce:transition-none");
  });

  it("does not steal focus when the state changes", () => {
    render(<Header />);
    const unirse = screen.getByRole("button", { name: /unirse/i });
    unirse.focus();

    scrollTo(200);
    expect(unirse).toHaveFocus();
  });
});

describe("layout and navigation are unchanged", () => {
  it("keeps the logo left, the nav centred and Unirse right", () => {
    render(<Header />);
    expect(headerEl().className).toContain("justify-between");

    const children = [...headerEl().children];
    expect(children[0]).toHaveTextContent("ALBORADA");
    expect(children[1]!.tagName).toBe("NAV");
    expect(children[2]).toHaveTextContent("Unirse");
  });

  it("keeps Donar immediately after Contacto", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    const labels = [...nav.children].map((el) =>
      (el.getAttribute("aria-label") ?? el.textContent ?? "").trim(),
    );

    expect(labels.at(-2)).toBe("Contacto");
    expect(labels.at(-1)).toBe("Donar");
  });

  it("leaves the donation link pointing where it did", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Donar" })).toHaveAttribute(
      "href",
      `/#${DONATION_SECTION_ID}`,
    );
  });

  it("keeps every navigation item", () => {
    render(<Header />);
    for (const link of headerNavLinks) {
      expect(
        screen.getByRole("button", { name: link.label }),
      ).toBeInTheDocument();
    }
  });
});

describe("responsive behaviour", () => {
  it("keeps the desktop menu off narrow screens rather than cramming it in", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    expect(nav.className).toContain("hidden");
    expect(nav.className).toContain("lg:flex");
  });

  it("keeps the brand and Unirse reachable at every width", () => {
    // These are the only controls a narrow viewport shows, so neither may
    // carry a responsive hide.
    render(<Header />);
    const brand = screen.getByRole("button", { name: /ALBORADA/ });
    const unirse = screen.getByRole("button", { name: /unirse/i });

    for (const el of [brand, unirse]) {
      expect(el.className).not.toMatch(/(^|\s)hidden(\s|$)/);
    }
  });

  it("cannot push the page sideways", () => {
    render(<Header />);
    expect(headerEl().className).toContain("w-full");
    expect(headerEl().className).not.toMatch(/\bw-screen\b/);
  });
});
