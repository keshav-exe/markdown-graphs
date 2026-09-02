import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/seo/json-ld"
import { ProsePage } from "@/components/site/prose-page"
import { ABOUT_PARAS } from "@/lib/agent/copy"
import { pageMeta, webPageJsonLd } from "@/lib/seo"

const description =
  "Open-source ASCII-framed React diagrams for MDX. Source on GitHub, MIT license, copied with the shadcn CLI."

export const metadata: Metadata = pageMeta({
  title: "About",
  description,
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "About Markdown Graphs",
          description,
          path: "/about",
        })}
      />
      <ProsePage kicker="Markdown Graphs" title="About">
        {ABOUT_PARAS.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <p>
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/contact"
          >
            Contact
          </Link>
          {" · "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/privacy"
          >
            Privacy
          </Link>
        </p>
      </ProsePage>
    </>
  )
}
