import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  return <Tag className={cn(className)}>{children}</Tag>
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
