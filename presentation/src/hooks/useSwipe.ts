import { useRef } from 'react'

type SwipeHandlers = {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  threshold?: number
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: SwipeHandlers) {
  const startX = useRef(0)
  const startY = useRef(0)

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0]
    startX.current = t.clientX
    startY.current = t.clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const t = e.changedTouches[0]
    const dx = t.clientX - startX.current
    const dy = t.clientY - startY.current
    if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < threshold) return
    if (dx < 0) onSwipeLeft()
    else onSwipeRight()
  }

  return { swipeHandlers: { onTouchStart, onTouchEnd } }
}
