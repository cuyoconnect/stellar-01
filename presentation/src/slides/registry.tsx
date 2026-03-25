import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { AddToIde } from '../components/AddToIde'
import { IdePickerCards } from '../components/IdePickerCards'
import { CopyablePrompt } from '../components/CopyablePrompt'
import { LinkPill } from '../components/LinkPill'
import { Slide, SlideItem, SlideSubtitle, SlideTitle } from '../components/Slide'
import { IDE_OPTIONS, type IdeTarget } from '../lib/deeplinks'
import { IdeIcon } from '../components/IdeIcon'
import { visualForIde } from '../lib/ideTheme'

const INSIGHTS_PROMPT = `Analiza las transcripciones de agentes en ~/.cursor/projects/*/agent-transcripts/ (archivos .txt o .jsonl) en todos tus proyectos de Cursor.

Objetivo: identificar patrones de error reales y generar o actualizar AGENTS.md con lecciones accionables (reglas Por qué / Hacer / No hacer, checklist antes de implementar).

Usa hasta 4 subagentes en paralelo: listar proyectos, rg/find sobre quejas del usuario, errores de build/TS, sync/OAuth, paths serverless, tests vs implementación real.

Para el flujo multi-fase completo y el checklist extendido, tomá como referencia AGENTS.md en la raíz del repo stellar (lecciones agregadas de muchas sesiones).

Salida: markdown listo para pegar en AGENTS.md del proyecto actual. Máximo 20 reglas priorizadas por frecuencia/severidad.

Nota: los transcripts pueden contener tokens, rutas o datos sensibles — revisá antes de compartir la salida.`

const PROMPT_MVP = `Necesito crear una aplicación web que permita a usuarios argentinos enviar
pagos en USDC a través de Stellar. El stack es Next.js 15 con TypeScript
y Tailwind CSS. La wallet es Freighter.

Requisitos:
1. Conectar Freighter wallet
2. Mostrar balance de XLM y USDC (con trustline)
3. Formulario para enviar USDC a otra dirección Stellar
4. Historial de transacciones (últimas 20 operaciones vía Horizon)

Usamos Stellar testnet. Si el USDC no existe en testnet, proponé un issuer
de prueba con USDC como asset code. Empezá con el plan de arquitectura antes de codear.`

const PROMPT_DEFI = `Quiero construir un dashboard DeFi que muestre información de protocolos
Stellar. El usuario conecta su Freighter wallet y ve:

1. Su balance de XLM, USDC y otros assets
2. Sus posiciones en Blend (lending/borrowing)
3. Liquidez aportada en Soroswap/Phoenix

Stack: Next.js, TypeScript, Tailwind, stellar-sdk.
Red: testnet para desarrollo, pero la UI debe servir para mainnet después.

MVP: solo balances + una vista de posiciones (mock si la API no tiene SDK estable).
P&L y resumen de ganancias/pérdidas quedan para fase 2.
Planificá primero la arquitectura.`

const PROMPT_ESCROW = `Necesito crear un contrato Soroban en Rust que implemente un sistema de
escrow simple:

1. Un usuario deposita USDC en el contrato
2. Define un beneficiario y una condición (timestamp de ledger)
3. Después del timestamp, el beneficiario puede retirar
4. Antes del timestamp, el depositante puede cancelar

Usá ledger_timestamp() de Soroban para el tiempo.
Incluí roles explícitos (depositor / beneficiary) y eventos emitidos en cada operación.
Empezá con la estructura del contrato y los tests en soroban-sdk.`

const AGENTS_MD_EXAMPLE = `# AGENTS.md

## Stack
- Next.js 15 + TypeScript + Tailwind
- Stellar SDK + Freighter

## Comandos de validación
- npm run lint
- npm test

## Convenciones
- UI en español, código en inglés
- No tocar schema sin migración

## Antes de cerrar
- dejar pasos reproducibles
- anotar supuestos o riesgos`

