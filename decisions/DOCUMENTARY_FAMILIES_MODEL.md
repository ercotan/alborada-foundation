# Documentary Families Model — F1–F4

**Approved engineering reference**

| | |
|---|---|
| **Status** | Approved · authoritative version |
| **Date** | 19 July 2026 |
| **Layer** | Engineering documentation — Layer 2, `PROJECT_CONSTITUTION.md` |
| **Location** | `decisions/` — **not** the institutional corpus |
| **Authority** | **None over any document in `docs/`.** Creates no doctrine, defines no institutional term, assigns no concept ownership |
| **Supersedes** | Proposal revisions 1 and 2 (working notes, not persisted) |
| **Companion** | `ADR-0001_STAGE_4_DIRECTION_CHANGE.md` — why Stage 4 changed direction |

---

## 1. Purpose and standing

This model classifies documents of the Alborada corpus by **documentary behavior and purpose** — how a document acts within the corpus, not what subject it covers.

It exists to answer one operational question: *how must this document be treated?* Its outputs inform editing discipline, ownership presumptions and domain analysis.

**It is descriptive.** It cannot create, modify or override institutional doctrine. Where this model and any document in `docs/` diverge, the institutional document prevails and this model is corrected.

---

## 2. The four families

### F1 — Foundational

**Definition.** Documents that constitute institutional reality by declaring it. The text performs the act it describes.

**Inclusion.** Necessary and sufficient: the document speaks in **performative first-person institutional voice** — *creemos · declaramos · establecemos · nosotros · reconocemos · afirmamos · nos comprometemos · prometemos · juramos · sostenemos · asumimos*.

**Exclusion.** Outbound explicit references to other documents exclude — a document deriving its authority by citation is not declaring independently. Third-person descriptive future (*"La Fundación tendrá"*) is description, not enactment, and does not qualify.

**Authority profile.** Creates doctrine · Owns concepts · Defines institutional meaning · Does not implement · Derives authority from no other document.

**Definition behavior.** Declares independently. Does not delegate, does not cite an owner. **This is legitimate and must be preserved** — a founding instrument citing another document for its own authority would be incoherent.

**Reference behavior.** Outbound explicit references: none expected. Mandatory dependencies: none. Latent dependencies: **outbound none by nature, inbound heavy** — other families consume F1 concepts constantly without declaring it.

**Concept ownership.** Natural owner of institutional concepts. Where an F1 document and any other define the same concept, F1 owns it and the other is reduced to a reference.

**Risks.** Constitutional declarations mistaken for delegated definitions, prompting an editor to "fix" a founding text by making it cite a subordinate one · Multiple F1 documents declaring the same concept independently, producing genuinely competing ownership · Silent inbound consumption leaving F1 concepts unlinked to their users.

---

### F2 — Normative

**Definition.** Documents that govern how other documents are produced, classified, related and approved. They regulate the corpus itself.

**Inclusion.** Necessary and sufficient: at least one **outbound explicit reference to another document by code**.

**Exclusion.** Performative first-person voice excludes — F1 takes precedence. A document regulating institutional *conduct* rather than institutional *documents* is F4, regardless of deontic density.

**Authority profile.** Implements existing doctrine · Owns documentary-governance concepts only · Coordinates process without owning institutional meaning · Does not create doctrine.

**Definition behavior.** References definitions from owners, and increasingly declares non-ownership explicitly. Post-Stage 2 this is the corpus's only family that routinely delegates.

**Reference behavior.** Explicit references expected and required. Mandatory dependencies present. Lowest latent-dependency density in the corpus, because Stage 2 made them explicit.

**Concept ownership.** Where the single-ownership principle is actually enforced. `# 1008` owns relationship types, `# 1003` owns levels and areas, `# 1006` owns version states — each referenced rather than restated by the others.

**Risks.** Duplicated authority — two normative documents defining the same taxonomy · An auditing instrument acquiring normative standing by proximity · Index documents restating their children.

