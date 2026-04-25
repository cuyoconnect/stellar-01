import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { AddToIde } from '../components/AddToIde'
import { IdePickerCards } from '../components/IdePickerCards'
import { LinkPill } from '../components/LinkPill'
import { PromptCompareWindow } from '../components/PromptCompareWindow'
import {
  Slide,
  SlideItem,
  SlideSubtitle,
  SlideTitle,
  slideTitleSelectEffect,
} from '../components/Slide'
import { IDE_OPTIONS, type IdeTarget } from '../lib/deeplinks'
import { IdeIcon } from '../components/IdeIcon'
import { visualForIde } from '../lib/ideTheme'

const PRESENTATION_URL = 'https://stellar-01.vercel.app/'
const PRESENTATION_HOST = 'stellar-01.vercel.app'

export function Slide01Title() {
  return (
    <Slide className="min-h-[70vh]">
      <SlideItem className="w-full max-w-5xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16 lg:gap-24">
          <div className="relative z-10 min-w-0 flex-1 text-left">
            <h1 className="font-serif text-5xl font-normal leading-[1.2] tracking-[-0.03em] md:text-6xl md:leading-[1.18] lg:text-7xl lg:leading-[1.15]">
              <span className={slideTitleSelectEffect}>Workshop en Claude Code en Web3</span>
            </h1>
          </div>
          <div className="relative z-0 flex w-full shrink-0 flex-col items-center gap-4 text-center md:w-auto">
            <img
              src="/qrcode_stellar-01.vercel.app.png"
              alt="Código QR para abrir la presentación en el teléfono"
              className="aspect-square w-[min(78vw,30.6rem)] max-w-full"
            />
            <a
              href={PRESENTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-full font-mono text-2xl font-medium tracking-tight text-[#00a7b5] underline-offset-[3px] hover:underline md:text-3xl lg:text-4xl"
            >
              {PRESENTATION_HOST}
            </a>
          </div>
        </div>
      </SlideItem>
    </Slide>
  )
}

function ConceptCard({
  index,
  title,
  body,
}: {
  index: number
  title: string
  body: string
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-start">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fdda24] text-[13px] font-semibold tabular-nums text-[#0f0f0f]">
          {index + 1}
        </span>
      </div>
      <h3 className="mt-4 text-left text-[17px] font-semibold leading-snug text-[#0f0f0f]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#0f0f0f]/65">{body}</p>
    </div>
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
      <SlideTitle highlight={false}>Desarrollar con IA: 3 ideas base</SlideTitle>
      <SlideItem className="mt-8 w-full max-w-4xl md:mt-10">
        <figure className="mx-auto text-left md:text-center">
          <img
            src="/lost-in-the-middle-context.png"
            alt="Gráfico de desempeño según la posición en la ventana de contexto: el modelo tiende a usar peor la información en el medio (lost in the middle)."
            className="mx-auto max-h-[280px] w-full max-w-3xl object-contain object-left sm:max-h-[300px] md:max-h-[340px] md:object-center rounded-lg border border-[#0f0f0f]/8 shadow-[0_1px_0_rgba(15,15,15,0.04)]"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-2 max-w-2xl text-[11px] leading-relaxed text-[#0f0f0f]/48 md:mx-auto">
            Ilustración del paper <em>Lost in the Middle</em> (Liu et al.): la atención no es
            uniforme; encuadrá lo importante al inicio o al final si la ventana se llena.
          </figcaption>
        </figure>
      </SlideItem>
      <SlideItem className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-5 text-left sm:gap-6 md:grid-cols-3 md:gap-x-6 md:gap-y-6 lg:gap-x-8">
        {concepts.map((concept, index) => (
          <ConceptCard key={concept.title} index={index} title={concept.title} body={concept.body} />
        ))}
      </SlideItem>
      <SlideItem className="mt-6 max-w-2xl md:mt-8">
        <p className="text-xs leading-relaxed text-[#0f0f0f]/45">
          <strong className="font-medium text-[#0f0f0f]/55">Regla práctica:</strong> contexto curado y
          validación real; menos ruido, más señal.
        </p>
      </SlideItem>

      <SlideItem className="mt-10 w-full max-w-5xl text-left md:mt-12">
        <div className="mb-4 flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#00a7b5]">
            Setup
          </p>
          <h3 className="font-serif text-2xl tracking-tight text-[#0f0f0f] md:text-3xl">
            Instalar Claude Code y configurar tu API key
          </h3>
          <p className="text-sm leading-relaxed text-[#0f0f0f]/60">
            Requiere Node.js 18+. Elegí tu sistema, instalá la CLI y exportá la clave para dejar
            todo listo antes del workshop.
          </p>
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f0f0f]/55">
              macOS / Linux
            </p>
            <CodeBlock
              className="w-full"
              code="npm install -g @anthropic-ai/claude-code"
              language="bash"
              title="Instalar Claude Code"
            />
            <CodeBlock
              className="w-full"
              code={`export ANTHROPIC_API_KEY="sk-ant-..."\necho 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc`}
              language="bash"
              title="Configurar API key (zsh)"
              hint="La primera línea la usa esta sesión; la segunda la deja persistente."
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f0f0f]/55">
              Windows (PowerShell)
            </p>
            <CodeBlock
              className="w-full"
              code="npm install -g @anthropic-ai/claude-code"
              language="powershell"
              title="Instalar Claude Code"
            />
            <CodeBlock
              className="w-full"
              code={`$env:ANTHROPIC_API_KEY = "sk-ant-..."\nsetx ANTHROPIC_API_KEY "sk-ant-..."`}
              language="powershell"
              title="Configurar API key"
              hint="$env:... aplica a la sesión actual; setx la guarda para futuras terminales."
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <CodeBlock
            className="w-full"
            code="claude"
            language="bash"
            title="Verificar la instalación"
            hint="Abrí cualquier proyecto y ejecutá `claude` en la terminal."
          />
          <p className="text-[11px] leading-relaxed text-[#0f0f0f]/45">
            Generá tu clave en{' '}
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00a7b5] underline-offset-2 hover:underline"
            >
              console.anthropic.com/settings/keys
            </a>
            . Reemplazá <code className="font-mono">sk-ant-...</code> por tu clave real y reabrí la
            terminal después de <code className="font-mono">setx</code>.
          </p>
        </div>
      </SlideItem>
    </Slide>
  )
}

