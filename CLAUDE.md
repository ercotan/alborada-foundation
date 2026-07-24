# CLAUDE.md — Engineering rules for the Alborada Foundation repository

> Read this before making any change. These rules override default behaviour.
>
> Companion document: **`MASTER_DEVELOPMENT_GUIDE.md`** — long-term vision, standards, and the known-gaps backlog. This file is *how to work*; that file is *what we are building toward*.

**Last updated:** 18 July 2026

---

## 0. Repository identity — read first

**This repository is `alborada` — the Alborada Foundation website.**

```
C:\Users\ercot\OneDrive\Escritorio\GENERAL\FUNUDOS\WEB\alborada\
```

⚠️ **This is NOT `C:\PANTEON_TRADING`.** That is a separate, unrelated algorithmic-trading project on the same machine, with its own `CLAUDE.md` and its own conventions. The two must never be mixed:

- Never apply PANTEON conventions here, or Alborada conventions there
- Never write to a path outside this repository when working on this project
- When writing files here, **use absolute paths** — the shell's working directory may be a different project

### Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build | Vite 6 |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS v4 — **CSS-first, no config file** |
| Animation | `motion` (Framer Motion successor) |
| Icons | `lucide-react` |

Site content language: **Spanish**. Code, comments, commits, docs: **English**.

---

## 1. Visual integrity

**1.1 — Never redesign existing sections unless explicitly requested.** If asked to refactor, restructure, or fix something, the visual output must be identical. Improving the design while doing something else is not an improvement; it is an unrequested change.

**1.2 — Preserve visual consistency.** New work matches the established design language: the gold accent used sparingly, generous vertical rhythm, serif headings, near-black surfaces. When adding a section, study neighbouring sections first.

**1.3 — Any Tailwind class change to existing markup requires explicit approval.** "This won't change the appearance" is a claim requiring proof, not an assumption. See §6 for how to prove it.

**1.4 — Class order in a `class` attribute is not a visual change.** Tailwind precedence comes from stylesheet order, not attribute order. Never "fix" class ordering, and never report reordering as a change.

---

## 2. Architecture

**2.1 — `Homepage.tsx` is a composition layer only.** Imports and JSX composition. No state, no handlers, no markup beyond the wrapper `<div>`. It is currently 38 lines; it should stay in that neighbourhood.

**2.2 — Keep components small and focused.** One component, one job. Past roughly 150 lines, extract. A component doing two unrelated things is two components.

**2.3 — Prefer reusable components.** Repeated markup becomes a component. But extract on the **second** use, not in anticipation of one — premature abstraction is as costly as duplication.

**2.4 — Avoid duplicated logic.** Repeated behaviour becomes a shared component, hook, or utility. Before writing a helper, check whether one exists — `utils/scroll.ts`, `shared/ScrollButton.tsx`, `hooks/useContactForm.ts`.

**2.5 — Prefer scalable solutions over quick fixes.** This codebase will be maintained for years and will grow into eight additional modules. A fix that works today but blocks tomorrow is not a fix. When a quick fix is genuinely the right call — a hotfix, a spike — say so explicitly and note what the real solution would be.

**2.6 — Think like a senior software architect.** Consider consequences beyond the immediate task: what does this force on future modules, what happens at ten times the content, what does a new maintainer see when they open this file. Recommend the better approach even when a lesser one was requested — then let Ernesto decide.

### Where code goes

| Change | Destination |
|---|---|
| New page section | `src/components/sections/<Name>Section.tsx` + export in `sections/index.ts` |
| Structural chrome (header, footer, nav) | `src/components/layout/` |
| Reusable presentational primitive | `src/components/ui/` |
| Reusable component with behaviour | `src/components/shared/` |
| Editorial copy, lists, content | `src/data/` — **never hardcoded in JSX** |
| Stateful logic | `src/hooks/use<Name>.ts` |
| Pure helper function | `src/utils/` |
| Shared type or interface | `src/types.ts` (single-use types stay local) |
| Brand token (colour, font) | `@theme` block in `src/index.css` |

`ui/` versus `shared/` is decided by **behaviour**: `ui/` renders, `shared/` does something.

**Documented exception — do not "fix" this:** `Header` is rendered inside `HeroSection`, not in `Homepage`. It is absolutely positioned against the hero section; moving it to page level changes its positioning context and moves it visually. This is intentional.

---

## 3. Code quality

