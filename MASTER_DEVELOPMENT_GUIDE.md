# Alborada Foundation

**Master Development Guide** — the long-term vision and technical standards of the Alborada Foundation digital platform.

> **How to read this document.** Every standards section carries a status marker describing what is true *today*, not what we intend:
>
> | Marker | Meaning |
> |---|---|
> | ✅ **Enforced** | The standard holds in the current codebase and tooling catches violations |
> | ⚠️ **Partial** | Followed by convention, but nothing prevents regression |
> | ❌ **Not yet enforced** | The standard is a target; the codebase does not currently meet it |
>
> Anything marked ⚠️ or ❌ has a corresponding entry in [Appendix A — Known Gaps & Remediation Backlog](#appendix-a--known-gaps--remediation-backlog). This document describes standards *and* the honest distance to them. Do not read a section as a claim of compliance.

**Last updated:** 18 July 2026
**Status of the platform:** single-page site, pre-launch. None of the eight future modules exist yet.

---

## Project Vision

Alborada is not a brochure for a foundation. It is the digital surface of a long-term educational institution, and it will grow into a platform where students learn, donors verify how money is spent, and the public follows the construction of a campus over a decade.

The site is the first module of that platform. Every decision made now is a decision the Academy, the Guidance Center, and the Transparency Dashboard will inherit. The bar is therefore "production software that will be maintained for ten years," not "marketing page that ships this quarter."

Concretely, this means we optimize for **legibility and replaceability** over cleverness. A future maintainer — possibly a student who came through the programme — should be able to open any file and understand it without reading the other twenty.

## Core Mission

The platform exists to serve four audiences, in priority order:

1. **The girls and their families** — dignity and privacy first. The site must never expose names, images, or personal histories that could compromise a minor. This constraint outranks every design or marketing consideration.
2. **Donors and institutional allies** — they need verifiable information, not persuasion. Transparency is a product feature, not a page.
3. **The general public** — the mission must be intelligible in ninety seconds.
4. **Future students** — eventually the platform becomes the place they actually learn.

Where these conflict, the earlier audience wins.

## Long-Term Goals

| Horizon | Goal |
|---|---|
| Near | A credible, fast, accessible public site with working contact and clear mission communication |
| Medium | Transparency Dashboard and Donations — the platform starts carrying operational load, not just narrative |
| Long | Academy and Learning Platform — the site becomes infrastructure the institution runs on |
| Enduring | The codebase remains something a small team can maintain and a newcomer can join |

The last goal is the one most often sacrificed and the one that matters most. A platform that no one can safely modify is a platform that dies.

## Brand Identity

The visual identity is defined in `src/index.css` as Tailwind v4 theme tokens. **That file is the single source of truth for brand values** — this section documents them, it does not define them.

**Colour**

| Token | Value | Role |
|---|---|---|
| `--color-gold-500` | `#d4af37` | Primary accent — CTAs, eyebrows, icons, dividers, figures |
| `--color-gold-50…900` | ramp | Supporting tints and shades |
| `--color-navy-950` | `#050A1A` | Deep background |
| `--color-navy-800` | `#020408` | Darkest surface |
| `--color-navy-50…700` | ramp | Supporting ramp |

Additional near-black surfaces appear throughout the sections as raw hex (`#020712`, `#050a16`, `#07101f`, `#050a16`). These are *not* currently tokens. See the dual-colour-system gap in [Tailwind Standards](#tailwind-standards).

The gold is used sparingly and deliberately — it signals importance. When everything is gold, nothing is.

**Typography**

| Token | Family | Role |
|---|---|---|
| `--font-serif` | Cormorant Garamond | Display, headings, pull quotes — the institutional voice |
| `--font-sans` | Inter | Body copy, UI, navigation |
| `--font-mono` | JetBrains Mono | Data, code, figures (currently unused) |

The serif/sans pairing carries the brand: serif for what the foundation *is*, sans for what it *does*. Headings are light-weight and widely tracked (`font-light`, `tracking-[0.22em]` and similar) — restraint reads as institutional confidence.

**Voice**

Site copy is **Spanish**. Code identifiers, comments, commit messages, and documentation are **English**. Do not mix these.

> ⚠️ **Partial** — Brand values live in `@theme`, but roughly half the components bypass the tokens and hardcode the same colours as arbitrary hex values.

## Design Philosophy

**Restraint over decoration.** The subject matter is serious. Visual weight is spent on typography, spacing, and a single accent colour, not on ornament.

**Darkness as canvas.** The palette is near-black throughout. Content emerges from the background rather than sitting on it. This makes the gold accent and the cinematic canvas do the emotional work.

**Generous space.** Sections use large vertical rhythm (`py-28`). Density is the enemy of gravitas.

**Every element earns its place.** If a component can be removed without losing meaning, remove it.

## UX Principles

- **Clarity before persuasion.** State what the foundation does before asking for anything.
- **One primary action per section.** Competing CTAs produce no action.
- **Progressive depth.** The hero communicates in seconds; sections below reward the reader who continues.
- **No dark patterns, ever.** No manufactured urgency, no guilt mechanics, no obscured costs. A foundation asking for trust cannot use techniques that erode it — this applies with particular force to the future Donations module.
- **Navigation must always be available.** Currently it is not on mobile (see gap below).
- **Feedback for every action.** A user who submits a form must know what happened.

> ❌ **Not yet enforced** — Two violations exist today: the header navigation is hidden below the `lg` breakpoint with no mobile alternative, and the contact form fails silently when required fields are empty (`useContactForm.handleSubmit` returns without any message).

## Accessibility Standards

**Target: WCAG 2.1 Level AA.**

Requirements:

- Every interactive control has an accessible name
- Every form field has an associated `<label>` (placeholders are not labels — they vanish on input and are not reliably announced)
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- One `<h1>` per page; no skipped heading levels
- Decorative graphics are hidden from assistive technology (`aria-hidden="true"`)
- Dynamic content changes are announced (`aria-live`) and receive focus where appropriate
- Full keyboard operability with a visible focus indicator
- `prefers-reduced-motion` respected by all animation
- Colour contrast meets AA against the dark palette
- `<html lang>` matches the actual content language

**What currently holds ✅**

- Semantic `<header>`, `<nav>`, `<footer>` and `<section>` elements
- Correct heading hierarchy — exactly one `<h1>`, `<h2>` elsewhere
- Real `<button>` elements for all controls, never clickable `<div>`s
- A real `<form>` with `required` on the mandatory fields
- Icons are inline SVG components, so there are no `<img>` tags missing `alt`

**What does not ❌**

- **Zero `aria-*` attributes exist anywhere in `src/`**
- **Zero `<label>` elements exist.** All five contact fields are labelled only by placeholder, and the `<select>` has neither label nor placeholder — it has no accessible name at all
- No `<main>` landmark; `Homepage.tsx` wraps content in a plain `<div>`
- The `<canvas>` in `CinematicCanvas.tsx` is decorative but not `aria-hidden`
- No skip-to-content link, no visually-hidden utility class
- The form success state swaps in with no `aria-live` and no focus management — the confirmation is never announced
- No `prefers-reduced-motion` handling anywhere, despite continuous canvas animation and `motion` transitions
- `<html lang="en">` while all copy is Spanish

> ❌ **Not yet enforced.** Accessibility is the largest single gap in the codebase. Treat every item above as required work, not aspiration.

## Performance Standards

**Measured baseline** (production build, 18 July 2026):

| Asset | Raw | Gzip |
|---|---|---|
| JS | 371.49 kB | 117.25 kB |
| CSS | 31.06 kB | 6.14 kB |

**Budgets** (to hold as the platform grows):

- Initial JS ≤ 150 kB gzip — currently 117 kB, so there is limited headroom before code-splitting becomes mandatory
- Lighthouse Performance ≥ 90 on mobile
- Largest Contentful Paint ≤ 2.5 s on a mid-tier device over 4G

Rules:

- Code-split at the route boundary as soon as routing exists — the current single-bundle approach does not survive eight modules
- No dependency enters the bundle without a measured justification
- Images: modern formats, explicit dimensions, lazy-loaded below the fold
- Expensive work is memoized or moved off the render path

**Watch items:** `CinematicCanvas` runs a continuous `requestAnimationFrame` loop with 150 particles. It is the single largest runtime cost on the page and it never idles. It should pause when off-screen and when `prefers-reduced-motion` is set.

> ⚠️ **Partial** — the current bundle is within budget, but nothing measures or enforces this. No CI, no Lighthouse gate, no bundle-size check.

## SEO Standards

Requirements for every public page:

- Unique, descriptive `<title>` and `<meta name="description">`
- Open Graph and Twitter Card tags for link previews
- `<html lang>` matching the content language
- Canonical URL
- Favicon and touch icons
- Structured data (JSON-LD `Organization` / `NonprofitOrganization`) — high value for a foundation
- `sitemap.xml` and `robots.txt`
- Semantic headings that describe actual content

**Current state ❌** — `index.html` is still the unmodified Google AI Studio scaffold:

- `<title>` is `My Google AI Studio App`
- No meta description
- No Open Graph or Twitter Card tags
- No favicon (and no `public/` directory to serve one)
- No canonical, no robots meta, no structured data
- `lang="en"` while the site is in Spanish
- No preconnect hints for the Google Fonts imported in CSS

> ❌ **Not yet enforced.** The site is currently unshareable — a link posted anywhere renders with a scaffold title and no preview image. This is P0.

## Component Architecture

Components are classified by **role**, and the folder encodes the role:

| Folder | Contains | Test |
|---|---|---|
| `components/layout/` | Structural chrome that frames content | Would it appear on most pages? → `Header`, `FooterSection` |
| `components/sections/` | Full-width, self-contained page sections | Does it own a `<section>` and a slice of the page narrative? |
| `components/ui/` | Small, presentational, reusable primitives | Is it style-only with no business meaning? → `SectionEyebrow`, `GoldDivider` |
| `components/shared/` | Reusable components carrying behaviour | Does it encapsulate an interaction? → `ScrollButton` |

The distinction between `ui/` and `shared/` is **behaviour**: `ui/` renders, `shared/` does something.

Rules:

- **`Homepage.tsx` is a composition layer only** — imports and JSX composition, nothing else. No state, no handlers, no markup beyond the wrapper.
- Sections are self-contained: a section owns its own local state and imports its own content.
- Sections are exported through the `components/sections/index.ts` barrel so page files import from one place.
- A component doing two unrelated things is two components.
- Extract to `ui/` or `shared/` on the **second** use, not in anticipation of one.

**One deliberate exception, documented so it is not "corrected":** `Header` is rendered *inside* `HeroSection`, not in `Homepage`. It is absolutely positioned against the hero section; hoisting it to the page level changes its positioning context and moves it visually. This is intentional. When routing arrives and the header must appear on every page, this needs an actual solution — not a quiet move.

> ✅ **Enforced** by convention as of the July 2026 refactor. `Homepage.tsx` is 38 lines.

## Folder Structure

```
alborada/
├── CLAUDE.md                        ← engineering rules for Claude Code
├── MASTER_DEVELOPMENT_GUIDE.md      ← this document
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                      ← application shell
    ├── main.tsx                     ← entry point
    ├── index.css                    ← Tailwind v4 @theme — brand source of truth
    ├── types.ts                     ← shared TypeScript contracts
    ├── components/
    │   ├── Homepage.tsx             ← composition layer only
    │   ├── CinematicCanvas.tsx      ← canvas animation engine
    │   ├── layout/                  ← Header, FooterSection
    │   ├── sections/                ← 14 page sections + index.ts barrel
    │   ├── ui/                      ← SectionEyebrow, GoldDivider
    │   └── shared/                  ← ScrollButton
    ├── data/
    │   └── homepage.ts              ← all homepage editorial content
    ├── hooks/
    │   └── useContactForm.ts        ← form state + submission
    └── utils/
        ├── scroll.ts                ← smooth scroll to section
        └── audio.ts                 ← ⚠️ orphaned, not imported anywhere
```

**Growth rule:** when a second page appears, introduce `src/pages/` and give each page its own `data/<page>.ts`. Do not let `data/homepage.ts` become a dumping ground for all site content.

## State Management Strategy

**Escalate only when forced. Current level: local state.**

1. **Local `useState`** — the default. Used by `ModelSection` (active tab), `CampusSection` (active node), `useContactForm`.
2. **Custom hook** — when stateful logic is non-trivial or reused. `useContactForm` is the reference example: state, field updates, validation, and submission in one testable unit, with the component left purely presentational.
3. **Lifted state / context** — only when genuinely shared across distant components. Nothing needs this today.
4. **Global store** — **not adopted, and not to be adopted without explicit approval.** See [Open Technical Decisions](#platform-wide-open-decisions).

Rules:

- Server state and client state are different problems; do not manage the former with the latter.
- Derive, don't duplicate — `activeModel` is computed from `activeId`, not stored separately.
- State lives at the lowest level that works.

> ✅ **Enforced.** No global state library exists, and none is needed at current scope.

## Data Organization

**Content is data, not markup.** Editorial copy lives in `src/data/`, typed against interfaces in `src/types.ts`, and is consumed by presentational components.

The pattern, established in `src/data/homepage.ts`:

```ts
// src/types.ts — the contract
export interface IconFeature {
  icon: LucideIcon;
  title: string;
  text: string;
}

// src/data/homepage.ts — the content
export const missionPillars: IconFeature[] = [ /* … */ ];

// src/components/sections/MissionSection.tsx — the presentation
{missionPillars.map((item) => /* … */)}
```

Why this matters: copy changes become one-line data edits with zero risk to layout, the same shape can later be sourced from a CMS or API without touching components, and content is reviewable by non-engineers.

Rules:

- Never hardcode user-facing copy inside JSX.
- Every exported data structure has an explicit type.
- Data files contain data — no logic, no side effects.
- Group by domain, not by type.

> ✅ **Enforced** for the homepage as of the July 2026 refactor.

## Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component file | PascalCase, matches the export | `HeroSection.tsx` |
| Page section | `*Section` suffix | `TransparencySection` |
| Hook file & export | `use*` camelCase | `useContactForm.ts` |
| Utility file | camelCase | `scroll.ts` |
| Data export | camelCase plural for collections | `modelPillars` |
| Type / interface | PascalCase, no `I` prefix | `IconFeature` |
| Props interface | `<Component>Props` | `ScrollButtonProps` |
| Boolean | `is` / `has` / `should` prefix | `isPlaying`, `hasSubmitted` |
| Constant | `SCREAMING_SNAKE_CASE` for true constants | `MAX_PARTICLES` |

- One primary export per component file, matching the filename.
- Names describe **role**, not implementation: `CohortSection`, not `GirlsGridSection`.
- Identifiers are English even when the content they carry is Spanish.

> ✅ **Enforced** by convention. No linter checks this.

## React Best Practices

Targeting **React 19**.

- Function components only.
- `React.FC<Props>` with an explicit props interface — the established convention in this codebase; stay consistent rather than mixing styles.
- Keep components under ~150 lines. Past that, extract.
- **Stable, meaningful `key` props.** Never array indices for lists that reorder.
- No logic in JSX — compute above the `return`.
- Hooks at the top level, never conditional.
- Effects are for synchronizing with external systems, not for deriving state. If it can be computed during render, compute it.
- Clean up every effect: `CinematicCanvas` cancels its animation frame and removes listeners on unmount — match that discipline.
- Optimize only with evidence. `useMemo`/`useCallback` are not free; measure before reaching for them.
- Prefer composition to configuration — a component with eight boolean props should be several components.

> ⚠️ **Partial** — followed by convention, but with no ESLint (and specifically no `eslint-plugin-react-hooks`), violations of the rules of hooks would not be caught.

## TypeScript Standards

**Target standard:**

- `strict: true`, and code written as though it were already on
- **No `any`.** Use `unknown` and narrow. If `any` is genuinely unavoidable, it carries a comment explaining why
- No non-null assertions (`!`) as a substitute for real handling
- Explicit interfaces for all props and all exported data
- Types shared across modules live in `src/types.ts`; single-use types stay local
- Explicit return types on exported functions
- `import type` for type-only imports

**Current reality ❌ — this is the most important status marker in this document.**

`tsconfig.json` does **not** set `strict`, and does not set any of its constituent flags. The following are all absent, and therefore default to `false`:

| Flag | Status |
|---|---|
| `strict` | ❌ absent |
| `noImplicitAny` | ❌ absent |
| `strictNullChecks` | ❌ absent |
| `noUnusedLocals` | ❌ absent |
| `noUnusedParameters` | ❌ absent |
| `noFallthroughCasesInSwitch` | ❌ absent |
| `forceConsistentCasingInFileNames` | ❌ absent |
| `noUncheckedIndexedAccess` | ❌ absent |

Combined with `skipLibCheck: true` and no `include`/`exclude` arrays, `npm run lint` is a **very permissive** check. A passing `tsc --noEmit` currently proves much less than it appears to.

**Practical consequence:** `strictNullChecks` being off means `undefined` flows silently through code that looks safe. Write defensively — the compiler is not helping you.

Enabling `strict` is a P1 backlog item. It will surface real errors; that is the point.

## Tailwind Standards

**Tailwind v4, CSS-first.** There is **no `tailwind.config.js`** and no PostCSS config. The theme is defined in the `@theme` block of `src/index.css`, and the build runs through `@tailwindcss/vite`.

To change a brand value, edit `@theme` in `src/index.css`. Do not create a config file.

Rules:

- **Prefer theme tokens over arbitrary values.** `bg-navy-950` over `bg-[#050A1A]`.
- Utility classes in markup are the default. Reach for a CSS class only for genuinely cross-cutting effects (the existing `.glass-panel`, `.gold-glow` helpers).
- Class order in the `class` attribute is irrelevant to styling — Tailwind precedence comes from stylesheet order. Never "fix" class order and never treat a reordering as a visual change.
- Repeated class strings become a component, not a copy-paste.
- Mobile-first: unprefixed base styles, then `sm:` `md:` `lg:`.

**Known problem ⚠️ — two parallel colour systems.** The theme defines `--color-gold-500: #d4af37` and a navy ramp, but components overwhelmingly hardcode the identical colours as arbitrary values: `text-[#d4af37]`, `bg-[#020712]`, `bg-[#050a16]`, `bg-[#07101f]`. Meanwhile `App.tsx` uses `bg-navy-950`. The same colour is expressed two ways depending on the file.

The consequence: **a rebrand currently requires a find-and-replace across every component instead of one edit to `@theme`.** Consolidation is a P2 backlog item; it is mechanical but touches nearly every file, so it needs its own change with visual verification.

Also note: the ramp defines `navy-800` and `navy-950` but **skips `navy-900`**.

> ⚠️ **Partial.**

## Animation Principles

Animation is handled by **`motion`** (the successor to Framer Motion) plus the bespoke canvas engine in `CinematicCanvas.tsx`.

- **Motion carries meaning.** Entrances orient, transitions preserve continuity. Decoration for its own sake is removed.
- **Fast and subtle.** Content transitions ~0.3 s; the hero entrance is deliberately slower (1.4 s) because it sets tone once.
- **Ease out** for entrances — motion decelerating into place reads as natural.
- **Animate cheap properties** — `opacity` and `transform` only. Never animate layout properties.
- **`AnimatePresence mode="wait"`** for swapping content, so exit completes before entry. Established in `ModelSection`, `CampusSection`, `ContactSection` — follow it.
- **Never animate on a loop without purpose.** Continuous motion draws the eye permanently and costs battery.
- **Respect `prefers-reduced-motion`.** Users who request reduced motion may have vestibular disorders; ignoring the setting can cause physical discomfort.

> ❌ **Not yet enforced** on the final point — there is no `prefers-reduced-motion` handling anywhere, despite this being the most animation-heavy page imaginable: a continuous 150-particle canvas plus `motion` transitions throughout. This is the highest-severity accessibility item after form labels.

## Responsive Design Rules

**Mobile-first.** Base styles target the smallest screen; larger breakpoints layer on.

Standard Tailwind breakpoints (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536). The codebase uses `sm`, `md`, `lg`.

Rules:

- Every feature works on a 360 px-wide viewport before it is considered done.
- **Navigation must be reachable at every breakpoint.**
- Touch targets ≥ 44×44 px.
- Test at 360, 768, 1024, and 1440.
- Content reflows; it does not scroll horizontally. The `overflow-x-hidden` on the page wrapper hides symptoms — it is not a fix.
- Typography scales at breakpoints rather than shrinking to illegibility.

> ❌ **Not yet enforced** — the header navigation is `hidden … lg:flex`. **Below 1024 px there is no navigation at all**, only the logo and the "Unirse" button. On phones — likely the majority of traffic — the site has no way to reach Misión, Modelo, Campus, Alianzas, or Contacto except by scrolling the entire page. This is a functional defect, not a styling preference.

## Future Platform Modules

Eight modules are planned. **None have been started. No technology has been chosen for any of them.**

This section defines *scope and consequences*, not solutions. Every module below is deliberately written without naming a stack. Where a technology appears, it appears as an option under evaluation inside an open question — never as a decision.

> **Read this before adding to this section.** A technology becomes a decision only when Ernesto explicitly approves it, at which point this document is updated to record the choice *and the reasoning*. Unused packages already sitting in `package.json` (`@google/genai`, `express`, `dotenv`) are leftovers from the Google AI Studio scaffold this repo was generated from. **They are not prior approval of anything.**

### Platform-wide open decisions

Nearly every module below depends on these. They are recorded once here rather than repeated eight times.

**OPEN — Routing.** The application currently renders a single page with no router. The first module requiring a second URL forces this decision. Considerations: whether URLs must be shareable and indexable (they must, for the Academy and Guidance Center), whether nested layouts are needed, and how routing interacts with the header currently nested inside `HeroSection`. *Undecided.*

**OPEN — Rendering strategy.** Client-only SPA, server-side rendering, or static generation? This is largely determined by SEO requirements for content-bearing modules and by whether any module needs per-request data. Note the current build is a purely static client bundle. *Undecided.*

**OPEN — Backend and data persistence.** There is no backend. The first module needing to store or retrieve anything forces this. Considerations: hosting model, data residency (Colombian operations, likely EU/US donors), backup and recovery, and cost at a foundation's budget. *Undecided.*

**OPEN — Authentication and identity.** Required by several modules below. Considerations: whether minors will ever hold accounts (this dramatically changes the legal and safety requirements), session management, and password recovery. *Undecided.*

**OPEN — Content management.** Whether editorial content stays in typed `src/data/` files (developer-edited, version-controlled) or moves to a CMS (staff-edited, decoupled from deploys). The current pattern is deliberately CMS-ready. *Undecided.*

**OPEN — Testing strategy.** No test runner exists. Before any module carrying money, personal data, or authentication ships, this must be resolved. *Undecided.*

---

### HERA AI

**Status: Not started.**

**Purpose.** An AI assistant supporting students, staff, and visitors — answering questions about the foundation, assisting learning, and reducing the staff burden of repetitive enquiries. Named for the institutional-memory role it plays.

**Expected capabilities.** Conversational Q&A grounded in the foundation's own material; assistance with study and research for students; routing complex enquiries to humans; retaining useful context within a conversation; operating in Spanish.

**Dependencies.** A backend capable of holding a model provider credential; a curated corpus of foundation content; a defined escalation path to humans; content moderation if students interact with it directly.

**Architectural implications.** This is the module that most decisively ends the static-hosting model — a model API key can never reach the client, so a server-side proxy becomes mandatory, which brings secret management, rate limiting, and abuse protection with it. Conversations with students constitute sensitive data about minors, triggering retention and access-control requirements. Per-request inference cost makes abuse a *financial* risk, not just a technical one. Response latency is inherent, so the UI must be designed around streaming and waiting.

**Open technical decisions.**
- Which model provider, and on what basis — capability in Spanish, cost per conversation, data-retention terms regarding minors? *Undecided.*
- Retrieval-augmented over foundation documents, or fine-tuning, or prompt-only grounding? *Undecided.*
- Are conversations persisted at all? If a student can talk to HERA, storing transcripts creates a serious duty of care. *Undecided — requires a policy decision before a technical one.*
- What are the safety guardrails, and who reviews them? *Undecided.*
- How is cost bounded against abuse? *Undecided.*

**Assumption to validate, not to build on:** that HERA is publicly accessible. It may be that HERA should be available only to authenticated students, which would make User Accounts a hard prerequisite.

### Guidance Center

**Status: Not started.**

**Purpose.** Extends the foundation's reach beyond the fifteen students to the wider public seeking direction on finances, habits, entrepreneurship, and life planning. A section for it already exists on the homepage (`OrientationSection`), currently resolving to a `mailto:` link.

**Expected capabilities.** Structured guidance content by topic; a request mechanism with a real intake flow; possibly self-assessment tools; a path from anonymous reading to human contact.

**Dependencies.** Content pipeline; form handling with actual persistence rather than a `mailto:`; routing if topics become their own pages; a defined human process behind requests.

**Architectural implications.** Intake collects personal circumstances — financial difficulty, personal struggles — which is sensitive data requiring encryption, access control, and a retention policy. The volume of enquiries could exceed staff capacity, so the flow must degrade honestly rather than silently dropping requests. If topics become individually addressable pages, this forces routing and shapes SEO strategy, since this module is likely the largest organic-search surface the foundation has.

**Open technical decisions.**
- Where do submissions go — email, database, ticketing system? *Undecided.*
- Is guidance content editorial (staff-authored) or partly generated via HERA? *Undecided.*
- Is there any account or follow-up mechanism, or is each request standalone? *Undecided.*
- What is the data-retention policy for the personal circumstances people disclose? *Undecided — a legal question before a technical one.*

### Academy

**Status: Not started.**

**Purpose.** The public-facing educational offering — curriculum, courses, and materials representing the Alborada model, potentially open beyond the enrolled cohort.

**Expected capabilities.** Course and curriculum browsing; structured content presentation; possibly enrollment; progress indication for enrolled users.

**Dependencies.** Routing; content management; likely User Accounts for anything tracking progress; media hosting for video.

**Architectural implications.** The first genuinely multi-page module, forcing routing and probably a rendering-strategy decision, since course content should be indexable. Content volume will exceed what typed `src/data/` files can comfortably hold, which likely forces the CMS decision. Media hosting introduces bandwidth cost and a CDN question. If it overlaps the Learning Platform, the boundary must be drawn deliberately — see that module's note.

**Open technical decisions.**
- Is the Academy public marketing for the curriculum, or the delivery mechanism itself? This determines whether it is a content site or an application. *Undecided — and it is the decision that most affects scope.*
- How is course content authored and stored? *Undecided.*
- Is enrollment required, and does it involve payment? *Undecided.*
- Where does video live? *Undecided.*

### Donations

**Status: Not started.**

**Purpose.** Accept financial contributions and connect them visibly to outcomes.

**Expected capabilities.** One-time and recurring donations; multiple currencies (Colombian operations, international donors); receipts and tax documentation; donor communication; a visible link between contribution and use of funds.

**Dependencies.** A payment processor; a backend for records; compliance with Colombian nonprofit financial regulation and with donor-jurisdiction tax-receipt requirements; the Transparency Dashboard for credibility.

**Architectural implications.** The highest-risk module in the platform. It handles money, so it carries PCI-DSS scope, fraud exposure, and legal obligations, and it demands a level of testing and error handling that nothing else here requires. Payment-processor availability and fee structure in Colombia is a real constraint. Recurring donations mean subscription state, failed-payment handling, and cancellation flows. Trust is the entire product: a payment error here damages the foundation's reputation far beyond the transaction. **This module must not ship without a testing strategy in place** — it is the strongest argument for resolving that open question early.

**Open technical decisions.**
- Which payment processor — availability in Colombia, international card support, fee structure, nonprofit rates? *Undecided.*
- Hosted checkout or embedded? Hosted dramatically reduces PCI scope at the cost of brand continuity. *Undecided, but the trade-off should weight compliance heavily.*
- How are tax receipts generated and for which jurisdictions? *Undecided.*
- Are donors identifiable in public materials, and with what consent mechanism? *Undecided.*
- How does donation data reach the Transparency Dashboard without exposing individual donors? *Undecided.*

### Transparency Dashboard

**Status: Not started.**

**Purpose.** Make the foundation's finances, governance, and progress independently verifiable. Per the Core Mission, transparency is a product feature — this module is its implementation. `TransparencySection` currently describes the intent.

**Expected capabilities.** Financial reporting on income and expenditure; campus construction progress; governance and institutional structure; published documents and reports; educational outcomes at an institutional level **without exposing any individual student's information**.

**Dependencies.** A data source for financial information; a document store; Donations for income data; a defined publication cadence and approval process.

**Architectural implications.** Data accuracy is the entire value — a wrong number here is worse than no dashboard. This demands a verification step between source data and publication, which is a *process* requirement with technical consequences. The child-protection constraint from the Core Mission binds absolutely: aggregate educational data must not be granular enough to identify any of fifteen students, and with a cohort that small, aggregation alone may not guarantee anonymity. Charting introduces the platform's first substantial visualization dependency and its own accessibility burden, since charts must be readable by screen readers.

**Open technical decisions.**
- Where does financial data originate — manual entry, accounting-system export, direct integration? *Undecided.*
- Is data live or published in reviewed periodic snapshots? *Undecided — leaning toward reviewed snapshots, since accuracy outranks freshness here.*
- What visualization approach, and how is it made accessible? *Undecided.*
- What is the minimum aggregation threshold that guarantees student anonymity with a cohort of fifteen? *Undecided — requires an explicit privacy analysis.*

### User Accounts

**Status: Not started.**

**Purpose.** Identity and personalization across modules — students, staff, donors, and community members.

**Expected capabilities.** Registration and authentication; role differentiation (student, staff, donor, public); profile management; account recovery; session management.

**Dependencies.** A backend; secure credential storage; email delivery for verification and recovery; a privacy policy and terms of service.

**Architectural implications.** Introduces authentication state as a genuinely global concern — the first thing that legitimately requires state beyond component-local, and therefore the trigger for revisiting the state-management decision. Roles imply authorization checks throughout the platform, which must be enforced server-side regardless of what the UI shows. **If students hold accounts, the platform stores authentication data for minors**, which changes the legal position substantially and may bring COPPA-like obligations depending on jurisdiction. Account deletion and data export become obligations under most privacy regimes.

**Open technical decisions.**
- Managed auth provider or self-hosted? Managed reduces the risk of getting security wrong — a serious consideration for a small team — at the cost of dependency and price. *Undecided.*
- **Do minors hold accounts?** *Undecided — and this must be answered first, since it changes every other decision in this module.*
- What is the role model, and how granular? *Undecided.*
- Session strategy and duration? *Undecided.*
- What is the data-deletion and export process? *Undecided.*

### Community

**Status: Not started.**

**Purpose.** Connect supporters, alumni, mentors, and allied organizations.

**Expected capabilities.** Member profiles; discussion or messaging; event coordination; mentor–student matching; organizational directory.

**Dependencies.** User Accounts (hard prerequisite); moderation tooling; a code of conduct; notification delivery.

**Architectural implications.** User-generated content means **moderation is mandatory, not optional** — this is the module with the highest ongoing human-operations cost, and building it without staffing moderation would be irresponsible. If students participate in any space adults can reach, child-safeguarding requirements dominate every technical consideration: vetting, supervised interaction, audit logging. Real-time features, if any, introduce infrastructure well beyond the current static model. Notifications bring delivery infrastructure and preference management.

**Open technical decisions.**
- **Do students interact with external adults at all?** *Undecided — this is a safeguarding policy question that must precede any technical work, and the answer may reasonably be "no."*
- Real-time or asynchronous? *Undecided.*
- What moderation model — pre-moderation, post-moderation, reporting-driven — and who staffs it? *Undecided.*
- How are mentors vetted? *Undecided — a process question with technical support requirements.*

### Learning Platform

**Status: Not started.**

**Purpose.** The system the students actually learn on day to day — the most ambitious module, and the one where the platform becomes institutional infrastructure rather than a website.

**Expected capabilities.** Course delivery and sequencing; assignments and submissions; progress tracking and assessment; personalized learning paths, potentially via HERA; instructor tools; parent or guardian visibility.

**Dependencies.** User Accounts; Academy (or a deliberate merge with it); HERA for personalization; substantial content infrastructure; media hosting; a backend with meaningful data modelling.

**Architectural implications.** By far the largest module — plausibly larger than everything else combined, and a strong candidate for being a **separate application** sharing design system and authentication rather than another section of this codebase. It holds detailed educational records about minors, the most sensitive data the foundation will ever store, with strict access control and retention requirements. Availability expectations rise sharply: if students depend on it for daily schooling, downtime stops education. Offline capability may be a genuine requirement depending on campus connectivity. This module would drive the platform's data model more than any other.

**Open technical decisions.**
- **Build or adopt?** Mature open-source learning management systems exist. Building bespoke is a multi-year commitment for a small team, and the honest default should be adoption unless a specific requirement rules it out. *Undecided — but this decision should be made early and deliberately, not by drift.*
- Is this a separate application or part of this codebase? *Undecided — leaning separate, given the scope disparity.*
- Where is the Academy/Learning Platform boundary? *Undecided — overlapping scope must be resolved before either is built.*
- What are the offline requirements? *Undecided — depends on campus connectivity, a physical-infrastructure fact not yet known.*
- What is the retention policy for minors' educational records? *Undecided — legal question.*

## Git Workflow

**Branches**

`main` is the deployable branch. Work happens on branches named by type:

```
feat/<short-description>      fix/<short-description>
refactor/<short-description>  docs/<short-description>
chore/<short-description>
```

**Commits**

Conventional Commits:

```
<type>(<scope>): <subject>

<body — what changed and why, not how>
```

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `perf`, `test`, `chore`.

- One logical change per commit.
- The body explains **why**. The diff already shows what.
- Never commit secrets. `.env*` is gitignored except `.env.example`.
- Never commit `node_modules/` or `dist/`.

**Before committing**

1. `npx tsc --noEmit` passes
2. `npx vite build` succeeds
3. Visual changes verified, or verified absent

> ⚠️ **Partial — and there is an immediate problem.** The repository has **exactly one commit** (`9737282`), and the entire modular architecture from the July 2026 refactor — roughly 25 files across `components/{layout,sections,ui,shared}`, `data/`, `hooks/`, and `utils/scroll.ts` — **is uncommitted and untracked**. It exists only in the working tree. A `git clean`, a bad checkout, or a disk failure loses all of it.
>
> **Committing this work is P0 and should happen before any further development.**

## Release Workflow

**Current state:** no CI, no automated deploy, no environments beyond local. Releases are manual.

**Target pipeline:**

1. **Verify** — type check, build, tests once they exist
2. **Review** — changes reviewed before reaching `main`
3. **Stage** — deploy to a preview environment
4. **Validate** — accessibility and performance checks against the preview
5. **Release** — merge to `main`, tag, deploy
6. **Observe** — monitor for errors after deploy

**Versioning:** semantic versioning once the platform has consumers beyond the site itself. `package.json` currently reads `0.0.0` with the scaffold name `react-example` — both should be corrected.

**Definition of done** for any change:

- [ ] Type check passes
- [ ] Production build succeeds
- [ ] Visual changes intentional and verified; unintentional changes proven absent
- [ ] Accessibility not regressed
- [ ] No new dependency without justification
- [ ] Architectural decisions explained in the commit body

> ❌ **Not yet enforced.** Steps 2–6 do not exist. No `.github/workflows`, no preview environment, no monitoring.

## Future Roadmap

Sequenced by dependency and risk rather than by excitement.

**Phase 0 — Foundation hygiene** *(immediate, blocking)*
Commit the refactor. Replace scaffold metadata in `index.html`. Fix `lang`. These are small, and the site cannot credibly launch without them.

**Phase 1 — Production readiness**
Close the accessibility gaps (labels, landmarks, `aria-hidden`, reduced motion). Add mobile navigation. Enable TypeScript `strict`. Add linting and formatting. Make the contact form actually deliver messages.

**Phase 2 — Quality infrastructure**
Testing framework. CI pipeline. Preview deploys. Error monitoring. This phase is a prerequisite for anything handling money or personal data.

**Phase 3 — First platform modules**
Transparency Dashboard and Donations, in that order — transparency establishes the credibility that makes donation a reasonable ask. Forces the routing and backend decisions.

**Phase 4 — Identity and engagement**
User Accounts, then Guidance Center at full scope, then Community if safeguarding questions resolve favourably.

**Phase 5 — Educational platform**
HERA AI, Academy, Learning Platform. The largest and least defined work, deliberately last — it depends on nearly everything above and on institutional decisions not yet made.

**Sequencing principle:** each phase leaves the platform in a coherent, shippable state. No phase depends on a later one.

---

## Appendix A — Known Gaps & Remediation Backlog

Every ⚠️ and ❌ above, consolidated. Verified by audit on 18 July 2026.

### P0 — Blocking

| # | Gap | Detail |
|---|---|---|
| 1 | **Refactor is uncommitted** | ~25 untracked files; repo has one commit. Work exists only in the working tree |
| 2 | **Scaffold metadata in `index.html`** | Title is `My Google AI Studio App`; no description, no Open Graph, no favicon. The site is unshareable |
| 3 | **`lang="en"` with Spanish content** | Wrong language announced to screen readers and search engines |

### P1 — Required before launch

| # | Gap | Detail |
|---|---|---|
| 4 | **No form labels** | Zero `<label>` elements; the `<select>` has no accessible name whatsoever |
| 5 | **No `prefers-reduced-motion`** | Continuous canvas animation plus `motion` transitions, with no way to opt out |
| 6 | **No mobile navigation** | Header nav is `hidden … lg:flex`; below 1024 px there is no navigation at all |
| 7 | **Zero `aria-*` attributes** | Including canvas not `aria-hidden`, and no `aria-live` on the form success state |
| 8 | **No `<main>` landmark** | Content is not inside a main region |
| 9 | **TypeScript `strict` disabled** | `strict`, `noImplicitAny`, `strictNullChecks` all absent from `tsconfig.json` |
| 10 | **Contact form fails silently** | Empty required fields produce no feedback; submission goes nowhere |
| 11 | **No skip-to-content link** | Keyboard users traverse the full nav on every section |

### P2 — Technical debt

| # | Gap | Detail |
|---|---|---|
| 12 | **Dual colour system** | Theme tokens and raw hex express identical colours; a rebrand needs a global find-and-replace |
| 13 | **Scaffold dependencies unused** | `@google/genai`, `express`, `dotenv`, `@types/express`, `autoprefixer` — none imported anywhere in `src/` |
| 14 | **`vite` duplicated** | Listed in both `dependencies` and `devDependencies` |
| 15 | **`clean` script targets nonexistent file** | `rm -rf dist server.js` — no `server.js` exists in the repo |
| 16 | **Package identity** | Name is `react-example`, version `0.0.0` |
| 17 | **Orphaned `src/utils/audio.ts`** | 208 lines, imported nowhere |
| 18 | **Unused types** | `AppView`, `CinematicState`, `FoundationPillar`, `Initiative` — declared, never referenced. `AppView`/`CinematicState` imply a cinema→homepage view switch `App.tsx` no longer performs |
| 19 | **No linter or formatter** | No ESLint (so no `react-hooks` rule enforcement), no Prettier |
| 20 | **No tests** | No runner, no test files. `coverage/` is gitignored for coverage that cannot be produced |
| 21 | **No CI** | No `.github/workflows`; every check is manual |
| 22 | **README is scaffold boilerplate** | Google AI Studio template with no Alborada content |
| 23 | **`navy-900` missing from ramp** | Ramp jumps `navy-800` → `navy-950` |
| 24 | **Canvas never idles** | 150-particle `requestAnimationFrame` loop runs continuously regardless of visibility |
| 25 | **`@` path alias unused** | Configured in both `tsconfig.json` and `vite.config.ts`; every import is relative |

**Context on P2 items 13–16, 22:** this repository was generated from a Google AI Studio scaffold and repurposed. Most of that cluster is scaffold residue rather than decisions anyone made. Removing it is low-risk and reduces confusion about what the project actually depends on.

---

*This document describes standards and current reality. When they diverge, the divergence is recorded rather than hidden. Keep it that way — a standards document that overstates compliance is worse than none.*
