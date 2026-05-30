import { useEffect, useState } from 'react'
import styles from './Loader.module.css'

const MESSAGES = [
  'Initializing...',
  'Loading modules...',
  'Brewing coffee...',
  'Almost there...',
  'npm install...',
  'Deploying on Render...',
  'Waking up the server...',
]

function Loader() {
  const [msgIndex, setMsgIndex] = useState(0)
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)

    const msgInterval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % MESSAGES.length)
    }, 1800)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev
        return prev + Math.random() * 8
      })
    }, 400)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(msgInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.terminal}>

        <div className={styles.termHeader}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#f87171' }} />
            <span className={styles.dot} style={{ background: '#fbbf24' }} />
            <span className={styles.dot} style={{ background: '#40b368' }} />
          </div>
          <span className={styles.termTitle}>portfolio.exe</span>
        </div>

        <div className={styles.termBody}>
          <p className={styles.line}>
            <span className={styles.prompt}>$</span> starting portfolio
          </p>
          <p className={styles.line}>
            <span className={styles.msg}>{MESSAGES[msgIndex]}{dots}</span>
          </p>
          <div className={styles.progressWrap}>
            <div
              className={styles.progressBar}
              style={{ width: `${Math.min(progress, 95)}%` }}
            />
          </div>
          <p className={styles.pct}>{Math.round(Math.min(progress, 95))}%</p>
        </div>

      </div>

      <p className={styles.hint}>
        Render free tier is waking up — thanks for your patience 🙏
      </p>
    </div>
  )
}

export default Loader