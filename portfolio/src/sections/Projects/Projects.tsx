import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './Projects.module.css'
import ProjectCard from './ProjectCard'
import { projects } from './projects.data'
import useCarousel from '@/hooks/useCarousel'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

const COUNT = projects.length

function Projects() {
  const reducedMotion = usePrefersReducedMotion()

  const {
    viewportRef,
    trackRef,
    x,
    progress,
    activeIndex,
    slideWidth,
    goTo,
    onKeyDown,
    onDragStart,
    onDragEnd,
    dragConstraints,
  } = useCarousel({ count: COUNT, reducedMotion })

  // Reduced-motion fallback: a native scroll-snap track. The active card is
  // whichever one is most visible inside it.
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [staticActive, setStaticActive] = useState(0)

  useEffect(() => {
    if (!reducedMotion) return
    const root = viewportRef.current
    if (!root) return

    const io = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!mostVisible) return
        const idx = cardRefs.current.findIndex((el) => el === mostVisible.target)
        if (idx !== -1) setStaticActive(idx)
      },
      { root, threshold: [0.5, 0.75, 1] }
    )

    cardRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [reducedMotion, viewportRef])

  const active = reducedMotion ? staticActive : activeIndex

  const handleGoTo = useCallback(
    (index: number) => {
      const clamped = Math.min(COUNT - 1, Math.max(0, index))
      if (reducedMotion) {
        cardRefs.current[clamped]?.scrollIntoView({ inline: 'center', block: 'nearest' })
      } else {
        goTo(clamped)
      }
    },
    [reducedMotion, goTo]
  )

  const handleProgressClick = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const fraction = (e.clientX - rect.left) / rect.width
      handleGoTo(Math.round(fraction * (COUNT - 1)))
    },
    [handleGoTo]
  )

  const handleProgressKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleGoTo(active + 1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handleGoTo(active - 1)
      }
    },
    [handleGoTo, active]
  )

  // Custom "Drag" / "View →" cursor — desktop pointer only.
  const [isTouch] = useState(() => window.matchMedia('(pointer: coarse)').matches)
  const showCustomCursor = !isTouch && !reducedMotion
  const [cursorVisible, setCursorVisible] = useState(false)
  const [cursorLabel, setCursorLabel] = useState<'drag' | 'view'>('drag')
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const cursorSpringX = useSpring(cursorX, { stiffness: 300, damping: 30 })
  const cursorSpringY = useSpring(cursorY, { stiffness: 300, damping: 30 })

  const handlePointerMove = useCallback(
    (e: ReactMouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    },
    [cursorX, cursorY]
  )

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.grainOverlay} aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="projectsGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#projectsGrain)" />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <div>
            <p className={`${styles.label} reveal`}>Selected work</p>
            <h2 id="projects-title" className={`${styles.title} reveal`}>
              Things I&apos;ve built.
            </h2>
            <p className={`${styles.subtitle} reveal`}>
              End-to-end full-stack products: from conceptual ideas to fully functional, live applications
            </p>
          </div>

          <div className={`${styles.counter} reveal`} aria-live="polite">
            <span className={styles.counterActiveWrap}>
              <AnimatePresence initial={false}>
                <motion.span
                  key={active}
                  className={styles.counterActive}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
                >
                  {String(active + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className={styles.counterTotal}>/ {String(COUNT).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div
        className={`${styles.viewport} ${showCustomCursor ? styles.viewportNoCursor : ''}`}
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => showCustomCursor && setCursorVisible(true)}
        onMouseLeave={() => showCustomCursor && setCursorVisible(false)}
        onMouseMove={showCustomCursor ? handlePointerMove : undefined}
      >
        {reducedMotion ? (
          <div className={styles.staticTrack}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                total={COUNT}
                isActive={index === staticActive}
                reducedMotion
                x={x}
                slideWidth={slideWidth}
                articleRef={(el) => {
                  cardRefs.current[index] = el
                }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className={styles.track}
            ref={trackRef}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            style={{ x }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                total={COUNT}
                isActive={index === activeIndex}
                reducedMotion={false}
                x={x}
                slideWidth={slideWidth}
                onImageHoverChange={(hovering) => setCursorLabel(hovering ? 'view' : 'drag')}
              />
            ))}
          </motion.div>
        )}

        {showCustomCursor && (
          <motion.div
            className={styles.cursor}
            style={{
              x: cursorSpringX,
              y: cursorSpringY,
              opacity: cursorVisible ? 1 : 0,
              scale: cursorVisible ? 1 : 0.6,
            }}
          >
            {cursorLabel === 'view' ? 'View →' : 'Drag'}
          </motion.div>
        )}
      </div>

      <div className={styles.inner}>
        <div
          className={styles.progressBar}
          onClick={handleProgressClick}
          onKeyDown={handleProgressKeyDown}
          role="slider"
          aria-label="Carousel progress"
          aria-valuemin={1}
          aria-valuemax={COUNT}
          aria-valuenow={active + 1}
          tabIndex={0}
        >
          {reducedMotion ? (
            <div
              className={styles.progressFill}
              style={{ transform: `scaleX(${COUNT > 1 ? active / (COUNT - 1) : 1})` }}
            />
          ) : (
            <motion.div className={styles.progressFill} style={{ scaleX: progress }} />
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects
