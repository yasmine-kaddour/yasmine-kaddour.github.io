'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import { useCv } from './cv-context'
import { Reveal } from './section'

export function Contact() {
  const { data } = useCv()
  const p = data.personal_information
  const year = new Date().getFullYear()

  const items = [
    {
      icon: Mail,
      label: data.ui.email_label,
      value: p.email,
      href: `mailto:${p.email}`,
    },
    {
      icon: Phone,
      label: data.ui.phone_label,
      value: p.phone,
      href: `tel:${p.phone.replace(/\s+/g, '')}`,
    },
    {
      icon: MapPin,
      label: data.ui.address_label,
      value: p.address,
      href: null,
    },
  ]

  return (
    <footer
      id="contact"
      className="border-t border-border bg-secondary/40 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <span className="font-mono text-xs tracking-[0.3em] text-gold">
            06
          </span>
          <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-6xl text-balance">
            {data.ui.contact_label}
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
            {data.ui.contact_intro}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <Icon className="h-5 w-5 text-gold" />
                <span className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </span>
                <span className="mt-1 font-heading text-lg text-foreground break-words">
                  {value}
                </span>
              </>
            )
            return href ? (
              <a
                key={label}
                href={href}
                className="flex flex-col bg-card p-7 transition-colors hover:bg-accent/60"
              >
                {inner}
              </a>
            ) : (
              <div key={label} className="flex flex-col bg-card p-7">
                {inner}
              </div>
            )
          })}
        </Reveal>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-heading text-lg tracking-[0.15em] text-foreground">
            {p.full_name}
            <span className="ml-2 text-gold">•</span>
          </p>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {data.ui.footer_note} · {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
