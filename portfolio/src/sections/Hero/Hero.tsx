
import styles from './Hero.module.css'
import AsciiMobile from './AsciiMobile'


const FULL_TEXT = ""

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

  return (
    <section
      className={styles.hero}
    >
 

     

    <div className={styles.asciiWrap}>
          <AsciiMobile />
        </div>

     
    </section>
  )
}

export default Hero