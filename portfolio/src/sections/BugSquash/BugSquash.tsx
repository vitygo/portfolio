import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './BugSquash.module.css'

const BUGS = ['null', 'undefined', 'NaN', '404', 'CORS', '500', 'TypeError', 'ReferenceError', 'SyntaxError', '403', 'Cannot read', 'undefined is not']
const DURATION = 15

type Bug = {
  id: number
  text: string
  x: number
  y: number
}

function BugSquash() {
  const [state, setState] = useState<'idle' | 'playing' | 'over'>('idle')
  const [bugs, setBugs] = useState<Bug[]>([])
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState(0)
  const [combo, setCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [comboText, setComboText] = useState('')
  const [showCombo, setShowCombo] = useState(false)

  const bugIdRef = useRef(0)
  const comboRef = useRef(0)
  const areaRef = useRef<HTMLDivElement>(null)
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const bugTimersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const endGame = useCallback(() => {
    setState('over')
    if (spawnRef.current) clearInterval(spawnRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    bugTimersRef.current.forEach(t => clearTimeout(t))
    bugTimersRef.current.clear()
    setBugs([])
  }, [])

  const spawnBug = useCallback(() => {
    const area = areaRef.current
    if (!area) return

    const id = bugIdRef.current++
    const text = BUGS[Math.floor(Math.random() * BUGS.length)]
    const x = Math.random() * (area.offsetWidth - 130)
    const y = Math.random() * (area.offsetHeight - 40)

    setBugs(prev => [...prev, { id, text, x, y }])

    const t = setTimeout(() => {
      setBugs(prev => prev.filter(b => b.id !== id))
      setMissed(prev => prev + 1)
      comboRef.current = 0
      setCombo(0)
    }, 2500)

    bugTimersRef.current.set(id, t)
  }, [])

  const startGame = useCallback(() => {
    setBugs([])
    setScore(0)
    setMissed(0)
    setCombo(0)
    setTimeLeft(DURATION)
    comboRef.current = 0
    bugTimersRef.current.forEach(t => clearTimeout(t))
    bugTimersRef.current.clear()
    setState('playing')

    spawnRef.current = setInterval(spawnBug, 700)
    spawnBug()

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [spawnBug, endGame])

  const clickBug = useCallback((id: number) => {
    const t = bugTimersRef.current.get(id)
    if (t) {
      clearTimeout(t)
      bugTimersRef.current.delete(id)
    }

    setBugs(prev => prev.filter(b => b.id !== id))
    comboRef.current += 1
    const pts = comboRef.current > 2 ? 2 : 1
    setScore(prev => prev + pts)
    setCombo(comboRef.current)

    if (comboRef.current > 1) {
      setComboText(`${comboRef.current}x combo! +${pts}`)
      setShowCombo(true)
      setTimeout(() => setShowCombo(false), 800)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
      bugTimersRef.current.forEach(t => clearTimeout(t))
    }
  }, [])

  const timerPct = (timeLeft / DURATION) * 100

  return (
    <section id="bugsquash" className={styles.section}>
      <div className={styles.inner}>
        <p className={`${styles.label} reveal`}>Mini game</p>
        <h2 className={`${styles.title} reveal`}>Bug Squash.</h2>
        <p className={`${styles.subtitle} reveal`}>
          Click the bugs before they escape. 15 seconds. Go.
        </p>

        <div className={`${styles.terminal} reveal`}>

          <div className={styles.timerBar}>
            <div
              className={styles.timerFill}
              style={{
                width: `${timerPct}%`,
                background: timeLeft <= 3 ? '#f87171' : '#c1fbd4',
              }}
            />
          </div>

          <div className={styles.termHeader}>
            <div className={styles.dots}>
              <span className={styles.dot} style={{ background: '#f87171' }} />
              <span className={styles.dot} style={{ background: '#fbbf24' }} />
              <span className={styles.dot} style={{ background: '#40b368' }} />
            </div>
            <span className={styles.termTitle}>bug-squash.exe</span>
          </div>

          {state !== 'idle' && (
            <div className={styles.stats}>
              <span className={styles.stat}>score <b>{score}</b></span>
              <span className={styles.stat}>time <b>{String(timeLeft).padStart(2, '0')}s</b></span>
              <span className={styles.stat}>missed <b>{missed}</b></span>
              {combo > 1 && <span className={styles.stat}>combo <b>{combo}x</b></span>}
            </div>
          )}

          <div className={styles.area} ref={areaRef}>

            {state === 'idle' && (
              <div className={styles.screen}>
                <p className={styles.screenTitle}>{'> bug-squash.exe'}</p>
                <p className={styles.screenSub}>Click bugs before they escape.<br />15 seconds. Combos give bonus points.</p>
                <button className={styles.startBtn} onClick={startGame}>
                  $ run game
                </button>
              </div>
            )}

            {state === 'over' && (
              <div className={styles.screen}>
                <p className={styles.screenTitle}>
                  {score >= 15 ? '🔥 Bug Destroyer!' : score >= 8 ? '💪 Not bad!' : '😅 Keep practicing'}
                </p>
                <p className={styles.screenSub}>
                  {score} bugs squashed · {missed} escaped
                </p>
                <button className={styles.startBtn} onClick={startGame}>
                  $ run again
                </button>
              </div>
            )}

            {state === 'playing' && (
              <>
                <div className={`${styles.comboText} ${showCombo ? styles.comboVisible : ''}`}>
                  {comboText}
                </div>
                {bugs.map(bug => (
                  <button
                    key={bug.id}
                    className={styles.bug}
                    style={{ left: bug.x, top: bug.y }}
                    onClick={() => clickBug(bug.id)}
                  >
                    {bug.text}
                  </button>
                ))}
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

export default BugSquash