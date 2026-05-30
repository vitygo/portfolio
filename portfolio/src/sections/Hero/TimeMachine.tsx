import styles from './TimeMachine.module.css'

export type Era = 'modern' | 'flat' | 'web2' | 'early' | 'geocities'

type EraConfig = {
  year: string
  label: string
}

export const ERAS: Record<Era, EraConfig> = {
  modern:    { year: '2026', label: 'Modern' },
  flat:      { year: '2015', label: 'Flat Design' },
  web2:      { year: '2008', label: 'Web 2.0' },
  early:     { year: '2000', label: 'Early Web' },
  geocities: { year: '1996', label: 'GeoCities' },
}

const ERA_ORDER: Era[] = ['geocities', 'early', 'web2', 'flat', 'modern']

type Props = {
  era: Era
  onChange: (era: Era) => void
}

function TimeMachine({ era, onChange }: Props) {
  const index = ERA_ORDER.indexOf(era)

  return (
    <div className={styles.wrap}>
      <div className={styles.labels}>
        <span>1996</span>
        <span>2000</span>
        <span>2008</span>
        <span>2015</span>
        <span>2024</span>
      </div>
      <div className={styles.sliderWrap}>
        <input
          type="range"
          min={0}
          max={4}
          step={1}
          value={index}
          onChange={e => onChange(ERA_ORDER[parseInt(e.target.value)])}
          className={styles.slider}
        />
      </div>
      <div className={styles.badge}>
        {ERAS[era].year} — {ERAS[era].label}
      </div>
    </div>
  )
}

export default TimeMachine