'use client'

import { CvProvider } from './cv-context'
import { ScrollProgress } from './scroll-progress'
import { TopBar } from './top-bar'
import { Hero } from './hero'
import { Profile } from './profile'
import { Experience } from './experience'
import { Education } from './education'
import { SkillsLanguages } from './skills-languages'
import { Contact } from './contact'

export function CvSite() {
  return (
    <CvProvider>
      <div className="min-h-dvh">
        <ScrollProgress />
        <TopBar />
        <main>
          <Hero />
          <Profile />
          <Experience />
          <Education />
          <SkillsLanguages />
        </main>
        <Contact />
      </div>
    </CvProvider>
  )
}
