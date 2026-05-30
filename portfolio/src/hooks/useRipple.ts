import { useCallback } from 'react'

function useRipple() {
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()

    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      transform: scale(0);
      animation: ripple 0.5s ease-out forwards;
      pointer-events: none;
    `

    button.style.position = 'relative'
    button.style.overflow = 'hidden'
    button.appendChild(ripple)

    setTimeout(() => ripple.remove(), 500)
  }, [])

  return createRipple
}

export default useRipple