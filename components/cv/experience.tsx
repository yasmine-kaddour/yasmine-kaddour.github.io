'use client'

import { useCv } from './cv-context'
import { Reveal, SectionHeading } from './section'

export function Experience() {
  const { data } = useCv()
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <Reveal>
        <SectionHeading
          id="experience"
          index="02"
          title={data.ui.experience_label}
        />
      </Reveal>

      <ol className="relative ml-1 border-l border-border pl-8 md:pl-12">
        {data.professional_experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${i}`} delay={i * 80} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[2.15rem] top-1.5 flex h-3.5 w-3.5 items-center justify-center md:-left-[3.15rem]">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-gold" />
            </span>

            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                {job.position}
              </h3>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
                {job.start_date} — {job.end_date}
              </span>
            </div>

            <p className="mt-1 font-sans text-sm font-medium tracking-wide text-foreground/90">
              {job.company}
              <span className="text-muted-foreground"> · {job.location}</span>
            </p>

            <ul className="mt-4 space-y-2">
              {job.responsibilities.map((r, j) => (
                <li
                  key={j}
                  className="flex gap-3 font-sans text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
