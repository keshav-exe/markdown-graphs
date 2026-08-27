import Link from "next/link"

import { SiteContainer } from "@/components/site/container"
import { LogoMark } from "@/components/site/logo"

function SiteFooter() {
  return (
    <footer className="py-12 sm:py-16">
      <SiteContainer className="flex flex-col gap-8">
        <div className="graph-rule" />
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Link
            aria-label="Homepage"
            className="flex items-center gap-2.5 text-foreground"
            href="/"
          >
            <LogoMark className="size-5" />
            <span>markdown graphs</span>
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6" role="list">
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="#library"
                >
                  Library
                </a>
              </li>
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="#usage"
                >
                  Usage
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          Built for MDX. One accent. Typed, not drawn.
        </p>
      </SiteContainer>
    </footer>
  )
}

export { SiteFooter }
