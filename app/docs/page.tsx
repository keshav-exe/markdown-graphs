import type { Metadata } from "next"
import Link from "next/link"

import { InstallCommand } from "@/components/docs/install"
import { DocsPageHeader } from "@/components/docs/page-header"
import { JsonLd } from "@/components/seo/json-ld"
import { SiteCorners } from "@/components/site/corners"
import { components, getComponent } from "@/lib/docs/catalog"
import { isNewSlug } from "@/lib/docs/new"
import { docsJsonLd, pageMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMeta({
  title: "Introduction",
  description:
    "ASCII graph components for MDX. Install with the shadcn CLI or copy the files.",
  path: "/docs",
})

const intro = `ASCII-framed graphs you copy into a shadcn project, not an npm package. Each graph sits in a dashed frame with a title on the top edge. Pick one accent color for highlights. Drawing graphs also take palette="duo" or "multi".`

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
      <JsonLd data={docsJsonLd()} />
      <DocsPageHeader
        copy={{
          description: intro,
          extra,
          registry: "all",
          title: "Introduction",
        }}
        lead={intro}
        title="Introduction"
        titleClassName="max-w-[20ch]"
      >
        <p className="max-w-[56ch] text-pretty text-muted-foreground">
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/docs/examples"
          >
            Examples
          </Link>{" "}
          are short write-ups with two graphs each — a refactor, an incident, a
          tradeoff.
        </p>
      </DocsPageHeader>

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
        <div className="relative isolate -mx-4 border-y border-dashed border-site-rail sm:-mx-6 lg:-mx-8">
          <SiteCorners />
          <dl className="grid sm:grid-cols-2">
            {components.map((item) => (
              <div
                className={cn(
                  "flex flex-col gap-2 px-4 py-5 sm:px-6",
                  "max-sm:[&:not(:first-child)]:border-t max-sm:[&:not(:first-child)]:border-dashed max-sm:[&:not(:first-child)]:border-site-rail",
                  "sm:[&:nth-child(n+3)]:border-t sm:[&:nth-child(n+3)]:border-dashed sm:[&:nth-child(n+3)]:border-site-rail",
                  "sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-dashed sm:[&:nth-child(odd)]:border-site-rail"
                )}
                key={item.slug}
              >
                <dt className="flex items-center gap-2 font-medium text-foreground">
                  <Link className="hover:underline" href={`/docs/${item.slug}`}>
                    {item.title}
                  </Link>
                  {isNewSlug(item.slug) ? (
                    <span className="font-mono text-[10px] tracking-wide text-graph-accent uppercase">
                      new
                    </span>
                  ) : null}
                </dt>
                <dd className="max-w-[40ch] text-pretty text-muted-foreground">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
