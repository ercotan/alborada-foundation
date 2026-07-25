/**
 * Guards on the "¿Por qué existe Alborada?" section.
 *
 * Two kinds of thing are protected here. The structural ones — heading level,
 * placement, semantics — because they are what makes the section readable to a
 * screen reader and to a search engine, and neither shows up in a screenshot.
 * And the editorial ones: the programme has not started, so this section must
 * argue for why the foundation exists without claiming a result it has not
 * produced.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  purposeIntro,
  purposePillars,
  purposeQuote,
} from "../../data/homepage";
import { PurposeSection } from "./PurposeSection";

const readSource = (relative: string) =>
  readFileSync(join(process.cwd(), relative), "utf8");

describe("structure and semantics", () => {
  it("titles the section with an h2, not a second h1", () => {
    render(<PurposeSection />);
    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveTextContent(purposeIntro.title);
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });

  it("names the section by its own title for assistive technology", () => {
    const { container } = render(<PurposeSection />);
    const section = container.querySelector("section");

    expect(section).toHaveAttribute("aria-labelledby", "purpose-title");
    expect(screen.getByRole("heading", { level: 2 }).id).toBe("purpose-title");
  });

  it("gives every block an h3, one level below the section title", () => {
    render(<PurposeSection />);
    const headings = screen.getAllByRole("heading", { level: 3 });

    expect(headings).toHaveLength(purposePillars.length);
    expect(headings.map((h) => h.textContent)).toEqual(
      purposePillars.map((p) => p.title),
    );
  });

  it("renders the four movements of the argument, in order", () => {
    const { container } = render(<PurposeSection />);
    expect(purposePillars).toHaveLength(4);

    for (const pillar of purposePillars) {
      expect(container.textContent).toContain(pillar.title);
      expect(container.textContent).toContain(pillar.text);
    }
  });

  it("marks the closing quotation as a quotation", () => {
    const { container } = render(<PurposeSection />);
    const figure = container.querySelector("figure");
    const quote = container.querySelector("blockquote");

    expect(quote).not.toBeNull();
    expect(quote).toHaveTextContent(purposeQuote.text);
    // Presence, not visibility: the reveal leaves an inline opacity in jsdom,
    // where no intersection is ever reported.
    expect(
      within(figure!).getByText(purposeQuote.attribution),
    ).toBeInTheDocument();
    expect(figure!.querySelector("figcaption")).not.toBeNull();
  });

  it("hides decoration from screen readers", () => {
    const { container } = render(<PurposeSection />);
    // The ordinals and the light motif are visual only.
    for (const ordinal of purposePillars.map((p) => p.ordinal)) {
      const el = screen.getByText(ordinal);
      expect(el).toHaveAttribute("aria-hidden", "true");
    }
    expect(container.querySelector(".blur-\\[140px\\]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});

describe("placement", () => {
  it("sits between the hero and the mission", () => {
    const homepage = readSource("src/components/Homepage.tsx");
    const hero = homepage.indexOf("<HeroSection />");
    const purpose = homepage.indexOf("<PurposeSection />");
    const mission = homepage.indexOf("<MissionSection />");

    expect(hero).toBeGreaterThan(-1);
    expect(purpose).toBeGreaterThan(hero);
    expect(mission).toBeGreaterThan(purpose);
  });

  it("is rendered once", () => {
    const homepage = readSource("src/components/Homepage.tsx");
    expect(homepage.match(/<PurposeSection \/>/g)).toHaveLength(1);
  });
});

describe("it promises nothing it has not done", () => {
  const prose = [
    purposeIntro.lead,
    purposeQuote.text,
    ...purposePillars.flatMap((p) => [p.title, p.text]),
  ].join(" ");

  it("claims no achieved result, since the programme has not started", () => {
    expect(prose).not.toMatch(/\bhemos (formado|graduado|logrado|educado)\b/i);
    expect(prose).not.toMatch(/\bya (formamos|graduamos|transformamos)\b/i);
    expect(prose).not.toMatch(/\begresadas\b/i);
  });

  it("publishes no figure that would need verifying", () => {
    expect(prose).not.toMatch(/\d+\s*%/);
    expect(prose).not.toMatch(/\$|USD|COP/);
  });

  it("stays clear of political and religious framing", () => {
    expect(prose).not.toMatch(
      /\b(gobierno|partido|iglesia|dios|fe religiosa|pol[ií]tic[ao])\b/i,
    );
  });

  it("names no child and describes no individual case", () => {
    // Child protection outranks everything: this section argues structurally.
    expect(prose).not.toMatch(/\bhistoria de\b/i);
    expect(prose).not.toMatch(/\bconoc[ií]\b/i);
  });
});

describe("motion and interactivity", () => {
  it("adds no interactive control to the page", () => {
    const { container } = render(<PurposeSection />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(container.querySelectorAll("button")).toHaveLength(0);
    expect(container.querySelectorAll("input, select, textarea")).toHaveLength(
      0,
    );
  });

  it("gives the non-interactive blocks no clickable hover vocabulary", () => {
    // Background, translate and border hovers are reserved for real links.
    const source = readSource("src/components/sections/PurposeSection.tsx");
    const classes = [...source.matchAll(/className="([^"]*)"/g)]
      .map((m) => m[1])
      .join(" ");

    expect(classes).not.toMatch(/(?<!group-)hover:-translate/);
    expect(classes).not.toMatch(/(?<!group-)hover:bg-/);
    expect(classes).not.toMatch(/cursor-pointer/);
  });

  it("respects a reduced-motion preference", () => {
    const source = readSource("src/components/sections/PurposeSection.tsx");
    expect(source).toContain("useReducedMotion");
    // The transition on the gold rule is disabled too, not just the reveal.
    expect(source).toContain("motion-reduce:transition-none");
  });

  it("reveals on scroll only once, so nothing re-animates on the way back", () => {
    const source = readSource("src/components/sections/PurposeSection.tsx");
    expect(source).toMatch(/viewport:\s*\{\s*once:\s*true/);
  });
});

describe("responsive readability", () => {
  it("constrains the measure of every prose block", () => {
    const { container } = render(<PurposeSection />);
    // Long lines are the main readability failure on a wide screen.
    expect(container.querySelector(".max-w-5xl")).not.toBeNull();
    expect(container.querySelector(".max-w-2xl")).not.toBeNull();
  });

  it("stacks to a single column before the two-column grid", () => {
    const { container } = render(<PurposeSection />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).not.toMatch(/(^|\s)grid-cols-2(\s|$)/);
  });

  it("cannot push the page sideways", () => {
    const { container } = render(<PurposeSection />);
    const section = container.querySelector("section");
    expect(section?.className).toContain("overflow-hidden");
    expect(section?.className).not.toMatch(/\bw-screen\b/);
  });
});
