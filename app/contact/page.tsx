import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/seo/json-ld"
import { ProsePage } from "@/components/site/prose-page"
import { CONTACT_PARAS } from "@/lib/agent/copy"
import { pageMeta, webPageJsonLd } from "@/lib/seo"
import { SITE_EMAIL } from "@/lib/site"

const description = `Mail ${SITE_EMAIL} for the library, the site, and homepage sponsor cells. Bugs go to GitHub.`

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          name: "Contact Markdown Graphs",
          description,
          path: "/contact",
        })}
      />
      <ProsePage kicker="Markdown Graphs" title="Contact">
        {CONTACT_PARAS.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <p>
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/about"
          >
            About
          </Link>
          {" · "}
          <Link
            className="text-foreground underline-offset-4 hover:underline"
            href="/sponsor"
          >
            Sponsor
          </Link>
        </p>
      </ProsePage>
    </>
  )
}
