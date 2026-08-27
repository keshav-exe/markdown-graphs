import type { Metadata } from "next"

import { CopyPage } from "@/components/docs/copy-page"
import { Command, InstallCommand } from "@/components/docs/install"
import { NamespaceSetup } from "@/components/docs/namespace"
import { JsonLd } from "@/components/seo/json-ld"
import { getComponent } from "@/lib/docs/catalog"
import { installationJsonLd, pageMeta } from "@/lib/seo"

export const metadata: Metadata = pageMeta({
  title: "Installation",
  description:
    "Add markdown graphs with the shadcn CLI, or copy the files by hand.",
  path: "/docs/installation",
})

const description =
  "These are source files, not an npm package. You need an existing shadcn project and the motion dependency."

const extra = `## One component

Run the shadcn CLI against this site's registry, or copy the files from GitHub.

pnpm dlx shadcn@latest add $ORIGIN/r/graph-table.json

## Everything

Installs every graph and the shared frame code into registry/default.

pnpm dlx shadcn@latest add $ORIGIN/r/all.json

## Namespace

Add the registry once in components.json, then install components by name.

pnpm dlx shadcn@latest registry add @markdown-graphs=$ORIGIN/r/{name}.json

Then:

pnpm dlx shadcn@latest add @markdown-graphs/graph-table

## Import

Files land under @/registry. Add your own barrel export if you want a shorter import path.

import { GraphTable } from "@/registry/default/graph-table/graph-table"`

export default function InstallationPage() {
  const table = getComponent("graph-table")

  return (
    <div className="flex max-w-[65ch] flex-col gap-12">
      <JsonLd data={installationJsonLd()} />
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Installation
          </h1>
          <CopyPage
            description={description}
            extra={extra}
            registry="all"
            title="Installation"
          />
        </div>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          These are source files, not an npm package. You need an existing
          shadcn project and the <code className="font-mono">motion</code>{" "}
          dependency.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">One component</h2>
        <p className="text-pretty text-muted-foreground">
          Run the shadcn CLI against this site&apos;s registry, or copy the
          files from GitHub.
        </p>
        <InstallCommand doc={table} name="graph-table" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Everything</h2>
        <p className="text-pretty text-muted-foreground">
          Installs every graph and the shared frame code into{" "}
          <code className="font-mono">registry/default</code>.
        </p>
        <InstallCommand name="all" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Namespace</h2>
        <p className="text-pretty text-muted-foreground">
          Add the registry once in{" "}
          <code className="font-mono">components.json</code>, then install
          components by name.
        </p>
        <NamespaceSetup />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Import</h2>
        <p className="text-pretty text-muted-foreground">
          Files land under <code className="font-mono">@/registry</code>. Add
          your own barrel export if you want a shorter import path.
        </p>
        <Command
          label="Import"
          value={`import { GraphTable } from "@/registry/default/graph-table/graph-table"`}
        />
      </section>
    </div>
  )
}
