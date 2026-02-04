import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stárnutí populace ČR | Ordinační TAXI',
  description: 'Vizualizace demografických dat UZIS ČR ukazující rostoucí potřebu dopravy seniorů k lékařům',
  keywords: 'senioři, stárnutí populace, doprava seniorů, Ordinační TAXI, UZIS, zdravotní péče',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
