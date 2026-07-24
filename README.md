# Alborada Foundation

Building the next generation of human development, education, artificial intelligence, and institutional excellence.

This repository contains the official website of Fundación Alborada and the institutional documentation corpus that underpins the wider platform.

---

## Repository contents

| Path | Contents |
|---|---|
| `src/` | Application source — React 19, TypeScript, Tailwind CSS v4 |
| `docs/` | Institutional documentation corpus — normative. Series `# 1000`–`# 1011` plus the `00`–`100` range |
| `engineering/` | Engineering artifacts — decision records (`ADR-####`), standards (`STD-####`), reference models (`REF-####`). **Non-normative**, outside the institutional corpus. Start at `engineering/INDEX.md` |
| `legal/` | **Draft** legal documents in preparation (data-treatment policy, privacy notice, form consent). Not yet approved, not part of the institutional corpus; migrate into `docs/` on approval. Start at `legal/INDEX.md` |
| `ARCHITECTURE.md` | Software architecture specification |
| `PROJECT_CONSTITUTION.md` | Engineering philosophy and workflow |
| `MASTER_DEVELOPMENT_GUIDE.md` | Technical standards and current-state gap ledger |
| `DOCUMENTATION_NORMALIZATION_PLAN.md` | Plan for consolidating the knowledge base |
| `CLAUDE.md` | Rules for AI-assisted engineering in this repository |

---

## Run locally

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

No environment variables are currently required. The application is a static client-side build with no backend, no database, and no external API integrations.

## Available scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type check (`tsc --noEmit`) |

---

## Before contributing

Read `CLAUDE.md` and `PROJECT_CONSTITUTION.md` first. Two rules matter most:

- **Visual changes require approval.** Refactors must produce identical rendered output, proven rather than asserted.
- **No unapproved technologies.** No framework, database, or service enters the project without an explicit decision recorded as an ADR.

Verification before any commit:

```bash
npx tsc --noEmit
npx vite build
```

---

© Fundación Alborada
