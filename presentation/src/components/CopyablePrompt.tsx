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
      className={`relative border-l-2 border-[#00a7b5]/45 bg-[#fafafa]/80 pl-5 pr-3 pt-3 ${className}`}
    >
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-md border border-[#0f0f0f]/10 bg-white px-2.5 py-1.5 text-xs font-medium text-[#0f0f0f] transition hover:bg-[#f5f5f5]"
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-[#00a7b5]" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="size-3.5" />
            {label}
          </>
        )}
      </button>
      <pre
        className="overflow-auto pb-3 pr-28 text-left font-mono text-[13px] leading-relaxed text-[#0f0f0f]"
        style={{ maxHeight }}
      >
        {text}
      </pre>
    </div>
  )
}
