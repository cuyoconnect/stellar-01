import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { copyToClipboard } from '../utils/clipboard'

type Props = {
  text: string
  label?: string
  className?: string
  maxHeight?: string
}

export function CopyablePrompt({
  text,
  label = 'Copiar prompt',
  className = '',
  maxHeight = 'min(45vh, 380px)',
}: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className={`relative rounded-xl border border-[#0f0f0f]/12 bg-[#f9f9f9] ${className}`}
    >
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full bg-[#0f0f0f] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#212121]"
      >
        {copied ? (
          <>
            <Check className="size-4 text-[#fdda24]" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="size-4" />
            {label}
          </>
        )}
      </button>
      <pre
        className="overflow-auto p-4 pr-36 text-left font-mono text-[13px] leading-relaxed text-[#0f0f0f]"
        style={{ maxHeight }}
      >
        {text}
      </pre>
    </div>
  )
}
