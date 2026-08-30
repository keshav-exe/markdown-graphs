import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { SiteFooter } from "@/components/site/footer"
import { SiteHeader } from "@/components/site/header"
import { DesktopHint } from "@/components/site/desktop-hint"
import { SiteToaster } from "@/components/site/toast"
import { ThemeProvider } from "@/components/theme-provider"
import { accentBlockingScript, DEFAULT_ACCENT_ID } from "@/lib/accent"
import { getGithubStars } from "@/lib/github"
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_NAME_SHORT,
  SITE_TWITTER,
  SITE_URL,
} from "@/lib/site"
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME_SHORT,
  authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
  creator: SITE_AUTHOR.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME_SHORT,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE_TWITTER,
  },
  robots: {
    index: true,
    follow: true,
  },
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
      data-accent-kind="gradient"
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
            <DesktopHint />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <SiteToaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
