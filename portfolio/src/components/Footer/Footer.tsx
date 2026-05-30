import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.left}>© 2026 Viktor Kobylianskyi. All rights reserved.</p>
      <ul className={styles.links}>
        <li><a href="#">Resume PDF</a></li>
        <li><a
            href="https://www.linkedin.com/in/viktor-kobylianskyi/"
            target="_blank"
            rel="noreferrer"
          >Blog</a></li>
        <li><a
            href="https://github.com/vitygo/portfolio/tree/main/portfolio"
            target="_blank"
            rel="noreferrer"
          >Source</a></li>
      </ul>
    </footer>
  )
}

export default Footer