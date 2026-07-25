/**
 * Guards on the design system's consistency.
 *
 * These are the details that make a site read as designed rather than
 * assembled: one accent colour, one hover scale, one vertical rhythm, one
 * register in the copy. Each was inconsistent at some point, and none of them
 * fails loudly — a second gold, a third scale value or a stray voseo verb just
 * quietly cheapens the page. So they are asserted across the whole source
 * tree rather than per component.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const SRC = join(process.cwd(), "src");

function sourceFiles(dir: string = SRC): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    if (!/\.tsx?$/.test(entry)) return [];
    if (/\.test\.tsx?$/.test(entry)) return [];
    return [full];
  });
}

const files = sourceFiles();
const read = (file: string) => readFileSync(file, "utf8");

/** Each className attribute separately, so prose and comments never register. */
function classAttributes(source: string): string[] {
  return [...source.matchAll(/className=(?:"([^"]*)"|\{`([^`]*)`\})/g)].map(
    (match) => match[1] ?? match[2] ?? "",
  );
}

const classesOf = (source: string) => classAttributes(source).join("  ");

describe("one palette", () => {
  it("uses no accent outside the project's own gold", () => {
    // amber/yellow/orange are Tailwind defaults that read as a second gold.
    for (const file of files) {
      const classes = classesOf(read(file));
      expect(classes, file).not.toMatch(/\b\w+-(amber|yellow|orange)-\d/);
    }
  });

  it("uses no neutral outside the project's navy and white-alpha scale", () => {
    for (const file of files) {
      const classes = classesOf(read(file));
      // `translate-` contains "slate-", so require a utility prefix.
      expect(classes, file).not.toMatch(/(?:^|\s)\w*-(slate|zinc|gray)-\d/);
    }
  });
});

describe("one button", () => {
  it("uses a single hover scale wherever a control scales", () => {
    const scales = new Set<string>();
    for (const file of files) {
      for (const match of read(file).matchAll(/hover:scale-\[([\d.]+)\]/g)) {
        scales.add(match[1]!);
      }
    }
    expect([...scales]).toEqual(["1.02"]);
  });

  it("never scales a full-width button, which would shift its edges", () => {
    for (const file of files) {
      for (const attribute of classAttributes(read(file))) {
        if (!/\bw-full\b/.test(attribute)) continue;
        expect(attribute, file).not.toMatch(/hover:scale-\[/);
      }
    }
  });

  it("guards every hover scale behind a reduced-motion preference", () => {
    for (const file of files) {
      const source = read(file);
      if (!/hover:scale-\[/.test(source)) continue;
      expect(source, file).toContain("motion-reduce:hover:scale-100");
    }
  });
});

describe("one rhythm", () => {
  it("gives every full-width section the same vertical padding", () => {
    const sections = files.filter((f) => /[/\\]sections[/\\]/.test(f));
    expect(sections.length).toBeGreaterThan(10);

    for (const file of sections) {
      const source = read(file);
      // Barrel files and the hero, which is sized by the viewport.
      if (!/<section/.test(source)) continue;
      if (/id="hero"/.test(source)) continue;

      const padding = [...source.matchAll(/\bpy-(\d+)\b/g)].map((m) => m[1]);
      expect(padding[0], file).toBe("28");
    }
  });
});

describe("one voice", () => {
  it("addresses the visitor as usted, never as vos", () => {
    // The site is institutional and uses usted throughout; a stray voseo verb
    // reads as a different author.
    const voseo =
      /\b(podés|tenés|querés|necesitás|Organizá|Construí|Convertí|Definí|Encontrá|Intentá|Revisá|Escribí|completaste|escribiste)\b/;

    for (const file of files) {
      expect(read(file), file).not.toMatch(voseo);
    }
  });
});

describe("one focus treatment", () => {
  it("gives every interactive control a visible focus ring", () => {
    for (const file of files) {
      const source = read(file);
      const controls = (source.match(/<(?:a|button)[\s>]/g) ?? []).length;
      if (controls === 0) continue;

      expect(
        source,
        `${file} renders controls with no focus-visible style`,
      ).toMatch(/focus-visible:/);
    }
  });
});