export function Slide03Models() {
  const models = [
    {
      name: 'Claude Opus 4.5',
      tag: 'Máxima capacidad',
      command: '/model opus',
      input: 'US$ 5',
      output: 'US$ 25',
      swe: '80.9%',
      use: 'Refactors grandes, debugging profundo, agentes con muchos pasos. Más caro pero el que menos se traba en tareas largas.',
      accent: '#00a7b5',
    },
    {
      name: 'Claude Sonnet 4.5',
      tag: 'Default recomendado',
      command: '/model sonnet',
      input: 'US$ 3',
      output: 'US$ 15',
      swe: '77.2%',
      use: 'Día a día de coding: features, tests, revisión. Mejor relación precio / calidad para trabajar con Claude Code.',
      accent: '#0f0f0f',
    },
    {
      name: 'Claude Haiku 4.5',
      tag: 'Rápido y barato',
      command: '/model haiku',
      input: 'US$ 1',
      output: 'US$ 5',
      swe: '73.3%',
      use: 'Tareas chicas y de alto volumen: clasificar, extraer datos, autocompletar, loops de validación.',
      accent: '#fdda24',
    },
  ]

  return (
    <Slide>
      <SlideTitle>Elegí el modelo: /model</SlideTitle>
      <SlideSubtitle>
        Dentro de Claude Code escribí <code className="font-mono text-[#0f0f0f]">/model</code> para
        cambiar el modelo activo. Cada uno tiene un trade-off entre precio, velocidad y capacidad.
      </SlideSubtitle>

      <SlideItem className="mt-6 w-full max-w-2xl">
        <CodeBlock
          className="w-full"
          code={`/model            # ver modelo actual y opciones\n/model sonnet     # usar Claude Sonnet 4.5\n/model opus       # usar Claude Opus 4.5\n/model haiku      # usar Claude Haiku 4.5`}
          language="bash"
          title="Comando /model en Claude Code"
        />
      </SlideItem>

      <SlideItem className="mt-8 grid w-full max-w-6xl gap-5 text-left md:grid-cols-3">
        {models.map((m) => (
          <div
            key={m.name}
            className="flex h-full flex-col rounded-xl border border-[#0f0f0f]/10 bg-white p-5"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: m.accent }}
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0f0f0f]/55">
                {m.tag}
              </p>
            </div>
            <h3 className="mt-2 font-serif text-2xl tracking-tight text-[#0f0f0f]">{m.name}</h3>
            <code className="mt-1 font-mono text-xs text-[#00a7b5]">{m.command}</code>

            <div className="mt-4 grid grid-cols-3 gap-2 border-y border-[#0f0f0f]/8 py-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0f0f0f]/45">
                  Input
                </p>
                <p className="mt-0.5 font-mono text-sm font-medium text-[#0f0f0f]">{m.input}</p>
                <p className="text-[9px] text-[#0f0f0f]/40">/ MTok</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0f0f0f]/45">
                  Output
                </p>
                <p className="mt-0.5 font-mono text-sm font-medium text-[#0f0f0f]">{m.output}</p>
                <p className="text-[9px] text-[#0f0f0f]/40">/ MTok</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#0f0f0f]/45">
                  SWE-bench
                </p>
                <p className="mt-0.5 font-mono text-sm font-medium text-[#0f0f0f]">{m.swe}</p>
                <p className="text-[9px] text-[#0f0f0f]/40">verified</p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#0f0f0f]/62">{m.use}</p>
          </div>
        ))}
      </SlideItem>

      <SlideItem className="mt-6 max-w-3xl">
        <p className="text-[11px] leading-relaxed text-[#0f0f0f]/45">
          Precios por millón de tokens (MTok) según{' '}
          <a
            href="https://www.anthropic.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00a7b5] underline-offset-2 hover:underline"
          >
            anthropic.com/pricing
          </a>
          . Output cuesta 5× más que input: si el modelo escribe mucho código, el costo se va
          principalmente por ahí. Empezá con Sonnet y subí a Opus solo cuando el problema lo pida.
        </p>
      </SlideItem>
    </Slide>
  )
}

