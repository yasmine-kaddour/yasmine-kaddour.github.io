import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost, Geist_Mono } from 'next/font/google'
import './globals.css'

const siteUrl = 'https://yasmine-kaddour.github.io'
const siteTitle = 'Yasmine Kaddour — Wealth Management Apprenticeship'
const siteDescription =
  'Luxury real estate professional seeking an apprenticeship in wealth management on the French Riviera.'
const ogImage = '/og-image.png'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: 'Yasmine Kaddour CV',
  authors: [{ name: 'Yasmine Kaddour' }],
  creator: 'Yasmine Kaddour',
  publisher: 'Yasmine Kaddour',
  keywords: [
    'Yasmine Kaddour',
    'wealth management apprenticeship',
    'gestion de patrimoine alternance',
    'luxury real estate',
    'Cannes',
    'French Riviera',
    'curriculum vitae',
    'CV',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Yasmine Kaddour CV',
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Yasmine Kaddour — Wealth Management Apprenticeship',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f2ea' },
    { media: '(prefers-color-scheme: dark)', color: '#10161c' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${cormorant.variable} ${jost.variable} ${geistMono.variable} `}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
