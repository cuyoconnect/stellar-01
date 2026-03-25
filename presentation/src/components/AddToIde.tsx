import type { CSSProperties, MouseEvent } from 'react'
import { useMemo, useState } from 'react'
import {
  CURSOR_DEEPLINK_MAX_LEN,
  DEEPLINK_PAYLOADS,
  IDE_OPTIONS,
  generateCursorDeeplink,
  getInstallActionPreview,
  type DeeplinkPayloadKey,
  type IdeTarget,
} from '../lib/deeplinks'
import { IdeIcon } from './IdeIcon'
import { visualForIde } from '../lib/ideTheme'
import { copyToClipboard } from '../utils/clipboard'

type Props = {
  /** IDE elegido en el padre (p. ej. slide Instalación). */
  ide: IdeTarget
  payloadKey: DeeplinkPayloadKey
  label: string
  /** Variante para fondos claros u oscuros (ajusta colores del botón) */
  variant?: 'default' | 'dark'
}

export function AddToIde({ ide, payloadKey, label, variant = 'default' }: Props) {
  const payload = DEEPLINK_PAYLOADS[payloadKey]
  const [flash, setFlash] = useState<'ok' | 'err' | null>(null)

  const visual = visualForIde(ide)

  const buttonLabel = useMemo(() => {
    if (ide === 'others') {
      return label.replace(/^Add to Cursor — /i, 'Copiar — ')
    }
    const name = IDE_OPTIONS.find((o) => o.value === ide)?.label ?? 'Cursor'
    return label.replace(/^Add to Cursor\b/i, `Add to ${name}`)
  }, [label, ide])

  const actionPreview = useMemo(() => getInstallActionPreview(ide, payload), [ide, payload])

  const isClaudeShell = ide === 'others'

  const ideVars = useMemo(() => {
    if (isClaudeShell) return undefined
    if (flash === 'ok') {
      return { '--atc-bg': '#1f7a38', '--atc-hover': '#1f7a38' } as CSSProperties
    }
    if (flash === 'err') {
      return { '--atc-bg': '#8f2222', '--atc-hover': '#8f2222' } as CSSProperties
    }
    const dark = variant === 'dark'
    return {
      '--atc-bg': dark ? visual.bgDark : visual.bg,
      '--atc-hover': dark ? visual.hoverDark : visual.hover,
    } as CSSProperties
  }, [flash, variant, visual, isClaudeShell])

  async function onActivate(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    const text = payload.text
    const target = ide

    const tryFlash = (ok: boolean) => {
      setFlash(ok ? 'ok' : 'err')
      setTimeout(() => setFlash(null), 1600)
    }

    if (target === 'cursor') {
      const url = generateCursorDeeplink(payload.type, payload.name, text)
      if (url.length <= CURSOR_DEEPLINK_MAX_LEN) {
        window.location.href = url
        return
      }
      const ok = await copyToClipboard(text)
      tryFlash(ok)
      return
    }

    const ok = await copyToClipboard(text)
    tryFlash(ok)
  }

  const isCursor = ide === 'cursor'

  const claudeShellClass =
    flash === 'ok'
      ? 'border border-emerald-200 bg-[#f0faf2] text-emerald-950 shadow-sm hover:bg-[#e8f6ea]'
      : flash === 'err'
        ? 'border border-rose-200 bg-rose-50 text-rose-950 shadow-sm hover:bg-rose-50'
        : 'border border-[#e8dfd6] bg-[#faf9f6] text-[#1c1917] hover:bg-[#f4efe8] hover:border-[#d4c4b4]'

  const defaultShellClass =
    'bg-[var(--atc-bg)] text-white hover:bg-[var(--atc-hover)] ' +
    (isCursor
      ? 'border border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_1px_4px_rgba(0,0,0,0.25)]'
      : 'shadow-sm')

  const iconWrapClass = isClaudeShell
    ? flash === 'ok'
      ? 'text-emerald-800'
      : flash === 'err'
        ? 'text-rose-800'
        : 'text-[#c45c41]'
    : 'text-white'

  const sublineClass = isClaudeShell
    ? flash === 'ok'
      ? 'text-emerald-800/80'
      : flash === 'err'
        ? 'text-rose-800/85'
        : 'text-[#6b635b]'
    : 'text-white/80'

  return (
    <div className="w-full max-w-2xl" style={ideVars}>
      <a
        href="#"
        role="button"
        onClick={onActivate}
        title={actionPreview.description}
        aria-label={`${buttonLabel}. ${actionPreview.description}`}
        className={
          'inline-flex w-full min-h-[48px] items-center gap-3 rounded-lg px-4 py-3 text-[0.9375rem] font-semibold tracking-[-0.02em] no-underline transition active:translate-y-0 sm:px-5 ' +
          (isClaudeShell ? claudeShellClass : defaultShellClass)
        }
      >
        <span
          className={`flex w-10 shrink-0 items-center justify-center sm:w-11 ${iconWrapClass}`}
          aria-hidden
        >
          <IdeIcon visual={visual} className="size-[22px] shrink-0" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
          <span className="leading-snug">{buttonLabel}</span>
          <span className={`text-[11px] font-medium leading-tight tracking-wide ${sublineClass}`}>
            {actionPreview.shortLabel}
          </span>
        </span>
      </a>
    </div>
  )
}
