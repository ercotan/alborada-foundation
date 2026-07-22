# ADR-0002 — Phase P0 engineering foundations

Status:        Accepted
Date:          2026-07-22
Deciders:      Lead Software Architect
Approver:      Ernesto Cosovi
Supersedes:    —
Related:       ARCHITECTURE.md ; PROJECT_CONSTITUTION.md ; Functional Specification v1.0

## Context

The approved roadmap places Phase P0 — engineering foundations — before any
business feature. At the start of P0 the repository was a static React SPA
with no continuous integration, no test harness, no linting, no formatting
convention, no environment convention, and a `package.json` carrying
dependencies that implied architectural decisions nobody had taken.

Two defects were found during P0 that were not visible from outside:

1. **`@types/react` and `@types/react-dom` were absent.** With `strict`
   also disabled, `tsc --noEmit` resolved React to `any`. The typecheck that
   had been reported as passing was checking almost nothing in the component
   tree.

2. **`vite` was declared in both `dependencies` and `devDependencies`**, and
   `@google/genai`, `express`, `dotenv`, `@types/express`, `esbuild`,
   `autoprefixer` and `tsx` were declared but referenced nowhere.

## Decisions

### D1 — Preserve the frontend stack

React, TypeScript, Vite and Tailwind are retained without modification. No
framework, router, state library or UI kit is introduced. P0 adds tooling
around the existing stack and changes nothing about it.

### D2 — Make typechecking real before anything is built on it

`strict` is enabled together with `noUnusedLocals`, `noUnusedParameters`,
`noFallthroughCasesInSwitch` and `noImplicitOverride`, and the React types
are installed. `noUncheckedIndexedAccess` is deliberately **deferred**: it is
valuable, noisy, and belongs in a change with its own review.

**Rationale.** A typecheck that passes without checking is worse than no
typecheck, because it is reported as a gate. Every phase after P0 is built on
this signal.

### D3 — One gate, run identically everywhere

`npm run verify` runs typecheck → lint → format check → test → build. CI runs
the same sequence. There is no weaker pipeline and no check that exists only
in CI.

**Rationale.** When local and CI gates differ, developers learn to trust
neither.

### D4 — ESLint covers only what the compiler cannot see

Hook rules, fast-refresh safety, a small set of runtime hazards. Stylistic
rules belong to Prettier. `no-unused-vars` is disabled in ESLint because
`tsconfig` already reports it — one defect, reported once.

### D5 — Prettier does not format `docs/`

The institutional corpus is normative content under active review.
Reformatting it would produce diff noise against documents whose wording is
being audited, and the engineering layer holds no authority over `docs/`.

### D6 — The first tests guard doctrine, not implementation

Rather than throwaway smoke tests, the initial suite locks in the
institutional commitments established during the v1.0 corrections: no
funding percentages, no claim of a completed transaction, no 24/7 claim, the
cohort framed as planned rather than achieved, and a contact surface that
claims no message was received.

**Rationale.** These are the assertions most expensive to get wrong and most
likely to regress silently during a redesign. Behavioural coverage grows with
the modules that need it, from P1 onward.

### D7 — Environment convention fixed before the first secret exists

`.env.example` documents that only `VITE_`-prefixed variables reach the
browser, and that a `VITE_` variable is therefore public. Server-side secrets
belong in the hosting provider's secret store. A variable is added to the
example file as part of the change that consumes it.

**Rationale.** The cheapest moment to establish a secrets convention is
before there is a secret to leak.

### D8 — Provisioned infrastructure is recorded, not assumed

Hosting, managed PostgreSQL, error tracking, uptime monitoring and backups
require an account, a payment method, and a data-region decision that depends
on the pending legal ruling. P0 delivers the repository-side foundations and
records the rest as explicit remaining work rather than describing it as
complete.

## Consequences

**Positive.** The typecheck is meaningful. Every change runs the same gate.
Runtime dependencies are exactly four. Doctrine regressions fail the build.
The bundle fell from 376.05 kB to 365.12 kB as dead code and unused
dependencies were removed.

**Negative.** Contributors must run `npm run verify` before pushing, or CI
will reject formatting differences. This is accepted: a mechanical, uniform
rule is cheaper than a review conversation about style.

**Deferred.** `noUncheckedIndexedAccess`; a pre-commit hook; end-to-end
tests; coverage thresholds. Each is defensible and none is justified at four
source directories and twelve tests.

## Compliance

- `PROJECT_CONSTITUTION.md` Layer 2 — engineering philosophy and workflow.
  Nothing here touches institutional doctrine.
- `ARCHITECTURE.md` — no architectural change proposed; the stack is
  preserved as specified.
- Functional Specification v1.0 — no requirement altered. P0 predates the
  modules the specification governs.
