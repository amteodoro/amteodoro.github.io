import type { Metadata } from 'next'
import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

const archivoblack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo-black',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Afonso Teodoro - AI Consultant',
  description: 'PhD in Computer Science, AI Consultant specialized in Computer Vision and NLP.',
  openGraph: {
    title: 'Afonso Teodoro - AI Consultant',
    description: 'PhD in Computer Science, AI Consultant specialized in Computer Vision and NLP.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Afonso Teodoro - AI Consultant',
    description: 'PhD in Computer Science, AI Consultant specialized in Computer Vision and NLP.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivoblack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border-2 focus:border-foreground font-sans font-bold uppercase">Skip to content</a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
