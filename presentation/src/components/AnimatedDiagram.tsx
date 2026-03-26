import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  { label: 'Prompt', detail: 'Objetivo y contexto' },
  { label: 'IA genera', detail: 'Código o cambios' },
  { label: 'Probás', detail: 'Validás en la realidad' },
  { label: 'Feedback', detail: 'Ajustás y repetís' },
] as const

export function AnimatedDiagram() {
  return (
    <div className="relative w-full max-w-4xl">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 md:gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
              className="relative min-w-[140px] rounded-lg border border-[#0f0f0f]/12 bg-white p-4 shadow-sm"
            >
              <motion.div
                className="absolute inset-0 rounded-lg bg-[#fdda24]/10"
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative text-center">
                <div className="text-sm font-semibold text-[#0f0f0f]">{s.label}</div>
                <div className="mt-1 text-xs text-[#0f0f0f]/60">{s.detail}</div>
              </div>
            </motion.div>
            {i < steps.length - 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.15 }}
                className="hidden text-[#00a7b5] sm:block"
              >
                <ArrowRight className="size-6" />
              </motion.div>
            ) : null}
          </div>
        ))}
      </div>
      <motion.p
        className="mt-8 text-center text-sm text-[#0f0f0f]/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        El último paso conecta de nuevo con el primero: el loop se cierra.
      </motion.p>
    </div>
  )
}