---

### F3 — Technical

**Definition.** Documents whose **primary documentary purpose** is to define or explain how an institutional capability is built: technical architecture, engineering mechanisms, implementation models, or system design.

**Inclusion.** Both required:

1. Primary documentary purpose is technical architecture or engineering, **and**
2. The document appears in the F3 registry (§4).

**Exclusion.**

- Performative voice or outbound references exclude — F1 and F2 take precedence.
- **Technical vocabulary is not an inclusion criterion, at any density.** *Technical language is evidence, not authority.*
- A document establishing an institutional framework for **conducting an activity** is F4, regardless of subject matter or terminology.
- Absence from the registry → F4 by default until ratified.

**Authority profile.** Implements existing doctrine · Owns implementation concepts only · Consumes institutional concepts owned elsewhere · Does not create doctrine · Does not define institutional meaning.

**Definition behavior.** Restates definitions for implementation and defines implementation artifacts independently. **The restatement is the family's signature risk.**

**Reference behavior.** Explicit references: none measured. Mandatory dependencies: numerous and entirely undeclared — every F3 document depends on the doctrine it implements. Highest latent-dependency density in the corpus.

**Concept ownership.** May own technical concepts; must not own institutional ones. `# 16` owning `motor` is correct; `# 16` defining `inteligencia institucional` would not be.

**Risks.** **Implementation language mistaken for doctrine** — the family's signature risk · Layer vocabulary colliding across documents · A technical document becoming the de facto definition of an institutional concept because it is the most precise text available.

---

### F4 — Operational

**Definition.** Documents whose **primary documentary purpose** is to govern, operate, coordinate or manage institutional activities — **even when they contain extensive technical terminology.**

**Inclusion.** Primary purpose is the conduct of institutional activity. Residual and deterministic: every document failing F1, F2 and F3 is F4.

**Exclusion.** Any positive F1, F2 or F3 test.

**Authority profile.** Implements existing doctrine · Consumes concepts owned elsewhere · Coordinates processes without owning their definitions · Does not create doctrine · Does not define institutional meaning · **May legitimately own concepts and scales specific to its own domain.**

**Definition behavior.** Predominantly **uses concepts without defining them** — constant consumption, near-zero declaration.

**Reference behavior.** Explicit references: none, corpus-wide. Mandatory dependencies present in substance, absent in text. Latent dependencies: **the largest unmeasured mass in the corpus.**

**Concept ownership.** Consumes far more than it owns. Where an F4 document appears to define an institutional concept, the presumption is that it restates an F1 or F2 definition and should be reduced to a reference — **rebuttable**, because domain-specific concepts legitimately originate in F4. Of the eight scales registered in `# 1011`, five are owned by F4 documents.

**Risks.** **Silent concept consumption** — the corpus's dominant defect · Parallel definitions arising in adjacent domains (§6.1) · Domain-specific concepts never registered, leaving them ownerless · Operational specialisation of a general principle mistaken for contradiction.

---

## 3. Classification procedure

Applied in order. First match wins. Every step is evaluated on a single document in isolation.

```
1.  Performative first-person institutional voice present ?   → F1
2.  Outbound explicit reference to another document ?         → F2
3.  Primary purpose is technical architecture or engineering
    AND document is in the F3 registry (§4) ?                 → F3
4.  otherwise                                                 → F4
```

**Precedence is load-bearing.** F1 precedes F2 because a founding text that happens to cite a document is still foundational. F2 precedes F3 because a normative document about technical documentation is normative. F4 is residual, so the procedure always terminates.

**Two mechanisms, two jobs.** Enumeration delivers **determinism** — for the existing corpus, step 3 is a registry lookup and two reviewers cannot disagree. The purpose test delivers **validity** — it governs admission to the registry and is a judgement, not a measurement.

**Default is F4.** An unratified document never silently acquires technical standing. The failure mode always runs toward the family holding the least authority.

---

## 4. F3 registry

