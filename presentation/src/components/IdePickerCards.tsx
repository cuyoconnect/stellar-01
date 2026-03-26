import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { IDE_OPTIONS, type IdeTarget } from '../lib/deeplinks'
import { OTHER_IDE_GROUP, visualForIde } from '../lib/ideTheme'
import { IdeIcon } from './IdeIcon'

type Props = {
  onSelect: (ide: IdeTarget) => void
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 380, damping: 28 } },
}

function OtrosStackedIcons() {
  return (
    <div
      className="mb-3 flex h-[52px] w-full items-center justify-center"
      aria-hidden
    >
      <div className="flex items-center justify-center -space-x-2.5 sm:-space-x-3">
        {OTHER_IDE_GROUP.map((id, i) => {
          const v = visualForIde(id)
          return (
            <div
              key={id}
              className="flex size-11 items-center justify-center rounded-md bg-[#f5f5f5]"
              style={{ zIndex: i + 1 }}
            >
              <IdeIcon visual={v} className="size-6 shrink-0" color={v.bgDark} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function IdePickerCards({ onSelect }: Props) {
  return (
    <div className="w-full max-w-3xl">
      <p className="mb-6 text-center text-sm text-[#0f0f0f]/60">
        Elegí el entorno donde querés instalar comandos y skills. Después verás las acciones
        disponibles.
      </p>
      <motion.ul
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {(['cursor', 'vscode'] as const).map((id) => {
          const o = IDE_OPTIONS.find((x) => x.value === id)!
          const v = visualForIde(o.value)
          return (
            <motion.li key={o.value} variants={item} className="list-none">
              <button
                type="button"
                onClick={() => onSelect(o.value)}
                className="group flex h-full w-full flex-col items-center rounded-md border border-[#0f0f0f]/10 bg-white p-5 text-center transition hover:border-[#0f0f0f]/18 hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ide-brand)] focus-visible:ring-offset-2"
                style={{ '--ide-brand': v.bg } as CSSProperties}
              >
                <div
                  className="mb-1 flex size-[52px] items-center justify-center rounded-lg transition-transform group-hover:scale-105"
                  style={{ backgroundColor: `${v.bg}20` }}
                >
                  <IdeIcon visual={v} className="size-7 shrink-0" color={v.bgDark} />
                </div>
                <span className="font-semibold tracking-tight text-[#0f0f0f]">{o.label}</span>
              </button>
            </motion.li>
          )
        })}

        <motion.li variants={item} className="list-none sm:col-span-1">
          <button
            type="button"
            onClick={() => onSelect('others')}
            className="group flex h-full w-full flex-col items-center rounded-md border border-[#0f0f0f]/10 bg-white p-5 text-center transition hover:border-[#0f0f0f]/18 hover:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ca3af] focus-visible:ring-offset-2"
          >
            <OtrosStackedIcons />
            <span className="font-semibold tracking-tight text-[#0f0f0f]">Otros</span>
          </button>
        </motion.li>
      </motion.ul>
    </div>
  )
}
