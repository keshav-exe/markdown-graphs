import type { ReactNode } from "react"

import { DocsMobileNav, DocsSidebar } from "@/components/docs/nav"
import { SiteContainer } from "@/components/site/container"

function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="border-b border-border lg:hidden dark:border-border">
        <SiteContainer className="py-3">
          <DocsMobileNav />
        </SiteContainer>
      </div>
      <SiteContainer className="flex gap-8 lg:gap-12">
        <DocsSidebar />
        <main className="min-w-0 flex-1 py-10 text-base sm:text-sm" id="main">
          {children}
        </main>
      </SiteContainer>
    </div>
  )
}

export default DocsLayout
