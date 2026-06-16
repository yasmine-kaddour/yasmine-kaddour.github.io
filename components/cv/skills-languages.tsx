'use client'

import { useCv } from './cv-context'
import { Reveal, SectionHeading } from './section'

export function SkillsLanguages() {
  const { data } = useCv()
  return (
    <>
      {/* Area of expertise */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionHeading id="skills" index="04" title={data.ui.skills_label} />
        </Reveal>

        <ul className="grid gap-x-12 gap-y-3 lg:grid-cols-2">
          {data.skills.map((s, i) => (
            <Reveal
              as="li"
              key={i}
              delay={(i % 2) * 70}
              className="flex items-start gap-3 border-b border-border/60 pb-3 font-sans text-sm leading-relaxed text-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
              {s}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Languages */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <SectionHeading
            id="languages"
            index="05"
            title={data.ui.languages_label}
          />
        </Reveal>

        <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.languages.map((l, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 70}>
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-xl text-foreground">
                  {l.language}
                </span>
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-gold">
                  {l.level}
                </span>
              </div>
              <span className="mt-3 block h-px w-full bg-border" />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  )
}
