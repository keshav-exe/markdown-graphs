import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"

import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { ThemeProvider } from "@/components/theme-provider"
import { accentBlockingScript, DEFAULT_ACCENT_ID } from "@/lib/accent"
import { getGithubStars } from "@/lib/github"
import { cn } from "@/lib/utils"

import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Markdown Graphs",
    template: "%s · Markdown Graphs",
  },
  description:
    "Copy-paste graphs for MDX. Dashed frames, one accent, source in your repo.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const stars = await getGithubStars()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-accent={DEFAULT_ACCENT_ID}
      className={cn(
        "dark antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans"
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentBlockingScript() }} />
      </head>
      <body>
        <ThemeProvider>
          <a
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:px-3 focus:py-2 focus:text-foreground"
            href="#main"
          >
            Skip to content
          </a>
          <div className="isolate flex min-h-dvh flex-col">
            <SiteHeader stars={stars} />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
