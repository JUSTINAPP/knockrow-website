import type { Metadata } from 'next'
import { Cormorant, Jost } from 'next/font/google'
import './globals.css'
import AgeGate from '@/components/AgeGate'

// Placeholder font pairing — matches the Volpino build's typographic voice
// (serif italic display + light tracked sans). Swap for Knockrow's real
// brand fonts if/when they have them.
const display = Cormorant({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const sans = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Knockrow Distillers',
    default: 'Knockrow Distillers',
  },
  description: 'Small batch spirits, distilled on the coast.',
  metadataBase: new URL('https://www.knockrow.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <AgeGate />
        {children}
      </body>
    </html>
  )
}
