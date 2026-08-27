import type { ReactNode } from "react"

import { DocsMobileNav, DocsSidebar } from "@/components/docs/nav"
import { SiteContainer } from "@/components/site/container"

function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="sticky top-14 z-30 border-b border-border bg-background sm:top-16 lg:hidden">
        <SiteContainer className="py-2">
          <DocsMobileNav />
        </SiteContainer>
      </div>
      <SiteContainer className="flex min-w-0 gap-8 lg:gap-12">
        <DocsSidebar />
        <main
          className="min-w-0 flex-1 py-8 text-base sm:py-10 sm:text-sm"
          id="main"
        >
          {children}
        </main>
      </SiteContainer>
    </div>
  )
}

export default DocsLayout
