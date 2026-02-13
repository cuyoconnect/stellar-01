# AGENTS.md - Lecciones aprendidas de 285+ sesiones de IA

> Auto-generado a partir del análisis de transcripciones en 22 proyectos (Cursor Failure Insights).
> Última actualización: 13 de febrero de 2026.

## Reglas críticas (extraídas de errores reales)

### 1. Verificar compilación y tipos antes de dar por cerrado

**Por qué**: En múltiples proyectos (gestor-de-correos, NerdConf-Web, gym-tracker) la IA entregó código que "pasaba" en el IDE pero fallaba con `Failed to compile`, `error TS2322`, `Type 'null' is not assignable`, o errores en build de Vercel. El usuario tuvo que reportar "asegurate que compile y luego pushea".

**Hacer**: Después de editar código TypeScript/React/Next, ejecutar `pnpm run build` o `npm run build` (y en Rust, `cargo check`) antes de dar por terminada la tarea. No confiar solo en ReadLints.

**No hacer**: Asumir que si no hay lints en el editor, el proyecto compila. ReadLints no captura todos los errores de tipo ni los que aparecen en tiempo de build.

### 2. Tipos concretos en refs y DOM: evitar `null` donde la API no lo acepta

**Por qué**: Errores recurrentes: `HTMLVideoElement | null` asignado donde se espera `HTMLVideoElement`; `filtersSnapshot: null` donde el tipo exige objeto; refs tipadas como `HTMLElement` cuando el elemento es `div` y la API espera un tipo más específico.

**Hacer**: Declarar refs con el tipo del elemento real (`HTMLDivElement`, `HTMLVideoElement`). Para propiedades que pueden ser `null` en runtime, usar tipo `T | null` en la definición del modelo o añadir guardas (`if (ref.current)`) antes de usar. En mocks/tests, usar `{}` o el objeto mínimo en lugar de `null` si el tipo no lo permite.

**No hacer**: Dejar `null` en mocks (p. ej. `filtersSnapshot: null`) cuando el tipo del dominio no admite null; usar `HTMLElement` genérico cuando se usan APIs que exigen un subtipo.

### 3. Leer el flujo completo antes de cambiar sync/integraciones

**Por qué**: En gestor-de-correos el usuario reportó: "Cargué mi bd desde sheets, borré todo excepto 1 contacto, puse sincronizar, y seguía teniendo 36k contactos". La sincronización no hacía hard reset como se pidió; además "busca con la cuenta con la que creé el client secret, no en la cuenta de cada usuario".

**Hacer**: Antes de tocar sincronización, OAuth o flujos multi-tenant, leer todos los puntos de uso (API routes, servicios, uso de sesión/cuenta). Confirmar qué cuenta/usuario está en contexto en cada capa (front, API, DB). Si el usuario pide "hard reset" o "que se borre la BD y se reimporte", implementar ese flujo explícitamente y no solo "actualizar".

**No hacer**: Asumir que "sincronizar" es solo upsert; usar la cuenta del deploy/admin en lugar de la cuenta del usuario conectado (OAuth por usuario).

### 4. No confiar en `fileURLToPath(import.meta.url)` en entornos serverless/Vercel

**Por qué**: En json-cv apareció `TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received an instance of URL` en `/api/generate-pdf/route` en Vercel. El bundle puede pasar URLs y `readFileSync`/APIs de Node esperan path string en ese contexto.

**Hacer**: En rutas API que leen archivos en Vercel/serverless, usar rutas relativas a `process.cwd()` o paths que el bundler incluya (p. ej. `outputFileTracingIncludes`). Probar en un entorno equivalente a producción.

**No hacer**: Usar solo `fileURLToPath(import.meta.url)` para resolver paths de archivos en APIs que se ejecutan en Vercel sin validar en deploy.

### 5. Al arreglar scroll/animaciones (GSAP, ScrollTrigger), no romper el layout adyacente

