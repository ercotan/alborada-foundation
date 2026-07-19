# 1004_DOCUMENT_NAMING_AND_IDENTIFICATION_STANDARD.md

# ESTÁNDAR OFICIAL DE NOMENCLATURA E IDENTIFICACIÓN DOCUMENTAL DE LA FUNDACIÓN ALBORADA
## Fundación Alborada

Versión 1.0

Clasificación: Norma Institucional de Identificación Documental

---

# PROPÓSITO

El presente documento establece el sistema oficial de identificación y nomenclatura de todos los documentos generados por la Fundación Alborada.

Su propósito es garantizar que cada documento posea una identidad única, permanente e inequívoca durante todo su ciclo de vida.

La identificación documental constituye uno de los pilares de la memoria institucional y de la inteligencia documental administrada por HERA.

---

# ALCANCE

Este estándar aplica a:

• Constitución Institucional.

• Manuales.

• SOP.

• Protocolos.

• Políticas.

• Reglamentos.

• Formularios.

• Informes.

• Investigaciones.

• Contratos.

• Auditorías.

• Bases de conocimiento.

• Documentación técnica.

• Documentación histórica.

• Documentación generada automáticamente por HERA.

---

# FILOSOFÍA

Un documento sin identidad es información perdida.

Una organización inteligente identifica cada conocimiento de manera única y permanente.

El nombre de un documento debe permitir comprender inmediatamente.

Qué es.

Para qué sirve.

Dónde pertenece.

Cuál es su estado.

Y cuál es su relación con el resto del sistema.

---

# PRINCIPIOS

Toda identificación documental deberá ser.

Única.

Permanente.

Escalable.

Legible.

Normalizada.

Compatible con automatización.

Compatible con inteligencia artificial.

Compatible con expansión internacional.

---

# ESTRUCTURA GENERAL

Todo documento seguirá exactamente la siguiente estructura.

```
[CÓDIGO]_[TIPO]_[ÁREA]_[NOMBRE]
```

Ejemplo.

```
1101_SOP_ADM_INGRESO_DE_NIÑAS
```

---

# COMPONENTE 1

## CÓDIGO

Número correlativo.

Ejemplo.

0001

0100

1000

1101

2050

3217

Nunca se reutilizarán códigos.

Un código eliminado permanecerá reservado permanentemente.

---

# COMPONENTE 2

## TIPO DOCUMENTAL

Se utilizarán únicamente las siguientes abreviaturas.

SOP

POL

PRO

MAN

INS

FRM

CHK

REG

AUD

REP

INV

GUI

STD

TMP

MAP

CAT

DOC

---

Significado.

SOP

Procedimiento Operativo.

POL

Política.

PRO

Protocolo.

MAN

Manual.

INS

Instructivo.

FRM

Formulario.

CHK

Checklist.

REG

Registro.

AUD

Auditoría.

REP

Reporte.

INV

Investigación.

GUI

Guía.

STD

Estándar.

TMP

Plantilla.

MAP

Mapa.

CAT

Catálogo.

DOC

Documento General.

---

# COMPONENTE 3

## ÁREA

Se utilizarán códigos estandarizados.

ADM

Admisión.

ACA

Academia.

PSI

Psicología.

MED

Medicina.

NUT

Nutrición.

AGR

Agricultura.

AVI

Avicultura.

IA

HERA.

FIN

Finanzas.

RRHH

Recursos Humanos.

LEG

Legal.

SEG

Seguridad.

INF

Infraestructura.

COM

Comunicaciones.

DIR

Dirección.

AUD

Auditoría.

DOC

Gestión Documental.

INV

Investigación.

INT

Relaciones Internacionales.

---

# COMPONENTE 4

## NOMBRE

Reglas.

Solo mayúsculas.

Separación mediante guion bajo.

Sin acentos.

Sin caracteres especiales.

Sin artículos innecesarios.

Ejemplo correcto.

```
CONTROL_DE_ACCESO
```

Incorrecto.

```
Control del acceso principal
```

---

# EJEMPLOS OFICIALES

```
0001_DOC_CONSTITUCION_GENERAL
```

```
1001_TMP_MASTER_SOP_TEMPLATE
```

```
1104_SOP_PSI_EVALUACION_INICIAL
```

```
1208_SOP_FIN_PAGO_A_PROVEEDORES
```

```
3101_PRO_SEG_INCENDIOS
```

```
5008_FRM_ADM_SOLICITUD_DE_INGRESO
```

---

# REGLAS DE ESCRITURA

No utilizar.

Espacios.

Tildes.

Ñ.

Símbolos.

Paréntesis.

Comillas.

Signos especiales.

Solo.

Letras.

Números.

Guion bajo.

---

# LONGITUD

Máximo recomendado.

80 caracteres.

Mínimo recomendado.

15 caracteres.

---

# VERSIONES

Las versiones nunca formarán parte del nombre del archivo.

La versión será un metadato.

Correcto.

```
1101_SOP_ADM_INGRESO_DE_NINAS
```

Versión.

2.1

Incorrecto.

```
1101_v2_FINAL_FINAL2
```

---

# ESTADO

El estado tampoco formará parte del nombre.

Será un metadato.

Ejemplo.

BORRADOR.

VIGENTE.

OBSOLETO.

ARCHIVADO.

---

# ID INTERNO

Además del nombre visible.

Todo documento tendrá un UUID interno generado automáticamente.

Ejemplo.

```
8b92a2b5-58cb-46d8-9a8b-f4ab1c2d9a81
```

El UUID nunca será modificado.

---

# NOMBRE VISIBLE

El nombre del archivo podrá diferir del título del documento.

Ejemplo.

Archivo.

```
1101_SOP_ADM_INGRESO_DE_NINAS
```

Título.

Procedimiento Operativo para el Ingreso de Niñas a la Fundación Alborada.

---

# REFERENCIAS

Cuando un documento cite otro.

Siempre utilizará.

Código.

Tipo.

Nombre.

Ejemplo.

```
1101_SOP_ADM_INGRESO_DE_NINAS
```

Nunca.

"El procedimiento de ingreso."

---

# DOCUMENTOS DERIVADOS

Los anexos utilizarán el mismo código base.

Ejemplo.

```
1101A_FRM_ADM_ENTREVISTA
```

```
1101B_CHK_ADM_DOCUMENTACION
```

```
1101C_MAP_ADM_FLUJO
```

---

# RESERVA DE CÓDIGOS

Los códigos nunca se reutilizarán.

Aunque el documento sea eliminado.

El código permanecerá reservado.

Esto preserva la trazabilidad histórica.

---

# VALIDACIÓN AUTOMÁTICA

Antes de aprobar un documento.

HERA verificará.

Código válido.

Área válida.

Tipo válido.

Nombre único.

Duplicidades.

Longitud.

Caracteres permitidos.

Consistencia.

---

# COMPATIBILIDAD INTERNACIONAL

La nomenclatura ha sido diseñada para.

Windows.

Linux.

macOS.

Repositorios Git.

Bases de datos.

APIs.

Sistemas documentales.

Motores de búsqueda.

HERA.

---

# AUDITORÍA

Se verificará periódicamente.

Duplicidad de nombres.

Errores de nomenclatura.

Códigos inexistentes.

Áreas incorrectas.

Tipos inválidos.

Documentos sin identificación.

Referencias inconsistentes.

---

# DECLARACIÓN FINAL

La Fundación Alborada establece que cada documento constituye una unidad permanente de conocimiento institucional.

Su identificación deberá permanecer estable durante toda su existencia, garantizando que pueda ser localizado, relacionado, auditado y preservado sin ambigüedad.

El presente estándar constituye la norma oficial de nomenclatura documental y será utilizado por HERA para organizar, relacionar y administrar automáticamente todo el patrimonio documental de la Fundación Alborada.

---

Fundación Alborada

1004_DOCUMENT_NAMING_AND_IDENTIFICATION_STANDARD.md

Versión 1.0