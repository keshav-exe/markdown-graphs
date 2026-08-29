import type { Metadata } from "next"
import Link from "next/link"

import { Command, InstallCommand } from "@/components/docs/install"
import { DocsPageHeader } from "@/components/docs/page-header"
import { NamespaceSetup } from "@/components/docs/namespace"
import { JsonLd } from "@/components/seo/json-ld"
import { getComponent } from "@/lib/docs/catalog"
import { SKILL_URL } from "@/lib/docs/recipes"
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

import { GraphTable } from "@/registry/default/graph-table/graph-table"

## Agents

Optional. $ORIGIN/llms.txt is the chooser and recipes in one file. Copy skills/markdown-graphs from the repo into .cursor/skills/markdown-graphs.`

export default function InstallationPage() {
  const table = getComponent("graph-table")

  return (
    <div className="flex flex-col gap-12">
      <JsonLd data={installationJsonLd()} />
      <DocsPageHeader
        copy={{
          description,
          extra,
          registry: "all",
          title: "Installation",
        }}
        lead={
          <>
            These are source files, not an npm package. You need an existing
            shadcn project and the <code className="font-mono">motion</code>{" "}
            dependency.
          </>
        }
        title="Installation"
      />

      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            One component
          </h2>
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

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Agents</h2>
          <p className="text-pretty text-muted-foreground">
            Optional.{" "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/llms.txt"
            >
              /llms.txt
            </Link>{" "}
            is every graph plus the recipes, in one file. Copy{" "}
            <code className="font-mono">skills/markdown-graphs</code> from the
            repo into{" "}
            <code className="font-mono">.cursor/skills/markdown-graphs</code> if
            you want a project skill.
          </p>
          <Command label="Skill" value={SKILL_URL} />
        </section>
      </div>
    </div>
  )
}
