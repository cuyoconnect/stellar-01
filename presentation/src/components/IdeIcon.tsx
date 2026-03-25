import type { IdeVisual } from '../lib/ideTheme'

type Props = {
  visual: IdeVisual
  className?: string
  color?: string
}

/** Icono del IDE (soporta un `path` o varios en `IdeVisual`). */
export function IdeIcon({ visual, className = 'size-7 shrink-0', color }: Props) {
  const paths = Array.isArray(visual.path) ? visual.path : [visual.path]
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox={visual.viewBox}
      aria-hidden
      style={color ? { color } : undefined}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fillRule={visual.fillRule} />
      ))}
    </svg>
  )
}
