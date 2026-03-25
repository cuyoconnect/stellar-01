import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 28 },
  },
}

type Props = {
  children: React.ReactNode
  className?: string
}

export function Slide({ children, className = '' }: Props) {
  return (
    <motion.div
      className={`mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 py-16 text-center md:px-10 ${className}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  )
}

export function SlideItem({ children, className = '' }: Props) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}

/**
 * Amarillo Stellar a mitad de camino entre el resaltado suave (50%) y el de botones/flechas (100%):
 * mismo tono #fdda24, menos saturación visual sobre el texto.
 */
export const slideTitleSelectEffect =
  'rounded-[2px] bg-[#fdda24]/75 px-[0.2em] py-[0.1em] text-[#0f0f0f] box-decoration-clone [box-decoration-break:clone] selection:bg-[#d4be1f]'

export function SlideTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <SlideItem className="w-full">
      <h2
        className={`font-serif text-3xl font-normal tracking-[-0.03em] md:text-[2.75rem] md:leading-tight ${className}`}
      >
        <span className={slideTitleSelectEffect}>{children}</span>
      </h2>
    </SlideItem>
  )
}

export function SlideSubtitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <SlideItem className="w-full">
      <p
        className={`mt-3 max-w-3xl text-pretty text-lg leading-relaxed text-[#0f0f0f]/70 md:text-xl ${className}`}
      >
        {children}
      </p>
    </SlideItem>
  )
}
