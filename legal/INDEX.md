# Legal Drafts — Staging Registry

**Área de preparación de documentos legales · BORRADORES · No es el corpus institucional**

| | |
|---|---|
| **Naturaleza** | Documentos de trabajo en preparación. **No** forman parte del corpus institucional (`docs/`) ni de la capa de ingeniería (`engineering/`). |
| **Estado global** | Todos los documentos aquí están en estado **BORRADOR** y **no aprobados**. |
| **Autoridad** | Ninguna sobre `docs/`. Al aprobarse, cada documento migra a `docs/` bajo el flujo `# 1007`, recibe un código `# 1003` y su titularidad pasa a la autoridad de Documentación. |
| **Aviso** | Ningún documento aquí es asesoría legal ni texto legal vigente. |

> Un documento vive aquí sólo mientras es un **borrador legal en revisión**. No es un artefacto de ingeniería (impone obligaciones y confiere derechos, por lo que no cabe en `engineering/`), y no debe insertarse en el corpus normativo `docs/` antes de su aprobación. Esta carpeta es su antesala explícita.

---

## Registro

| ID | Título | Tipo | Estado | Versión | Vigencia | Revisado por | Aprobado por |
|---|---|---|---|---|---|---|---|
| `PTDP-DRAFT-0.1` | Política de Tratamiento de Datos Personales | Política | Borrador | 0.1 | Sin asignar | [INSTITUTIONAL DECISION REQUIRED] | [INSTITUTIONAL DECISION REQUIRED] |
| `AVPRIV-DRAFT-0.1` | Aviso de Privacidad del sitio web | Aviso | Borrador | 0.1 | Sin asignar | [INSTITUTIONAL DECISION REQUIRED] | [INSTITUTIONAL DECISION REQUIRED] |
| `CONS-A-DRAFT-0.1` | Consentimiento del formulario Clase A | Texto de consentimiento | Borrador | 0.1 | Sin asignar | [INSTITUTIONAL DECISION REQUIRED] | [INSTITUTIONAL DECISION REQUIRED] |

---

## Metadatos de versionado (para OD-7)

**Identificador de documento.** `<PREFIJO>-<ESTADO>-<MAJOR>.<MINOR>`
- Prefijos: `PTDP` (Política de Tratamiento de Datos Personales), `AVPRIV` (Aviso de Privacidad), `CONS-A` (Consentimiento Clase A).
- Estado en el identificador mientras es borrador: `DRAFT` (p. ej. `PTDP-DRAFT-0.1`). Al aprobarse, el estado `DRAFT` se retira y se asigna la versión definitiva (ver formato de versión).

**Formato de versión.** Semántico de dos niveles `MAJOR.MINOR`:
- `0.x` → borradores previos a la primera aprobación;
- `1.0` → primera versión **aprobada y vigente**;
- incremento **MINOR** (`1.1`, `1.2`) → cambios que no alteran finalidades ni derechos;
- incremento **MAJOR** (`2.0`) → cambios sustanciales (finalidades, derechos, responsable, transferencias); requieren nueva información al Titular antes de su vigencia.

**Campos obligatorios por versión.**
- `Fecha de vigencia` — *sin asignar* hasta la aprobación; fijada por la autoridad institucional (nunca por la capa de ingeniería).
- `Revisado por` — [INSTITUTIONAL DECISION REQUIRED] (asesoría jurídica).
- `Aprobado por` — [INSTITUTIONAL DECISION REQUIRED] (representación institucional).

**Registro de cambios (change log).**

| Versión | Fecha | Autor | Revisado por | Aprobado por | Cambios |
|---|---|---|---|---|---|
| `0.1` (borrador) | 2026-07-24 | Capa de ingeniería (asistencia de IA) | [INSTITUTIONAL DECISION REQUIRED] | [INSTITUTIONAL DECISION REQUIRED] | Primer borrador de la Política, el Aviso y el Consentimiento Clase A para revisión institucional. |

---

## Relación con OD-7

Estos borradores atienden la preparación de OD-7 (aviso de privacidad y su versionado), **sin resolverlo**. OD-7 permanece **abierto**: su cierre depende de la confirmación de los hechos institucionales marcados como `[INSTITUTIONAL DECISION REQUIRED]` y de la aprobación jurídica e institucional. El estado de OD-7 propuesto es **"Draft prepared — awaiting institutional and legal approval."** (ver `engineering/ADR-0004`).

---

*Registro de borradores legales. Estado BORRADOR. Sin autoridad sobre el corpus institucional.*