**3.1 — Maintain strict TypeScript typing.** Explicit interfaces for all props and exported data. No `any` — use `unknown` and narrow. No non-null assertions as a substitute for handling. `import type` for type-only imports.

> ✅ **`strict` IS enabled** (P0, commit `fff0b45`), together with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` and `noImplicitOverride`. `@types/react` and `@types/react-dom` are installed, so the component tree is genuinely checked — before P0 they were missing and React resolved to `any`, which made a green `tsc` nearly meaningless. `noUncheckedIndexedAccess` remains deliberately deferred.

**3.2 — Maintain accessibility.** Every interactive control has an accessible name. Every form field has a `<label>` — placeholders are not labels. Semantic landmarks. Keyboard operable. Decorative graphics `aria-hidden`. Dynamic changes announced. Animation respects `prefers-reduced-motion`.

> ⚠️ The **homepage sections** still have almost no `aria-*` attributes. Do not treat them as a model. The two form surfaces added since — `src/components/contact/` and `src/components/protection/` — do meet the standard (labels, `aria-invalid`, `aria-describedby`, `role="alert"`, visible focus) and are the reference to copy. Fixing accessibility in an old section is a *visual-adjacent change*: mention it rather than doing it silently.

**3.3 — Optimize performance.** Animate only `opacity` and `transform`. Clean up every effect, listener, and animation frame. Memoize only with evidence. Keep the bundle within budget (current baseline: 117 kB gzip JS).

**3.4 — Never introduce unnecessary dependencies.** Every package is a maintenance and security liability. Before adding one: can the standard library or existing dependencies do this? Prefer twenty lines of owned code over a package. If a dependency is genuinely warranted, explain why and ask first.

---

## 4. Decisions and assumptions

**4.1 — No unapproved stack decisions.** Do not introduce a router, state-management library, backend, authentication provider, payment processor, testing framework, or component library without explicit approval from Ernesto.

**Unused packages are not prior approval.** The Google AI Studio scaffold left `@google/genai`, `express`, `dotenv`, `@types/express`, `esbuild`, `autoprefixer` and `tsx` in `package.json` with no importer. **All seven were removed in P0** (`26a0cdb`) precisely because their presence implied decisions nobody had made. Runtime dependencies are now exactly `react`, `react-dom`, `lucide-react` and `motion`. If a package reappears without an importer, delete it.

**Approved since:** ESLint, Prettier, Vitest + Testing Library (P0 tooling). **Still unapproved and still absent:** router, state-management library, backend, auth provider, payment processor, component library. Multi-page navigation is done with **real Vite HTML entry points**, not a router — see `engineering/ADR-0003`.

**4.2 — Record assumptions as open questions, not decisions.** When a task requires a choice that has not been made, surface it and ask. Do not resolve it silently by writing code that presumes an answer — code is a decision, and shipping it makes the choice by default.

**4.3 — Explain architectural decisions.** When choosing between approaches, state what you chose, what you rejected, and why. Include trade-offs and risks. This applies to the response, the commit body, and any update to `MASTER_DEVELOPMENT_GUIDE.md`.

**4.4 — Stop and ask when a task crosses architectural layers**, contradicts an established convention, or requires a decision listed as OPEN in the master guide. A question costs a minute; an architectural mistake costs weeks.

---

## 5. Project-specific constraints

**5.1 — Child protection outranks everything.** The site must never expose names, images, or personal histories of the students. If a request would surface identifying information about a minor, raise the concern before implementing.

**5.2 — Copy lives in `src/data/`.** Text changes are data edits, never JSX edits. This keeps content reviewable and layout untouched.

**5.3 — Site copy stays Spanish; identifiers stay English.** Do not translate UI text to English, and do not name variables in Spanish.

**5.4 — There is no `tailwind.config.js`.** Tailwind v4 is CSS-first. Theme changes go in the `@theme` block of `src/index.css`. Do not create a config file.

**5.5 — Prefer theme tokens over arbitrary values.** `bg-navy-950`, not `bg-[#050A1A]`. Note that existing components frequently violate this — there are effectively two parallel colour systems. Do not follow the bad example in new code, and do not mass-convert the old code without approval, since it touches nearly every file.

**5.6 — Do not modify the `server` block in `vite.config.ts`.** It carries an upstream comment stating that file watching is deliberately configured; leave it alone.

**5.7 — No dark patterns.** No manufactured urgency, no guilt mechanics, no obscured costs. This binds absolutely on the future Donations module.

---

## 6. Verification protocol

**6.1 — Run the full gate after every task.** Non-negotiable:

```bash
npm run verify   # typecheck → lint → format:check → test → build
```

CI runs exactly this sequence on every push and pull request, so a local pass and a CI pass mean the same thing. Individual steps exist (`typecheck`, `lint`, `format`, `format:check`, `test`, `test:watch`) but `verify` is the gate.

Report actual results. If something fails, say so with the output. Never describe a task as complete without running it.

**6.2 — Prove visual parity for refactors.** When a change claims not to alter appearance, prove it rather than asserting it. The procedure, validated on the July 2026 homepage refactor:

1. Copy the pre-change component alongside the new one
2. Render both with `renderToStaticMarkup`
3. **Normalize class-attribute token order** before diffing — sort the tokens inside each `class="…"`, since Tailwind precedence comes from stylesheet order, not attribute order
4. Diff. Identical output proves the DOM, classes, and text are unchanged
5. Delete the scaffolding afterwards

This catches accidental changes that visual inspection misses. It covers the default render state only — interactive states still need a manual click-through.

**6.3 — Clean up after verification.** Temporary scripts, duplicated components, and build output created for verification get removed. Leave the tree as you found it plus the intended change.

**6.4 — Report honestly.** If tests fail, say so with output. If a step was skipped, say which. If something is unverified, say it is unverified. Never describe work as verified when it was only assumed.

---

## 7. Git

**7.1 — Never run `git commit` or `git push` without an explicit request.** "OK", "perfect", or approval of a plan does **not** authorize a commit. Ernesto must ask for it in words.

**7.2 — Never overwrite or delete uncommitted work.** Much of this repository is currently untracked. Before overwriting any file, check whether its contents are committed; if not, back it up first.

**7.3 — Branch naming:** `feat/`, `fix/`, `refactor/`, `docs/`, `chore/` + short description.

**7.4 — Conventional Commits.** `<type>(<scope>): <subject>`, with a body explaining **why**. The diff already shows what.

**7.5 — Never commit secrets, `node_modules/`, or `dist/`.**

---

## 8. Definition of done

Before reporting a task complete:

- [ ] `npm run verify` passes end to end
- [ ] Visual changes intentional, or absence of change proven (§6.2)
- [ ] No unused imports or variables left behind
- [ ] Copy in `src/data/`, not JSX
- [ ] New interactive elements have accessible names
- [ ] No new dependency without approval
- [ ] Architectural decisions explained
- [ ] Verification scaffolding cleaned up
- [ ] Outcome reported honestly, including anything unverified

---

## 9. Current state — read before assuming

The codebase does **not** currently meet all the standards above. Known gaps are catalogued in **`MASTER_DEVELOPMENT_GUIDE.md` → Appendix A**, with 25 items across P0/P1/P2.

The most consequential, so you do not have to discover them:

| Gap | Consequence for your work |
|---|---|
| **No mobile navigation** (`hidden … lg:flex`) | Known defect — do not replicate the pattern |
| **Two parallel colour systems** | Tokens and raw hex coexist. Use tokens in new code |
| **Homepage sections lack `aria-*`** | They are not an accessibility model; `contact/` and `protection/` are |
| **No backend exists** | Three surfaces are wired to endpoints that are not there. See below |
| **CI has never run** | The workflow is committed but unproven — nothing has been pushed yet |

**Resolved in P0 and after — no longer gaps:** TypeScript `strict` (now on, with React types), linter, formatter, test suite (67 tests), CI workflow, scaffold dependencies, `index.html` metadata.

**Three surfaces await a backend, and all three say so honestly rather than faking success:**

| Surface | Seam | Behaviour today |
|---|---|---|
| Contact enquiry | `submitInquiry` · `VITE_CONTACT_ENDPOINT` | Reports "no fue enviado", preserves input |
| Child protection | `prepareReport` in `src/lib/childProtection.ts` | Formats the report, states it has not been transmitted |
| Homepage contact | `mailto:` only | Works, but depends on a mail client |

**Never make any of these display success without a real server saying so.** Tests enforce it; that is deliberate, and changing those tests is almost never the right response to a failure.

**Do not treat existing code as a standard to imitate.** Match its *architecture* — the section/ui/shared split, data separation, composition layer. Do not match its accessibility, its typing rigor, or its colour handling.

---

*When these rules and a request conflict, raise the conflict rather than silently choosing. When these rules and the master guide conflict, the master guide wins and this file should be corrected.*
