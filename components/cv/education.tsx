'use client'

import { useCv } from './cv-context'
import { Reveal, SectionHeading } from './section'

export function Education() {
  const { data } = useCv()
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <Reveal>
        <SectionHeading
          id="education"
          index="03"
          title={data.ui.education_label}
        />
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-3">
        {data.education.map((ed, i) => (
          <Reveal
            as="article"
            key={`${ed.institution}-${i}`}
            delay={i * 90}
            className="flex flex-col bg-card p-6 transition-colors hover:bg-accent/50"
          >
            <span className="font-mono text-xs tracking-[0.15em] text-gold">
              {ed.start_year} — {ed.end_year}
            </span>
            <h3 className="mt-3 font-heading text-xl font-semibold leading-snug text-foreground text-balance">
              {ed.degree}
            </h3>
            <p className="mt-2 font-sans text-sm text-foreground/90">
              {ed.institution}
            </p>
            <p className="font-sans text-sm text-muted-foreground">
              {ed.location}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
