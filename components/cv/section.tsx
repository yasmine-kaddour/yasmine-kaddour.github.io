'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({
  index,
  title,
  id,
}: {
  index: string
  title: string
  id?: string
}) {
  return (
    <div id={id} className="mb-10 flex items-end gap-4 scroll-mt-24">
      <span className="font-mono text-xs tracking-[0.3em] text-gold">
        {index}
      </span>
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
        {title}
      </h2>
      <span className="mb-2 h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  )
}
