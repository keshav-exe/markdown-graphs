import Link from "next/link"

import { GraphFlow } from "@/components/graphs"
import { Button } from "@/components/ui/button"
import { SiteContainer } from "@/components/site/container"

function AgentsSection() {
  return (
    <section>
      <SiteContainer className="flex flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="max-w-[20ch] text-2xl font-semibold tracking-tight text-balance">
                For agents
              </h2>
              <p className="max-w-[48ch] text-pretty text-muted-foreground">
                The figure lives in the file — JSX the agent writes, ASCII it
                can read back. No SVG, no homemade fence.
              </p>
              <p className="max-w-[48ch] text-pretty text-muted-foreground">
                A skill file picks the graph. Recipes give it real props.{" "}
                <code className="font-mono">/llms.txt</code> is the chooser plus
                the twins if the skill is not installed.
              </p>
            </div>
            <Button nativeButton={false} render={<Link href="/agents" />}>
              How agents use this
            </Button>
          </div>
          <GraphFlow
            rows={[
              {
                nodes: [
                  { label: "write-up" },
                  { label: "chooser" },
                  { label: "JSX or twin", tone: "accent" },
                ],
              },
              {
                nodes: [
                  { label: "open the file" },
                  { label: "read the frame" },
                  { label: "edit labels", tone: "accent" },
                ],
              },
            ]}
            title="LOOP"
          />
        </div>
      </SiteContainer>
    </section>
  )
}

export { AgentsSection }
