import type { Metadata } from "next"
import Link from "next/link"

import { GraphStat } from "@/components/graphs"
import { JsonLd } from "@/components/seo/json-ld"
import { CopyEmail } from "@/components/site/copy-email"
import { SiteContainer } from "@/components/site/container"
import { SponsorGrid } from "@/components/site/sponsor-grid"
import { SponsorSlots } from "@/components/site/sponsor-slots"
import { Button } from "@/components/ui/button"
import { pageMeta, sponsorJsonLd } from "@/lib/seo"
import { CELL_USD, sponsorMailHref, usd, YEAR_MONTHS } from "@/lib/sponsors"

const description =
  "Four cells beside the title on the homepage. $100 a cell. 100k+ impressions on X, and counting."

export const metadata: Metadata = pageMeta({
  title: "Sponsor",
  description,
  path: "/sponsor",
})

const specs = [
  {
    name: "Placement",
    detail:
      "Above the fold on the homepage, next to the product name. Four cells. Adjacent cells merge into one frame. Docs stay clean.",
  },
  {
    name: "Audience",
    detail:
      "People installing shadcn charts into MDX and READMEs. Most sessions continue into the docs after the homepage.",
  },
  {
    name: "Creative",
    detail:
      "SVG, one ink, must read on black and on white. One line, 24 characters or less. Or we set the name in the site type.",
  },
  {
    name: "Terms",
    detail: `${usd(CELL_USD)} a cell per month. A year is ${YEAR_MONTHS} months. Month to month. We can refuse a brand.`,
  },
]

export default function SponsorPage() {
  const mail = sponsorMailHref()

  return (
    <main id="main">
      <JsonLd data={sponsorJsonLd()} />
      <section>
        <SiteContainer
          borderTop={false}
          className="flex flex-col gap-8 py-8 sm:py-16"
        >
          <div className="flex flex-col gap-4">
            <p className="font-mono tracking-wide text-graph-muted uppercase tabular-nums">
              Homepage · {usd(CELL_USD)}
            </p>
            <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Sponsor
            </h1>
            <p className="max-w-[48ch] text-pretty text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button nativeButton={false} render={<a href={mail} />}>
              Mail Keshav
            </Button>
            <p>
              <CopyEmail />
            </p>
          </div>
        </SiteContainer>
      </section>
      <section>
        <SiteContainer className="flex flex-col gap-8">
          <GraphStat
            items={[
              {
                value: "100k+",
                label: "impressions on X",
                hint: "and counting",
                accent: true,
              },
              {
                value: "22,354",
                label: "page views",
                hint: "last 7 days",
              },
              {
                value: "3,195",
                label: "visitors",
                hint: "last 7 days",
              },
            ]}
            title="REACH"
          />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="min-w-0">
              <SponsorGrid openHref={mail} />
            </div>
            <div className="min-w-0">
              <SponsorSlots />
            </div>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            {specs.map((entry) => (
              <div className="flex flex-col gap-2" key={entry.name}>
                <dt className="font-medium">{entry.name}</dt>
                <dd className="max-w-[40ch] text-pretty text-muted-foreground">
                  {entry.detail}
                </dd>
              </div>
            ))}
          </dl>
          <p className="max-w-[48ch] text-pretty text-muted-foreground">
            If the grid is full,{" "}
            <a
              className="text-foreground underline-offset-4 hover:underline"
              href={mail}
            >
              mail anyway
            </a>
            {". Or go back to the "}
            <Link
              className="text-foreground underline-offset-4 hover:underline"
              href="/"
            >
              homepage
            </Link>
            {"."}
          </p>
        </SiteContainer>
      </section>
    </main>
  )
}