Six members. Every other document in the corpus is F1, F2 or F4.

| Document | Why its primary purpose is technical rather than operational |
|---|---|
| `# 16_HERA_TECHNICAL_ARCHITECTURE` | States its own purpose as defining HERA's technical architecture: *"Este documento define la arquitectura técnica de HERA."* |
| `# 08_HERA_ARCHITECTURE` | Specifies HERA's architectural composition rather than governing any activity HERA performs |
| `# 24_HERA_OPERATING_SYSTEM` | Defines HERA's system-design model — the coordination layer orchestrating institutional resources — not the conduct of any process |
| `# 52_ENTERPRISE_ARCHITECTURE_AND_SYSTEMS_INTEGRATION` | *"establece el modelo de Arquitectura Empresarial"* — an integration architecture for institutional components |
| `# 17_CAMPUS_ENGINEERING_MASTERPLAN` | *"establece los criterios técnicos para el diseño, construcción y expansión"* — engineering standards governing how the campus is built, not how it is run |
| `# 27_DIGITAL_TWIN_ARCHITECTURE` | Specifies the twin's structure and composition, as distinct from `# 59`, which frames the same subject as an operational capability |

### 4.1 Governance of the registry

**Owning authority: the Architecture authority — Layer 2, `PROJECT_CONSTITUTION.md`.** Admission requires ratification by that authority. The registry is governed, not frozen.

Justified under the Stage 2 single-ownership principle by elimination:

- **The Documentation authority is excluded.** `# 1003` already owns institutional document classification. Granting it the F3 registry would give one owner **two classifications of the same object** — the duplicated-authority defect Stage 2 broke four times in S-01…S-04 — and would make family a documentary classification, contradicting the orthogonality established in §7.
- **The Constitutional authority is excluded.** The Consejo Superior de Gobierno owns doctrine. This registry creates none. Assigning it there would attribute a standing the model explicitly disclaims and place an engineering artifact under constitutional cadence.
- **Layer 2 is the only layer whose subject matter is architecture**, defined in `PROJECT_CONSTITUTION` as authority over *"engineering philosophy, architectural principles, workflow — the how"*.

**No new institutional organ is to be created for this purpose.** Fabricating an architecture body inside `docs/` to govern an engineering artifact would invert the layer relationship.

**Transfer condition.** If documentary family is ever written into `# 1005` metadata, ownership of the registry **transfers to the Documentation authority** — at that point it ceases to be an engineering register and becomes a property of institutional documents. Ownership follows the artifact, consistent with the conceptual-versus-documentary ownership model already ratified. This is the principal reason family classification is currently held in engineering documentation only.

---

## 5. Single-valuedness, secondary layers, decomposition

### 5.1 A document may legitimately contain two documentary layers

This is affirmed, not merely tolerated. The corpus already recognises it: **§13 *Required Splits* of `DOCUMENTATION_NORMALIZATION_PLAN.md` is in effect a register of dual-layer documents** — `# 1000` carried an index layer plus a restatement layer (resolved in S-01); `# 18` is a Nivel 1 document containing Nivel 5 protocol content (S-05); `# 34` conflates an organ with the roles inside it (S-06).

### 5.2 Family nonetheless remains single-valued

**Because family is an operational disposition, not a description.** It answers *how must this document be treated?* — and editing discipline, ownership presumption and review requirements each need exactly one answer. A document simultaneously F1 and F4 would be subject to *"not edited without a ruling"* and *"operationally editable"* at once. That is not a classification; it is an unresolved conflict wearing a label.

### 5.3 Selection rule

Precedence per §3: **F1 > F2 > {F3 | F4}**.

F1 and F2 form an **authority gradient**. F3 and F4 do not — both implement, and purpose separates them. Default-to-F4 within the implementer tier therefore does not contradict precedence by authority: precedence resolves *multiple layers detected*, the default resolves *none detected*.

