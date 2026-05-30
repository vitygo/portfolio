import { useEffect, useRef } from 'react'

function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function onMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      el!.style.transform = `translate(${dx}px, ${dy}px)`
      el!.style.transition = 'transform 0.1s ease'
    }

    function onMouseLeave() {
      el!.style.transform = 'translate(0, 0)'
      el!.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength])

  return ref
}

export default useMagnetic