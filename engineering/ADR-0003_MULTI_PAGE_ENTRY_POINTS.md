# ADR-0003 — Multi-page entry points instead of client-side routing

Status:        Accepted
Date:          2026-07-22
Deciders:      Lead Software Architect
Approver:      Ernesto Cosovi
Supersedes:    —
Related:       ADR-0002 ; CLAUDE.md §4.1 ; DEVELOPMENT.md

## Context

The site began as a single scrolling page with no router. Two dedicated
pages were then required:

- `/proteccion-infantil.html` — the child protection entry point
- `/contacto.html` — the institutional enquiry form, opened from each of the
  four collaboration options with its category preselected

`CLAUDE.md §4.1` forbids introducing a router without explicit approval, so
the choice had to be made deliberately rather than by reflex.

## Options considered

**A — `react-router`.** The conventional answer. Client-side navigation,
shared layout, no full page loads.

**B — Real HTML entry points via Vite `build.rollupOptions.input`.** Each
page is its own document with its own entry module.

**C — Pathname branching inside `App.tsx`.** No dependency, but hand-rolled
routing with none of a router's guarantees.

## Decision

**Option B.** `vite.config.ts` declares three inputs: `index.html`,
`proteccion-infantil.html`, `contacto.html`.

## Rationale

**A client-side route 404s on a direct link unless the host rewrites all
paths to `index.html`.** No hosting is provisioned yet, and that rewrite is
exactly the configuration a new deployment gets wrong.

For a marketing page that is an annoyance. **For the child protection page it
is unacceptable.** That URL will be shared in a message to someone trying to
help a child at risk. It must resolve from a cold link, a bookmark, or a
paste into any browser, on any static host, with no configuration. Option B
guarantees that because the file exists on disk.

Secondary benefits: no new dependency, so §4.1 is satisfied without an
approval; each page ships only its own JavaScript (the contact page is
~15 kB, the homepage bundle is not loaded at all); and the decision is
trivially reversible — adopting a router later does not invalidate anything
written here.

## Consequences

**Positive.** Direct links always resolve. No routing dependency. Smaller
per-page bundles. Deployment stays a plain static upload.

**Negative.** Navigation between pages is a full document load, so shared
React state does not survive it. This is currently a non-issue: no state is
shared across pages. Cross-page parameters travel in the query string —
`/contacto.html?categoria=empresa`, read by `readCategory()`.

**Cost of adding a page.** Three small files — an HTML document, an entry
module, and one line in `vite.config.ts`. Cheap enough that it is not a
reason to prefer a router.

**When to revisit.** If the platform grows an authenticated area with shared
session state and many routes — realistically the administration platform in
the roadmap's P2 — a router becomes the right tool. Adopt it then, for that
area, and leave the public pages as they are.
