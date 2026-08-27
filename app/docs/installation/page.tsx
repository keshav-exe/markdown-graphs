import type { Metadata } from "next"

import { Command, InstallCommand } from "@/components/docs/install"
import { NamespaceSetup } from "@/components/docs/namespace"

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Add markdown graphs with the shadcn CLI, or copy the files by hand.",
}

export default function InstallationPage() {
  return (
    <div className="flex max-w-[65ch] flex-col gap-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Installation
        </h1>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          These are source files, not an npm package. You need a shadcn project
          and <code className="font-mono">motion</code>.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">One component</h2>
        <p className="text-pretty text-muted-foreground">
          Point the CLI at this origin, or copy the files from GitHub.
        </p>
        <InstallCommand name="graph-table" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Everything</h2>
        <p className="text-pretty text-muted-foreground">
          Pulls every graph plus the frame primitives into{" "}
          <code className="font-mono">registry/default</code>.
        </p>
        <InstallCommand name="all" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Namespace</h2>
        <p className="text-pretty text-muted-foreground">
          Add the registry once, then install by name.
        </p>
        <NamespaceSetup />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Import</h2>
        <p className="text-pretty text-muted-foreground">
          Files land under <code className="font-mono">@/registry</code>. Point
          your own barrel at them if you want a shorter path.
        </p>
        <Command
          label="Import"
          value={`import { GraphTable } from "@/registry/default/graph-table/graph-table"`}
        />
      </section>
    </div>
  )
}
