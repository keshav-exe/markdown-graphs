import type { Metadata } from "next"
import Link from "next/link"

import { CopyPage } from "@/components/docs/copy-page"
import { InstallCommand } from "@/components/docs/install"
import { components, getComponent } from "@/lib/docs/catalog"

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Install graph components into a shadcn project, or copy the files by hand.",
}

const intro = `React components you copy into a shadcn project—not an npm package. Each graph sits in a dashed frame with a title on the top edge. Pick one accent color for highlights.`

export default function DocsPage() {
  const extra = [
    "## Components",
    "",
    ...components.map(
      (item) => `- ${item.title} (${item.name}): ${item.description}`
    ),
  ].join("\n")

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-6">
          <h1 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Introduction
          </h1>
          <CopyPage
            description={intro}
            extra={extra}
            registry="all"
            title="Introduction"
          />
        </div>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          {intro}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Install</h2>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          The CLI copies a registry item into your repo. You can also copy the
          files from GitHub.
        </p>
        <InstallCommand doc={getComponent("graph-table")} name="graph-table" />
        <p>
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/docs/installation"
          >
            Full installation
          </Link>
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight">Components</h2>
        <dl className="grid gap-8 sm:grid-cols-2">
          {components.map((item) => (
            <div className="flex flex-col gap-2" key={item.slug}>
              <dt className="font-medium text-foreground">
                <Link className="hover:underline" href={`/docs/${item.slug}`}>
                  {item.title}
                </Link>
              </dt>
              <dd className="max-w-[40ch] text-pretty text-muted-foreground">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