export function Slide01Title() {
  return (
    <Slide className="min-h-[70vh]">
      <SlideItem>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-[#0f0f0f]/70">
          Workshop técnico
        </p>
      </SlideItem>
      <SlideItem>
        <h1 className="font-serif text-5xl font-normal tracking-[-0.03em] text-[#0f0f0f] md:text-7xl md:leading-[1.05]">
          Vibecoding en Web3
        </h1>
      </SlideItem>
      <SlideItem>
        <p className="mt-6 max-w-2xl text-xl text-[#0f0f0f]/70 md:text-2xl">
          Desarrollo asistido con IA, MCPs y el ecosistema{' '}
          <span className="font-medium text-[#0f0f0f]">Stellar / Soroban</span>
        </p>
      </SlideItem>
      <SlideItem className="mt-10 flex flex-wrap justify-center gap-3">
        <span className="rounded-full border border-[#0f0f0f]/12 bg-[#f9f9f9] px-4 py-2 text-sm text-[#0f0f0f]/80">
          SoroPG · stellar-dev · MCPs · Insights
        </span>
        <span className="rounded-full border border-[#fdda24]/60 bg-[#fdda24]/10 px-4 py-2 text-sm text-[#0f0f0f]/80">
          Hands-on · Bring your laptop
        </span>
      </SlideItem>
    </Slide>
  )
}

export function Slide02Vibecoding() {
  const concepts = [
    {
      title: 'Ventana de contexto',
      body: 'El modelo trabaja con una cantidad finita de texto. Si le pasás demasiado ruido, pierde señales importantes o resume mal partes del problema.',
    },
    {
      title: 'Contexto útil > contexto enorme',
      body: 'El archivo correcto, el error real y el objetivo concreto suelen rendir mejor que pegar todo el repo o un prompt larguísimo.',
    },
    {
      title: 'Feedback ejecutable',
      body: 'Cuando puede correr tests, leer logs o usar herramientas, la IA corrige mejor. Sin validación real, aumenta el riesgo de alucinaciones.',
    },
  ]

  return (
    <Slide>
      <SlideTitle>Desarrollar con IA: 3 ideas base</SlideTitle>
      <SlideSubtitle>
        Para trabajar mejor con agentes no alcanza con "prompting": importa qué contexto reciben y
        qué señal les devolvés.
      </SlideSubtitle>
      <SlideItem className="mt-8 grid w-full max-w-5xl gap-4 text-left md:grid-cols-3">
        {concepts.map((concept, index) => (
          <div
            key={concept.title}
            className="rounded-2xl border border-[#0f0f0f]/10 bg-[#f9f9f9] p-5 shadow-sm"
          >
            <div className="mb-4 inline-flex size-8 items-center justify-center rounded-full bg-[#fdda24]/20 text-sm font-semibold text-[#0f0f0f]">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold text-[#0f0f0f]">{concept.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#0f0f0f]/68">{concept.body}</p>
          </div>
        ))}
      </SlideItem>
      <SlideItem className="mt-6 max-w-3xl">
        <p className="text-sm text-[#0f0f0f]/52">
          Regla práctica: mejor <strong className="text-[#0f0f0f]/70">contexto curado</strong> que
          contexto masivo. Dale archivos puntuales, objetivo claro y cómo validar.
        </p>
      </SlideItem>
    </Slide>
  )
}

export function Slide03FeedbackLoop() {
  const sections = [
    {
      title: 'Qué poner',
      items: [
        'stack, arquitectura y comandos reales del proyecto',
        'convenciones del equipo y decisiones que no querés repetir',
        'restricciones: qué no tocar, cómo validar y qué significa "terminado"',
      ],
    },
    {
      title: 'Qué evita',
      items: [
        'prompts repetidos en cada sesión',
        'cambios inconsistentes entre agentes o IDEs',
        'errores por asumir comandos, paths o criterios de validación incorrectos',
      ],
    },
  ]

  return (
    <Slide>
      <SlideTitle>`AGENTS.md`: memoria operativa del repo</SlideTitle>
      <SlideSubtitle>
        Un archivo corto que alinea al agente con cómo se trabaja en este proyecto, incluso cuando
        cambiás de chat o de herramienta.
      </SlideSubtitle>
      <SlideItem className="mt-8 grid w-full max-w-5xl gap-4 text-left md:grid-cols-[1.05fr,0.95fr]">
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-[#0f0f0f]/10 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-[#0f0f0f]">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#0f0f0f]/70">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#00a7b5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <CodeBlock code={AGENTS_MD_EXAMPLE} language="markdown" title="Ejemplo mínimo" />
      </SlideItem>
      <SlideItem className="mt-4 max-w-3xl">
        <p className="text-xs text-[#0f0f0f]/42">
          Pensalo como onboarding para la IA: poco texto, reglas concretas y comandos que de verdad
          existan en el repo.
        </p>
      </SlideItem>
    </Slide>
  )
}

export function Slide05Mcps() {
  const rows = [
    {
      name: 'Vercel MCP',
      role: 'Deploy, preview y logs desde el agente.',
      href: 'https://vercel.com/docs/agent-resources/vercel-mcp',
    },
    {
      name: 'Supabase MCP',
      role: 'Postgres, Auth y Realtime con datos reales.',
      href: 'https://supabase.com/docs/guides/getting-started/mcp',
    },
    {
      name: 'Chrome DevTools MCP',
      role: 'Automatización y depuración en Chrome (equipo oficial).',
      href: 'https://github.com/ChromeDevTools/chrome-devtools-mcp',
    },
    {
      name: 'Trustless Work',
      role: 'Documentación de escrow/Stellar optimizada para IA.',
      href: 'https://docs.trustlesswork.com/',
    },
    {
      name: 'Stellar XDR MCP',
      role: 'Encode/decode XDR de Stellar — depuración de contratos Soroban.',
      href: 'https://github.com/stellar/mcp-stellar-xdr',
    },
  ]
  return (
    <Slide>
      <SlideTitle>MCPs que usamos</SlideTitle>
      <SlideSubtitle>
        Conectá capacidades externas al agente — cada uno con doc oficial. Requieren un host MCP
        (p. ej. Cursor) configurado.
      </SlideSubtitle>
      <SlideItem className="mt-6 flex w-full max-w-3xl flex-col gap-3">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex flex-col items-stretch justify-between gap-3 rounded-xl border border-[#0f0f0f]/10 bg-[#f9f9f9] p-4 text-left sm:flex-row sm:items-center"
          >
            <div>
              <div className="font-semibold text-[#0f0f0f]">{r.name}</div>
              <p className="mt-1 text-sm text-[#0f0f0f]/60">{r.role}</p>
            </div>
            <LinkPill href={r.href}>Abrir docs</LinkPill>
          </div>
        ))}
      </SlideItem>
    </Slide>
  )
}

export function Slide06Skills() {
  return (
    <Slide>
      <SlideTitle>Skills y stellar-dev</SlideTitle>
      <SlideSubtitle>
        Las skills son playbooks de dominio que el agente carga y usa de forma progresiva.{' '}
        <strong className="text-[#0f0f0f]">stellar-dev</strong> es la skill oficial del ecosistema
        Stellar.
      </SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-2xl text-left">
        <ul className="space-y-2 text-sm text-[#0f0f0f]/70">
          {[
            'Contratos Soroban — patrones de SDK, testing, deploy.',
            'SDKs y RPC / Horizon — flujos de cliente y firma.',
            'Wallets y autenticación — Freighter, passkeys, SEP.',
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#00a7b5]" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </SlideItem>
      <SlideItem className="mt-6 flex flex-wrap justify-center gap-3">
        <LinkPill href="https://skills.sh/">skills.sh — catálogo</LinkPill>
        <LinkPill href="https://skills.sh/stellar/stellar-dev-skill/stellar-dev">
          stellar-dev
        </LinkPill>
      </SlideItem>
      <SlideItem className="mt-6 w-full max-w-xl">
        <CodeBlock code="npx skills add stellar-dev" language="bash" title="Instalación" />
      </SlideItem>
    </Slide>
  )
}

export function Slide07Validation() {
  return (
    <Slide>
      <SlideTitle>Validación reproducible</SlideTitle>
      <SlideSubtitle>
        Comandos que el agente ejecuta en orden — no depender solo del "parece que compiló" en el
        IDE.
      </SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-2xl space-y-3">
        <CodeBlock code="cargo check" language="bash" title="Compilación rápida" />
        <CodeBlock code="cargo clippy -- -D warnings" language="bash" title="Linting estricto" />
        <CodeBlock code="cargo test" language="bash" title="Suite de tests" />
        <CodeBlock
          code="stellar contract build"
          language="bash"
          title="Artefacto WASM (contratos Soroban)"
        />
        <CodeBlock
          code="cargo scout-audit"
          language="bash"
          title="Análisis de vulnerabilidades (en la carpeta del contrato)"
        />
      </SlideItem>
      <SlideItem className="mt-4">
        <p className="mb-3 text-xs text-[#0f0f0f]/40">
          Scout: análisis estático — complementa tests, no reemplaza auditoría.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <LinkPill href="https://doc.rust-lang.org/cargo/">Cargo</LinkPill>
          <LinkPill href="https://coinfabrik.github.io/scout-audit/docs/intro">Scout Audit</LinkPill>
          <LinkPill href="https://developers.stellar.org/docs/tools/stellar-cli">Stellar CLI</LinkPill>
        </div>
      </SlideItem>
    </Slide>
  )
}

export function Slide08VibecodingValidate() {
  const blocks = [
    {
      title: 'Cursor: Continual Learning',
      badge: 'Plugin oficial',
      tone: 'bg-[#fdda24]/15 text-[#0f0f0f]',
      items: [
        'Aprende de correcciones recurrentes y hechos durables del workspace.',
        'Lee cambios en transcripciones y mantiene `AGENTS.md` actualizado con bullets simples.',
        'Está empaquetado como plugin con `skills` y `hooks` en el Marketplace de Cursor.',
      ],
    },
    {
      title: 'Claude Code: /insights',
      badge: 'Comando nativo',
      tone: 'bg-[#00a7b5]/12 text-[#0f0f0f]',
      items: [
        'Genera un reporte sobre sesiones, áreas del proyecto y patrones de interacción.',
        'Sirve para detectar fricción repetida y convertirla en reglas o memoria útil.',
        'Es más un análisis retrospectivo que una escritura automática continua.',
      ],
    },
  ]

  return (
    <Slide>
      <SlideTitle>Aprendizaje continuo con agentes</SlideTitle>
      <SlideSubtitle>
        Dos enfoques parecidos, pero no iguales: Cursor automatiza memoria incremental y Claude
        Code inspecciona sesiones para encontrar patrones.
      </SlideSubtitle>
      <SlideItem className="mt-8 grid w-full max-w-5xl gap-4 text-left md:grid-cols-2">
        {blocks.map((block) => (
          <div
            key={block.title}
            className="rounded-2xl border border-[#0f0f0f]/10 bg-[#f9f9f9] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-[#0f0f0f]">{block.title}</h3>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${block.tone}`}>
                {block.badge}
              </span>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#0f0f0f]/72">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0f0f0f]/35" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SlideItem>
      <SlideItem className="mt-5 flex flex-wrap justify-center gap-2">
        <LinkPill href="https://cursor.com/marketplace/cursor/continual-learning">
          Cursor Plugin
        </LinkPill>
        <LinkPill href="https://cursor.com/docs/plugins.md">Cursor Plugins Docs</LinkPill>
        <LinkPill href="https://code.claude.com/docs/en/commands">Claude Code Commands</LinkPill>
      </SlideItem>
      <SlideItem className="mt-4 max-w-3xl">
        <p className="text-xs text-[#0f0f0f]/42">
          Nota: el <code className="font-mono">/insights</code> del slide siguiente es un flujo
          custom para esta presentación; no es exactamente el comando nativo de Claude Code.
        </p>
      </SlideItem>
    </Slide>
  )
}

export function Slide09Insights() {
  return (
    <Slide>
      <SlideTitle>/insights</SlideTitle>
      <SlideSubtitle>
        Post-mortem de transcripciones → patrones de error → checklist en{' '}
        <code className="rounded bg-[#0f0f0f]/8 px-1.5 py-0.5 font-mono text-sm text-[#00a7b5]">
          AGENTS.md
        </code>
        . Referencia: análisis de <strong className="text-[#0f0f0f]">más de 280 sesiones</strong> en{' '}
        <strong className="text-[#0f0f0f]">22 repositorios</strong>.
      </SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-4xl">
        <CopyablePrompt text={INSIGHTS_PROMPT} maxHeight="min(40vh, 320px)" />
      </SlideItem>
      <SlideItem className="mt-3">
        <p className="text-xs text-[#0f0f0f]/40">
          Los transcripts pueden contener tokens o datos sensibles — revisá la salida antes de compartir.
        </p>
      </SlideItem>
    </Slide>
  )
}

export function Slide10SoroPG() {
  const mini = ['Create', 'Build', 'Test', 'Deploy', 'Explore']
  return (
    <Slide>
      <SlideTitle>SoroPG — Soroban Playground</SlideTitle>
      <SlideSubtitle>
        Escribir, compilar, testear y desplegar contratos Soroban en el navegador — iteración sin
        Stellar CLI local.
      </SlideSubtitle>
      <SlideItem className="mt-8 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 md:gap-3">
        {mini.map((s, i) => (
          <div key={s} className="flex items-center gap-2 md:gap-3">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="rounded-lg border border-[#0f0f0f]/10 bg-white px-3 py-2 text-sm font-medium text-[#0f0f0f] shadow-sm"
            >
              {s}
            </motion.span>
            {i < mini.length - 1 ? (
              <span className="hidden text-[#00a7b5] sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </SlideItem>
      <SlideItem className="mt-6">
        <LinkPill href="https://soropg.com/">soropg.com</LinkPill>
      </SlideItem>
      <SlideItem className="mt-4">
        <p className="text-xs text-[#0f0f0f]/40">
          Ideal para prototipos y talleres. Para proyectos grandes o CI, usar Stellar CLI local.
        </p>
      </SlideItem>
    </Slide>
  )
}

export function Slide12SetupAi() {
  return (
    <Slide>
      <SlideTitle>Setup de IA (gratis)</SlideTitle>
      <SlideSubtitle>
        APIs en la nube, modelos locales (Ollama) y combinaciones que funcionan sin tarjeta.
      </SlideSubtitle>
      <SlideItem className="mt-8 w-full max-w-3xl text-left text-sm text-[#0f0f0f]/80">
        <div className="space-y-4 rounded-xl border border-[#0f0f0f]/10 bg-[#f9f9f9] p-6">
          <p>
            <strong className="text-[#0f0f0f]">Opción A (minimalista):</strong> Google AI Studio +
            Groq — poca configuración, sin tarjeta.
          </p>
          <p>
            <strong className="text-[#0f0f0f]">Opción B (laptop fuerte):</strong> Ollama +
            qwen2.5-coder (o qwen3-coder) + Groq como backup — posible offline.
          </p>
          <p>
            <strong className="text-[#0f0f0f]">Opción C (máx. gratis):</strong> OpenRouter (modelos{' '}
            <code className="rounded bg-[#0f0f0f]/8 px-1 font-mono text-xs">:free</code>) +
            Google AI Studio + Mistral API — varios modelos.
          </p>
        </div>
      </SlideItem>
      <SlideItem className="mt-4">
        <p className="text-xs text-[#0f0f0f]/40">
          Límites y disponibilidad cambian; verificar en la consola de cada proveedor el día del taller.
        </p>
      </SlideItem>
      <SlideItem className="mt-4 flex flex-wrap justify-center gap-2">
        <LinkPill href="https://aistudio.google.com/">Google AI Studio</LinkPill>
        <LinkPill href="https://console.groq.com/">Groq</LinkPill>
        <LinkPill href="https://ollama.com/">Ollama</LinkPill>
        <LinkPill href="https://openrouter.ai/">OpenRouter</LinkPill>
        <LinkPill href="https://mistral.ai/">Mistral</LinkPill>
      </SlideItem>
    </Slide>
  )
}

const CLAUDE_MD = `# CLAUDE.md

## Proyecto
App de ejemplo usando Stellar/Soroban.

## Stack
- Frontend: Next.js + TypeScript
- Blockchain: Stellar SDK + Soroban

## Convenciones
- UI en español, código en inglés
- Testnet por defecto`

export function Slide13ClaudeCode() {
  return (
    <Slide>
      <SlideTitle>Claude Code en 60s</SlideTitle>
      <SlideSubtitle>CLI, Plan Mode y contexto persistente con CLAUDE.md</SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-2xl space-y-4">
        <CodeBlock
          code={`# macOS / Linux (recomendado)
curl -fsSL https://claude.ai/install.sh | sh
# macOS con Homebrew
# brew install --cask claude-code

cd mi-proyecto && claude   # login en navegador al primer uso`}
          language="bash"
          title="Instalación y arranque"
        />
        <CodeBlock code="> /plan [tu idea en una frase + stack]" language="markdown" title="Plan Mode" />
        <CodeBlock code={CLAUDE_MD} language="markdown" title="Ejemplo CLAUDE.md  (o generalo con /init)" />
      </SlideItem>
    </Slide>
  )
}

export function Slide14Prompts() {
  return (
    <Slide>
      <SlideTitle>Prompts listos</SlideTitle>
      <SlideSubtitle>Tres arranques distintos — copiá y adaptá al repo.</SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-4xl space-y-6">
        <div>
          <p className="mb-2 text-left text-sm font-medium text-[#0f0f0f]/55">MVP pagos USDC</p>
          <CopyablePrompt text={PROMPT_MVP} maxHeight="200px" label="Copiar" />
        </div>
        <div>
          <p className="mb-2 text-left text-sm font-medium text-[#0f0f0f]/55">DeFi dashboard</p>
          <CopyablePrompt text={PROMPT_DEFI} maxHeight="200px" label="Copiar" />
        </div>
        <div>
          <p className="mb-2 text-left text-sm font-medium text-[#0f0f0f]/55">Escrow Soroban</p>
          <CopyablePrompt text={PROMPT_ESCROW} maxHeight="180px" label="Copiar" />
        </div>
      </SlideItem>
    </Slide>
  )
}

export function Slide15Tools() {
  const tools = [
    { n: 'Claude Code', d: 'CLI, plan, agentes, CLAUDE.md' },
    { n: 'GitHub Copilot', d: 'Inline en el editor' },
    { n: 'Cursor', d: 'Chat + edición en IDE' },
    { n: 'Windsurf', d: 'Flows para tareas largas' },
    { n: 'LangChain / CrewAI', d: 'Orquestación multi-agente' },
    { n: 'Vercel AI SDK', d: 'Chat en Next.js' },
    { n: 'scaffold-soroban', d: 'Templates oficiales para contratos Soroban' },
    { n: 'stellar-dev skill', d: 'Playbook Soroban + SDK para agentes de IA' },
  ]
  return (
    <Slide>
      <SlideTitle>Mapa de herramientas</SlideTitle>
      <SlideSubtitle>Combiná según el tipo de proyecto — no dependas de un solo proveedor.</SlideSubtitle>
      <SlideItem className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <div
            key={t.n}
            className="rounded-xl border border-[#0f0f0f]/10 bg-white p-4 text-left shadow-sm"
          >
            <div className="font-semibold text-[#0f0f0f]">{t.n}</div>
            <p className="mt-1 text-sm text-[#0f0f0f]/60">{t.d}</p>
          </div>
        ))}
      </SlideItem>
    </Slide>
  )
}

export function Slide16Installation() {
  const [ide, setIde] = useState<IdeTarget | null>(null)
  const visual = ide ? visualForIde(ide) : null
  const ideLabel = ide ? (IDE_OPTIONS.find((o) => o.value === ide)?.label ?? '') : ''
  const isOtros = ide === 'others'

  return (
    <Slide>
      <SlideTitle>Instalación</SlideTitle>
      <SlideSubtitle>
        Elegí tu IDE. En Cursor los comandos se abren con un clic para confirmar; las rules/skills
        quedan disponibles en el chat. En otros editores copiamos el texto para pegarlo.
      </SlideSubtitle>

      <SlideItem className="mt-8 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!ide ? (
            <motion.div
              key="pick-ide"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="flex justify-center"
            >
              <IdePickerCards onSelect={setIde} />
            </motion.div>
          ) : (
            <motion.div
              key="install-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex w-full flex-col items-center"
            >
              <div
                className={
                  isOtros
                    ? 'w-full max-w-2xl rounded-2xl border border-[#ebe4dc] bg-[#faf9f6] p-6 shadow-[0_2px_12px_rgba(28,25,23,0.06)] sm:p-8'
                    : 'w-full max-w-2xl'
                }
              >
                <div
                  className={
                    isOtros
                      ? 'mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
                      : 'mb-8 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
                  }
                >
                  <div className="flex items-center gap-4">
                    {visual ? (
                      <div
                        className={
                          isOtros
                            ? 'flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#f0e4db] bg-[#fff7f2] shadow-sm'
                            : 'flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-sm'
                        }
                        style={
                          isOtros
                            ? undefined
                            : { backgroundColor: `${visual.bg}24` }
                        }
                      >
                        <IdeIcon
                          visual={visual}
                          className="size-7 shrink-0"
                          color={visual.bgDark}
                        />
                      </div>
                    ) : null}
                    <div className="text-left">
                      <p
                        className={
                          isOtros
                            ? 'text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b7355]'
                            : 'text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0f0f0f]/45'
                        }
                      >
                        Instalando en
                      </p>
                      <p
                        className={
                          isOtros
                            ? 'font-serif text-2xl tracking-tight text-[#2d2419]'
                            : 'font-serif text-2xl tracking-tight text-[#0f0f0f]'
                        }
                      >
                        {ideLabel}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIde(null)}
                    className={
                      isOtros
                        ? 'shrink-0 self-start rounded-full border border-[#e0d5cb] bg-white px-5 py-2.5 text-sm font-medium text-[#5c4a3d] shadow-sm transition hover:border-[#d4c4b8] hover:bg-[#fffefb] sm:self-center'
                        : 'shrink-0 self-start rounded-full border border-[#0f0f0f]/12 bg-white px-5 py-2.5 text-sm font-medium text-[#0f0f0f]/80 shadow-sm transition hover:border-[#0f0f0f]/20 hover:bg-[#fafafa] sm:self-center'
                    }
                  >
                    Elegir otro IDE
                  </button>
                </div>

                <div className="flex w-full flex-col items-stretch gap-3">
                  <AddToIde
                    ide={ide}
                    payloadKey="vibecoding-validate"
                    label="Add to Cursor — /vibecoding-validate"
                  />
                  <AddToIde ide={ide} payloadKey="insights" label="Add to Cursor — /insights" />
                  <AddToIde
                    ide={ide}
                    payloadKey="stellar-design"
                    label="Add to Cursor — rule stellar-design"
                  />
                  <AddToIde
                    ide={ide}
                    payloadKey="stellar-image-generation"
                    label="Add to Cursor — rule stellar-image-generation"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SlideItem>
    </Slide>
  )
}

export function Slide17Resources() {
  const blocks = [
    {
      title: 'Documentación',
      links: [
        ['Stellar Docs (incl. Soroban)', 'https://developers.stellar.org'],
        ['Smart Contracts — Getting Started', 'https://developers.stellar.org/docs/build/smart-contracts/getting-started'],
        ['JS SDK (@stellar/stellar-sdk)', 'https://stellar.github.io/js-stellar-sdk/'],
        ['Stellar Lab', 'https://lab.stellar.org'],
        ['Stellar CLI', 'https://developers.stellar.org/docs/tools/stellar-cli'],
        ['Freighter', 'https://docs.freighter.app'],
      ],
    },
    {
      title: 'Protocolos / comunidad',
      links: [
        ['Blend', 'https://docs.blend.capital'],
        ['Soroswap', 'https://docs.soroswap.finance'],
        ['Trustless Work', 'https://docs.trustlesswork.com/'],
        ['Discord dev community', 'https://discord.gg/stellardev'],
      ],
    },
  ]
  return (
    <Slide>
      <SlideTitle>Recursos</SlideTitle>
      <SlideSubtitle>Links esenciales para seguir después del workshop.</SlideSubtitle>
      <SlideItem className="mt-8 grid w-full max-w-4xl gap-6 text-left md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-xl border border-[#0f0f0f]/10 bg-[#f9f9f9] p-5">
            <h3 className="font-semibold text-[#0f0f0f]">{b.title}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {b.links.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#00a7b5] underline-offset-2 hover:underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </SlideItem>
    </Slide>
  )
}

export function Slide18Close() {
  return (
    <Slide className="min-h-[60vh]">
      <SlideTitle>Tu próximo paso</SlideTitle>
      <SlideItem className="mt-6 w-full max-w-xl">
        <div className="rounded-xl border border-[#fdda24]/50 bg-[#fdda24]/8 px-6 py-4 text-left">
          <p className="text-sm font-medium text-[#0f0f0f]">
            Hoy: armá un proyecto testnet e instalá stellar-dev.
          </p>
        </div>
      </SlideItem>
      <SlideItem className="mt-4 w-full max-w-xl text-left">
        <ul className="space-y-2 text-sm text-[#0f0f0f]/65">
          {[
            'Conectá un MCP (Vercel, Supabase o Stellar XDR).',
            'Cerrá el loop: prompt → código → comando real → feedback.',
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#0f0f0f]/30" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </SlideItem>
      <SlideItem className="mt-8 max-w-xl">
        <p className="text-sm text-[#0f0f0f]/65">
          Recordá:{' '}
          <strong className="text-[#0f0f0f]">confiá pero verificá</strong>, especialmente en
          transacciones y contratos.
        </p>
      </SlideItem>
    </Slide>
  )
}
