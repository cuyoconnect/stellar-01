import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { PromptSplitCompare } from './PromptSplitCompare'

export type PromptCompareExample = {
  id: string
  tabLabel: string
  /** Técnica de prompting que ilustra el par (p. ej. guías de Anthropic). */
  technique: string
  bad: string
  good: string
}

type Props = {
  examples: PromptCompareExample[]
  windowTitle?: string
  className?: string
  /** Sin barra tipo ventana ni etiqueta de técnica duplicada (la pestaña ya nombra el tema). */
  variant?: 'default' | 'minimal'
}

/**
 * Una sola ventana (chrome tipo app): las pestañas cambian el par mal/bien sin slider;
 * el split fijo deja ver ambas columnas al mismo tiempo.
 */
export function PromptCompareWindow({
  examples,
  windowTitle = 'Mal vs bien',
  className = '',
  variant = 'default',
}: Props) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const current = examples[active]

  if (examples.length === 0) return null

  const showWindowChrome = variant === 'default'

  const isMinimal = variant === 'minimal'

  return (
    <div className={`w-full ${isMinimal ? 'max-w-6xl' : 'max-w-4xl'} ${className}`}>
      <div
        className={
          showWindowChrome
            ? 'overflow-hidden rounded-xl border border-[#0f0f0f]/12 bg-white shadow-[0_1px_0_0_rgba(15,15,15,0.04),0_12px_32px_-8px_rgba(15,15,15,0.12)]'
            : 'overflow-hidden rounded-xl bg-transparent'
        }
      >
        {showWindowChrome ? (
          <div className="flex items-center gap-3 border-b border-[#0f0f0f]/8 bg-[#f6f6f6] px-3 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[11px] font-medium tracking-tight text-[#0f0f0f]/50">
              {windowTitle}
            </span>
          </div>
        ) : null}

        <div
          className={
            isMinimal
              ? 'flex flex-wrap gap-x-8 gap-y-1 px-4 pt-1 sm:px-5'
              : 'flex flex-wrap gap-1 border-b border-[#0f0f0f]/8 bg-[#fafafa] px-2 py-2'
          }
          role="tablist"
          aria-label="Ejemplos"
        >
          {examples.map((ex, i) => {
            const selected = i === active
            const tabId = `${baseId}-tab-${ex.id}`
            const panelId = `${baseId}-panel-${ex.id}`
            return (
              <button
                key={ex.id}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={
                  isMinimal
                    ? selected
                      ? '-mb-px border-b-2 border-[#00a7b5] pb-2.5 text-[15px] font-semibold text-[#0f0f0f]'
                      : 'border-b-2 border-transparent pb-2.5 text-[15px] font-medium text-[#0f0f0f]/45 transition hover:text-[#0f0f0f]/70'
                    : selected
                      ? 'rounded-md bg-white px-3 py-1.5 text-[12px] font-semibold text-[#0f0f0f] shadow-[0_1px_2px_rgba(15,15,15,0.06)] ring-1 ring-[#0f0f0f]/10'
                      : 'rounded-md px-3 py-1.5 text-[12px] font-medium text-[#0f0f0f]/45 transition hover:bg-[#0f0f0f]/[0.04] hover:text-[#0f0f0f]/70'
                }
              >
                {ex.tabLabel}
              </button>
            )
          })}
        </div>

        <div className={isMinimal ? 'p-4 sm:p-6' : 'p-2 sm:p-3'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              id={`${baseId}-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${current.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {showWindowChrome ? (
                <p className="mb-2.5 px-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0f0f0f]/38">
                  {current.technique}
                </p>
              ) : null}
              <PromptSplitCompare
                bad={current.bad}
                good={current.good}
                compact={!isMinimal && showWindowChrome}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
