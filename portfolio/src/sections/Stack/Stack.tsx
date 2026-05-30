// src/sections/Stack/Stack.tsx
import styles from './Stack.module.css'

type StackItem = {
  name: string
  level: number
}

type StackCategory = {
  label: string
  items: StackItem[]
}

const stack: StackCategory[] = [
  {
    label: 'Frontend',
    items: [
      { name: 'TypeScript', level: 4 },
      { name: 'React', level: 5 },
      { name: 'CSS Modules', level: 5 },
      { name: 'React Router', level: 3 },
      { name: 'React Hook Form', level: 3 },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', level: 2 },
      { name: 'Express', level: 2 },
      { name: 'PostgreSQL', level: 2 },
      { name: 'Prisma ORM', level: 2 },
      { name: 'REST API', level: 4 },
    ],
  },
  {
    label: 'Tools & Infra',
    items: [
      { name: 'Git / GitHub', level: 4 },
      { name: 'Vite', level: 3 },
      { name: 'npm workspaces', level: 3 },
      { name: 'Render', level: 3 },
      { name: 'Gemini AI', level: 3 },
      { name: 'Claude Code / AI-driven dev', level: 4 },
    ],
  },
]

function Dots({ level }: { level: number }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`${styles.dot} ${i < level ? styles.dotFilled : ''}`}
        />
      ))}
    </div>
  )
}

function Stack() {
  return (
    <section id="stack" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Tools of trade</p>
        <h2 className={styles.title}>Tech stack.</h2>
        <p className={styles.subtitle}>
          The technologies I reach for first — and the depth I've built over time.
        </p>

        <div className={styles.categories}>
          {stack.map((cat) => (
            <div key={cat.label} className={styles.category}>
              <p className={styles.catLabel}>{cat.label}</p>
              <div className={styles.items}>
                {cat.items.map((item) => (
                  <div key={item.name} className={styles.item}>
                    <span className={styles.itemName}>{item.name}</span>
                    <Dots level={item.level} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.banner}>
          <p className={styles.bannerText}>
            Always learning. Currently exploring AI integration and full-stack architecture.
          </p>
          <a href="#contact" className={styles.bannerBtn}>
            Let's build together
          </a>
        </div>

      </div>
    </section>
  )
}

export default Stack