**Why the highest authority layer wins.** The risk is asymmetric. Filing doctrine as implementation licenses unauthorised edits to doctrine. Filing implementation as doctrine merely over-protects it. Only one direction of error is expensive.

### 5.4 Secondary layers and decomposition candidacy

A second layer may be **recorded as a secondary profile**. It carries no authority, never overrides the primary, and **never creates dual family membership**.

Where a secondary layer is **substantive** — it owns concepts rather than merely adopting a register — the document becomes a **decomposition candidate**, routed to §13 *Required Splits*. Decomposition is content surgery and requires institutional approval; it is never performed on the strength of this model alone.

**Known case.** `# 06_HERA_PERSONALITY` classifies F4 on behavior — no performative voice, no references, no technical purpose — yet is the documentary owner of the canonical HERA definition. It is a genuine dual-layer document and a decomposition candidate. Its resolution is deferred to domain architecture.

**This case exposes a real limit of the model:** the family tests read *behavior*; ownership is a separate axis they cannot see. Detecting a doctrinal secondary layer requires consulting the `# 1011` ownership registry, not the family tests alone.

---

## 6. F4 is one family

**F4a — overlapping domains with competing or parallel definitions — is not a family.** It is a **domain-analysis risk**.

A family must be assignable by examining a single document. "Competing definition" is a two-document predicate: `# 25` in isolation is indistinguishable from `# 19` in isolation, and what makes it look like F4a is the existence of `# 47` and `# 60`. Admitting it would mean a document's family could change when an unrelated document is added or removed elsewhere in the corpus.

**F4b — consumption of institutional concepts without declared dependencies — is not a family.** It is a **corpus-wide behavioral observation**.

Silent consumption is the behavior of every family except F2, and F2 escapes it only because Stage 2 explicitly fixed it. Measured concept consumption per 100 lines with zero outbound references: constitutional 2.7 · technical 6.6 · operational clustered 2.9 · operational dispersed 2.6. Technical documents consume more silently than the dispersed operational documents the label was coined to describe.

**Silent consumption is preserved as legitimate.** An operational document consuming institutional doctrine without a citation is normal corpus behavior. The remedy is to declare the dependency, never to reclassify the document.

---

## 7. Orthogonality

Documentary family is **orthogonal** to each of the following. None is derived from another, and none may be inferred from family.

| Axis | Owner | What it answers |
|---|---|---|
| **Documentary family** | This model (engineering layer) | How does the document behave? |
| **`# 1003` document type and level** | `# 1003` | What rank and type is the document? |
| **Institutional domain** | Stage 4 domain architecture | What subject does it cover? |
| **Concept ownership** | Owning documents, registered in `# 1011` | Which document holds a definition? |
| **Relationship type** | `# 1008` | What links two documents? |

**Proof of orthogonality against `# 1003`:** `# 00` (F1), `# 17` (F3) and `# 19` (F4) all sit at Nivel 1 within the `00`–`99` range. One `# 1003` level contains three families, so family cannot be a relabelling of level.

**Concept ownership is governed independently.** This model states, per family, the *presumption* applying when apparent ownership is found. Every presumption is rebuttable and resolved by the owning document plus the `# 1011` registry. The model assigns no ownership and creates no second ownership system.

---

## 8. Lessons learned during model development

These are engineering rationale and are preserved deliberately. Each was a correction to work already performed, and each cost real effort to discover.

**Title similarity was not evidence of duplication.** Twelve clusters were identified as redundant on the strength of identical or permuted titles, and a plan to delete ~28 documents was built on it. Line-level measurement found real overlap of 0.0–14.8 %, mean 6.0 %. Documents with identical H1 titles shared 8.3 % of their content; two cultural-doctrine documents shared nothing at all. Recorded in full in ADR-0001.

**Vocabulary density was not evidence of documentary purpose.** F3 was first defined by technical-term density above a threshold. Tested against the documents it was designed to classify, the rule was **wrong three times in nine** — one false positive (`# 29`, campus operations misread as architecture) and two false negatives (`# 17`, and `# 27` by 0.1 against an arbitrary 4.0 threshold). The corpus marks the distinction itself, in its purpose statements: *"define la arquitectura técnica de…"* against *"establece el marco institucional para…"* — a signal invisible to any word count.

