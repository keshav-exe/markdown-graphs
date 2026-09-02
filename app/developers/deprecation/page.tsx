import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/seo/json-ld"
import { ProsePage } from "@/components/site/prose-page"
import { DEPRECATION_PARAS } from "@/lib/agent/copy"
import { pageMeta, webPageJsonLd } from "@/lib/seo"

const description =
  "Markdown Graphs API versioning and deprecation. URL version prefixes, Sunset headers, and six-month notice."

export const metadata: Metadata = pageMeta({
  title: "API deprecation",
  description,
  path: "/developers/deprecation",
})

export default function DeprecationPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "Markdown Graphs API deprecation",
          description,
          path: "/developers/deprecation",
        })}
      />
      <ProsePage kicker="Markdown Graphs API" title="Deprecation policy">
        {DEPRECATION_PARAS.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <p>
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/developers"
          >
            Developer API
          </Link>
          {" · "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/openapi.json"
          >
            OpenAPI
          </Link>
        </p>
      </ProsePage>
    </>
  )
}
