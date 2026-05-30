import { toast } from 'sonner'
import styles from './Contact.module.css'
import useRipple from '@/hooks/useRipple'

const EMAIL = 'vitygocanal@gmail.com'

function Contact() {
    const ripple = useRipple()
  function copyEmail() {
    navigator.clipboard.writeText(EMAIL)
    toast.success('Email copied!', {
      description: EMAIL,
      duration: 2500,
    })
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <p className={`${styles.label} reveal`}>Contact</p>
        <h2 className={`${styles.headline} reveal`}>
          Let's make something worth building.
        </h2>

        <div className={`${styles.links} reveal`}>
          <button
            onClick={copyEmail}
            className={styles.btnPrimary}
            onMouseDown={ripple}
          >
            {EMAIL}
          </button>
          <a
            href="https://github.com/vitygo"
            target="_blank"
            rel="noreferrer"
            className={styles.btnOutline}
            onMouseDown={ripple}
          >
            <i className="ti ti-brand-github" aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/viktor-kobylianskyi/"
            target="_blank"
            rel="noreferrer"
            className={styles.btnOutline}
            onMouseDown={ripple}
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