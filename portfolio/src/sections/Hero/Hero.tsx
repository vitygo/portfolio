import { useEffect, useState, useRef } from 'react'
import styles from './Hero.module.css'
import AsciiMobile from './AsciiMobile'
import useRipple from '@/hooks/useRipple'
import useMagnetic from '@/hooks/useMagnetic'

const FULL_TEXT = "Building things\nthat actually work."

type Era = 'geocities' | 'early' | 'web2' | 'flat' | 'modern'
const ERA_ORDER: Era[] = ['geocities', 'early', 'web2', 'flat', 'modern']

type EraTheme = {
  section: React.CSSProperties
  eyebrow: React.CSSProperties
  headline: React.CSSProperties
  sub: React.CSSProperties
  btnPrimary: React.CSSProperties
  btnOutline: React.CSSProperties
  label: string
}

const THEMES: Record<Era, EraTheme> = {
  geocities: {
    label: '1996 — GeoCities',
    section: { background: '#000080' },
    eyebrow: { color: '#00ff00', fontFamily: 'Courier New, monospace', letterSpacing: '0' },
    headline: { color: '#ffff00', fontFamily: 'Courier New, monospace', fontWeight: '700', textShadow: '2px 2px #ff0000', letterSpacing: '0' },
    sub: { color: '#00ffff', fontFamily: 'Courier New, monospace' },
    btnPrimary: { background: '#ff00ff', color: '#fff', border: '2px solid #fff', borderRadius: '0', fontFamily: 'Courier New, monospace' },
    btnOutline: { background: '#ff0000', color: '#fff', border: '2px solid #fff', borderRadius: '0', fontFamily: 'Courier New, monospace' },
  },
  early: {
    label: '2000 — Early Web',
    section: { background: '#c0c0c0' },
    eyebrow: { color: '#000080', fontFamily: 'Times New Roman, serif', fontStyle: 'italic', letterSpacing: '0', textTransform: 'none' },
    headline: { color: '#000080', fontFamily: 'Times New Roman, serif', fontWeight: '700', textDecoration: 'underline', letterSpacing: '0', fontSize: '36px' },
    sub: { color: '#000', fontFamily: 'Times New Roman, serif' },
    btnPrimary: { background: '#c0c0c0', color: '#000', border: '2px outset #fff', borderRadius: '0', fontFamily: 'Times New Roman, serif' },
    btnOutline: { background: '#c0c0c0', color: '#000', border: '2px outset #fff', borderRadius: '0', fontFamily: 'Times New Roman, serif' },
  },
  web2: {
    label: '2008 — Web 2.0',
    section: { background: 'linear-gradient(180deg, #1a3a6b 0%, #0d1f3c 100%)' },
    eyebrow: { color: '#7ec8e3', fontFamily: 'Arial, sans-serif' },
    headline: { color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: '700', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', letterSpacing: '0' },
    sub: { color: '#aaa', fontFamily: 'Arial, sans-serif' },
    btnPrimary: { background: 'linear-gradient(180deg,#ff9900,#cc6600)', color: '#fff', border: '1px solid #aa4400', borderRadius: '4px', fontFamily: 'Arial, sans-serif' },
    btnOutline: { borderColor: '#7ec8e3', color: '#7ec8e3', borderRadius: '4px', fontFamily: 'Arial, sans-serif' },
  },
  flat: {
    label: '2015 — Flat Design',
    section: { background: '#2196F3' },
    eyebrow: { color: 'rgba(255,255,255,0.8)', fontFamily: 'Arial, sans-serif', letterSpacing: '2px' },
    headline: { color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: '300', letterSpacing: '0' },
    sub: { color: 'rgba(255,255,255,0.9)', fontFamily: 'Arial, sans-serif' },
    btnPrimary: { background: '#fff', color: '#2196F3', borderRadius: '0', fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '1px' },
    btnOutline: { borderColor: '#fff', color: '#fff', borderRadius: '0', fontFamily: 'Arial, sans-serif' },
  },
  modern: {
    label: '2024 — Modern',
    section: {},
    eyebrow: {},
    headline: {},
    sub: {},
    btnPrimary: {},
    btnOutline: {},
  },
}

function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [eraIndex, setEraIndex] = useState(4)
  const ripple = useRipple()
  const btnPrimary = useMagnetic<HTMLAnchorElement>()
  const btnOutline = useMagnetic<HTMLAnchorElement>()
  const sectionRef = useRef<HTMLElement>(null)
  const era = ERA_ORDER[eraIndex]
  const theme = THEMES[era]
  const isModern = era === 'modern'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            setEraIndex(4)
          }
        })
      },
      { threshold: 0.1 }
    )
  
    if (sectionRef.current) observer.observe(sectionRef.current)
  
    return () => observer.disconnect()
  }, [])

  const lines = displayed.split('\n')

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      style={{ transition: 'background 0.5s ease', ...theme.section }}
    >
      {isModern && <div className={styles.gridBg} />}
      {isModern && <div className={styles.glow} />}

      {/* Time machine slider — top center */}
      <div className={styles.timeMachine}>
        <div className={styles.tmLabels}>
          <span>1996</span>
          <span>2000</span>
          <span>2008</span>
          <span>2015</span>
          <span>2026</span>
        </div>
        <input
          type="range"
          min={0}
          max={4}
          step={1}
          value={eraIndex}
          onChange={e => setEraIndex(parseInt(e.target.value))}
          className={styles.tmSlider}
        />
        {/* <p className={styles.tmLabel}>{theme.label}</p> */}
      </div>

      <div className={styles.layout}>
        <div className={styles.content}>
          <p
            className={`${styles.eyebrow} reveal`}
            style={{ transition: 'all 0.4s ease', ...theme.eyebrow }}
          >
            Viktor Kobylianskyi — Frontend Engineer
          </p>

          <h1
            className={styles.headline}
            style={{ transition: 'all 0.4s ease', ...theme.headline }}
          >
            {lines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
                {isModern && i === lines.length - 1 && !done && (
                  <span className={styles.cursor}>|</span>
                )}
              </span>
            ))}
          </h1>

          <p
            className={styles.sub}
            style={{
              transition: isModern ? 'opacity 0.8s ease 0.2s, all 0.4s ease' : 'all 0.4s ease',
              opacity: isModern ? (done ? 1 : 0) : 1,
              ...theme.sub,
            }}
          >
            I build full-stack apps, co-host Meet.js Kraków, and ship things before they're perfect
          </p>

          <div
            className={styles.actions}
            style={{
              transition: isModern ? 'opacity 0.8s ease 0.4s' : 'all 0.4s ease',
              opacity: isModern ? (done ? 1 : 0) : 1,
            }}
          >
            <a
              ref={isModern ? btnPrimary : undefined}
              href="#projects"
              className={styles.btnPrimary}
              onMouseDown={ripple}
              style={{ transition: 'all 0.4s ease', ...theme.btnPrimary }}
            >
              View projects
            </a>
            
            <a
              ref={isModern ? btnOutline : undefined}
              href="#community"
              className={styles.btnOutline}
              onMouseDown={ripple}
              style={{ transition: 'all 0.4s ease', ...theme.btnOutline }}
            >
              Community →
            </a>
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