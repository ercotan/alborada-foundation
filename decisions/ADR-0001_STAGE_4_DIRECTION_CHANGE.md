# ADR-0001 — Stage 4 direction change: from merge consolidation to domain architecture

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-07-19 |
| **Scope** | Documentation normalization, Stage 4 |
| **Supersedes** | The merge strategy in `DOCUMENTATION_NORMALIZATION_PLAN.md` §12 (M-01 … M-15) |
| **Type** | Engineering record — **not normative**, defines no institutional doctrine |
| **Related** | `# 1008` (relationship taxonomy) · `# 1012` (reference auditing standard) · plan §12.2, §15.1 |

---

## 0. Documentary layer

**This ADR belongs to the engineering documentation layer. It is not part of the institutional normative corpus.**

| | |
|---|---|
| **Location** | `decisions/` — alongside `ARCHITECTURE.md`, `DOCUMENTATION_NORMALIZATION_PLAN.md`, `MASTER_DEVELOPMENT_GUIDE.md` |
| **Not in** | `docs/` — the institutional corpus |
| **Governed by** | Nothing in `docs/`. It carries no document code, no `# 1003` level, no `# 1005` metadata, and does not enter the `# 1007` approval workflow |
| **Authority** | **None over any institutional document.** It records why an engineering decision was taken. It cannot create, modify or override doctrine |
| **Audience** | Future contributors to the normalization programme |

Placing this record inside `docs/` would be the same error avoided with `# 1012`: an engineering artifact acquiring apparent doctrinal standing by proximity. Whether ADRs are eventually indexed by the N-05 non-normative registry, or remain permanently outside the corpus, is deferred to Stage 5 (plan §15.1).

---

> **What this document is for.** Stage 4 was planned as a consolidation that would reduce the corpus from 112 documents to ~84. It executed no merges. A future contributor finding that discrepancy needs to know whether the plan was abandoned through neglect or withdrawn on evidence. It was withdrawn on evidence, and this record holds that evidence so the decision does not have to be re-derived or re-litigated.

---

## 1. Original hypothesis

**H1 — Roughly a quarter of the corpus is redundant and can be eliminated by merge without losing a single idea.**

Operationalised as fifteen merges (M-01 … M-15) eliminating ~28 documents, sequenced *before* renaming so that documents destined to disappear would never be renamed.

The hypothesis rested on four observations, all real:

| Observation | Example |
|---|---|
| **Identical H1 titles** | `# 26` and `# 49` both titled `SISTEMA DE INVESTIGACIÓN, DESARROLLO E INNOVACIÓN (I+D+i)` |
| **Titles as word-order permutations** | `# 44` *Performance Management and Institutional Excellence* ↔ `# 77` *Institutional Excellence and Performance Management* |
| **Shared opening framings** | `# 35`, `# 46`, `# 75` all open *"ninguna institución… trabajando de manera aislada"* |
| **Shared-line counts** | `# 38`↔`# 70` shared 55 lines, the highest measured in the corpus |

A fifth observation was read as corroboration: the corpus has a **2.3× length spread, strongly unimodal at 480–530 lines** — the signature of content generated to a target length rather than written to the natural size of its subject.

**H1 was stated in the plan's executive summary as settled fact**, not as a hypothesis requiring verification: *"roughly a quarter of the corpus is duplicated… approximately 28 documents can be eliminated by merge without losing a single idea."*

---

## 2. Evidence collected

### 2.1 The measurement that ended it

Run immediately before executing M-05 (`# 44` + `# 77`, classified *Low effort* and therefore chosen as the safe first merge).

**Method.** For each pair, extract content lines — excluding blanks, headings, `---` separators, table rows, and the `Versión` / `Fundación Alborada` footer boilerplate; trim whitespace and bullet markers; keep lines over 20 characters; deduplicate. Overlap = set intersection, expressed as a percentage of the smaller document.

| Cluster | Pair | Shared lines | Overlap |
|---|---|---|---|
| D1 | `25` ↔ `47` | 3 | 2.6 % |
| D1 | `25` ↔ `60` | 2 | 1.7 % |
| D1 | `47` ↔ `60` | 8 | 6.9 % |
| D2 | `26` ↔ `49` | 10 | 8.3 % |
| D3 | `27` ↔ `59` | 4 | 4.5 % |
| D4 | `35` ↔ `46` | 16 | 11.9 % |
| D4 | `35` ↔ `75` | 8 | 5.8 % |
| D4 | `46` ↔ `75` | 20 | **14.8 %** — highest |
| D5 | `44` ↔ `77` | 9 | 8.3 % |
| D6 | `61` ↔ `98` | 15 | 11.2 % |
| D7 | `21` ↔ `48` | 4 | 5.9 % |
| D8 | `00` ↔ `67` | 1 | 0.9 % |
| D9 | `66` ↔ `84` | 1 | 1.1 % |
| D10 | `02` ↔ `88` | 0 | **0.0 %** — lowest |
| D11 | `41` ↔ `71` | 7 | 5.7 % |
| D12 | `12` ↔ `30` | 4 | 4.2 % |
| §8.1 | `38` ↔ `70` | 11 | 8.7 % |

