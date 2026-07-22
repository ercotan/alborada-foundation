# Engineering Artifact Registry

**Non-normative engineering layer · Not part of the institutional corpus**

| | |
|---|---|
| **Layer** | Layer 2, `PROJECT_CONSTITUTION.md` — engineering philosophy, architectural principles, workflow |
| **Owning authority** | Architecture authority — owns the registry, admission, updates and retirement |
| **Authority over `docs/`** | **None.** On divergence with any institutional document, the institutional document prevails |

---

## Registry

| ID | Title | Type | Status | Date | Superseded by |
|---|---|---|---|---|---|
| `ADR-0001` | Stage 4 direction change: merge consolidation → domain architecture | Record | Accepted | 2026-07-19 | — |
| `ADR-0002` | Phase P0 engineering foundations | Record | Accepted | 2026-07-22 | — |
| `STD-0001` | Estándar de Auditoría de Referencias Documentales | Instrument | Approved | 2026-07-19 | — |
| `REF-0001` | Documentary Families Model F1–F4 | Instrument | Approved | 2026-07-19 | — |

---

## Identifiers

| Prefix | Type |
|---|---|
| `ADR-####` | Architecture decision record |
| `STD-####` | Engineering standard, methodology, auditing standard |
| `REF-####` | Approved engineering reference model |

**None of these identifiers belongs to the `# 1003` institutional coding system.** Sequences are independent per prefix. Identifiers are assigned at ratification, never at drafting, so abandoned drafts consume none.

Bare numbers are never used. In this repository a bare number always denotes a `# 1003` document code, and `# 1003` claims the entire numeric space from `0000` to `9000`. A prefix makes collision impossible rather than merely manageable.

---

## Scope

An artifact belongs here when **all four** hold:

1. It creates no institutional doctrine — defines no institutional term, imposes no obligation, confers no rights.
2. It holds no authority over any document in `docs/`.
3. Its subject is method, decision rationale, or engineering practice.
4. **Its removal would leave no institutional rule without a source.**

Criterion 4 is decisive. Any document failing it is doctrine and belongs in `docs/`, whatever it calls itself.

---

## Reference direction

References run in one direction only:

```
engineering/  →  docs/        permitted
docs/         →  engineering/ never
```

Engineering artifacts cite institutional documents freely. **No institutional document cites an engineering artifact.** This makes circular authority structurally impossible rather than merely absent.

---

## Discoverability

Provided at repository level by `README.md`, and by this register. **Never by the normative index of `# 1000`**, which remains entirely unaware of this layer — a pointer inside a section titled `ARQUITECTURA NORMATIVA` is read as normative by every subsequent reader, and the constraint is easier to hold at zero than at one.

---

## Distribution profiles

Two profiles exist.

**Institutional Corpus** — `docs/` only.

**Governed Corpus Package** — `docs/` plus the engineering instruments required for auditing, validation or ingestion. Currently `STD-0001` and `REF-0001`.

Portability is solved by **packaging, never by classification**. No engineering artifact is placed inside `docs/` to make it portable. A future packaging manifest may declare which artifacts accompany a governed export; that manifest lives here and never in the institutional corpus.

---

## Lifecycle

| Phase | Rule |
|---|---|
| **Creation** | Any contributor may draft. The draft states its type, its layer, and that it holds no authority over `docs/` |
| **Review** | Compatibility audit against `# 1003`, `# 1008`, `# 1011`, `STD-0001` and `PROJECT_CONSTITUTION`. An artifact that fails is not admitted |
| **Approval** | Ratification by the Architecture authority. Identifier assigned here |
| **Revision** | In place, with a document-history entry distinguishing changes that alter conclusions from those that do not |
| **Supersession** | The superseding artifact receives a new identifier; the superseded one is marked and retained |
| **Archival** | **Nothing is deleted.** Status changes to `Superseded` or `Withdrawn`; the artifact stays in the registry |

Retention is not sentimentality. `ADR-0001` exists because a contributor finding no merges executed against a plan that promised fifteen would otherwise have to re-derive why.

---

## Transfer condition

If an artifact is ever adopted as institutionally binding it ceases to be an engineering artifact: it migrates into `docs/`, receives a `# 1003` code, enters the `# 1007` approval workflow, and **ownership transfers to the Documentation authority.** Ownership follows the artifact.

---

*Engineering registry. Layer 2. No authority over the institutional corpus.*
