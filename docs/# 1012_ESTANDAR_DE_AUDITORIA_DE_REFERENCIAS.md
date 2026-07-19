# 1012_ESTANDAR_DE_AUDITORIA_DE_REFERENCIAS.md

# ESTÁNDAR DE AUDITORÍA DE REFERENCIAS DOCUMENTALES
## Fundación Alborada

Versión 1.0

Clasificación: Estándar de Auditoría

---

# PROPÓSITO

Este estándar establece reglas deterministas para clasificar las referencias explícitas entre documentos del corpus institucional.

Su finalidad es permitir que dos auditores independientes, examinando el mismo documento, alcancen siempre la misma clasificación.

---

# NATURALEZA DEL DOCUMENTO

Este documento no es una norma institucional.

Es un instrumento de auditoría.

Gobierna la metodología de verificación documental.

No gobierna la arquitectura institucional.

No define doctrina.

No establece obligaciones sobre personas ni órganos.

No otorga ni modifica propiedad conceptual.

Su objeto son las referencias entre documentos, no el contenido de los documentos.

---

# ALCANCE

Este estándar se aplica exclusivamente a.

Referencias explícitas en las que el documento destino aparece nombrado por su código.

Clasificación determinista basada en condiciones textuales verificables.

Verificación de integridad de referencias ya declaradas.

Este estándar no realiza inferencia semántica.

Este estándar no descubre dependencias latentes.

Este estándar no posee autoridad sobre la propiedad doctrinal.

---

# FUERA DE ALCANCE

Las siguientes materias quedan expresamente excluidas.

Dependencias latentes.

Un documento que invoca un concepto definido en otro sin nombrarlo queda fuera del alcance de este estándar.

Definición competida.

La determinación de si dos documentos definen el mismo referente requiere juicio humano y no se resuelve por regla.

Rótulos homónimos ambiguos.

Cuando dos documentos comparten un rótulo y el referente no puede determinarse por evidencia textual, el caso se clasifica como ambiguo y se remite a revisión humana.

Contradicciones doctrinales.

La detección de afirmaciones incompatibles entre documentos no es una función de auditoría de referencias.

Asignación de propiedad conceptual.

La propiedad de conceptos se establece en los documentos propietarios y se registra en 1011_GLOSARIO_INSTITUCIONAL.

---

# RELACIÓN CON 1008

1008_DOCUMENT_RELATIONSHIP_AND_TRACEABILITY_SYSTEM es el propietario único de la taxonomía de tipos de relación documental.

Este estándar no define tipos de relación.

Este estándar no modifica, extiende ni sustituye dicha taxonomía.

Las categorías de este estándar y los tipos de 1008 operan en planos distintos.

Este estándar determina si una referencia constituye una relación.

1008 determina de qué tipo es esa relación.

Una referencia clasificada como dependencia por este estándar deberá tiparse posteriormente conforme a 1008.

En caso de divergencia entre ambos documentos, prevalece 1008.

---

# RELACIÓN CON OTROS DOCUMENTOS

Este estándar es subordinado.

No prevalece sobre ningún documento propietario.

No prevalece sobre 1003_DOCUMENT_CLASSIFICATION_SYSTEM en materia de clasificación documental.

No prevalece sobre 1005_DOCUMENT_METADATA_STANDARD en materia de metadatos.

No prevalece sobre 1011_GLOSARIO_INSTITUCIONAL en materia de terminología ni de propiedad conceptual.

Consume las definiciones de propiedad registradas en 1011. No las establece.

---

# FUNDAMENTO DE LA SEPARACIÓN

La auditoría determinista y la interpretación semántica se separaron de manera deliberada.

Una regla determinista produce el mismo resultado para todo auditor.

Una interpretación semántica depende del criterio de quien la aplica.

Mezclarlas produce un instrumento que aparenta objetividad sin poseerla.

La validación empírica confirmó esta necesidad.

Las reglas deterministas alcanzaron precisión completa sobre referencias explícitas.

Las reglas que requerían inferencia semántica no lograron distinguir una mención de una dependencia en prosa descriptiva.

Antes que extender el estándar a un terreno que no puede resolver de forma reproducible, se optó por declarar ese terreno fuera de alcance.

Un estándar que reconoce sus límites es auditable.

Un estándar que promete capacidades que no posee produce conclusiones falsas con apariencia de rigor.

---

# FILTROS DE EXCLUSIÓN

Se aplican antes de cualquier clasificación.

El primer filtro que se cumple determina el resultado.

R0a. El identificador coincide con el del documento examinado. Sin relación.

