import { useEffect, useRef } from 'react'
import styles from './Noise.module.css'

function Noise() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame: number

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }

    function draw() {
        const w = canvas!.width
        const h = canvas!.height
        const imageData = ctx!.createImageData(w, h)
        const data = imageData.data
      
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255
          data[i] = v
          data[i + 1] = v
          data[i + 2] = v
          data[i + 3] = 18
        }
      
        ctx!.putImageData(imageData, 0, 0)
        setTimeout(() => {
          frame = requestAnimationFrame(draw)
        }, 100)
      }
    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.noise} />
}

export default Noise