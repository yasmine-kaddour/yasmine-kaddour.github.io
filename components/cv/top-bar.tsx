'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useCv } from './cv-context'

export function TopBar() {
  const { data, lang, toggleLang, theme, toggleTheme } = useCv()
  const { nav } = data.ui
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#profile', label: nav.profile },
    { href: '#experience', label: nav.experience },
    { href: '#education', label: nav.education },
    { href: '#skills', label: nav.skills },
    { href: '#contact', label: nav.contact },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className="font-heading text-lg font-semibold tracking-[0.18em] text-foreground"
          aria-label={data.personal_information.full_name}
        >
          YK
          <span className="ml-2 align-middle text-gold">•</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-sans text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-border px-3 py-1.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold hover:text-gold"
            aria-label={`Switch language to ${lang === 'en' ? 'French' : 'English'}`}
          >
            {data.ui.lang_toggle}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
