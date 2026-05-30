import styles from './Hero.module.css'
import AsciiMobile from './AsciiMobile'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} />
      <div className={styles.glow} />

      <div className={styles.layout}>
        <div className={styles.content}>
          <p className={`${styles.eyebrow} reveal`}>Viktor Kobylianskyi — Frontend Engineer</p>
          <h1 className={`${styles.headline} reveal`}>
            Building things<br />that actually work.
          </h1>
          <p className={`${styles.sub} reveal`}>
          I build full-stack apps, co-host Meet.js Kraków, and ship things before they're perfect
          </p>
    
       
          <div className={`${styles.actions} reveal`}>
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