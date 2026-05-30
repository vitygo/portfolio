import { useEffect, useRef } from 'react'
import styles from './AsciiMobile.module.css'

const GRID_COLS = 16


const PATTERN = [
  [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0],
  [1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1],
  [1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

function AsciiMobile() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dots = containerRef.current?.querySelectorAll<HTMLDivElement>('[data-index]')
    if (!dots) return

    let frame: number

    function animate() {
      const now = Date.now() / 1000
      dots!.forEach((dot) => {
        const row = parseInt(dot.dataset.row || '0')
        const col = parseInt(dot.dataset.col || '0')
        const active = parseInt(dot.dataset.active || '0')
        if (!active) return
        const wave = Math.sin(now * 1.5 + row * 0.4 + col * 0.3)
        const opacity = 0.4 + wave * 0.3
        dot.style.opacity = String(Math.max(0.1, opacity))
      })
      frame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={styles.wrap} ref={containerRef}>
      {PATTERN.map((row, rowIdx) =>
        row.map((active, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            data-index={rowIdx * GRID_COLS + colIdx}
            data-row={rowIdx}
            data-col={colIdx}
            data-active={active}
            className={`${styles.dot} ${active ? styles.dotActive : styles.dotInactive}`}
          />
        ))
      )}
    </div>
  )
}

export default AsciiMobile