# ADR-0004 — Secure public contact-intake backend: approved direction and phase gates

Status:        Accepted (direction) — implementation gated, see Open Decisions
Date:          2026-07-24
Deciders:      Lead Software Architect
Approver:      Ernesto Cosovi
Supersedes:    —
Related:       ADR-0002 ; ADR-0003 ; CLAUDE.md §4.1 ; DEVELOPMENT.md (Backend seams) ; .env.example

## Context

Three public surfaces are wired for a backend that does not exist, and each
states plainly that nothing was sent rather than faking success:

- the institutional / collaboration enquiry form (`src/lib/contactInquiry.ts`,
  activated by `VITE_CONTACT_ENDPOINT`);
- the child-protection report (`src/lib/childProtection.ts`, `prepareReport`,
  today a local copy-to-email);
- the homepage contact block (`mailto:` only).

A production-readiness review of these flows and a full technical design of a
secure intake service were produced and approved as the direction to build.
This ADR records that direction so it is not re-derived, and fixes the gates
that separate what may ship now from what must wait for a legal, residency,
retention and staffing decision. It records a **direction**; several inputs it
depends on are unresolved and are listed as Open Decisions, not as approved
values.

`ADR-0003` already established that the public pages are real HTML entry
points, not client routes; this ADR builds on that without changing it.

## Decision

Build **one deliberately small intake service** exposing two logical
endpoints, one per processing class. Shared transport, validation and
attachment-safety code; **separated** storage, keys, notification recipients,
audit rules and access roles.

### D1 — Two processing classes, assigned by the server, not the client

**Class A — general institutional intake.** Categories: `general`,
`institucion`, `empresa`, `profesional`, `persona`, `prensa`, `juridico`, and
`orientacion` (orientation requests are a Class A category, not a separate
service — routing only, see OD-1). Standard controls; visible to general
staff; routed to the appropriate institutional mailbox; eligible for the CRM
timeline.

**Class B — protected child-intake.** Any report concerning violence, abuse,
abandonment, exploitation, neglect, immediate danger, or vulnerability of a
child or adolescent. Class assignment is derived from the endpoint, never from
a client-supplied field, so a hostile client can neither smuggle a report out
of the protected boundary nor flood Class B from Class A.

### D2 — Separate endpoints

- `POST /api/v1/contact` — Class A.
- `POST /api/v1/child-protection` — Class B, served from an isolated
  deployment (separate subdomain / runtime) so a Class A compromise or
  overload cannot reach Class B.
- `GET /api/v1/health` — liveness/readiness, exposes no data.

Transport is `multipart/form-data`, matching the frontend's existing
`FormData` submission, so the current contact form's success/error contract is
honoured without change: success is signalled only by a server-assigned
`inquiryId`/`caseId`; `429` is rate-limited; `4xx` + `{message}` is rejected;
non-OK is a server error.

### D3 — Durable persistence before success

A visitor sees success **only** after the submission is durably committed and
a server-assigned reference is returned. A client-generated identifier is
never treated as proof of receipt, because it refers to nothing. This encodes,
on the server, the honesty the frontend already enforces.

### D4 — Email is a notification, not the system of record

The durable store is the record of receipt. Email notifies the appropriate
mailbox (`contacto@`, `alianzas@`, `prensa@`, `judiciales@`, `orientacion@`
for Class A by category; `proteccion@` for Class B) and never carries
attachments inline. **Notification failure after a durable write must not lose
the visitor's submission** — the reference was already issued; operators
reconcile from a dead-letter queue.

### D5 — Attachment upload stays disabled until malware scanning exists

The attachment input remains off, and the server rejects file parts, until the
full pipeline is in place: size ceiling → extension → declared MIME → real file
signature → reject active content → malware scan → rename → store outside the
application origin → no inline execution → signed expiring retrieval → audit →
quarantine/deletion. Attachments are never emailed; notifications carry a
secure link only.

### D6 — Class B is isolated from the ordinary CRM and from HERA

