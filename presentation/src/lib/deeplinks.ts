/** Deeplinks Cursor: máx. 8000 caracteres (https://cursor.com/docs/integrations/deeplinks). */
export const CURSOR_DEEPLINK_MAX_LEN = 8000

export type IdeTarget =
  | 'cursor'
  | 'vscode'
  | 'codex'
  | 'antigravity'
  | 'claude-code'
  /** Codex, Antigravity, Claude Code u otras herramientas: misma UI que Cursor, solo copiar. */
  | 'others'

export const IDE_OPTIONS: { value: IdeTarget; label: string }[] = [
  { value: 'cursor', label: 'Cursor' },
  { value: 'vscode', label: 'VS Code' },
  { value: 'codex', label: 'Codex' },
  { value: 'antigravity', label: 'Antigravity' },
  { value: 'claude-code', label: 'Claude Code' },
  { value: 'others', label: 'Otros' },
]

export type DeeplinkPayload = {
  kind: 'cursor-command' | 'cursor-rule'
  type: 'command' | 'rule'
  name: string
  text: string
}

export const DEEPLINK_PAYLOADS = {
  insights: {
    kind: 'cursor-command',
    type: 'command',
    name: 'insights',
    text: `Analiza las transcripciones de agentes en ~/.cursor/projects/*/agent-transcripts/ (archivos .txt o .jsonl) en todos tus proyectos de Cursor.

Objetivo: identificar patrones de error reales y generar o actualizar AGENTS.md con lecciones accionables (reglas Por qué / Hacer / No hacer, checklist antes de implementar).

Usa hasta 4 subagentes en paralelo: listar proyectos, rg/find sobre quejas del usuario, errores de build/TS, sync/OAuth, paths serverless, tests vs implementación real.

Para el flujo multi-fase completo y el checklist extendido, tomá como referencia AGENTS.md en la raíz del repo stellar (lecciones agregadas de muchas sesiones).

Salida: markdown listo para pegar en AGENTS.md del proyecto actual.`,
  },
  'stellar-design': {
    kind: 'cursor-rule',
    type: 'rule',
    name: 'stellar-design',
    text: `---
name: stellar-design
description: Expert in Stellar.org visual identity, design system, and illustration style.
---

# Stellar Design

Use Stellar color tokens, typography, spacing, and component patterns to generate UI code aligned with the Stellar brand.`,
  },
  'stellar-image-generation': {
    kind: 'cursor-rule',
    type: 'rule',
    name: 'stellar-image-generation',
    text: `---
name: stellar-image-generation
description: Generate image prompts in Stellar illustration style.
---

# Stellar Image Generation

Create prompts with limited palette (#FDDA24, #673AB7, #0F0F0F, #FFFFFF), grain/stipple texture, rough ink outlines, flat colors, and high contrast editorial composition.`,
  },
  'vibecoding-validate': {
    kind: 'cursor-command',
    type: 'command',
    name: 'vibecoding-validate',
    text: `Run in order:
1. cargo check
2. cargo fmt -- --check (or cargo fmt)
3. cargo test
4. If Soroban contract: cargo scout-audit in the contract folder

Do not skip steps. If a step fails, report and fix before continuing.`,
  },
} as const satisfies Record<string, DeeplinkPayload>

export type DeeplinkPayloadKey = keyof typeof DEEPLINK_PAYLOADS

/** En la URL de Cursor, las rules van como segmento `skill`. */
export function generateCursorDeeplink(type: 'command' | 'rule', name: string, text: string): string {
  const pathSegment = type === 'rule' ? 'skill' : 'command'
  const baseUrl = 'cursor://anysphere.cursor-deeplink/' + pathSegment
  const url = new URL(baseUrl)
  url.searchParams.set('name', name)
  url.searchParams.set('text', text)
  return url.toString()
}

export type InstallActionKind = 'open-deeplink' | 'clipboard'

/** Qué ocurrirá al usar el botón (misma lógica que en AddToIde). Solo Cursor usa deeplink; el resto copia al portapapeles. */
export function getInstallActionPreview(
  ide: IdeTarget,
  payload: DeeplinkPayload,
): {
  kind: InstallActionKind
  /** Línea corta bajo el título del botón */
  shortLabel: string
  /** Tooltip / aria-describedby */
  description: string
} {
  const text = payload.text

  if (ide === 'cursor') {
    const url = generateCursorDeeplink(payload.type, payload.name, text)
    if (url.length <= CURSOR_DEEPLINK_MAX_LEN) {
      return {
        kind: 'open-deeplink',
        shortLabel: 'Abrir en Cursor',
        description: 'Se abre en Cursor con un clic.',
      }
    }
    return {
      kind: 'clipboard',
      shortLabel: 'Copiar al portapapeles',
      description:
        'El contenido es demasiado largo para abrirlo directo; lo copiamos para que lo pegues en Cursor.',
    }
  }

  if (ide === 'others') {
    return {
      kind: 'clipboard',
      shortLabel: 'Listo para pegar',
      description: 'Copiamos el contenido para que lo uses en tu herramienta.',
    }
  }

  return {
    kind: 'clipboard',
    shortLabel: 'Copiar al portapapeles',
    description:
      'Te copiamos el texto para pegarlo en tu editor o herramienta.',
  }
}
