'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import cvEn from '@/data/cv.json'
import cvFr from '@/data/cv_fr.json'

export type CvData = typeof cvEn
export type Lang = 'en' | 'fr'
export type Theme = 'light' | 'dark'

type CvContextValue = {
  data: CvData
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  theme: Theme
  toggleTheme: () => void
}

const CvContext = createContext<CvContextValue | null>(null)

const dictionaries: Record<Lang, CvData> = {
  en: cvEn as CvData,
  fr: cvFr as CvData,
}

const themeStorageKey = 'cv-theme-v2'

export function CvProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [theme, setTheme] = useState<Theme>('dark')

  // Restore preferences; the deep blue theme is the default.
  useEffect(() => {
    const storedLang = localStorage.getItem('cv-lang') as Lang | null
    const storedTheme = localStorage.getItem(themeStorageKey) as Theme | null
    if (storedLang === 'en' || storedLang === 'fr') setLangState(storedLang)
    setTheme(storedTheme === 'light' ? 'light' : 'dark')
  }, [])

  // Apply theme + html lang
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('cv-lang', lang)
  }, [lang])

  const setLang = (l: Lang) => setLangState(l)
  const toggleLang = () => setLangState((p) => (p === 'en' ? 'fr' : 'en'))
  const toggleTheme = () => setTheme((p) => (p === 'light' ? 'dark' : 'light'))

  return (
    <CvContext.Provider
      value={{
        data: dictionaries[lang],
        lang,
        setLang,
        toggleLang,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CvContext.Provider>
  )
}

export function useCv() {
  const ctx = useContext(CvContext)
  if (!ctx) throw new Error('useCv must be used within CvProvider')
  return ctx
}
