import Link from "next/link"

import { GraphFunnel, GraphTable, GraphTree } from "@/components/graphs"
import { SiteContainer } from "@/components/site/container"
import { Hero } from "@/components/site/hero"
import { Principles } from "@/components/site/principles"

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <section className="py-12 sm:py-16">
        <SiteContainer className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="max-w-[35ch] text-2xl font-semibold tracking-tight text-balance">
              Same frame, every graph
            </h2>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              Copy one component, or take the set.
            </p>
          </div>
          <GraphTable
            align={["left", "right", "right", "right"]}
            footer={["Total", "437,141", "396", "~50m"]}
            headers={["Agent", "Tokens", "Tool calls", "Time"]}
            rows={[
              ["Inks and paper", "115,207", "120", "16m"],
              ["Overprint and drift", "135,218", "164", "16m"],
              ["Naming the patterns", "186,716", "112", "18m"],
            ]}
            title="WHAT THE RESEARCH COST"
          />
          <p>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs/graph-table"
            >
              Open table docs
            </Link>
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <GraphTree
              nodes={[
                {
                  label: "registry/default",
                  children: [
                    {
                      label: "graph-frame",
                      children: [
                        { label: "graph-frame.tsx", meta: "ui" },
                        { label: "graph-motion.ts", meta: "lib" },
                      ],
                    },
                    {
                      label: "graph-tree",
                      children: [
                        {
                          label: "graph-tree.tsx",
                          meta: "ui",
                          accent: true,
                        },
                      ],
                    },
                  ],
                },
              ]}
              title="REGISTRY"
            />
            <GraphFunnel
              stage="ship"
              steps={[
                { label: "docs", value: 12400, display: "12,400" },
                { label: "copy", value: 4100, display: "4,100" },
                { label: "ship", value: 860, display: "860" },
              ]}
              title="INSTALL"
            />
          </div>
          <p>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/docs"
            >
              All components
            </Link>
          </p>
        </SiteContainer>
      </section>
      <Principles />
    </main>
  )
}
