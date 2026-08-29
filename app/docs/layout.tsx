import type { ReactNode } from "react"

import { DocsMobileNav, DocsSidebar } from "@/components/docs/nav"
import { SiteCorners, SiteRule } from "@/components/site/corners"

function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate mx-auto flex w-full max-w-6xl min-w-0 flex-col">
      <SiteRule className="left-0" orientation="y" />
      <SiteRule className="right-0" orientation="y" />
      <div className="relative lg:hidden">
        <SiteRule className="bottom-0" />
        <SiteCorners corners={["bl", "br"]} />
        <div className="px-4 py-3 sm:px-6 lg:px-8">
          <DocsMobileNav />
        </div>
      </div>
      <div className="flex min-w-0">
        <DocsSidebar />
        <main
          className="min-w-0 flex-1 px-4 py-10 text-base sm:px-6 sm:text-sm lg:px-8"
          id="main"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DocsLayout
