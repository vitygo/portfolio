import styles from './Experience.module.css'

function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <p className={`${styles.label} reveal`}>Experience</p>

        <div className={styles.statement}>
          <h2 className={`${styles.title} reveal`}>
            No corporate history.<br />
            Just shipping things.
          </h2>
          <p className={`${styles.desc} reveal`}>
            I don't have a LinkedIn full of job titles — I have working projects, a GitHub with actual commits, and the kind of hunger that only comes from building everything yourself from scratch.
          </p>
          <p className={`${styles.desc} reveal`}>
            I'm looking for my first commercial role where I can grow fast, contribute from day one, and work with people who care about what they build.
          </p>

          <div className={`${styles.cards} reveal`}>
            <div className={styles.card}>
              <i className="ti ti-code" aria-hidden="true" />
              <h3>Self-taught</h3>
              <p>Learned by building — not by watching tutorials. Every concept came from a real problem I needed to solve.</p>
            </div>
            <div className={styles.card}>
              <i className="ti ti-rocket" aria-hidden="true" />
              <h3>Shipped to production</h3>
              <p>Both projects are live, deployed on Render, used by real people. Not just localhost demos.</p>
            </div>
            <div className={styles.card}>
              <i className="ti ti-seeding" aria-hidden="true" />
              <h3>Ready to grow</h3>
              <p>I pick up new tools fast, take feedback well, and show up every day. Give me a chance to prove it.</p>
            </div>
          </div>

          <a href="mailto:your@email.com" className={`${styles.cta} reveal`}>
            Give me a shot
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

export default Experience