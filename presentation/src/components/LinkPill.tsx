import { ArrowUpRight } from 'lucide-react'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

export function LinkPill({ href, children, className = '' }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full border border-[#0f0f0f] bg-white px-4 py-2 text-sm font-medium text-[#0f0f0f] shadow-sm transition hover:bg-[#f9f9f9] ${className}`}
    >
      <span>{children}</span>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#fdda24] text-[#0f0f0f] transition group-hover:brightness-95">
        <ArrowUpRight className="size-3.5" aria-hidden />
      </span>
    </a>
  )
}
