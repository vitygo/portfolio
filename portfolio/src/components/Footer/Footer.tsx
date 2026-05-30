import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.left}>© 2026 Viktor Kobylianskyi. All rights reserved.</p>
      <ul className={styles.links}>
        <li><a href="#">Resume PDF</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Source</a></li>
      </ul>
    </footer>
  )
}

export default Footer