**Por qué**: En NerdConf-Web: "no anda, si estoy en la 1 y quiero ir a la 3, debo clickear dos veces la 3 porque en la primera salta a la 2"; tras un fix: "pero eso rompió algo del scroll porque al clickear el 3ero ya se ve opacado por la otra sección". Cambios en posición de scroll o en overlap afectaron otra sección.

**Hacer**: Entender la estructura completa (wrapper, sticky, overlap, margin-top) antes de cambiar cálculos de scroll. Si se ajusta el paso o el snap, revisar que el inicio del overlap (p. ej. sección Culture) siga alineado con el fin del paso. Usar el browser MCP o debugging visual para validar después del cambio.

**No hacer**: Cambiar solo el cálculo de scroll o el step index sin comprobar el impacto en secciones que se superponen o en el sticky.

### 6. Tests deben reflejar el comportamiento real del código

**Por qué**: En gestor-de-correos un test esperaba `getCell(row, 1)` → `"undefined"` (por `String(undefined)`), pero la implementación usaba `row[index] ?? ""` y devolvía `""`. El test falló hasta que la IA lo corrigió para esperar `""`.

**Hacer**: Escribir o ajustar tests según la implementación real (incluyendo manejo de `undefined`/`null` con `??` o valores por defecto). Si se cambia el contrato (p. ej. devolver `""` en lugar de `"undefined"`), actualizar el test en el mismo cambio.

**No hacer**: Asumir que `String(undefined)` es el comportamiento deseado cuando el código usa coalescencia u otro valor por defecto.

### 7. Scripts y comandos: tener en cuenta el shell (zsh vs bash)

**Por qué**: En correos-mailtrain, `rm -f chunks/output/*.csv` fallaba en zsh cuando no había coincidencias (el glob no se expande como en bash con `nullglob`). La IA corrigió usando `find ... -delete`.

**Hacer**: En scripts que borran o listan con globs, usar construcciones que funcionen sin coincidencias (p. ej. `find ... -delete`, o comprobar que el shell maneje globs vacíos). Documentar si el script asume bash.

**No hacer**: Asumir que un comando que funciona en bash se comporta igual en zsh con globs vacíos.

### 8. Validar env y errores en tiempo de arranque

**Por qué**: En gestor-de-correos se sugirió validar variables de entorno al iniciar para evitar "undefined is not a function" o 500 genéricos; así se ve "Falta QSTASH_TOKEN en .env" en vez de fallos oscuros.

**Hacer**: Tener un módulo o checklist que lea las variables necesarias al arranque (`next dev`, deploy) y lance un error claro si falta alguna. Mejorar respuestas de error en APIs (log en servidor, mensaje estable al cliente sin filtrar datos sensibles).

**No hacer**: Dejar que las APIs fallen más adelante por env faltante o tipos incorrectos sin mensaje claro.

### 9. Refactors: eliminar código sobrante del cambio anterior

**Por qué**: En NerdConf-Web, después de refactorizar un `.map()` a componentes, quedaron closing divs/brackets huérfanos del viejo structure y el replace falló o dejó código roto.

**Hacer**: Al refactorizar (p. ej. de .map a componentes), revisar que no queden líneas huérfanas (cierre de divs, llaves) que pertenecían a la estructura anterior. Leer el archivo completo después del cambio para verificar la estructura.

**No hacer**: Dejar "código sobrante del .map() original" en el archivo.

### 10. Confirmar que el archivo se escribió correctamente

**Por qué**: En app-stellar la IA dijo "Parece que el archivo no se actualizó correctamente. Veo que todavía tiene el código viejo. Déjame corregirlo de nuevo." Las ediciones a veces no se persisten o se aplican al archivo equivocado.

**Hacer**: Después de un write/StrReplace, leer el archivo (Read) para confirmar que el contenido quedó como se intentó. Si se corrige un error de compilación, volver a ejecutar build/check.

**No hacer**: Dar por aplicado un cambio sin verificar con Read o sin re-ejecutar el build.

---

## Patrones a evitar