export function Slide03PromptCompare() {
  const examples = [
    {
      id: 'context',
      tabLabel: 'Contexto',
      technique: 'Dar contexto (qué, dónde, por qué)',
      bad: 'No me anda la app, fijate qué puede ser.',
      good:
        'Al guardar un borrador: error y no persiste.\nDónde: edición, tras adjuntar archivo.\nProbé cerrar sesión; igual.\nObjetivo: acotar causa o saber qué datos faltan.',
    },
    {
      id: 'role-constraints',
      tabLabel: 'Rol y límites',
      technique: 'Definir rol / tono y fijar restricciones',
      bad: 'Necesito un mail para avisar que el lanzamiento se retrasa.',
      good:
        'Para: equipo de producto.\nObjetivo: retraso de 2 días.\nFormato: un párrafo, tono claro.\nCierre: un solo pedido.',
    },
    {
      id: 'steps-think',
      tabLabel: 'Pasos',
      technique: 'Dividir en pasos y pedir que piense primero',
      bad: 'Escribí el informe mensual de resultados.',
      good:
        '1) Qué debe responder el informe.\n2) Esquema de secciones.\n3) Borrador con datos de ejemplo.',
    },
  ]

  return (
    <Slide>
      <SlideTitle className="text-6xl md:text-[5.5rem]">Mal vs bien</SlideTitle>
      <SlideSubtitle className="mt-2 max-w-2xl text-base leading-snug text-[#0f0f0f]/62 md:text-lg md:leading-snug">
        Un pedido vago genera una respuesta vaga. La diferencia suele estar en cómo lo encuadrás:
        contexto, límites y pasos.
      </SlideSubtitle>
      <SlideItem className="mt-8 w-full max-w-6xl text-left">
        <PromptCompareWindow examples={examples} variant="minimal" />
      </SlideItem>
      <SlideItem className="mt-6 flex w-full max-w-6xl flex-col items-center gap-3">
        <p className="max-w-md text-center text-[13px] leading-relaxed text-[#0f0f0f]/48">
          ¿Querés profundizar? Acá tenés la guía oficial de intro al prompting.
        </p>
        <LinkPill href="https://docs.anthropic.com/en/docs/intro-to-prompting">
          Anthropic — intro al prompting
        </LinkPill>
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
      name: 'Playwright MCP',
      role: 'Navegador automatizado para el agente: navegación, capturas y depuración (Microsoft).',
      href: 'https://github.com/microsoft/playwright-mcp',
    },
    {
      name: 'Trustless Work',
      role: 'Documentación de escrow/Stellar optimizada para IA.',
      href: 'https://docs.trustlesswork.com/',
    },
    {
      name: 'Google Stitch MCP',
      role:
        'Diseño UI con IA (Stitch, Google): pantallas y componentes desde prompts — servidor MCP remoto (beta).',
      href: 'https://stitch.withgoogle.com/docs/mcp/guide/',
    },
  ]
  return (
    <Slide>
      <SlideTitle>MCPs que usamos</SlideTitle>
      <SlideSubtitle>
        Conectá capacidades externas al agente — cada uno con doc oficial. Requieren un host MCP
        (p. ej. Cursor) configurado.
      </SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-3xl divide-y divide-[#0f0f0f]/10 text-left">
        {rows.map((r) => (
          <a
            key={r.name}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir documentación de ${r.name}`}
            className="group -mx-2 flex flex-col items-stretch justify-between gap-3 rounded-lg px-2 py-4 transition first:pt-0 hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f]/20 focus-visible:ring-offset-2 sm:flex-row sm:items-center"
          >
            <div className="min-w-0 flex-1 sm:pr-2">
              <div className="font-semibold text-[#0f0f0f]">{r.name}</div>
              <p className="mt-1 text-sm text-[#0f0f0f]/55">{r.role}</p>
            </div>
            <span
              className="flex size-8 shrink-0 items-center justify-center self-end rounded-full bg-[#fdda24] text-[#0f0f0f] transition group-hover:bg-[#0f0f0f] group-hover:text-white group-hover:ring-1 group-hover:ring-white/25 sm:self-center"
              aria-hidden
            >
              <ArrowUpRight className="size-3.5" />
            </span>
          </a>
        ))}
      </SlideItem>
    </Slide>
  )
}

export function Slide06Skills() {
  return (
    <Slide>
      <SlideTitle>Skills : stellar-dev</SlideTitle>
      <SlideSubtitle>
        Las skills son playbooks de dominio que el agente carga y usa de forma progresiva.{' '}
        <strong className="text-[#0f0f0f]">stellar-dev</strong> es la skill oficial del ecosistema
        Stellar.
      </SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-2xl space-y-6 text-left">
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
        <CodeBlock
          className="w-full"
          code="npx skills add stellar-dev"
          language="bash"
          title="Instalación"
        />
      </SlideItem>
      <SlideItem className="mt-8 flex w-full flex-wrap justify-center gap-3">
        <LinkPill href="https://skills.sh/">skills.sh — catálogo</LinkPill>
        <LinkPill href="https://skills.sh/stellar/stellar-dev-skill/stellar-dev">
          stellar-dev
        </LinkPill>
      </SlideItem>
    </Slide>
  )
}

export function Slide06FrontendDesignSkill() {
  return (
    <Slide>
      <SlideTitle>Skills: frontend design</SlideTitle>
      <SlideSubtitle>
        Skill de <strong className="text-[#0f0f0f]">Anthropic</strong> para interfaces web con
        criterio de diseño: tipografía, color, motion y composición — y evitar el look genérico de
        salida de IA.
      </SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-2xl space-y-6 text-left">
        <ul className="space-y-2 text-sm text-[#0f0f0f]/70">
          {[
            'Pensar propósito, tono y diferenciación antes de codear.',
            'Tipografía, paleta, animación y layout con intención (no Inter + gradiente violeta).',
            'Código real: HTML/CSS/JS, React, Vue según el stack.',
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#00a7b5]" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <CodeBlock
          className="w-full"
          code="npx skills add https://github.com/anthropics/skills --skill frontend-design"
          language="bash"
          title="Instalación"
        />
      </SlideItem>
      <SlideItem className="mt-8 flex w-full flex-wrap justify-center gap-3">
        <LinkPill href="https://skills.sh/anthropics/skills/frontend-design">
          skills.sh — frontend-design
        </LinkPill>
        <LinkPill href="https://github.com/anthropics/skills">anthropics/skills (repo)</LinkPill>
      </SlideItem>
    </Slide>
  )
}

export function Slide12SetupAi() {
  const tools = [
    {
      name: 'v0',
      href: 'https://v0.dev/pricing',
      iconSrc: 'https://www.google.com/s2/favicons?domain=v0.dev&sz=128',
      approx: '$5/mes + 7 mensajes/dia',
      detail: 'Free plan oficial para prototipar UI, editar visualmente y sincronizar con GitHub.',
    },
    {
      name: 'Google AI Studio',
      href: 'https://aistudio.google.com/',
      iconSrc: 'https://www.google.com/s2/favicons?domain=aistudio.google.com&sz=128',
      approx: 'Gratis para empezar',
      detail: 'API key y free tier del Gemini API. Los limites exactos dependen del modelo.',
    },
    {
      name: 'Codex',
      href: 'https://openai.com/codex',
      iconSrc: 'https://www.google.com/s2/favicons?domain=openai.com&sz=128',
      approx: 'Según plan ChatGPT',
      detail:
        'Agente de OpenAI para terminal e IDE: entiende tu repo y ejecuta cambios. Límites y disponibilidad dependen del plan (p. ej. Plus, Pro, Business).',
    },
    {
      name: 'Antigravity',
      href: 'https://antigravity.google/',
      iconSrc: 'https://www.google.com/s2/favicons?domain=antigravity.google&sz=128',
      approx: 'Preview con cuota gratis',
      detail: 'Preview para cuentas Gmail personales. Google habla de free quota, no de un numero simple.',
    },
  ]

  return (
    <Slide>
      <SlideTitle>Free tier para desarrollar con IA</SlideTitle>
      <SlideSubtitle>
        Herramientas que hoy te dejan arrancar sin pagar de entrada: algunas con credito
        incluido, otras con quota o preview gratis.
      </SlideSubtitle>
      <SlideItem className="mt-8 grid w-full max-w-5xl gap-x-10 gap-y-10 text-left sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex flex-col border-b border-[#0f0f0f]/8 pb-8 last:border-b-0 last:pb-0 sm:border-0 sm:pb-0"
          >
            <div className="flex items-start gap-3">
              <img
                src={tool.iconSrc}
                alt={`Logo de ${tool.name}`}
                className="size-9 shrink-0 rounded-lg object-contain opacity-90"
                loading="lazy"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-[#0f0f0f]">{tool.name}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-[#00a7b5]/90">
                  {tool.approx}
                </p>
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-6 text-[#0f0f0f]/62">{tool.detail}</p>
            <div className="mt-4">
              <LinkPill href={tool.href}>Abrir</LinkPill>
            </div>
          </div>
        ))}
      </SlideItem>
      <SlideItem className="mt-4 max-w-4xl">
        <p className="text-xs text-[#0f0f0f]/42">
          Los free tiers cambian rapido. Si una herramienta no publica un numero exacto, lo
          resumimos como cuota o preview gratis.
        </p>
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
                    ? 'w-full max-w-2xl border-l-2 border-[#e8dfd6] bg-[#fafaf9]/80 pl-6 pr-2 py-6 sm:pl-8 sm:pr-4'
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
                            ? 'flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#fff7f2]/80'
                            : 'flex size-12 shrink-0 items-center justify-center rounded-lg'
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
                        ? 'shrink-0 self-start rounded-md border border-[#e0d5cb]/80 bg-transparent px-4 py-2 text-sm font-medium text-[#5c4a3d] transition hover:bg-[#fffefb] sm:self-center'
                        : 'shrink-0 self-start rounded-md border border-[#0f0f0f]/12 bg-transparent px-4 py-2 text-sm font-medium text-[#0f0f0f]/80 transition hover:bg-[#fafafa] sm:self-center'
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

export function Slide16ComponentLibraries() {
  const rows = [
    {
      name: 'Aceternity UI',
      role: 'Componentes y bloques React con Tailwind CSS y Framer Motion — listos para copiar y adaptar.',
      href: 'https://ui.aceternity.com/',
    },
    {
      name: 'React Bits',
      role: 'Animaciones, backgrounds y micro-interacciones en React — snippets con código.',
      href: 'https://reactbits.dev/',
    },
    {
      name: 'Magic UI',
      role: 'Componentes estilo shadcn/ui sobre Tailwind: marketing, layouts y efectos.',
      href: 'https://magicui.design/',
    },
    {
      name: '21st.dev',
      role: 'Plataforma que reúne y cura componentes de muchas fuentes; buen punto de partida para explorar y comparar.',
      href: 'https://21st.dev/',
    },
  ]

  return (
    <Slide>
      <SlideTitle>UI lista para usar</SlideTitle>
      <SlideSubtitle>
        Librerías y catálogos de componentes web alineados con un front moderno (React, Tailwind).
        Úsalos como base y adaptalos al diseño del proyecto.
      </SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-3xl divide-y divide-[#0f0f0f]/10 text-left">
        {rows.map((r) => (
          <a
            key={r.name}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${r.name}`}
            className="group -mx-2 flex flex-col items-stretch justify-between gap-3 rounded-lg px-2 py-4 transition first:pt-0 hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f0f0f]/20 focus-visible:ring-offset-2 sm:flex-row sm:items-center"
          >
            <div className="min-w-0 flex-1 sm:pr-2">
              <div className="font-semibold text-[#0f0f0f]">{r.name}</div>
              <p className="mt-1 text-sm text-[#0f0f0f]/55">{r.role}</p>
            </div>
            <span
              className="flex size-8 shrink-0 items-center justify-center self-end rounded-full bg-[#fdda24] text-[#0f0f0f] transition group-hover:bg-[#0f0f0f] group-hover:text-white group-hover:ring-1 group-hover:ring-white/25 sm:self-center"
              aria-hidden
            >
              <ArrowUpRight className="size-3.5" />
            </span>
          </a>
        ))}
      </SlideItem>
    </Slide>
  )
}

