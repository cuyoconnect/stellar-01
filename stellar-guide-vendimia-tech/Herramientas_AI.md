# Herramientas de AI Recomendadas

Tools de AI específicamente útiles para desarrollar sobre Stellar, asistentes de código, y frameworks para agentes.

---

## Asistentes de código

### Claude Code (CLI)

- **Qué es:** CLI oficial de Anthropic para programar con Claude
- **Por qué usarlo:** Plan mode, agentes paralelos, contexto persistente con CLAUDE.md
- **Setup:** `npm install -g @anthropic-ai/claude-code`
- **Costo:** Free tier disponible
- **Ideal para:** Desarrollo completo durante la hackathon (ver [Guia_Claude_Code.md](./Guia_Claude_Code.md))

### GitHub Copilot

- **Qué es:** Autocompletado de código integrado en VS Code
- **Por qué usarlo:** Sugerencias inline mientras escribís
- **Costo:** Gratis para estudiantes y open source
- **Ideal para:** Completar código boilerplate, escribir tests

### Cursor

- **Qué es:** Editor de código con AI integrada
- **Por qué usarlo:** Chat + edición directa en el editor
- **Costo:** Free tier limitado
- **Ideal para:** Si preferís una interfaz visual sobre CLI

### Windsurf (ex-Codeium)

- **Qué es:** Editor AI con "flows" para tareas complejas
- **Costo:** Free tier generoso
- **Ideal para:** Alternativa a Cursor con buen free tier

---

## Herramientas Stellar-specific con AI

### Stellar Turrets

- Funciones serverless para operaciones Stellar
- Útil para lógica de negocio que interactúa con la red

### Soroban Copilot (comunidad)

- Prompts y templates específicos para desarrollo Soroban
- Patrones comunes pre-configurados

---

## Frameworks multi-agente

Si tu proyecto involucra agentes de AI que interactúan con blockchain:

### LangChain / LangGraph

- **Qué es:** Framework para construir aplicaciones con LLMs
- **Útil para:** Agentes que necesitan tool calling, RAG, memoria
- **Con Stellar:** Podés crear tools que consulten Horizon API o ejecuten transacciones

### CrewAI

- **Qué es:** Framework para orquestar múltiples agentes
- **Útil para:** Proyectos donde querés que varios agentes colaboren
- **Ejemplo:** Un agente analiza el mercado, otro ejecuta trades en Soroswap

### Vercel AI SDK

- **Qué es:** SDK para integrar AI en aplicaciones Next.js
- **Útil para:** Chatbots y interfaces conversacionales
- **Con Stellar:** Chat que permite consultar balances o enviar transacciones vía lenguaje natural

---

## Combinaciones recomendadas para la hackathon

### Para un proyecto DeFi

```
Claude Code (desarrollo) + Stellar SDK (blockchain) + Vercel AI SDK (UI conversacional)
```

### Para un proyecto de pagos

```
Claude Code (desarrollo) + Stellar SDK (transacciones) + GitHub Copilot (autocompletado)
```

### Para un proyecto de agentes AI

```
Claude Code (desarrollo) + LangChain (orquestación) + Stellar SDK (ejecución on-chain)
```

### Para un proyecto con recursos limitados

```
Ollama local (modelo) + VS Code (editor) + Stellar CLI (blockchain)
→ 100% offline, 0 costo
```

---

## Tips para usar AI efectivamente en hackathons

1. **No dependas de un solo servicio:** Tené siempre un backup (ej: si Claude está caído, usá Gemini)
2. **Cacheá respuestas útiles:** Guardá snippets que funcionen en un archivo `snippets.md`
3. **Usá AI para lo tedioso:** Boilerplate, tests, CSS — guardá tu creatividad para la lógica de negocio
4. **No pelees con la AI:** Si después de 3 intentos no te da lo que querés, hacelo manual y seguí
5. **Documentá con AI:** Al final, pedile que te escriba el README basado en el código actual
