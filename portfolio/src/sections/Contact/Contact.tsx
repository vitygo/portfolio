// src/sections/Contact/Contact.tsx
import styles from './Contact.module.css'

function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Contact</p>
        <h2 className={styles.headline}>
          Let's make something worth building.
        </h2>

        <div className={styles.links}>
          <a
            href="mailto:vitygocanal@gmail.com"
            className={styles.btnPrimary}
          >
            vitygocanal@gmail.com
          </a>
          <a
            href="https://github.com/vitygo"
            target="_blank"
            rel="noreferrer"
            className={styles.btnOutline}
          >
            <i className="ti ti-brand-github" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/viktor-kobylianskyi/"
            target="_blank"
            rel="noreferrer"
            className={styles.btnOutline}
          >
            <i className="ti ti-brand-linkedin" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact