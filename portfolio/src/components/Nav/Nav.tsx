import styles from './Nav.module.css'

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoWrap}>
        <a href="#" className={styles.logo}>VK</a>
        <span className={styles.badge}>
          <span className={styles.badgeDot} />
          Open to work
        </span>
      </div>

      <ul className={styles.links}>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#stack">Stack</a></li>
        <li><a href="#community">Community</a></li>
      </ul>

      <div className={styles.cta}>
        <a href="#contact" className={styles.btnOutline}>Say hello</a>
        <a href="mailto:vitygocanal@gmail.com" className={styles.btnPrimary}>Hire me</a>
      </div>
    </nav>
  )
}

export default Nav