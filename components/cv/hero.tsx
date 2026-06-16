'use client'

import Image from 'next/image'
import { MapPin, Mail, Phone } from 'lucide-react'
import { useCv } from './cv-context'

export function Hero() {
  const { data } = useCv()
  const p = data.personal_information

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Text */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {data.meta.available_badge}
          </span>

          <h1 className="mt-6 font-heading text-5xl font-semibold leading-[0.95] tracking-tight text-foreground text-balance md:text-7xl">
            {p.full_name}
          </h1>

          <p className="mt-4 font-heading text-xl italic text-gold md:text-2xl">
            {data.meta.title_role}
          </p>

          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">
            {data.cv_objective}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-sans text-sm text-foreground">
            <a
              href={`mailto:${p.email}`}
              className="group inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4 text-gold" />
              {p.email}
            </a>
            <a
              href={`tel:${p.phone.replace(/\s+/g, '')}`}
              className="group inline-flex items-center gap-2 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" />
              {p.phone}
            </a>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-gold" />
              {p.address}
            </span>
          </div>
        </div>

        {/* Photo */}
        <div className="animate-fade-in relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -left-3 -top-3 h-20 w-20 border-l border-t border-gold/60" />
          <div className="absolute -bottom-3 -right-3 h-20 w-20 border-b border-r border-gold/60" />
          <div className="relative overflow-hidden rounded-sm bg-muted shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
            <Image
              src="/profile-pic.jpg"
              alt={`Portrait of ${p.full_name}`}
              width={900}
              height={1200}
              priority
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
          </div>
        </div>
      </div>
    </section>
  )
}
