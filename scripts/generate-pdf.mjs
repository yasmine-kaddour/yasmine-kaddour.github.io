// Build-time CV → PDF generator.
//
// Renders a one-page A4 résumé for every language in `data/` using the same
// fonts (Cormorant Garamond + Jost) and the site's light "couture luxury"
// palette, then prints it to `public/cv-<lang>.pdf` with headless Chromium so
// the static export can serve the files directly.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import puppeteer from 'puppeteer'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const sources = [
  { lang: 'en', file: 'data/cv.json' },
  { lang: 'fr', file: 'data/cv_fr.json' },
]

// Mirrors the site's `:root` (light) and `.dark` palettes from app/globals.css
// so each exported PDF matches the theme the visitor is viewing.
const themes = {
  light: {
    background: 'oklch(0.972 0.012 86)',
    foreground: 'oklch(0.215 0.018 50)',
    muted: 'oklch(0.47 0.018 52)',
    gold: 'oklch(0.595 0.118 68)',
    border: 'oklch(0.865 0.016 80)',
  },
  dark: {
    background: 'oklch(0.155 0.022 256)',
    foreground: 'oklch(0.95 0.01 84)',
    muted: 'oklch(0.74 0.022 78)',
    gold: 'oklch(0.81 0.115 80)',
    border: 'oklch(0.85 0.06 82 / 16%)',
  },
}

