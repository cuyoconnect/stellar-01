import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Minimize,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useFullscreen } from '../hooks/useFullscreen'
import { useKeyboardNav } from '../hooks/useKeyboardNav'
import { useSwipe } from '../hooks/useSwipe'
import { ProgressBar } from './ProgressBar'

type SlideDef = {
  id: string
  component: React.ComponentType
}

type Props = {
  slides: SlideDef[]
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 32 },
  },
  exit: (dir: number) => ({
    x: dir < 0 ? 80 : -80,
    opacity: 0,
  }),
}

export function Presentation({ slides }: Props) {
  const [[page, direction], setPage] = useState([0, 0])
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  const total = slides.length
  const index = Math.min(page, Math.max(0, total - 1))
  const Current = slides[index]?.component

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= total) return
      setPage([next, next > index ? 1 : -1])
    },
    [index, total],
  )

  const next = useCallback(() => goTo(Math.min(index + 1, total - 1)), [goTo, index, total])
  const prev = useCallback(() => goTo(Math.max(index - 1, 0)), [goTo, index])

  const nav = useMemo(
    () => ({
      onPrev: prev,
      onNext: next,
      onFirst: () => goTo(0),
      onLast: () => goTo(total - 1),
    }),
    [goTo, next, prev, total],
  )

  useKeyboardNav(nav)

  const { swipeHandlers } = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
  })

  return (
    <div
      className="relative min-h-dvh overflow-hidden bg-white font-sans selection:bg-[#fdda24]/50 selection:text-[#0f0f0f]"
      {...swipeHandlers}
    >
      <ProgressBar current={index} total={total} />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-[#0f0f0f]/10 bg-white/80 px-4 py-4 backdrop-blur-md md:px-8">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-[#0f0f0f]/60">
            Vibecoding · Web3 · Stellar
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#0f0f0f]/15 bg-[#f9f9f9] px-3 py-1 text-xs font-medium text-[#0f0f0f]/70">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="rounded-full border border-[#0f0f0f]/15 bg-white p-2 text-[#0f0f0f] transition hover:bg-[#f9f9f9]"
              aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? (
                <Minimize className="size-4" />
              ) : (
                <Expand className="size-4" />
              )}
            </button>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center pb-24">
          <AnimatePresence mode="wait" custom={direction}>
            {Current ? (
              <motion.div
                key={slides[index].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <Current />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-4 border-t border-[#0f0f0f]/10 bg-white/90 px-4 py-4 backdrop-blur-md">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            className="flex items-center gap-2 rounded-full border border-[#0f0f0f] bg-white px-5 py-3 text-sm font-medium text-[#0f0f0f] transition enabled:hover:bg-[#f9f9f9] disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="size-5" />
            Anterior
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index >= total - 1}
            className="flex items-center gap-2 rounded-full bg-[#0f0f0f] px-6 py-3 text-sm font-semibold text-white shadow-md transition enabled:hover:bg-[#212121] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Siguiente
            <ChevronRight className="size-5" />
          </button>
        </footer>
      </div>
    </div>
  )
}