**n = 17 pairs · range 0.0 %–14.8 % · mean 6.0 %**

The two clusters described in the plan as most obviously redundant produced the clearest refutation. `# 26`↔`# 49`, carrying **identical titles**, share 8.3 % of their content. `# 02`↔`# 88`, both cultural doctrine, share **nothing at all**.

### 2.2 Limitation of this evidence

This is **exact-line matching**. Two documents can state the same idea in different words and score 0 %. The measurement therefore supports *"not textually duplicated"* far more strongly than *"not semantically redundant."*

This limitation is load-bearing and must not be forgotten: **the merge plan was withdrawn on textual evidence, and semantic redundancy across the corpus remains an open, unmeasured question.** Nothing in this ADR establishes that the corpus contains no redundancy — only that the specific merges proposed were not supported by the evidence offered for them.

### 2.3 Where H1 was actually correct

H1 held in the **1000-series**, and the plan's own analysis said so: `# 1000` measured SUBSTANTIAL against six of its ten siblings — the highest-overlap node in the corpus. That was genuine duplication: `# 1000` restated the content of its own children.

It was resolved in **Stage 2 (S-01)** by reducing `# 1000` from 410 to 210 lines and converting it to a pure index that owns nothing. Content was removed because a verified single owner already held it elsewhere.

**So the hypothesis was not globally false. It was true of the eleven-document normative series and false of the hundred-document doctrinal corpus, and it was generalised from the former to the latter without re-testing.**

---

## 3. Pilot chronology

Five pilots, 49 documents. Each was commissioned to test whether relationships could be classified reliably; together they became the evidence base for the replacement architecture.

| # | Sample | Constraint imposed | Outcome |
|---|---|---|---|
| **P1** | 1000-series (11 docs) | `# 1008` remains sole owner of the relationship taxonomy; detected types annotated as *candidate* only, never written back | Relationships classifiable in the normative series, where references are explicit |
| **P2** | HERA cluster | Commissioned explicitly as a second validation *before* any change to `# 1008` | Confirmed P1 without touching the owner document |
| **P3** | Constitutional cluster (`00`, `66`, `67`, `82`, `83`, `84`, `85`) | **No thematic proximity as evidence. No hierarchy inferred from numbering.** | Under strict rules, far fewer relationships survived than proximity suggested |
| **P4** | F4 representative sample | — | Reported *competing definitions* between documents |
| **P5** | F4 **dispersed** sample | Sample deliberately drawn across unrelated areas | **Zero** competing definitions |

**P4 → P5 is the pivotal sequence.** P4's sample was assembled from two thematically overlapping clusters. Having selected documents *because* they were related, it then found them related. P5 applied the identical method to a dispersed sample and found nothing.

The dispersed control was requested externally, not proposed by the analysis. Without it, P4's finding would have entered the record as a corpus-wide property when it was an artefact of sampling.

### 3.1 The standard's own back-test

The deterministic classification rules derived from the pilots were back-tested against all five. **They failed three.**

| Failure | Mechanism | Rate | Resolution |
|---|---|---|---|
| Self-reference by phrase | *"este documento establece…"* read as a reference to another document | 36 % false positives on the T1 marker set | **C1** — exclusion filter R0b |
| Markers without targets | Deference verbs with no identifiable destination | 67 % false positives on the T3 marker set | **C2** — exclusion filter R0d |
| Diagram and code content | Mermaid node labels parsed as prose references | — | **C3** — exclusion filter R0c |
| **Latent references** | A document invoking a concept defined elsewhere without naming its source | **Unresolved** | **C4 — declared out of scope** |

Post-correction, on the 1000-series: 21 raw marker hits reduced to **8 detected edges**, matching manual classification exactly — 100 % precision, 47 % coverage.

```
1000→1003   1004→1003   1004→1006   1005→1006
1005→1008   1010→1003   1010→1004   1011→1007
```

**Confidence caveat, recorded deliberately:** all eight detected edges are Stage 2 edits. The standard was validated against text written by the same process that produced the standard. **This is not independent evidence**, and the caveat is carried in `# 1012` itself rather than left in a working note.

---

## 4. Why the hypothesis failed

**Mechanism: the corpus was generated against a common template to a target length. That produces structural homogeneity, not content duplication.**

