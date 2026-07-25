# Development guide

Practical setup and workflow for engineers working on the Alborada platform.
For *why* the tooling is the way it is, see
[`engineering/ADR-0002`](engineering/ADR-0002_P0_ENGINEERING_FOUNDATIONS.md).

---

## Requirements

| | |
|---|---|
| Node | 22 LTS (the version CI runs) |
| Package manager | npm, using the committed `package-lock.json` |

## Setup

```
npm ci
cp .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000`. No environment variable is required
for the application to build or run today.

Use `npm ci`, not `npm install`, unless you are deliberately changing a
dependency. `npm ci` installs exactly what the lockfile specifies.

---

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit`, strict |
| `npm run lint` | ESLint |
| `npm run format` | Rewrite files with Prettier |
| `npm run format:check` | Fail if any file is unformatted |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Tests in watch mode |
| **`npm run verify`** | **The full gate. Run this before pushing.** |

`npm run verify` runs typecheck → lint → format check → test → build, in that
order. **CI runs exactly the same sequence.** If it passes locally it passes
in CI, and the reverse.

---

## Repository conventions

### Branches

`main` is the deployable branch. Work on a branch named for its intent —
`feat/`, `fix/`, `chore/`, `docs/`, `test/`, `refactor/` — and open a pull
request. CI must be green before merge.

### Commits

Conventional-commit prefixes, one logical change per commit:

```
feat:      new capability
fix:       corrected behaviour
chore:     tooling, dependencies, housekeeping
docs:      documentation
test:      tests only
refactor:  behaviour unchanged
ci:        pipeline
```

The subject says what changed. The body says **why**, and names anything a
reviewer would otherwise have to reconstruct. A commit that removes something
should say what would have gone wrong had it stayed.

### Where things belong

| Path | Contents |
|---|---|
| `src/pages/` | One component per standalone page |
| `src/components/sections/` | One section of the homepage each |
| `src/components/contact/` `src/components/protection/` | Feature components for the standalone pages |
| `src/components/layout/` | Header, footer |
| `src/components/ui/` | Small shared presentational pieces |
| `src/data/` | Editorial copy, kept out of components |
| `src/lib/` | Domain logic: validation, submission seams, data contracts |
| `src/utils/` | Framework-independent helpers |
| `src/test/` | Test setup only |
| `docs/` | **Institutional corpus. Normative. Not engineering territory** |
| `engineering/` | ADRs, standards, reference models |

Tests live beside the code they cover, as `*.test.ts` or `*.test.tsx`.

### Pages

The site has **three real HTML entry points**, not client-side routes. There is
no router — see [`engineering/ADR-0003`](engineering/ADR-0003_MULTI_PAGE_ENTRY_POINTS.md)
for why, in short: a direct link to the child protection page must resolve on
any static host with no rewrite rules.

| URL | HTML | Entry module | Page component |
|---|---|---|---|
| `/` | `index.html` | `src/main.tsx` | `src/App.tsx` |
| `/proteccion-infantil.html` | `proteccion-infantil.html` | `src/protection.tsx` | `src/pages/ChildProtectionPage.tsx` |
| `/contacto.html` | `contacto.html` | `src/contacto.tsx` | `src/pages/ContactPage.tsx` |

Adding a page means three small files plus one line in `vite.config.ts`.
Cross-page parameters travel in the query string — `/contacto.html?categoria=empresa`.

### Backend seams

No backend exists. Three surfaces are wired for one and **each states plainly
that nothing was sent**, rather than showing a false confirmation:

| Seam | File | Activates when |
|---|---|---|
| `submitInquiry` | `src/lib/contactInquiry.ts` | `VITE_CONTACT_ENDPOINT` is set |
| `prepareReport` | `src/lib/childProtection.ts` | Replaced with an async call to the intake endpoint |

Both declare the fields the server will attach — timestamp, identifier, source
IP, user agent, inferred country, audit entry. None is produced in the browser,
because a client-generated case identifier refers to nothing.

**A surface must never display success unless a server said so.** Tests enforce
this deliberately.

### Third-party contacts

The site is otherwise self-contained, so every outbound request is listed here.
Check this table before adding another.

| Origin | Where | When | Introduced |
|---|---|---|---|
| `https://fonts.googleapis.com` | `@import` in `src/index.css` | Every page load | Pre-existing |
| `https://www.paypal.com` | PayPal SDK, injected by `src/hooks/usePayPalSdk.ts` | Homepage load only | Donation button |

The PayPal SDK is injected at runtime rather than placed in an HTML entry
point, so it loads on the homepage alone. `contacto.html` and
`proteccion-infantil.html` contain no PayPal reference and never contact it —
the child-protection page in particular should reach nothing it does not need.

`http://www.w3.org` and `https://react.dev` also appear in the built bundles.
Neither is a request: the first is the SVG namespace on icon elements, the
second is React's error-documentation URL inside thrown messages.

**PayPal configuration is centralized in `src/data/payments.ts`.** Those
identifiers are public by design. **Never add a PayPal secret, access token or
webhook key to that module** — it is imported by the client bundle, so Vite
would publish it. A test asserts the module reads no environment variable.

**There is no Content Security Policy today.** If one is ever introduced, it
must allow `https://www.paypal.com` for `script-src`, `frame-src` and
`connect-src`, and `https://www.paypalobjects.com` for `img-src`, or the
donation button breaks silently. Confirm the exact set against a browser
network panel rather than widening with a wildcard.

### Editorial copy

Copy belongs in `src/data/homepage.ts`, not inline in components, so wording
can be revised without touching layout.

---

## What the tests protect

The suite is small and deliberately pointed. Several tests assert
**institutional commitments** rather than behaviour:

- no published surface states a funding percentage
- no surface claims *financiado*, *completado*, *transacción* or 24/7
- donation areas carry no amount, goal or progress field
- the 15-student cohort is described as planned, not achieved
- the contact section offers a real channel, renders no form, and claims no
  message was received

The foundation previously published fabricated funding figures and a contact
form that reported success while discarding the message. Both were corrected.
**If one of these tests fails, changing the test is almost never the right
response.**

---

## Environment variables

Only variables prefixed `VITE_` reach the browser — Vite inlines them into
the bundle at build time. **A `VITE_` variable is therefore public.** Never
place a key, token, connection string or credential behind that prefix.

Server-side secrets belong in the hosting provider's secret store, never in a
file in this repository. `.env*` is gitignored; `.env.example` is the single
tracked exception and carries no values.

Add a variable to `.env.example` as part of the change that consumes it.

---

## Continuous integration

`.github/workflows/ci.yml` runs on every push to `main` and every pull
request: install, typecheck, lint, format check, test, build, then upload the
build output as an artifact.

There is no second, weaker pipeline. If CI and local disagree, that is a bug
in the setup and should be fixed rather than worked around.

---

## Not yet established

Deployment, hosting, database, error tracking, uptime monitoring and backups
are **not configured**. They require an account, a payment method and a data
region that depends on a pending institutional ruling. Until then, `dist/` is
a build output and nothing publishes it automatically.

See the P0 completion report and `engineering/ADR-0002` for the current
state of that work.
