import { Check, Copy, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
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
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a1a1a] ${className}`}
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
        className={`flex items-start gap-2 px-4 py-4 text-left sm:px-5 sm:pb-5 ${title ? '' : 'pr-24 pt-14'}`}
      >
        <div
          className="shiki-wrapper min-w-0 flex-1 overflow-auto text-[#f9f9f9] [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
          style={{ maxHeight: maxScrollHeight }}
          dangerouslySetInnerHTML={{ __html: html || '<pre class="opacity-40">…</pre>' }}
        />
        {hint ? (
          <span
            className="mt-0.5 shrink-0 cursor-help text-white/35 transition hover:text-white/55"
            title={hint}
          >
            <Info className="size-4" strokeWidth={2} aria-hidden />
            <span className="sr-only">{hint}</span>
          </span>
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
