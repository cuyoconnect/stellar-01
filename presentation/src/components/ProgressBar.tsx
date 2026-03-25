type Props = {
  current: number
  total: number
}

export function ProgressBar({ current, total }: Props) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-1 bg-[#0f0f0f]/8">
      <div
        className="h-full bg-[#00a7b5] transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
