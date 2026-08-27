import type { Metadata } from "next"
import Link from "next/link"

import { InstallCommand } from "@/components/docs/install"
import { components } from "@/lib/docs/catalog"

export const metadata: Metadata = {
  title: "Docs",
  description: "Copy-paste graphs for MDX. CLI or manual. Source in your repo.",
}

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <h1 className="max-w-[20ch] text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Introduction
        </h1>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          Source files you copy into a shadcn project. Graphs sit next to your
          prose: a dashed frame, a title on the top edge, one accent.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Install</h2>
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          The CLI copies a registry item into your repo. Or copy the files by
          hand.
        </p>
        <InstallCommand name="graph-table" />
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