export function Slide18Close() {
  const linktreeUrl = 'https://linktr.ee/matiboldrini'
  const linktreeLabel = 'linktr.ee/matiboldrini'

  return (
    <Slide className="min-h-[60vh]">
      <SlideItem className="w-full">
        <h2 className="flex flex-col items-center gap-1.5 font-serif font-normal tracking-[-0.03em] text-[#0f0f0f] md:gap-2">
          <span className="text-base font-medium uppercase tracking-[0.28em] text-[#0f0f0f]/42 md:text-lg">
            fin
          </span>
          <span className={`text-4xl md:text-[3.5rem] md:leading-[1.08] ${slideTitleSelectEffect}`}>
            Gracias
          </span>
        </h2>
      </SlideItem>
      <SlideItem className="mt-10 flex w-full flex-col items-center gap-8">
        <a
          href={linktreeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-lg border border-[#0f0f0f]/10 bg-white p-4 shadow-sm transition hover:border-[#0f0f0f]/18"
          aria-label="Abrir Linktree"
        >
          <img
            src="/matiboldrini.png"
            alt="Código QR al Linktree"
            className="size-[min(72vw,17rem)] max-w-[280px] object-contain sm:size-[18rem] md:size-[20rem] md:max-w-none"
            loading="lazy"
            decoding="async"
          />
        </a>
        <a
          href={linktreeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-lg font-medium text-[#00a7b5] underline-offset-[3px] hover:underline md:text-xl"
        >
          {linktreeLabel}
        </a>
      </SlideItem>
    </Slide>
  )
}
