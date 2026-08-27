import Link from "next/link"

import { SiteContainer } from "@/components/site/container"
import { GITHUB_URL } from "@/lib/github"

function SiteFooter() {
  return (
    <footer className="py-12 sm:py-16">
      <SiteContainer className="flex flex-col gap-8">
        <div className="graph-rule" />
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Link className="text-foreground" href="/">
            markdown graphs
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-6" role="list">
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="/docs"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="/docs/installation"
                >
                  Installation
                </Link>
              </li>
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href={GITHUB_URL}
                  rel="noreferrer"
                >
                  Source
                </a>
              </li>
              <li>
                <a
                  className="font-normal text-muted-foreground hover:text-foreground"
                  href="https://x.com/kshvbgde"
                  rel="noreferrer"
                >
                  X
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          Open source. Copy the files. One accent.
        </p>
      </SiteContainer>
    </footer>
  )
}

export { SiteFooter }
