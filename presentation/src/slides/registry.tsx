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

const PRESENTATION_URL = 'https://stellar-01.vercel.app/'
const PRESENTATION_HOST = 'stellar-01.vercel.app'

const PROMPT_ESCROW = `Necesito crear un contrato Soroban en Rust que implemente un sistema de
escrow simple:

1. Un usuario deposita USDC en el contrato
2. Define un beneficiario y una condición (timestamp de ledger)
3. Después del timestamp, el beneficiario puede retirar
4. Antes del timestamp, el depositante puede cancelar

Usá ledger_timestamp() de Soroban para el tiempo.
Incluí roles explícitos (depositor / beneficiary) y eventos emitidos en cada operación.
Empezá con la estructura del contrato y los tests en soroban-sdk.`

export function Slide01Title() {
  return (
    <Slide className="min-h-[70vh]">
      <SlideItem className="w-full max-w-5xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16 lg:gap-24">
          <div className="relative z-10 min-w-0 flex-1 text-left">
            <h1 className="font-serif text-5xl font-normal leading-[1.2] tracking-[-0.03em] md:text-6xl md:leading-[1.18] lg:text-7xl lg:leading-[1.15]">
              <span className={slideTitleSelectEffect}>Vibecoding en Web3</span>
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
    <div className="flex h-full flex-col rounded-2xl border border-[#0f0f0f]/10 bg-[#fafafa]/80 p-6 shadow-[0_1px_0_0_rgba(15,15,15,0.04)]">
      <div className="flex justify-center">
        <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#fdda24] bg-[#0f0f0f] text-[13px] font-semibold tabular-nums text-[#fdda24]">
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
      <SlideTitle>Desarrollar con IA: 3 ideas base</SlideTitle>
      <SlideSubtitle>
        Para trabajar mejor con agentes no alcanza con "prompting": importa qué contexto reciben y
        qué señal les devolvés.
      </SlideSubtitle>
      <SlideItem className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-5 text-left sm:gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
        {concepts.slice(0, 2).map((concept, index) => (
          <ConceptCard key={concept.title} index={index} title={concept.title} body={concept.body} />
        ))}
        <div className="flex justify-center md:col-span-2">
          <div className="w-full max-w-xl md:max-w-2xl">
            <ConceptCard
              index={2}
              title={concepts[2].title}
              body={concepts[2].body}
            />
          </div>
        </div>
      </SlideItem>
      <SlideItem className="mt-4 max-w-2xl">
        <p className="text-xs leading-relaxed text-[#0f0f0f]/45">
          <strong className="font-medium text-[#0f0f0f]/55">Regla práctica:</strong> contexto curado y
          validación real; menos ruido, más señal.
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
      <SlideTitle>Mal vs bien</SlideTitle>
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
      <SlideTitle>Skills y stellar-dev</SlideTitle>
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

export function Slide14Prompts() {
  return (
    <Slide>
      <SlideTitle>Prompts listos</SlideTitle>
      <SlideSubtitle>Tres arranques distintos — copiá y adaptá al repo.</SlideSubtitle>
      <SlideItem className="mt-6 w-full max-w-2xl space-y-3">
        <CodeBlock code={PROMPT_MVP} language="markdown" title="MVP pagos USDC" />
        <CodeBlock code={PROMPT_DEFI} language="markdown" title="DeFi dashboard" />
        <CodeBlock code={PROMPT_ESCROW} language="markdown" title="Escrow Soroban" />
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
                            ? 'flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#fff7f2]/80'
                            : 'flex size-12 shrink-0 items-center justify-center rounded-xl'
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
      <SlideItem className="mt-10 w-full max-w-5xl">
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:items-stretch md:gap-10 lg:gap-14">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="flex h-full min-h-0 flex-col rounded-2xl border border-[#0f0f0f]/10 bg-[#fafafa]/50 p-6 sm:p-7"
            >
              <h3 className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f0f0f]/45">
                {b.title}
              </h3>
              <ul className="mt-4 flex flex-1 flex-col gap-2.5 border-t border-[#0f0f0f]/10 pt-4 text-left">
                {b.links.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm leading-snug text-[#00a7b5] underline-offset-[3px] hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SlideItem>
    </Slide>
  )
}

export function Slide18Close() {
  return (
    <Slide className="min-h-[60vh]">
      <SlideTitle>Tu próximo paso</SlideTitle>
      <SlideItem className="mt-6 w-full max-w-xl text-left">
        <p className="border-l-2 border-[#fdda24] pl-4 text-sm font-medium leading-relaxed text-[#0f0f0f]/85">
          Hoy: armá un proyecto testnet e instalá stellar-dev.
        </p>
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