**Clustered sampling produced misleading conclusions.** Pilot 4 drew its sample from two thematically overlapping clusters and reported competing definitions. Pilot 5 applied the identical method to a dispersed sample and found none. Having selected documents *because* they were related, the first pilot then found them related. The dispersed control was requested externally, not proposed by the analysis.

**Domain-specific concept lists introduced sampling bias.** The first measurement of concept consumption used knowledge-domain concepts against a sample drawn largely from the knowledge cluster, and appeared to confirm the F4a/F4b split decisively. It was an artefact of choosing concepts aligned with the sample — the same error as the title-similarity failure, committed while investigating it. Re-measured with institution-wide concepts, the difference vanished.

**Reviewer agreement and model validity are different properties.** Two reviewers applying the density rule to `# 29` would both compute the same numbers and both reach the same wrong answer. Perfect agreement, invalid result. What the revised model improved is validity; determinism is supplied separately, by ratified enumeration. **A reproducible procedure is not thereby a correct one**, and a metric that cannot distinguish the two will certify a broken rule.

**Documentary behavior and concept ownership are independent analytical axes.** `# 06` behaves as F4 on every behavioral test yet owns the canonical HERA definition. `# 14` was provisionally flagged as a dual-layer technical case on the strength of a heading — *"Los cinco niveles de memoria"* — read as system tiers. Its content proved otherwise: Nivel II *Memoria Operativa* enumerates inventories, maintenance, agriculture and solar panels. It is an institutional information taxonomy, and `# 14` is an ordinary F4 document owning a domain-specific scale, matching `# 19`, `# 12`, `# 15` and `# 57`. **Structure inferred without reading content produced the same class of error a third time.**

---

## 9. Known limitations

**9.1 F3 does not generalise.** The registry covers today's corpus; new technical documents require ratification. This is the deliberate price of removing the density proxy.

**9.2 The registry can drift.** If ratification is skipped, the registry ages while still reporting perfect reviewer agreement. Default-to-F4 bounds the damage to under-classification but does not prevent drift.

**9.3 The purpose test rests on self-declaration.** All six F3 members were identified largely from their own purpose statements. A document that mis-describes its own purpose would misclassify, and no independent check exists.

**9.4 `# 06` remains unresolved** — behavior and ownership diverge; deferred to domain architecture.

**9.5 Evidence is partial.** 38 of 114 documents measured behaviorally; 17 purpose statements read. F3 rests on six members.

**9.6 F2's clean profile is partly self-made.** Every F2 reference was written during Stage 2 by the process that also produced this model. The circularity recorded in `# 1012` §5.4 applies here too.

**9.7 Latent dependencies remain unmeasured.** The model asserts that F3 and F4 carry heavy undeclared dependencies without quantifying them, because no instrument measures them.

---

## 10. Open items

| # | Item | Status |
|---|---|---|
| **O-4** | Whether family is recorded in `# 1005` metadata | **Engineering-only.** Revisiting triggers the §4.1 transfer condition |
| **O-5** | `# 06` ownership resolution | Deferred to domain architecture |
| **O-6** | Re-validation trigger | Re-run §8 measurements when the corpus contains references authored outside the Stage 2 criterion |
| **O-8** | Detailed F3 admission procedure | Authority settled (§4.1); procedural detail pending |

---

## 11. Maintenance

Amendments to the F3 registry require ratification by the Architecture authority and a recorded justification of primary documentary purpose.

Amendments to family definitions require re-validation against the pilot sample.

Where this model diverges from `# 1003`, `# 1008`, `# 1011`, `# 1012`, or any owning document, **the institutional document prevails and this model is corrected.**

---

*Engineering reference. Layer 2. No authority over the institutional corpus.*