Class B records live behind a separate storage boundary with a separate
encryption key and a `protection_officer`-only access role; general staff have
no access at the data layer, not merely a hidden UI. Class B never appears in
ordinary CRM timelines and **never connects to HERA / the Institutional
Intelligence Center**; at most, in the future, HERA may show a non-identifying
operational counter sourced from metrics, never from records.

### D7 — Anonymous child reports must remain possible

Identity is never required for Class B. Anti-abuse controls (challenge, rate
limiting, honeypot, minimum-time) **degrade to a manual-review queue** for
Class B rather than hard-rejecting, so an anonymous or urgent report is never
turned away by machinery. Anonymous reports are accepted under a
lawful/vital-interest basis distinct from reporter consent (see OD-5).

### D8 — Preferred architecture: managed backend + managed PostgreSQL, Cloudflare edge

The preferred implementation is a **managed backend service with managed
PostgreSQL and S3-compatible object storage, fronted by Cloudflare** for TLS,
WAF, the privacy-respecting challenge and rate limiting. This choice makes
server-side malware scanning, application-level encryption, region pinning and
auditability straightforward — the properties Class B needs — while remaining
portable (standard PostgreSQL + S3 API). Class B uses the same stack,
physically isolated (separate instance, bucket and key). A Cloudflare-native
serverless option is viable only while attachment-less and is not adopted,
because it would force a migration once scanning is required. **No hosting
region is chosen** — it is pinned only after the data-residency decision
(OD-2).

## Open Decisions

These are unresolved. None is presented here as approved, and each blocks the
phase noted. Stable identifiers are used so later work can reference them.

| ID | Decision required | Blocks |
|---|---|---|
| OD-1 | Whether `orientacion` needs only mailbox routing or a distinct sub-flow | Phase 2 routing |
| OD-2 | Data-residency region and cross-border transfer rules | Region pin; Phase 4 |
| OD-3 | Transactional email provider | Phase 2 |
| OD-4 | Malware scanner product (self-hosted ClamAV vs managed) | Phase 3 |
| OD-5 | Legal basis and data-controller identity (Colombia Ley 1581, + GDPR if EU reporters) | Phase 4; privacy notice |
| OD-6 | Retention and deletion periods — Class A records, Class B records, attachments | Phase 4 launch |
| OD-7 | Consent-notice legal text and versioning cadence — **Draft prepared — awaiting institutional and legal approval** (`legal/PTDP-DRAFT-0.1`, `legal/AVPRIV-DRAFT-0.1`, `legal/CONS-A-DRAFT-0.1`); institutional facts and legal approval still pending | Phase 1/2 |
| OD-8 | Email MX / deliverability verification on or off | Phase 2 (non-blocking) |
| OD-9 | Idempotency-key retention window | Phase 2 |
| OD-10 | Named, authorised `protection_officer` personnel | Phase 4 |
| OD-11 | Whether Class B ever sends a visitor confirmation email (safety) | Phase 4 |
| OD-12 | Accept legacy DOC / macro-bearing DOCX, or convert / reject | Phase 3 |
| OD-13 | Mandatory-reporting and breach-notification obligations and procedure | Phase 4 |
| OD-14 | IP-address retention period for abuse prevention (collection yes; duration TBD) | Phase 2 |
| OD-15 | Appointment of a DPO / privacy owner | Before any collection |
| OD-16 | Notification mailbox for the `donacion` category — reuse `contacto@` or provision a dedicated address | Phase 2 routing |

**Update (2026-07-24) — OD-7 only.** Draft versions of the data-treatment
policy and the website privacy notice now exist, together with the Class A
form consent text and its versioning metadata, staged under `legal/`
(`PTDP-DRAFT-0.1`, `AVPRIV-DRAFT-0.1`, `CONS-A-DRAFT-0.1`,
`legal/INDEX.md`). The required institutional facts (controller identity, NIT,
domicile, retention periods, privacy channel, DPO, and others, marked
`[INSTITUTIONAL DECISION REQUIRED]`) and formal legal approval **remain
pending**. OD-7 status: **"Draft prepared — awaiting institutional and legal
approval."** No other Open Decision changes status.

