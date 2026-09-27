import { useEffect, useRef } from 'react'

/**
 * @param radius When finite, tracks the cursor across the whole window and only
 * pulls once it's within `radius` px of the element's center (a true "magnetic"
 * field). Left as Infinity (default), it reproduces the original behavior:
 * the element only reacts while the cursor is literally inside its box.
 */
function useMagnetic<T extends HTMLElement>(strength = 0.35, radius = Infinity) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      if (Number.isFinite(radius) && Math.hypot(dx, dy) > radius) {
        el!.style.transform = 'translate(0, 0)'
        el!.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
        return
      }

      el!.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      el!.style.transition = 'transform 0.1s ease'
    }

    function onMouseLeave() {
      el!.style.transform = 'translate(0, 0)'
      el!.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
    }

    const moveTarget: Window | T = Number.isFinite(radius) ? window : el
    moveTarget.addEventListener('mousemove', onMouseMove as EventListener)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      moveTarget.removeEventListener('mousemove', onMouseMove as EventListener)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength, radius])

  return ref
}

export default useMagnetic