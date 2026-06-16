'use client'

import { useCv } from './cv-context'
import { Reveal, SectionHeading } from './section'

export function Profile() {
  const { data } = useCv()
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
      <Reveal>
        <SectionHeading id="profile" index="01" title={data.ui.profile_label} />
      </Reveal>
      <Reveal delay={120}>
        <p className=" font-heading text-2xl font-light leading-snug text-foreground text-pretty md:text-2xl">
          {data.professional_profile}
        </p>
      </Reveal>
    </section>
  )
}
