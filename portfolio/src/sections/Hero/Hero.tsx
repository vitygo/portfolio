import { useEffect, useState } from 'react'
import styles from './Hero.module.css'
import AsciiMobile from './AsciiMobile'

const FULL_TEXT = "Building things\nthat actually work."

function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [])

  const lines = displayed.split('\n')

  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} />
      <div className={styles.glow} />

      <div className={styles.layout}>
        <div className={styles.content}>
          <p className={`${styles.eyebrow} reveal`}>
            Viktor Kobylianskyi — Frontend Engineer
          </p>

          <h1 className={styles.headline}>
            {lines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
                {i === lines.length - 1 && !done && (
                  <span className={styles.cursor}>|</span>
                )}
              </span>
            ))}
          </h1>

          <p
            className={styles.sub}
            style={{
              transition: 'opacity 0.8s ease 0.2s',
              opacity: done ? 1 : 0,
            }}
          >
            I build full-stack apps, co-host Meet.js Kraków, and ship things before they're perfect
          </p>

          <div
            className={styles.actions}
            style={{
              transition: 'opacity 0.8s ease 0.4s',
              opacity: done ? 1 : 0,
            }}
          >
            <a href="#projects" className={styles.btnPrimary}>View projects</a>
            <a href="#community" className={styles.btnOutline}>Community →</a>
          </div>
        </div>

        <div className={styles.asciiWrap}>
          <AsciiMobile />
        </div>
      </div>

      <div className={styles.scrollHint}>
        scroll
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 2v10M3.5 8.5 7 12l3.5-3.5" />
        </svg>
      </div>
    </section>
  )
}

export default Hero