function buildHtml(data, palette) {
  const p = data.personal_information
  const ui = data.ui

  const experience = data.professional_experience
    .map(
      (job) => `
        <article class="entry">
          <div class="entry-head">
            <h3>${escapeHtml(job.position)}</h3>
            <span class="dates">${escapeHtml(job.start_date)} — ${escapeHtml(job.end_date)}</span>
          </div>
          <p class="org">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</p>
          <ul>
            ${job.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
          </ul>
        </article>`,
    )
    .join('')

  const education = data.education
    .map(
      (ed) => `
        <article class="entry">
          <div class="entry-head">
            <h3>${escapeHtml(ed.degree)}</h3>
            <span class="dates">${escapeHtml(ed.start_year)}–${escapeHtml(ed.end_year)}</span>
          </div>
          <p class="org">${escapeHtml(ed.institution)} · ${escapeHtml(ed.location)}</p>
        </article>`,
    )
    .join('')

  const skills = data.skills
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join('')

  const languages = data.languages
    .map(
      (l) =>
        `<li><span>${escapeHtml(l.language)}</span><span class="level">${escapeHtml(l.level)}</span></li>`,
    )
    .join('')

  return `<!doctype html>
<html lang="${escapeHtml(data.meta.lang)}">
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --background: ${palette.background};
    --foreground: ${palette.foreground};
    --muted-foreground: ${palette.muted};
    --gold: ${palette.gold};
    --border: ${palette.border};
    --heading: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Jost', system-ui, sans-serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @page { size: A4; margin: 0; }
  html, body { background: var(--background); }
  body {
    width: 210mm;
    min-height: 297mm;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: var(--sans);
    font-weight: 300;
    color: var(--foreground);
    font-size: 8pt;
    line-height: 1.4;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  #sheet {
    width: 210mm;
    min-height: 297mm;
    padding: 13mm 14mm;
  }

  header { border-bottom: 1px solid var(--border); padding-bottom: 5mm; }
  .badge {
    display: inline-block;
    font-size: 6.5pt;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid color-mix(in oklch, var(--gold) 40%, transparent);
    border-radius: 999px;
    padding: 2px 9px;
    margin-bottom: 3mm;
  }
  h1 {
    font-family: var(--heading);
    font-weight: 600;
    font-size: 30pt;
    line-height: 0.95;
    letter-spacing: -0.01em;
  }
  .role {
    font-family: var(--heading);
    font-style: italic;
    font-size: 13pt;
    color: var(--gold);
    margin-top: 1.5mm;
  }
  .contact {
    margin-top: 3.5mm;
    display: flex;
    flex-wrap: wrap;
    gap: 2px 14px;
    font-size: 8pt;
    color: var(--muted-foreground);
  }
  .contact strong { color: var(--gold); font-weight: 500; margin-right: 4px; }

  .columns {
    display: grid;
    grid-template-columns: 1.55fr 1fr;
    gap: 9mm;
    margin-top: 5mm;
  }

  section { margin-bottom: 4.5mm; break-inside: avoid; }
  h2 {
    font-family: var(--sans);
    font-weight: 500;
    font-size: 7.5pt;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    padding-bottom: 1.5mm;
    margin-bottom: 2.5mm;
    border-bottom: 1px solid var(--border);
  }
  p.lead { color: var(--muted-foreground); text-align: justify; }

  .entry { margin-bottom: 3mm; break-inside: avoid; }
  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 6px;
  }
  .entry h3 {
    font-family: var(--heading);
    font-weight: 600;
    font-size: 11pt;
    line-height: 1.1;
  }
  .dates {
    font-size: 6.8pt;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted-foreground);
    white-space: nowrap;
  }
  .org { font-size: 8pt; color: var(--gold); margin: 0.5mm 0 1mm; }

  ul { list-style: none; }
  .entry li, .skills li {
    position: relative;
    padding-left: 3.5mm;
    margin-bottom: 0.6mm;
    color: var(--muted-foreground);
  }
  .entry li::before, .skills li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 3.2pt;
    width: 2.6pt;
    height: 2.6pt;
    background: var(--gold);
    transform: rotate(45deg);
  }
  .languages li {
    display: flex;
    justify-content: space-between;
    padding: 0.8mm 0;
    border-bottom: 1px dotted var(--border);
  }
  .languages .level { color: var(--gold); }
</style>
</head>
<body>
  <div id="sheet">
  <header>
    <span class="badge">${escapeHtml(data.meta.available_badge)}</span>
    <h1>${escapeHtml(p.full_name)}</h1>
    <p class="role">${escapeHtml(data.meta.title_role)}</p>
    <div class="contact">
      <span><strong>${escapeHtml(ui.email_label)}</strong>${escapeHtml(p.email)}</span>
      <span><strong>${escapeHtml(ui.phone_label)}</strong>${escapeHtml(p.phone)}</span>
      <span><strong>${escapeHtml(ui.address_label)}</strong>${escapeHtml(p.address)}</span>
    </div>
  </header>

  <div class="columns">
    <div class="col">
      <section>
        <h2>${escapeHtml(ui.objective_label)}</h2>
        <p class="lead">${escapeHtml(data.cv_objective)}</p>
      </section>
      <section>
        <h2>${escapeHtml(ui.profile_label)}</h2>
        <p class="lead">${escapeHtml(data.professional_profile)}</p>
      </section>
      <section>
        <h2>${escapeHtml(ui.experience_label)}</h2>
        ${experience}
      </section>
    </div>

    <div class="col">
      <section>
        <h2>${escapeHtml(ui.education_label)}</h2>
        ${education}
      </section>
      <section>
        <h2>${escapeHtml(ui.skills_label)}</h2>
        <ul class="skills">${skills}</ul>
      </section>
      <section>
        <h2>${escapeHtml(ui.languages_label)}</h2>
        <ul class="languages">${languages}</ul>
      </section>
    </div>
  </div>
  </div>
</body>
</html>`
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    for (const { lang, file } of sources) {
      const data = JSON.parse(await readFile(join(root, file), 'utf8'))

      for (const [theme, palette] of Object.entries(themes)) {
        const html = buildHtml(data, palette)

        const page = await browser.newPage()
        await page.setContent(html, { waitUntil: 'networkidle0' })
        await page.evaluateHandle('document.fonts.ready')

        // Shrink-to-fit: scale the body down just enough to keep it on one A4
        // page if the content would otherwise overflow.
        const scale = await page.evaluate(() => {
          const probe = document.createElement('div')
          probe.style.cssText =
            'position:absolute;height:100mm;visibility:hidden'
          document.body.appendChild(probe)
          const pxPerMm = probe.getBoundingClientRect().height / 100
          probe.remove()

          const sheet = document.getElementById('sheet')
          const pageHeightPx = 297 * pxPerMm
          const contentHeight = sheet.scrollHeight
          if (contentHeight <= pageHeightPx) return 1

          // `zoom` shrinks the sheet's layout height so it genuinely fits on
          // one page; the flex-centered body then splits the leftover width
          // evenly on both sides, keeping left/right margins equal.
          const factor = (pageHeightPx / contentHeight) * 0.99
          sheet.style.zoom = String(factor)
          return factor
        })

        const name = `cv-${lang}-${theme}.pdf`
        await page.pdf({
          path: join(root, 'public', name),
          format: 'A4',
          printBackground: true,
          preferCSSPageSize: true,
        })
        await page.close()

        const note = scale < 1 ? ` (scaled to ${(scale * 100).toFixed(1)}%)` : ''
        console.log(`✓ generated public/${name}${note}`)
      }
    }
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error('PDF generation failed:', err)
  process.exit(1)
})