Shared template output — the same section skeleton (`PROPÓSITO`, `MISIÓN`, `VISIÓN`, `FILOSOFÍA`, `PRINCIPIOS`, a numbered *Los Treinta Principios* block, `DECLARACIÓN FINAL`), the same title grammar, the same closing cadence — makes two documents *look* like one document written twice. The bodies differ.

The unimodal length distribution was in the plan from the beginning and was read as **corroborating** duplication. It was in fact the **explanation for its appearance**: documents cluster at 480–530 lines because they were generated to that length, not because they say the same thing.

**The specific inferential error: title similarity was treated as a proxy for content similarity, and never tested.** Titles are the cheapest signal in a corpus and the most sensitive to a shared generation process. They were the strongest evidence offered for a plan to delete 28 documents.

### 4.1 Process failure, recorded because it is the more useful lesson

The concern that eventually stopped the plan **was raised before the measurement, and not acted upon.**

In an earlier clarification round the risk was put directly: documents with similar titles might not have similar content. The response was reassurance rather than measurement. The merge plan proceeded to the point of execution and was halted only when a content audit was run at M-05 — the fifth merge, and the first one actually attempted.

Four merges (M-01 … M-04) had already been designed on the same unverified basis, three of them three-way.

**The plan was not saved by its own analysis. It was saved by an outside objection, raised twice, that the analysis had dismissed once.** The technical lesson in §5.1 is real, but subordinate to this one: the measurement that would have falsified H1 in minutes was not run until someone insisted.

---

## 5. Architectural lessons

### 5.1 Structural similarity is a hypothesis; only content is evidence

Titles, headings, section skeletons and length are properties of how a document was *produced*. Redundancy is a property of what it *says*. In any template-generated corpus the first correlates with the second so weakly as to be useless.

**Adopted as a permanent gate** (plan §18, gate 2): no structural action on a cluster without line-level content verification.

### 5.2 Sample selection determines findings

P4 selected thematically and found thematic relationships. P5 selected dispersely and found none. Same method, same corpus, opposite conclusions.

**Any corpus-wide claim requires a dispersed control sample.** A finding from a purposively-selected cluster describes the cluster, never the corpus.

### 5.3 An instrument must declare what it cannot do

The classification standard achieves full precision on explicit references and **cannot detect latent ones at all**. Rather than extend it into semantic inference — where it demonstrably could not produce reproducible results — that territory was declared out of scope in the instrument itself.

The consequence is deliberate and uncomfortable: `# 1012` validates relationships already declared and does not discover missing ones. **The corpus's central defect — 114 nodes and almost no edges — is not solved by `# 1012`.** An instrument that had claimed the broader capability would have produced confident, unreproducible findings and closed the question falsely.

### 5.4 Validating on your own output is not validation

All eight edges the standard detects were written during Stage 2 using the criterion the standard encodes. This is circular and is recorded as such. Independent validation requires references authored outside this criterion, which the corpus does not yet contain.

### 5.5 A subcorpus result does not generalise

H1 was true of the 1000-series and false of the doctrinal corpus. The eleven-document normative series is dense, cross-referential and genuinely duplicative; the hundred-document doctrinal corpus is dispersed and only superficially so. **Verify per subcorpus. The 1000-series is not representative of anything but itself.**

---

## 6. Final replacement architecture

**Stage 4 — Domain Architecture and Cross-Reference Normalization.** It establishes boundaries and relationships. It does not consolidate documents.

| Objective | Meaning |
|---|---|
| **Domain ownership** | Each subject domain has a defined boundary and one document that owns it |
| **Cross-reference normalization** | Dependent documents say so explicitly, by code, per `# 1008` |
| **Differentiation** | Where two documents overlap, the boundary is made explicit **in both**, rather than one absorbing the other |
| **Relationship typing** | Detected relationships classified using `# 1008`'s taxonomy |

**There is no target corpus size, and corpus size is not a success metric.** 114 well-bounded, mutually referencing documents beat 84 merged ones whose provenance is lost.

### 6.1 Delivered

| Artifact | State |
|---|---|
| Five relationship-taxonomy pilots | Complete, 49 documents |
| Mention-vs-dependency classification standard | Validated, 100 % precision on explicit references |
| `# 1012_ESTANDAR_DE_AUDITORIA_DE_REFERENCIAS` | Committed `eab9cec`, explicitly non-normative |
| Plan §12 rewritten; merge record preserved as superseded | Committed `4535219` |

### 6.2 Architectural separation established

`# 1008` owns the relationship taxonomy and was **never modified** across all of Stage 4. `# 1012` determines *whether* a reference constitutes a relationship; `# 1008` determines *what type* it is. On divergence, `# 1008` prevails.

