import { motion, useTransform, type MotionValue } from 'framer-motion'
import styles from './Projects.module.css'
import useMagnetic from '@/hooks/useMagnetic'
import type { Project } from './projects.data'

interface ProjectCardProps {
  project: Project
  index: number
  total: number
  isActive: boolean
  reducedMotion: boolean
  x: MotionValue<number>
  slideWidth: number
  articleRef?: (el: HTMLElement | null) => void
  onImageHoverChange?: (hovering: boolean) => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

const maskVariants = {
  inactive: { clipPath: 'inset(0 100% 0 0)' },
  active: { clipPath: 'inset(0 0% 0 0)' },
}

const scaleVariants = {
  inactive: { scale: 1.02 },
  active: { scale: 1 },
}

const revealTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  )
}

function ProjectCard({
  project,
  index,
  total,
  isActive,
  reducedMotion,
  x,
  slideWidth,
  articleRef,
  onImageHoverChange,
}: ProjectCardProps) {
  const liveRef = useMagnetic<HTMLAnchorElement>(0.4, 30)
  const githubRef = useMagnetic<HTMLAnchorElement>(0.4, 30)

  const distance = useTransform(x, (latest) => {
    if (!slideWidth) return index === 0 ? 0 : index
    return (latest + index * slideWidth) / slideWidth
  })
  const cardScale = useTransform(distance, (d) => clamp(1 - Math.abs(d) * 0.15, 0.85, 1))
  const cardOpacity = useTransform(distance, (d) => clamp(1 - Math.abs(d) * 0.6, 0, 1))
  const imgX = useTransform(distance, (d) => clamp(d * -20, -20, 20))

  return (
    <motion.article
      ref={articleRef}
      className={styles.card}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
      aria-current={isActive ? 'true' : undefined}
      inert={!isActive}
      style={!reducedMotion ? { scale: cardScale, opacity: cardOpacity } : undefined}
    >
      <div className={styles.visual}>
        <motion.div
          className={styles.visualMask}
          variants={!reducedMotion ? maskVariants : undefined}
          initial="inactive"
          animate={isActive ? 'active' : 'inactive'}
          transition={revealTransition}
        >
          <motion.img
            src={project.image}
            alt=""
            className={styles.visualImg}
            style={!reducedMotion ? { x: imgX } : undefined}
            variants={!reducedMotion ? scaleVariants : undefined}
            initial="inactive"
            animate={isActive ? 'active' : 'inactive'}
            transition={revealTransition}
            onMouseEnter={() => onImageHoverChange?.(true)}
            onMouseLeave={() => onImageHoverChange?.(false)}
          />
        </motion.div>
      </div>

      <p className={styles.cardNumber}>{project.number}</p>
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDesc}>{project.description}</p>

      <div className={styles.tags}>
        <span className={`${styles.tag} ${styles.tagAloe}`}>{project.status}</span>
        {project.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.cardLinks}>
        {project.liveUrl && (
          <a
            ref={liveRef}
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.cardLink}
            tabIndex={isActive ? 0 : -1}
          >
            Live demo
            <ArrowIcon />
          </a>
        )}
        {project.githubUrl && (
          <a
            ref={githubRef}
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.cardLink}
            tabIndex={isActive ? 0 : -1}
          >
            GitHub
            <ArrowIcon />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default ProjectCard
