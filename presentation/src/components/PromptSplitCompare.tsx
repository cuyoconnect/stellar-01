import type { ReactNode } from 'react'

/** Etiquetas al inicio de línea: ordenar "Para quién" antes de "Para". */
const STRUCT_LABEL =
  /^(Dónde|Objetivo|Para quién|Para|Formato|Cierre|Qué pasa|Qué probé|Primero|Segundo|Tercero|MVP|Stack|Red|Detalle|Requisitos):\s*(.*)$/i

const NUMBERED_STEP = /^(\d+\))\s*(.*)$/

function renderStructuredLine(line: string, labelClass: string): ReactNode {
  const num = line.match(NUMBERED_STEP)
  if (num) {
    return (
      <>
        <span className={labelClass}>{num[1]} </span>
        {num[2]}
      </>
    )
  }
  const struct = line.match(STRUCT_LABEL)
  if (struct) {
    return (
      <>
        <span className={labelClass}>{struct[1]}: </span>
        {struct[2]}
      </>
    )
  }
  const probe = line.match(/^Probé\s+(.*)$/)
  if (probe) {
    return (
      <>
        <span className={labelClass}>Probé </span>
        {probe[1]}
      </>
    )
  }
  return line
}

function StructuredPromptBody({
  text,
  variant,
  className,
}: {
  text: string
  variant: 'good' | 'bad'
  className: string
}) {
  const labelClass =
    variant === 'good'
      ? 'font-semibold text-[#00a7b5]'
      : 'font-semibold text-[#a85555]'

  const lines = text.split('\n')

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {renderStructuredLine(line, labelClass)}
        </span>
      ))}
    </div>
  )
}

type Props = {
  /** Texto del prompt poco útil */
  bad: string
  /** Texto del prompt mejorado */
  good: string
  /** Etiqueta panel izquierdo */
  badLabel?: string
  /** Etiqueta panel derecho */
  goodLabel?: string
  /** Tipografía y padding más contenidos (slides densas). */
  compact?: boolean
}

/** Comparación mal/bien en dos columnas; solo una línea divisoria entre paneles. */
export function PromptSplitCompare({
  bad,
  good,
  badLabel = 'Evitar',
  goodLabel = 'Mejor',
  compact = false,
}: Props) {
  const pad = compact ? 'px-3 py-2.5' : 'px-4 py-3.5'
  const mono = compact
    ? 'font-mono text-[12px] leading-snug'
    : 'font-mono text-[13px] leading-relaxed'

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg border border-[#0f0f0f]/10 md:flex-row">
      <div
        className={`min-w-0 flex-1 border-b border-[#0f0f0f]/10 bg-[#faf6f6] md:border-b-0 md:border-r ${pad}`}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a4a4a]/80">
          {badLabel}
        </p>
        <StructuredPromptBody
          text={bad}
          variant="bad"
          className={`mt-1.5 text-[#0f0f0f]/78 ${mono}`}
        />
      </div>

      <div className={`min-w-0 flex-1 border-t border-[#0f0f0f]/10 bg-[#f4fafb] md:border-t-0 ${pad}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#00a7b5]">
          {goodLabel}
        </p>
        <StructuredPromptBody
          text={good}
          variant="good"
          className={`mt-1.5 text-[#0f0f0f]/88 ${mono}`}
        />
      </div>
    </div>
  )
}
