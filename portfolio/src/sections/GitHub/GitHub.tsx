import { useEffect, useState } from 'react'
import styles from './GitHub.module.css'
import useRipple from '@/hooks/useRipple'

type Repo = {
  name: string
  commits: number
  color: string
  url: string
}

const REPOS = [
  { name: 'highlingua', color: '#c1fbd4', url: 'https://github.com/vitygo/highlingua' },
  { name: 'kanban-app', color: '#40b368', url: 'https://github.com/vitygo/kanban-app' },
  { name: 'portfolio', color: '#2d7a4a', url: 'https://github.com/vitygo/portfolio' },
]

const SIZE = 200
const CX = SIZE / 2
const CY = SIZE / 2
const RADII = [82, 62, 42]
const STROKE = 10

function polarToXY(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToXY(cx, cy, r, startAngle)
  const end = polarToXY(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

function GitHub() {
    const ripple = useRipple()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCommits() {
      try {
        const results = await Promise.all(
          REPOS.map(async (repo) => {
            const res = await fetch(
              `https://api.github.com/repos/vitygo/${repo.name}/commits?per_page=100`
            )
            if (!res.ok) return { ...repo, commits: 0 }
            const data = await res.json()
            return { ...repo, commits: Array.isArray(data) ? data.length : 0 }
          })
        )
        const t = results.reduce((s, r) => s + r.commits, 0)
        setRepos(results)
        setTotal(t)
      } catch {
        setRepos(REPOS.map(r => ({ ...r, commits: 0 })))
      } finally {
        setLoading(false)
      }
    }

    fetchCommits()
  }, [])

  const max = Math.max(...repos.map(r => r.commits), 1)

  return (
    <section id="github" className={styles.section}>
      <div className={styles.inner}>
        <p className={`${styles.label} reveal`}>GitHub</p>
        <h2 className={`${styles.title} reveal`}>GitHub activity.</h2>
        <p className={`${styles.subtitle} reveal`}>
        Recent commits across my public projects — updated live from GitHub
        </p>

        <div className={`${styles.content} reveal`}>
          <div className={styles.radialWrap}>
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                {repos.map((repo, i) => {
                  const r = RADII[i]
                  const pct = repos.length > 0 ? repo.commits / max : 0
                  const angle = pct * 340
                  const isHovered = hovered === repo.name

                  return (
                    <g key={repo.name} >
                      <circle
                        cx={CX} cy={CY} r={r}
                        fill="none"
                        stroke="#1e2c31"
                        strokeWidth={STROKE}
                      />
                      {angle > 0 && (
                        <path
                          d={describeArc(CX, CY, r, 0, angle)}
                          fill="none"
                          stroke={repo.color}
                          strokeWidth={isHovered ? STROKE + 3 : STROKE}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-width 0.2s' }}
                          onMouseEnter={() => setHovered(repo.name)}
                          onMouseLeave={() => setHovered(null)}
                          cursor="pointer"
                        />
                      )}
                    </g>
                  )
                })}
                <text
                  x={CX} y={CY - 8}
                  textAnchor="middle"
                  fill="#c1fbd4"
                  fontSize="22"
                  fontWeight="300"
                  fontFamily="Inter, sans-serif"
                >
                  {total}
                </text>
                <text
                  x={CX} y={CY + 10}
                  textAnchor="middle"
                  fill="#52525b"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  letterSpacing="0.5"
                >
                  COMMITS
                </text>
              </svg>
            )}
          </div>

          <div className={styles.legend}>
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className={`${styles.legendItem} ${hovered === repo.name ? styles.legendItemHovered : ''}`}
                onMouseDown={ripple}
                onMouseEnter={() => setHovered(repo.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={styles.legendDot} style={{ background: repo.color }} />
                <div className={styles.legendInfo}>
                  <span className={styles.legendName}>{repo.name}</span>
                  <span className={styles.legendCount}>{repo.commits} commits</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.legendArrow}>
                  <path d="M2 10 10 2M4 2h6v6" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.floatingDots}>
  {Array.from({ length: 60 }).map((_, i) => (
    <div
      key={i}
      className={styles.floatDot}
      style={{
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        opacity: Math.random() * 0.5 + 0.1,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
        left: `${(i / 60) * 100}%`,
      }}
    />
  ))}
</div>
    </section>
  )
}

export default GitHub