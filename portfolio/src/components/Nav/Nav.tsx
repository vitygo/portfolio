import { useEffect, useState } from 'react'
import styles from './Nav.module.css'
import useRipple from '@/hooks/useRipple'

const sections = ["", ""]

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
        <a href="#" className={styles.logo}>Viktor Kobylianskyi</a>
        
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

 
    </nav>
  )
}

export default Nav