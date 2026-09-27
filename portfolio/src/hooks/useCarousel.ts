import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { animate, useMotionValue, useTransform, type PanInfo } from 'framer-motion'

interface UseCarouselOptions {
  count: number
  reducedMotion: boolean
}

const SPRING = { type: 'spring' as const, stiffness: 200, damping: 30 }

function useCarousel({ count, reducedMotion }: UseCarouselOptions) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)

  const x = useMotionValue(0)
  const progress = useTransform(x, (latest) => {
    if (!slideWidth || count <= 1) return 0
    const raw = -latest / (slideWidth * (count - 1))
    return Math.min(1, Math.max(0, raw))
  })

  const isDragging = useRef(false)
  const wheelTimeout = useRef<number | undefined>(undefined)

  // Kept in refs so the native wheel listener (attached once) always sees fresh values.
  const slideWidthRef = useRef(slideWidth)
  useEffect(() => {
    slideWidthRef.current = slideWidth
  }, [slideWidth])

  useEffect(() => {
    const track = trackRef.current
    const firstSlide = track?.children[0] as HTMLElement | undefined
    if (!track || !firstSlide) return

    function measure() {
      const style = getComputedStyle(track!)
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0
      setSlideWidth(firstSlide!.getBoundingClientRect().width + gap)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(firstSlide)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [count])

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.min(count - 1, Math.max(0, index))
      setActiveIndex(clamped)
      if (!slideWidthRef.current) return
      animate(x, -clamped * slideWidthRef.current, reducedMotion ? { duration: 0 } : SPRING)
    },
    [count, x, reducedMotion]
  )
  const goToRef = useRef(goTo)
  useEffect(() => {
    goToRef.current = goTo
  }, [goTo])

  // Re-settle on the active slide when the track is resized (unless mid-drag).
  useEffect(() => {
    if (isDragging.current) return
    x.set(-activeIndex * slideWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideWidth])

  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex])
  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex])

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(count - 1)
      }
    },
    [next, prev, goTo, count]
  )

  const onDragStart = useCallback(() => {
    isDragging.current = true
  }, [])

  const onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      isDragging.current = false
      if (!slideWidthRef.current) return
      const projected = x.get() + info.velocity.x * 0.2
      const target = Math.round(-projected / slideWidthRef.current)
      goTo(target)
    },
    [goTo, x]
  )

  // Horizontal wheel/trackpad navigation — only hijacks genuinely horizontal
  // gestures so vertical page scroll over the carousel is left alone.
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    function handleWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      if (Math.abs(e.deltaX) < 1) return
      e.preventDefault()
      x.set(x.get() - e.deltaX)
      window.clearTimeout(wheelTimeout.current)
      wheelTimeout.current = window.setTimeout(() => {
        if (!slideWidthRef.current) return
        const target = Math.round(-x.get() / slideWidthRef.current)
        goToRef.current(target)
      }, 120)
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [x])

  const dragConstraints = useMemo(
    () => ({ left: -(count - 1) * slideWidth, right: 0 }),
    [count, slideWidth]
  )

  return {
    viewportRef,
    trackRef,
    x,
    progress,
    activeIndex,
    slideWidth,
    goTo,
    next,
    prev,
    onKeyDown,
    onDragStart,
    onDragEnd,
    dragConstraints,
  }
}

export default useCarousel