R0b. El referente es este documento, este estándar, el presente documento o la presente norma. Sin relación.

R0c. La línea pertenece a un bloque de código, un diagrama o una tabla. Sin relación.

R0d. No existe destino documental identificable. Sin relación.

R1. El referente no existe en el corpus. Externo.

R2. La referencia se encuentra dentro de un bloque ilustrativo o de ejemplo. Mención.

R3. El referente es la institución, una persona o un objeto físico. Sin relación.

R4. El rótulo es compartido pero el referente es verificablemente distinto. Sin relación.

---

# MARCADORES

Conjunto T1. Deferencia definitoria.

se define en. definido en. conforme a. según lo. establecido en.

Conjunto T3. Requisito operativo.

obligatoriamente. deberá utilizar. utilizando. requiere.

Conjunto negativo. Declaración de no propiedad.

no la define. no lo define. no la repite. no establece.

---

# REGLAS DE CLASIFICACIÓN

Se aplican tras los filtros de exclusión.

R6. Marcador T3 con destino identificable. Dependencia obligatoria.

R7. Marcador T1 con destino identificable. Dependencia.

R8. Declaración negativa de propiedad con destino identificable. Dependencia.

R12. Ninguna regla anterior aplica. Mención.

---

# CATEGORÍAS

Las categorías de este estándar son resultados de auditoría.

Se definen por la condición textual que las produce.

No definen el significado documental de la relación. Ese significado pertenece a 1008.

## Categorías sin correspondencia en 1008

Las siguientes describen el resultado del examen, no un vínculo documental.

Sin relación. Se cumplió un filtro de exclusión. No se registra arista.

Externo. El destino no pertenece al corpus. No se registra arista.

Ambiguo. Ninguna regla resuelve el caso. Se remite a revisión humana.

## Categorías que registran arista

Las siguientes producen una arista que deberá tiparse conforme a 1008.

Mención. Ninguna regla de dependencia se cumplió. La auditoría no propone tipo. Si corresponde tipificarla, se aplica 1008.

Dependencia. Se cumplió R7 u R8. Corresponde a DOCUMENTO REQUERIDO, conforme a la definición establecida en 1008.

Dependencia obligatoria. Se cumplió R6. Corresponde igualmente a DOCUMENTO REQUERIDO, conforme a 1008.

## Sobre la distinción entre ambos grados

Dependencia y dependencia obligatoria comparten tipo documental.

Se distinguen por la fuerza de la evidencia textual, no por su naturaleza.

La distinción registra qué encontró la auditoría. No subdivide la taxonomía de 1008 ni crea un tipo nuevo.

---

# COBERTURA MEDIDA

La validación se realizó sobre cuarenta y nueve documentos en cinco auditorías piloto.

Precisión sobre referencias explícitas. Completa.

Cobertura de referencias explícitas detectadas. Parcial.

Las referencias cuyo destino aparece separado del marcador por más de una línea no son detectadas por la ventana actual.

Esta limitación es de implementación, no de concepto.

---

# LIMITACIONES DECLARADAS

Los marcadores fueron derivados del examen de cuarenta y nueve documentos.

Documentos no examinados podrían emplear construcciones de deferencia no contempladas.

Las referencias explícitas sobre las que se validó el estándar fueron redactadas aplicando el mismo criterio que el estándar codifica.

La validación no constituye evidencia independiente.

Ambas limitaciones deberán revisarse cuando el corpus incorpore referencias redactadas fuera de este criterio.

---

# EXTENSIONES FUTURAS

El análisis de dependencias semánticas podrá desarrollarse como trabajo posterior.

Dicho trabajo ampliará el alcance de la auditoría documental.

No sustituye este estándar.

No modifica este estándar.

No altera las categorías aquí definidas.

Cualquier instrumento de análisis semántico deberá declarar expresamente su propio alcance y sus limitaciones, conforme al criterio establecido en este documento.

---

# MANTENIMIENTO

Toda modificación de los marcadores deberá registrarse con la evidencia que la justifica.

Toda ampliación de alcance deberá validarse empíricamente antes de adoptarse.

Ninguna regla se incorporará sin haber sido probada contra documentos reales del corpus.

---

# DECLARACIÓN FINAL

Una auditoría vale por aquello que puede demostrar, no por aquello que aparenta abarcar.

Este estándar clasifica lo que el corpus declara.

No pretende descubrir lo que el corpus calla.

Esa distinción es su principal garantía.

---

Fundación Alborada

1012_ESTANDAR_DE_AUDITORIA_DE_REFERENCIAS.md

Versión 1.0
