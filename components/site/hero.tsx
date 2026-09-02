import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SiteContainer } from "@/components/site/container"
import { HeroSponsorPanel } from "@/components/site/hero-sponsor-panel"
import { SITE_DESCRIPTION } from "@/lib/site"

function Hero() {
  return (
    <section>
      <SiteContainer borderTop={false} className="py-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex min-w-0 flex-col items-start gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-mono tracking-wide text-graph-muted uppercase">
                For agents · MDX
              </p>
              <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Markdown Graphs
              </h1>
              <p className="max-w-[48ch] text-pretty text-muted-foreground">
                {SITE_DESCRIPTION} A skill so the agent picks a component
                instead of drawing SVG.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button nativeButton={false} render={<Link href="/agents" />}>
                For agents
              </Button>
              <Button
                nativeButton={false}
                render={<Link href="/docs/installation" />}
                variant="outline"
              >
                Install
              </Button>
            </div>
          </div>
          <HeroSponsorPanel />
        </div>
      </SiteContainer>
    </section>
  )
}

export { Hero }