- **Asumir cuenta/tenant**: Usar la cuenta del deploy o la primera cuenta de Google en lugar de la cuenta del usuario logueado → revisar siempre de dónde sale el `userId` / `googleAccountId` en cada capa.
- **Cambios parciales en flujos end-to-end**: Arreglar solo "actualizar" cuando el usuario pide "sincronizar" (hard reset + reimport) → implementar el flujo completo que se pidió.
- **Tipos "casi" correctos**: Dejar `self: ScrollTrigger` cuando la API permite `undefined` → usar `self?: ScrollTrigger` y comprobar tipos de callbacks de librerías.
- **Diseño sin validar con el usuario**: Añadir "ruido" visual o texto decorativo cuando se pidió minimalismo → preguntar o iterar con feedback ("Tienes razón, me excedí con el ruido visual").
- **Recomendaciones de producto sin verificar límites**: Recomendar HubSpot Free como si cubriera todo y después reconocer "Me equivoqué, se queda corto para los requerimientos del CEO" → verificar límites (contactos, features) antes de recomendar.

---

## Checklist antes de implementar

- [ ] ¿Leí todos los archivos que afectan este flujo (rutas, servicios, tipos)?
- [ ] ¿El tipo de ref/propiedad admite `null` o debo usar guardas/objeto mínimo?
- [ ] ¿El cambio puede afectar otra sección (scroll, overlap, layout)? ¿Cómo lo verifico?
- [ ] ¿Los tests existentes reflejan el comportamiento actual? ¿Hay que actualizarlos?
- [ ] ¿El script/comando funciona en el shell del usuario (zsh/bash) y con datos vacíos?
- [ ] ¿Las variables de entorno necesarias están validadas al arranque?
- [ ] Después de editar: ¿ejecuté build/check y leí el archivo para confirmar el cambio?

---

## Contexto específico por tipo de tarea

### Cuando trabajes con Next.js / TypeScript (gestor-de-correos, NerdConf, web-julieta)

- Ejecutar `pnpm run build` (o el script de build del proyecto) después de tocar rutas API o tipos; los errores de `RouteHandlerConfig` o `Type 'null' is not assignable` suelen aparecer ahí.
- En mocks de tests, no usar `null` para propiedades que en el tipo son objetos; usar `{}` o el shape mínimo.
- Refs en componentes: usar el tipo del elemento concreto y, si la API no acepta null, comprobar `ref.current` antes de usar.

### Cuando hagas refactors (extracción de componentes, cambio de .map a componentes)

- Revisar que no queden cierres de tags o llaves huérfanas de la estructura anterior.
- Leer el archivo completo tras el cambio para verificar anidación y que no se rompa el layout o el flujo.

### Cuando implementes integraciones (OAuth, sync, multi-tenant)

- Identificar en cada capa qué usuario/cuenta está en contexto (sesión, token, DB).
- Si piden "hard reset" o "borrar y reimportar", implementar borrado explícito antes de reimportar y no solo upsert.
- Validar env (tokens, URLs) al arranque y en documentación.

### Cuando trabajes con Stellar / Soroban (app-stellar, stellar-wallets-kit-workshop)

- No confiar solo en ReadLints para Rust; ejecutar `cargo check` o `stellar contract build`.
- Verificar versión y estructura de `@stellar/stellar-sdk` (Server, SorobanRpc) ante "Module not found" o "undefined.Server"; la API puede haber cambiado.
- Después de editar archivos de wallet/signing, leer el archivo para confirmar que el cambio se aplicó.

### Cuando trabajes con Vite (gym-tracker, etc.)

- Si faltan tipos (`vite/client`, `@vitejs/plugin-react`), asegurar que las dependencias y `types` en tsconfig estén instaladas y referenciadas correctamente; no solo tocar vite.config sin instalar paquetes.
- En serverless/Vercel, evitar depender de `import.meta.url` para paths de archivos; usar `process.cwd()` o rutas que el bundler incluya.
