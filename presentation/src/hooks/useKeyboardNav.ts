import { useEffect } from 'react'

type NavHandlers = {
  onPrev: () => void
  onNext: () => void
  onFirst?: () => void
  onLast?: () => void
}

export function useKeyboardNav({
  onPrev,
  onNext,
  onFirst,
  onLast,
}: NavHandlers) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (
        t &&
        (t.tagName === 'INPUT' ||
          t.tagName === 'TEXTAREA' ||
          t.isContentEditable)
      ) {
        return
      }
      switch (e.key) {
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          onPrev()
          break
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault()
          onNext()
          break
        case ' ':
          e.preventDefault()
          if (e.shiftKey) onPrev()
          else onNext()
          break
        case 'Home':
          e.preventDefault()
          onFirst?.()
          break
        case 'End':
          e.preventDefault()
          onLast?.()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPrev, onNext, onFirst, onLast])
}
