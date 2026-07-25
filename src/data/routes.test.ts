/**
 * Guards on cross-page destinations.
 *
 * A link that points at a page the build does not emit is indistinguishable
 * from a working link until someone clicks it in production. These tests close
 * that gap: every path this application links to must exist as an HTML source
 * file AND be declared as a Vite input, or the suite fails.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  inquiryCategories,
  inquiryTopics,
  type InquiryCategoryId,
} from "./contact";
import { readCategory, readTopic } from "../lib/contactInquiry";
import {
  CHILD_PROTECTION_PATH,
  CONTACT_PAGE_PATH,
  contactPageHref,
  HOME_PATH,
} from "./routes";

/** Vitest runs from the project root, where the HTML entry points live. */
const repoRoot = process.cwd();
const atRoot = (path: string) => join(repoRoot, path.replace(/^\//, ""));

/** Every destination that must resolve to a document of its own. */
const PAGE_PATHS = [CONTACT_PAGE_PATH, CHILD_PROTECTION_PATH] as const;

describe("route constants", () => {
  it("are root-absolute, so they resolve the same from every page", () => {
    for (const path of [HOME_PATH, ...PAGE_PATHS]) {
      expect(path.startsWith("/")).toBe(true);
      expect(path.startsWith("//")).toBe(false);
    }
  });

  it("carry no query string or fragment of their own", () => {
    for (const path of PAGE_PATHS) {
      expect(path).not.toMatch(/[?#]/);
    }
  });
});

describe("every destination is a real HTML entry point", () => {
  for (const path of PAGE_PATHS) {
    it(`${path} exists as a source document`, () => {
      expect(existsSync(atRoot(path))).toBe(true);
    });

    it(`${path} is declared as a Vite input`, () => {
      const config = readFileSync(atRoot("vite.config.ts"), "utf8");
      // `path.resolve(__dirname, "contacto.html")` — match the file name.
      expect(config).toContain(path.replace(/^\//, ""));
    });
  }

  it("the home path is served by index.html", () => {
    expect(HOME_PATH).toBe("/");
    expect(existsSync(atRoot("index.html"))).toBe(true);
  });
});

describe("category round trip", () => {
  it("every category survives the URL it is written into", () => {
    for (const category of inquiryCategories) {
      const href = contactPageHref(category.id);
      expect(href.startsWith(`${CONTACT_PAGE_PATH}?`)).toBe(true);

      // What the browser will hand back to the contact entry module.
      const search = href.slice(href.indexOf("?"));
      expect(readCategory(search)).toBe(category.id);
    }
  });

  it("falls back to the default rather than trusting an unknown value", () => {
    expect(readCategory("?categoria=inexistente")).toBe("general");
    expect(readCategory("")).toBe("general");
  });

  it("carries the categories ADR-0004 §D1 assigns to Class A intake", () => {
    // Orientation is a category of the general intake, not a separate service.
    // `donacion` was added by the 2026-07-25 update to the same section.
    const expected: InquiryCategoryId[] = [
      "general",
      "institucion",
      "empresa",
      "profesional",
      "persona",
      "prensa",
      "juridico",
      "orientacion",
      "donacion",
    ];
    expect(inquiryCategories.map((c) => c.id).sort()).toEqual(expected.sort());
  });
});

describe("topic round trip", () => {
  it("every topic survives the URL it is written into", () => {
    for (const topic of inquiryTopics) {
      const href = contactPageHref(topic.category, topic.id);
      const search = href.slice(href.indexOf("?"));

      expect(readCategory(search)).toBe(topic.category);
      expect(readTopic(search)).toBe(topic.id);
    }
  });

  it("every topic slug is URL-safe, so no escaping is required", () => {
    for (const topic of inquiryTopics) {
      expect(topic.id).toMatch(/^[a-z0-9-]+$/);
      expect(encodeURIComponent(topic.id)).toBe(topic.id);
    }
  });

  it("every category slug is URL-safe too", () => {
    for (const category of inquiryCategories) {
      expect(category.id).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("every topic belongs to a category that exists", () => {
    const ids = new Set(inquiryCategories.map((c) => c.id));
    for (const topic of inquiryTopics) {
      expect(ids.has(topic.category)).toBe(true);
    }
  });

  it("keeps topic slugs unique", () => {
    const ids = inquiryTopics.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ignores a topic that does not belong to the category in the URL", () => {
    // A hand-edited link must not file an enquiry under a desk that does not
    // handle its subject.
    expect(readTopic("?categoria=prensa&tema=biblioteca")).toBeNull();
    expect(readTopic("?categoria=orientacion&tema=biblioteca")).toBeNull();
    expect(readTopic("?categoria=orientacion&tema=inexistente")).toBeNull();
    expect(readTopic("?categoria=orientacion")).toBeNull();
  });

  it("omits the parameter entirely when no topic is given", () => {
    expect(contactPageHref("general")).not.toContain("tema");
  });
});
