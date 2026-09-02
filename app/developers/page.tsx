import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/seo/json-ld"
import { ProsePage } from "@/components/site/prose-page"
import { DEVELOPERS_PARAS } from "@/lib/agent/copy"
import { developersJsonLd, pageMeta } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

const description =
  "Markdown Graphs developer API. OpenAPI spec, JSON catalog, rate limits, and shadcn CLI install."

export const metadata: Metadata = pageMeta({
  title: "Markdown Graphs API",
  description,
  path: "/developers",
})

export default function DevelopersPage() {
  return (
    <>
      <JsonLd data={developersJsonLd()} />
      <ProsePage kicker="Markdown Graphs" title="Developer API">
        {DEVELOPERS_PARAS.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/openapi.json"
            >
              OpenAPI
            </Link>
            {" · "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/api/v1"
            >
              API index
            </Link>
            {" · "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/api/v1/health"
            >
              Health
            </Link>
          </li>
          <li>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/api/v1/components"
            >
              JSON catalog
            </Link>
            {" · "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/llms.txt"
            >
              llms.txt
            </Link>
            {" · "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/agents.md"
            >
              agents.md
            </Link>
          </li>
          <li>
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/developers/deprecation"
            >
              Deprecation policy
            </Link>
            {" · "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/agents"
            >
              For agents
            </Link>
          </li>
        </ul>
        <p>
          Install graphs with the shadcn CLI:{" "}
          <code className="font-mono text-foreground">
            pnpm dlx shadcn@latest add {SITE_URL}/r/all.json
          </code>
        </p>
      </ProsePage>
    </>
  )
}