This split was preserved through five pilots specifically so that an auditing instrument could never acquire authority over institutional doctrine by being useful.

---

## 7. Long-term implications

**The corpus will not shrink, and that is now the expected outcome.** Anyone arriving with the reasonable instinct that 114 documents is too many will find the merge plan in §12.2 and should read this record before reviving it.

**Normalization effort shifts from deletion to connection.** The original plan front-loaded consolidation; the replacement front-loads boundary definition and reference population. Stages 5–9 are unchanged in sequence but now operate on the full corpus rather than a reduced one — more renames, more metadata, more relationship entries.

**The unresolved gap is discovery, not validation.** `# 1012` verifies declared references. Populating a graph that currently has almost no edges requires finding undeclared ones, which no current instrument does. This is the largest known open problem in the normalization programme.

**Constitutional restructuring is permanently outside engineering.** M-08 (`00`+`67`) and M-09 (`66`+`84`) touch founding instruments. They are not revived by this ADR and are not blocked by it either — they are a Consejo Superior de Gobierno question under any methodology.

---

## 8. Decisions that became permanent

| # | Decision |
|---|---|
| **P-1** | The merge strategy is withdrawn. M-01 … M-15 are not to be executed |
| **P-2** | Corpus size is not a success metric. No document-count target exists at any stage |
| **P-3** | No structural action on any cluster without line-level content verification |
| **P-4** | Thematic proximity is never evidence of a relationship |
| **P-5** | Hierarchy is never inferred from numbering alone |
| **P-6** | Any corpus-wide claim requires a dispersed control sample |
| **P-7** | `# 1008` is sole owner of the relationship taxonomy. Auditing instruments reference it and never redefine it |
| **P-8** | `# 1012` is non-normative and cannot supersede `# 1008` or any ownership document |
| **P-9** | Constitutional instruments are restructured only by Consejo ruling |
| **P-10** | Instruments declare their own limits. Declared scope is part of the instrument, not commentary on it |

## 9. Decisions intentionally deferred

| # | Deferred | Resolve at | Why not now |
|---|---|---|---|
| **D-1** | Documentary families model (F1–F4) | Stage 4 completion | Designed but **not approved**. Consolidating it would fix a taxonomy validated on five pilots only |
| **D-2** | N-05 registry for non-normative governance artifacts | **Stage 5** (plan §15.1) | `# 1012` currently has no parent document. Resolving it by widening `# 1000`'s normative index would contradict `# 1012`'s declared nature |
| **D-3** | Latent dependency discovery | Post-Stage 4 | Requires semantic inference. Declared out of scope in `# 1012` rather than attempted unreliably |
| **D-4** | Semantic redundancy measurement | Unscheduled | §2.2 — the merge plan was refuted on textual evidence only. Whether the corpus is *semantically* redundant is unmeasured |
| **D-5** | `gemelo digital` conflict (`# 27` vs `# 59`) | Stage 4 boundaries | A domain boundary question once D-1 resolves |
| **D-6** | Documentary ownership of the five deferred concepts (C1–C5) | Stage 4 completion | Conceptual ownership is settled; documentary ownership follows the surviving document |
| **D-7** | Independent validation of `# 1012` | When the corpus contains references authored outside this criterion | §5.4 — cannot be resolved by more analysis of existing text |

---

## Appendix — Reproducing the measurement

Run from `docs/`. Reproduces §2.1 exactly.

```bash
norm () {
  grep -vE '^\s*$|^#|^-{3,}|^Versión|^Fundación Alborada|^\|' "$1" \
  | sed 's/^[[:space:]•]*//; s/[[:space:]]*$//' \
  | awk 'length($0) > 20' | sort -u
}
overlap () {                      # usage: overlap FILE_A FILE_B
  a=$(norm "$1" | wc -l); b=$(norm "$2" | wc -l)
  s=$(comm -12 <(norm "$1") <(norm "$2") | wc -l)
  min=$(( a < b ? a : b ))
  awk -v s="$s" -v m="$min" 'BEGIN{ printf "shared=%d  %.1f%%\n", s, (m? s*100/m : 0) }'
}
```

**Caveat for re-runs:** filenames in `docs/` are not what the plan's cluster IDs suggest — `# 25` is `INSTITUTIONAL_KNOWLEDGE_SYSTEM`, not `KNOWLEDGE_MANAGEMENT_SYSTEM`. Resolve each ID with `ls | grep -E "^# 0*<n>_"` rather than assuming the name. A first attempt at this measurement silently read non-existent files and returned 0 % for every pair.

---

*ADR-0001 · Engineering record · Defines no institutional doctrine · Confers no authority over any document in `docs/`*
