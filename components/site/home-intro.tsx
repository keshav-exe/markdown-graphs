import Link from "next/link"

import { SiteContainer } from "@/components/site/container"
import {
  HOME_INSTALL,
  HOME_NEXT,
  HOME_READ,
  HOME_WHAT,
  HOME_WRITE,
} from "@/lib/agent/copy"

function HomeIntro() {
  return (
    <section>
      <SiteContainer className="flex flex-col gap-8">
        <article className="flex max-w-[56ch] min-w-0 flex-col gap-6 text-pretty">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-balance">
              What this is
            </h2>
            <p className="text-muted-foreground">{HOME_WHAT}</p>
            <p className="text-muted-foreground">{HOME_WRITE}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">Write</h3>
            <p className="text-muted-foreground">
              Install the skill into the folder the agent already reads. Ask for
              a write-up. The chooser picks the graph. Copy the props from the{" "}
              <Link
                className="text-foreground underline-offset-4 hover:underline"
                href="/docs"
              >
                docs
              </Link>{" "}
              or a recipe, then swap the labels.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">Read</h3>
            <p className="text-muted-foreground">{HOME_READ}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold tracking-tight">Install</h3>
            <pre className="min-w-0 overflow-x-auto font-mono text-sm text-foreground">
              <code>{HOME_INSTALL}</code>
            </pre>
            <p className="text-muted-foreground">{HOME_NEXT}</p>
          </div>
        </article>
      </SiteContainer>
    </section>
  )
}

export { HomeIntro }
