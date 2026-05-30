import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} />
      <div className={styles.glow} />

      <div className={styles.content}>
        <p className={`${styles.eyebrow} reveal`}>Frontend Engineer & Product Builder</p>
        <h1 className={`${styles.headline} reveal`}>
          Building things<br />that actually work.
        </h1>
        <p className={`${styles.sub} reveal`}>
          I design and ship products at the intersection of engineering and craft — clean systems, thoughtful interfaces, and communities that outlast the hype.
        </p>
        <div className={`${styles.actions} reveal`}>
          <a href="#projects" className={styles.btnPrimary}>View projects</a>
          <a href="#community" className={styles.btnOutline}>Community →</a>
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