**Update (2026-07-25) — D1 category set and a sub-topic parameter.** Does not
alter any conclusion of this ADR; it records two additions made while
connecting the homepage cards to their destinations.

*Category.* The Class A set in D1 gains **`donacion`** — an enquiry about how
to support an area of the project. It was needed because the five support-area
cards on the homepage responded to hover while linking nowhere, and none of the
existing categories describes them: the enquiry is neither `general` nor
`empresa` nor `persona`. It is a **contact** category only. **No payment
capability is implied, designed or approved by this entry**; the site processes
no transactions, and a donation card opens the enquiry form exactly as every
other card does. Its notification mailbox is unresolved and is recorded as
OD-16; until then it falls to `contacto@`, like any category without a
dedicated desk.

*Sub-topic.* Class A URLs may now carry an optional **`tema`** parameter naming
the card the visitor arrived from — `?categoria=orientacion&tema=finanzas-personales`.
It is a UI convenience that prefills the subject field and carries no new
personal data; the server contract in D2/D3 is unchanged, and `tema` is
validated against a closed set and discarded when it does not belong to the
category in the same URL. Whether the backend should persist it as a distinct
column or leave it inside `subject` is deferred to Phase 2 and is not decided
here.

*Not adopted.* A second taxonomy describing **how** a donation is made — one
off, monthly, sponsorship, materials, equipment — was considered and rejected
for now. It is orthogonal to the support areas above, and every one of its
values presumes a payment capability that does not exist; publishing
"donación mensual" against no recurring-payment facility would be a promise the
site cannot keep. Sponsorship of an individual child additionally engages
`CLAUDE.md §5.1` and is not a decision this ADR may make. Revisit when a
payments decision exists.

## Phase gates

Implementation proceeds in small, independently shippable phases. Each phase
names what must exist before it may go public.

**Phase 1 — Repository and CI foundation (this ADR).** Push existing frontend
work, prove CI, keep every data-collection surface honest, record this
direction. No new public data-collection capability. No endpoint.

**Phase 2 — Class A general contact, attachment-less.** Server-side
validation, layered spam controls, durable persistence, server-issued
reference, category-routed notification. Gate: real privacy notice published
(OD-7) or data collection removed; CI green; challenge keys provisioned.
Attachments stay disabled.

**Phase 3 — Secure attachment pipeline (Class A).** Gate: full D5 pipeline
operational; OD-4 and OD-12 resolved.

**Phase 4 — Protected child-intake boundary (Class B).** Gate: OD-2, OD-5,
OD-6, OD-10, OD-11, OD-13 resolved; isolated infrastructure and separate key
provisioned; append-only read/download audit verified; non-blocking abuse
rules verified; incident procedure written. Until then the child-protection
surface keeps its honest local copy-to-email fallback.

## Consequences

**Positive.** The direction is fixed and cited rather than re-argued. The
frontend contract is honoured, so Phase 2 needs only four small payload fields
added and `VITE_CONTACT_ENDPOINT` set. Class B isolation is a design
property, not a policy request. Honesty about non-delivery is preserved end to
end.

**Negative / deferred.** No endpoint ships in Phase 1. Attachments and the
online child-protection intake remain deliberately disabled behind their
gates. Fifteen decisions remain open; six of them block Phase 4, which is
correct — the most sensitive flow must not precede its legal and staffing
basis.

## Compliance

- `PROJECT_CONSTITUTION.md` Layer 2 — engineering direction and workflow; no
  institutional doctrine is created here, and this ADR holds no authority over
  `docs/`.
- `ARCHITECTURE.md` — introduces a backend, which is new architecture; it is
  recorded here as an approved direction with implementation gated, and does
  not alter the preserved frontend stack of `ADR-0002`.
- `CLAUDE.md §4.1` — a backend is a stack decision requiring approval; this ADR
  is the record of that approval for the direction, with provider, region and
  storage specifics held as Open Decisions.
