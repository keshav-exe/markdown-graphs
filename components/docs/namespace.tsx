"use client"

import { Command } from "@/components/docs/install"
import { useOrigin } from "@/lib/docs/origin"

function NamespaceSetup() {
  const origin = useOrigin()
  const host = origin || "<origin>"
  const add = `pnpm dlx shadcn@latest registry add @markdown-graphs=${host}/r/{name}.json`

  return (
    <div className="flex flex-col gap-6">
      <Command label="CLI" value={add} />
      <div className="flex flex-col gap-2">
        <p className="font-mono tracking-wide text-graph-muted uppercase">
          components.json
        </p>
        <pre className="overflow-x-auto border border-border p-4 text-muted-foreground dark:border-border">
          <code>{`{
  "registries": {
    "@markdown-graphs": "${host}/r/{name}.json"
  }
}`}</code>
        </pre>
      </div>
      <Command
        label="Then"
        value="pnpm dlx shadcn@latest add @markdown-graphs/graph-table"
      />
    </div>
  )
}

export { NamespaceSetup }
