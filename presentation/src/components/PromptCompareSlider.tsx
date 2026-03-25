import { GripVertical } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

type Props = {
  bad: string
  good: string
  badLabel?: string
  goodLabel?: string
  className?: string
}

/**
 * Comparador tipo “code compare” (estilo Aceternity): el mouse mueve el divisor; en touch, arrastrá.
 */
export function PromptCompareSlider({
  bad,
  good,
  badLabel = 'Evitar',
  goodLabel = 'Mejor',
  className = '',
}: Props) {
  const [pct, setPct] = useState(48)
  const root = useRef<HTMLDivElement>(null)
  const touchActive = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = root.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const x = clientX - left
    setPct(Math.max(8, Math.min(92, (x / width) * 100)))
  }, [])

  return (
    <div className={`w-full max-w-4xl ${className}`}>
      <p className="mb-2 text-center text-[11px] text-[#0f0f0f]/45">
        Mové el cursor sobre el panel o arrastrá en pantallas táctiles
      </p>
      <div
        ref={root}
        className="relative isolate h-[min(42vh,340px)] w-full cursor-col-resize overflow-hidden rounded-lg border border-[#0f0f0f]/10 select-none md:h-[min(38vh,300px)]"
        onMouseMove={(e) => setFromClientX(e.clientX)}
        onTouchStart={() => {
          touchActive.current = true
        }}
        onTouchMove={(e) => {
          if (!touchActive.current) return
          const t = e.touches[0]
          if (t) setFromClientX(t.clientX)
        }}
        onTouchEnd={() => {
          touchActive.current = false
        }}
      >
        {/* Capa buena (derecha) */}
        <div
          className="absolute inset-0 z-[1] overflow-auto bg-[#f4fafb]"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        >
          <div className="min-h-full px-4 py-3.5 pr-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#00a7b5]">
              {goodLabel}
            </p>
            <pre className="mt-2 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#0f0f0f]/88">
              {good}
            </pre>
          </div>
        </div>

        {/* Capa mala (izquierda) */}
        <div
          className="absolute inset-0 z-[2] overflow-auto bg-[#faf6f6]"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <div className="min-h-full px-4 py-3.5 pr-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a4a4a]/80">
              {badLabel}
            </p>
            <pre className="mt-2 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#0f0f0f]/78">
              {bad}
            </pre>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-[3] w-px bg-[#0f0f0f]/30"
          style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
        />
        <div
          className="pointer-events-none absolute top-1/2 z-[4] flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-[#0f0f0f]/12 bg-white text-[#0f0f0f] shadow-md"
          style={{ left: `${pct}%` }}
          aria-hidden
        >
          <GripVertical className="size-4 opacity-70" />
        </div>
      </div>
    </div>
  )
}
