import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { copyToClipboard } from '../utils/clipboard'
import { highlightCode } from '../utils/shikiHighlighter'

type Props = {
  code: string
  language?: string
  title?: string
  className?: string
}

export function CodeBlock({
  code,
  language = 'bash',
  title,
  className = '',
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

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[#0f0f0f]/10 bg-[#262626] ${className}`}
    >
      {title ? (
        <div className="border-b border-white/[0.07] px-4 py-2 text-left text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
          {title}
        </div>
      ) : null}
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1 rounded-md border border-white/10 bg-white/95 px-2.5 py-1 text-[11px] font-medium text-[#0f0f0f] transition hover:bg-white"
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
      <div
        className="shiki-wrapper max-h-[min(50vh,420px)] overflow-auto px-4 py-4 pr-24 text-left text-[#f9f9f9] [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
        dangerouslySetInnerHTML={{ __html: html || '<pre class="opacity-40">…</pre>' }}
      />
    </div>
  )
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
