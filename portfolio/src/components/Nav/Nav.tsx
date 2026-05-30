import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import useRipple from '@/hooks/useRipple'

const sections = ['projects', 'experience', 'stack', 'community']

function Nav() {
  const [active, setActive] = useState('')
  const ripple = useRipple()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

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
        {sections.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? styles.linkActive : ''}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.cta}>
        <a href="#contact" className={styles.btnOutline} onMouseDown={ripple}>Say hello</a>
        <a href="mailto:vitygocanal@gmail.com" className={styles.btnPrimary} onMouseDown={ripple}>Hire me</a>
      </div>
    </nav>
  )
}

export default Nav