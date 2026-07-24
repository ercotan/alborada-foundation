# Consentimiento del formulario de contacto (Clase A) — BORRADOR

| | |
|---|---|
| **Identificador** | `CONS-A-DRAFT-0.1` |
| **Estado** | **BORRADOR — no aprobado.** No añadir al formulario en producción todavía. |
| **Política asociada** | `PTDP-DRAFT-0.1` |
| **Versión de política referida** | `PTDP-DRAFT-0.1` |
| **Versión de este texto** | 0.1 (borrador) |

> ⚠️ **BORRADOR.** Texto propuesto para la futura casilla de consentimiento del formulario Clase A. **No es asesoría legal.** **No** debe agregarse al formulario en vivo hasta que Ernesto lo revise y apruebe y hasta que exista una Política aprobada con versión definitiva.

---

## Texto de la casilla de consentimiento (propuesto)

La casilla **no** debe venir prellenada. El texto exacto propuesto es:

> ☐ He leído y acepto la **Política de Tratamiento de Datos Personales** y autorizo a Fundación Alborada a tratar los datos que proporciono con la **única finalidad de atender mi solicitud** (responder mi consulta, gestionar una eventual colaboración y conservar la evidencia de esta autorización). Entiendo que los campos marcados como *opcionales* son de aportación **voluntaria** y que puedo **revocar** esta autorización o solicitar la supresión de mis datos en cualquier momento.
>
> [Ver la Política de Tratamiento de Datos Personales]([INSTITUTIONAL DECISION REQUIRED — enlace a la política publicada])

**Nota de versión visible (propuesta), junto a la casilla o al pie del formulario:**

> Política aplicable: `PTDP-DRAFT-0.1` *(referencia de borrador; se reemplazará por la versión aprobada antes de activar el envío).*

---

## Requisitos que este texto cumple

- **Afirmativo e informado:** el Titular declara haber leído y aceptar, y se indica la finalidad.
- **Enlace a la política completa:** incluido (URL pendiente de publicación).
- **Finalidades mencionadas:** atención de la solicitud, gestión de colaboración y conservación de la evidencia de autorización, coherente con la sección 9 de `PTDP-DRAFT-0.1`.
- **Campos opcionales identificados:** se aclara que los campos opcionales son voluntarios.
- **Sin consentimiento de mercadeo agrupado:** el texto **no** incluye ninguna autorización de publicidad o mercadeo.
- **Sin casilla prellenada:** se exige casilla vacía por defecto.
- **Versión de política visible:** se muestra la versión aplicable.

---

## Evidencia de consentimiento a almacenar (cuando el backend se active)

Al enviarse el formulario, el servicio deberá registrar, como prueba de la autorización (art. 12 de `PTDP-DRAFT-0.1`):

| Campo | Contenido |
|---|---|
| `consentVersion` | Identificador y versión de la política aceptada (p. ej. la versión **aprobada** que reemplace a `PTDP-DRAFT-0.1`). |
| `consentTimestamp` | Fecha y hora del servidor en que se otorgó la autorización (ISO 8601, reloj del servidor). |
| `consentLanguage` | Copia exacta del texto de consentimiento mostrado al Titular en el momento del envío. |
| `submissionReference` | Referencia única de la solicitud emitida por el servidor. |

> Estos cuatro campos corresponden a la evidencia definida en la sección 12 de la Política y en el diseño de admisión (`engineering/ADR-0004`). El texto guardado en `consentLanguage` debe ser el efectivamente mostrado; si el texto cambia, cambia también la versión.

---

*Borrador `CONS-A-DRAFT-0.1`. No incorporar al formulario en vivo hasta aprobación. No es asesoría legal.*
