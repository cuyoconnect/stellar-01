import { Check, Copy, Info } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import { highlightCode } from '../utils/shikiHighlighter'

type Props = {
  code: string
  language?: string
  title?: string
  /** Tooltip al pasar el mouse (ícono ℹ️ a la derecha del comando). */
  hint?: string
  className?: string
  /** Altura máxima del área con scroll (solo contenido, no la cabecera). */
  maxScrollHeight?: string
}

export function CodeBlock({
  code,
  language = 'bash',
  title,
  hint,
  className = '',
  maxScrollHeight = 'min(50vh, 420px)',
}: Props) {
  const [html, setHtml] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const hintWrapRef = useRef<HTMLDivElement>(null)
  const hintId = useId()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const out = await highlightCode(code, language)
        if (!cancelled) setHtml(out)
      } catch {
        if (!cancelled)
          setHtml(
            `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`,
          )
      }
    })()
    return () => {
      cancelled = true
    }
  }, [code, language])

  useEffect(() => {
    if (!hintOpen) return
    const close = (e: MouseEvent) => {
      if (hintWrapRef.current && !hintWrapRef.current.contains(e.target as Node)) {
        setHintOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHintOpen(false)
    }
    const t = window.setTimeout(() => document.addEventListener('click', close), 0)
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [hintOpen])

  const handleCopy = async () => {
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const copyBtn = (
    <button
      type="button"
      onClick={handleCopy}
      className="flex shrink-0 items-center gap-1 rounded-md bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#0f0f0f] shadow-sm transition hover:bg-white/95"
      aria-label="Copiar código"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-[#00a7b5]" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          Copiar
        </>
      )}
    </button>
  )

  return (
    <div
      className={`relative rounded-lg border border-white/[0.08] bg-[#1a1a1a] ${className}`}
    >
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-5">
          <span className="min-w-0 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
            {title}
          </span>
          {copyBtn}
        </div>
      ) : (
        <div className="absolute right-2.5 top-2.5 z-10">{copyBtn}</div>
      )}
      <div
        className={`flex items-start gap-3 px-4 py-4 text-left sm:px-5 sm:pb-5 ${title ? '' : 'pr-24 pt-14'}`}
      >
        <div
          className="shiki-wrapper min-w-0 min-h-0 flex-1 overflow-auto text-[#f9f9f9] [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
          style={{ maxHeight: maxScrollHeight }}
          dangerouslySetInnerHTML={{ __html: html || '<pre class="opacity-40">…</pre>' }}
        />
        {hint ? (
          <div
            ref={hintWrapRef}
            className="relative shrink-0 self-start pt-0.5"
          >
            <button
              type="button"
              id={`${hintId}-trigger`}
              aria-expanded={hintOpen}
              aria-controls={hintId}
              aria-label="Más información sobre este comando"
              onClick={(e) => {
                e.stopPropagation()
                setHintOpen((o) => !o)
              }}
              className="flex text-white/40 transition hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
            >
              <Info className="size-4" strokeWidth={2} aria-hidden />
            </button>
            {hintOpen ? (
              <div
                id={hintId}
                role="tooltip"
                className="absolute right-0 top-full z-20 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-md border border-white/12 bg-[#0f0f0f] px-3 py-2.5 text-left text-xs leading-relaxed text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
              >
                {hint}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
