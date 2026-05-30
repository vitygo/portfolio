import { useEffect } from 'react'

function CursorTrail() {
  useEffect(() => {
    const dots: HTMLDivElement[] = []
    const DOTS = 12

    for (let i = 0; i < DOTS; i++) {
      const dot = document.createElement('div')
      dot.style.cssText = `
        position: fixed;
        width: ${8 - i * 0.5}px;
        height: ${8 - i * 0.5}px;
        border-radius: 50%;
        background: #c1fbd4;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
      `
      document.body.appendChild(dot)
      dots.push(dot)
    }

    const positions: { x: number; y: number }[] = Array(DOTS).fill({ x: 0, y: 0 })
    let mouse = { x: 0, y: 0 }
    let visible = false

    function onMouseMove(e: MouseEvent) {
      mouse = { x: e.clientX, y: e.clientY }
      if (!visible) {
        visible = true
        dots.forEach(d => d.style.opacity = '1')
      }
    }

    function onMouseLeave() {
      visible = false
      dots.forEach(d => d.style.opacity = '0')
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    let frame: number

    function animate() {
      positions[0] = { ...mouse }

      for (let i = 1; i < DOTS; i++) {
        positions[i] = {
          x: positions[i].x + (positions[i - 1].x - positions[i].x) * 0.35,
          y: positions[i].y + (positions[i - 1].y - positions[i].y) * 0.35,
        }
      }

      dots.forEach((dot, i) => {
        dot.style.left = `${positions[i].x}px`
        dot.style.top = `${positions[i].y}px`
        dot.style.opacity = visible ? String(1 - i / DOTS) : '0'
      })

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      dots.forEach(d => d.remove())
    }
  }, [])

  return null
}

export default CursorTrail