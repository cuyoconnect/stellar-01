import { useCallback, useEffect, useState } from 'react'

export function useFullscreen() {
  const [isFs, setIsFs] = useState(false)

  useEffect(() => {
    const onChange = () => {
      setIsFs(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      /* ignore */
    }
  }, [])

  return { isFullscreen: isFs, toggleFullscreen: toggle }
}
