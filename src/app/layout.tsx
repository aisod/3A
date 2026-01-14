import './globals.css'

export const metadata = {
  title: 'AISOD 3A - Namibia\'s #1 AI Assistant',
  description: 'Meet 3A - AISOD\'s AI assistant that develops AI, automates processes, and solves real problems. Transform your business, advance your career, or automate operations with AISOD 3A.',
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
