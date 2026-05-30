// src/pages/NotFoundPage.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

const MESSAGES = [
  "Hmm. This page doesn't exist.",
  "404: Page not found. Just like my job offers.",
  "This route is undefined. Much like my career path.",
]

function NotFoundPage() {
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
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
          <span className={styles.termTitle}>404.exe</span>
        </div>

        <div className={styles.termBody}>
          <p className={styles.line}>
            <span className={styles.prompt}>$</span> find page
          </p>
          <p className={styles.line}>
            <span className={styles.searching}>Searching{dots}</span>
          </p>
          <p className={`${styles.line} ${styles.error}`}>
            ✗ {msg}
          </p>
          <p className={styles.line}>
            <span className={styles.prompt}>$</span>{' '}
            <span className={styles.suggestion}>cd /home</span>
          </p>
        </div>

        <div className={styles.termFooter}>
          <Link to="/" className={styles.btn}>
            $ go home
          </Link>
          <a
            href="https://github.com/vitygo"
            target="_blank"
            rel="noreferrer"
            className={styles.btnOutline}
          >
            GitHub
          </a>
        </div>

      </div>

      <p className={styles.hint}>
        or just press back and pretend this never happened
      </p>
    </div>
  )
}

export default NotFoundPage