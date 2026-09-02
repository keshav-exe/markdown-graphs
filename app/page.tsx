import type { Metadata } from "next"

import { JsonLd } from "@/components/seo/json-ld"
import { AgentsSection } from "@/components/site/agents-section"
import { Hero } from "@/components/site/hero"
import { HomeClientSections } from "@/components/site/home-client-sections"
import { HomeIntro } from "@/components/site/home-intro"
import { pageMeta, websiteJsonLd } from "@/lib/seo"
import { SITE_DESCRIPTION } from "@/lib/site"

export const metadata: Metadata = pageMeta({
  description: SITE_DESCRIPTION,
  path: "/",
})

export default function Page() {
  return (
    <main id="main">
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <HomeIntro />
      <AgentsSection />
      <HomeClientSections />
    </main>
  )
}
