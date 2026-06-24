import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RexS — Automation Portfolio',
  description: 'Automation built for small teams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}