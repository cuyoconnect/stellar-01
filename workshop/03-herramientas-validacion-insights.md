# Herramientas de validación, /insights y ecosistema Stellar

## Comandos deterministas (Rust / Soroban)

Comandos que el agente puede ejecutar para validar sin depender solo del IDE:

| Comando | Uso |
|---------|-----|
| `cargo check` | Verificación rápida de compilación. |
| `cargo test` | Ejecutar la suite de tests. |
| `cargo scout-audit` | Análisis de vulnerabilidades Soroban (en el contexto del contrato). |

**Referencias:**

- Cargo: [doc.rust-lang.org/cargo](https://doc.rust-lang.org/cargo/)
- Scout: [github.com/StellarFoundation/scout](https://github.com/StellarFoundation/scout)

---

## Slash command sugerido: `/vibecoding-validate`

Secuencia a ejecutar en orden (no saltar pasos; si algo falla, reportar y corregir antes de seguir):

1. `cargo check`
2. `cargo fmt -- --check` (o `cargo fmt`)
3. `cargo test`
4. Si es contrato Soroban: `cargo scout-audit` en la carpeta del contrato

---

## /insights

Resume el flujo presentado en el workshop:

- **Input:** transcripciones de chats (`agent-transcripts/*.jsonl`).
- **Proceso:** análisis post-mortem → extracción de patrones de error.
- **Output:** slash command `/insights` con checklist preventivo.

Analiza **más de 280 sesiones** en **22 repositorios** para extraer patrones de error y prevenir fallas recurrentes.

### Texto del comando `/insights` (payload para agente)

```
Analiza las transcripciones de agentes en ~/.cursor/projects/*/agent-transcripts/ (archivos .txt o .jsonl) en todos tus proyectos de Cursor.

Objetivo: identificar patrones de error reales y generar o actualizar AGENTS.md con lecciones accionables (reglas Por qué / Hacer / No hacer, checklist antes de implementar).

Usa hasta 4 subagentes en paralelo: listar proyectos, rg/find sobre quejas del usuario, errores de build/TS, sync/OAuth, paths serverless, tests vs implementación real.

Para el flujo multi-fase completo y el checklist extendido, tomá como referencia AGENTS.md en la raíz del repo stellar (lecciones agregadas de muchas sesiones).

Salida: markdown listo para pegar en AGENTS.md del proyecto actual.
```

---

## SoroPG — Soroban Playground

Escribir, compilar, testear y desplegar contratos Soroban (Rust) en el navegador; útil para iterar sin instalar Stellar CLI en local.

- **Sitio:** [soropg.com](https://soropg.com/)
- **Enfoque:** iteración sin setup local; build, test, deploy y explore en el mismo loop.
- **Feedback loop resumido:** Create → Build → Test → Deploy → Explore.

---

## Stellar Game Studio

Entorno y recursos para construir juegos y experiencias interactivas sobre Stellar/Soroban. Encaja en el feedback loop cuando el producto es una dApp o un juego on-chain.

- Wallets, assets y contratos usados dentro de experiencias lúdicas.
- Probás en testnet, la IA sugiere cambios, iterás con datos reales.

**Guía rápida (hackathon):** [dorahacks.io/hackathon/stellar-hacks-zk-gaming/quickstart-guide](https://dorahacks.io/hackathon/stellar-hacks-zk-gaming/quickstart-guide)
